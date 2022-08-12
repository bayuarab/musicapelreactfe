import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/userAPI";
import { getClaimedCourses } from "../../components/GetClaimedCourse";
import useAuth from "../../hooks/useAuth";
import numberFormat from "../../utilities/NumbeFormat";
import CheckoutDialogs from "../cart/components/CheckoutDialogs";
import {
  generateNewInvoice,
  generateNewMasterInvoice,
} from "../invoice/InvoicesGenerator";

//#F2C94C

const calculateTotalCost = (carts) => {
  return carts.reduce((totalCost, items) => {
    return totalCost + items.price;
  }, 0);
};

export default function CategoryCourse() {
  const [age, setAge] = React.useState("");
  const [err, setErr] = useState("");
  const [checkoutDialogState, setCheckoutDialogState] = useState(false);
  const [selectedOp, setSelectedOp] = useState(null);
  const [registeredInvoice, setRegisteredInvoice] = useState([]);
  const [claimedCourse, setClaimedCourse] = useState([]);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const UserID = auth?.userId;

  let params = useParams();

  /* useStates dan metode-metode untuk keperluan GET detail dari sebuah produk */
  const [detailOfACourse, setDetailOfACourse] = useState([]);
  const getdetailOfACourse = async (url) => {
    await axios
      .get(`https://localhost:7132/api/Course/${url}`, {
        url,
      })
      .then((res) => {
        if (res.status === 200) {
          setDetailOfACourse(res.data);
        }
      })
      .catch((err) => {});
    console.log(params);
  };

  useEffect(
    () => {
      getdetailOfACourse(params.courseid);
    },
    [params],
    console.log(params.courseid)
  );

  /* useStates untuk keperluan GET detail dari sebuah produk */

  let paramss = useParams();
  /* useStates dan metode-metode untuk keperluan GET detail dari sebuah produk */
  const [detailOfACourseCaategory, setDetailOfACourseCategory] = useState([]);
  const getdetailOfACourseCategory = async (url) => {
    console.log("paramss", url);
    await axios
      .get(`https://localhost:7132/api/Course/categoryId/${url}`, {
        url,
      })
      .then((res) => {
        if (res.status === 200) {
          setDetailOfACourseCategory([res.data]);
          console.log(res.data);
        }
      })
      .catch((err) => {});
    console.log(paramss);
  };
  useEffect(() => {
    getdetailOfACourseCategory((paramss = detailOfACourse.courseCategoryId));
  }, [paramss]);

  //console.log("categoryid",detailOfACourse.categoryId)
  /* useStates untuk keperluan GET detail dari sebuah produk */

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  //Get courses
  useEffect(() => {
    const fetchApiClaimedCourse = async () => {
      try {
        const response = await api.get(`/Courses/${auth?.userId}`);
        console.log("ClaimedCourse", response.data);
        setClaimedCourse(response.data);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        if (err.response.data === "Not Found") console.log(err.response.status);
        console.log(err.response.headers);
      }
    };
    fetchApiClaimedCourse();
  }, []);

  /* Method to POST new Brand Item */
  const postCart = () => {
    const courseValid = claimedCourse.some(
      (item) => item.courseId == detailOfACourse.id
    );
    if (courseValid) {
      setErr("Course sudah dibeli");
      return;
    }

    const postDataa = { userId: UserID, courseId: detailOfACourse.id };
    console.log(postDataa);
    axios
      .post("https://localhost:7132/api/Cart", postDataa)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.status);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setErr(err.response.data);
      });
  };
  /* Method to POST new Brand Item */

  // Checkpoutdialog
  useEffect(() => {
    const fetchApiInvoices = async () => {
      try {
        const response = await api.get(`/Invoices/${UserID}`);
        console.log(response?.data);
        setRegisteredInvoice(
          response?.data?.map((rawData) => rawData.noInvoice)
        );
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    };
    fetchApiInvoices();
  }, [UserID]);

  const fetchApiPostInvoice = async (url, data) => {
    console.table(data);
    try {
      const response = await api.post(`/${url}`, data);
      console.log(response.data);
      const masterInvoicess = response?.data.id;
      let details = [];
      const selectedCart = [detailOfACourse];
      if (url === "MInvoice") {
        details = selectedCart.map((items) => {
          return {
            noInvoice: generateNewInvoice(registeredInvoice, auth),
            courseId: items.id,
            masterInvoiceId: masterInvoicess,
          };
        });
        console.log("details", details);
      }
      details?.forEach((items) => {
        fetchApiPostInvoice("InvoiceDetails", items);
      });
      navigate("/payment-status", { replace: true });
      // setCheckoutState(true);
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
  };

  const handleCheckoutClose = (value) => {
    const { paymentOption, paymentState } = value;
    setCheckoutDialogState(false);
    setSelectedOp(paymentOption);
    if (!paymentState) return;
    const selectedCart = [detailOfACourse];
    const newInvoiceProp = {
      selectedCart,
      registeredInvoice,
      selectedOp,
      UserID,
      auth,
      calculateTotalCost,
    };
    console.table(selectedCart);
    console.table(newInvoiceProp);
    fetchApiPostInvoice("MInvoice", generateNewMasterInvoice(newInvoiceProp));
  };

  const checkout = () => {
    const courseValid = claimedCourse.some(
      (item) => item.courseId == detailOfACourse.id
    );
    if (courseValid) {
      setErr("Course sudah dibeli");
      return;
    }

    console.log("Barang yang di checkout:");
    console.table(detailOfACourse);
    console.log(`Total cost: ${detailOfACourse.price}`);
    setCheckoutDialogState(true);
  };

  return (
    <Grid>
      <Box display="flex">
        <Grid
          width="45%"
          sx={{
            margin: "1% 0 0 5%",
          }}
        >
          <Box
            bottom="0px"
            style={{
              height: "400px",
            }}
          >
            <img
              src={`${detailOfACourse.courseImage}`}
              width="75%"
              alt={detailOfACourse.courseImage}
              style={{
                right: "0px",
                borderRadius: "20px",
              }}
            ></img>
          </Box>
        </Grid>
        <Grid
          width="65%"
          sx={{
            margin: "1% 0 0 0",
          }}
        >
          <Typography color="text.secondary">{detailOfACourse.name}</Typography>
          <Typography variant="body2" fontWeight="bold">
            <h1>{detailOfACourse.courseTitle}</h1>
          </Typography>
          <Typography color="blue">
            <h1>IDR {numberFormat(detailOfACourse.price)}</h1>
          </Typography>

          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            defaultValue={0}
            onChange={handleChange}
            size="small"
          >
            <MenuItem value={0}>pilih jadwal kelas</MenuItem>
            <MenuItem value="1 july 2022">1 july 2022</MenuItem>
            <MenuItem value={"30 july 2022"}>30 july 2022</MenuItem>
            <MenuItem value={"17 agustus 2022"}>17 agustus 2022</MenuItem>
            <MenuItem value={"9 september 2022"}>9 september 2022</MenuItem>
          </Select>

          <Box
            display="flex"
            sx={{
              margin: "3% 0 0 0",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                margin: "0 3% 0 0",
              }}
              onClick={async (e) => {
                await e.preventDefault();
                await postCart();
              }}
            >
              Masukan Keranjang
            </Button>
            <Button variant="contained" onClick={() => checkout()}>
              Beli Sekarang
            </Button>
          </Box>
          <Typography color="red">{err}</Typography>
        </Grid>
      </Box>
      <Typography>{detailOfACourse.description}</Typography>

      <div style={{ height: "0px", border: "1px solid grey" }} />
      <Typography color="blue" sx={{ textAlign: "center" }}>
        <h4>Kelas Lain Yang Mungkin Kamu Suka</h4>
      </Typography>
      <Box
        className="kategoriKelas"
        style={{
          flex: "1",
        }}
      >
        {detailOfACourseCaategory
          .filter((items) => items.id != detailOfACourseCaategory.id)
          .map((item, i) => (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.courseImage}
                alt="kategori kelas"
                style={{
                  borderRadius: "10px",
                }}
              />
              <CardActionArea component={Link} to={`/course/${item.id}`}>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    {item.courseTitle}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {item.courseDesc}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Typography color="blue">
                    IDR {numberFormat(item.price)}
                  </Typography>
                </CardActions>
              </CardActionArea>
            </Card>
          ))}
      </Box>
      <CheckoutDialogs
        checkoutDialogState={checkoutDialogState}
        onClose={handleCheckoutClose}
        selectedOp={selectedOp}
      />
    </Grid>
  );
}

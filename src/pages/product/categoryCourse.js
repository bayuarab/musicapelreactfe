import {
  Alert,
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
  const [claimedCourse, setClaimedCourse] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [openAlertSucces, setOpenAlertSucces] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [openAlertWarning, setOpenAlertWarning] = useState(false)
  const [scheduleCourse, setScheduleCourse] = useState('pilih jadwal kelas');

  const UserID = auth?.userId;

  let params = useParams();

  //Get claimed course
  const fetchApiClaimedCourse = async () => {
    try {
      const response = await api.get(`/Courses/${auth?.userId}`);
      console.log("ClaimedCourse", response.data);
      const claimedCourseState = response?.data.some(
        (item) => item.courseId == params.courseid
      );
      setClaimedCourse(claimedCourseState);
      console.log(detailOfACourse.id);
      console.log("claimedCourseState", claimedCourseState);
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      if (err.response.data === "Not Found") console.log(err.response.status);
      console.log(err.response.headers);
    }
  };

  //delete purchased course from cart
  const fetchDelete = async (courseId) => {
    try {
      const response = await api.delete(
        `/Cart/ByCourseId/${UserID}/${courseId}`
      );
      console.log(response.data);
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
  };

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
      .catch((err) => { });
    console.log(params);
  };

  useEffect(() => {
    getdetailOfACourse(params.courseid);
    fetchApiClaimedCourse();
    console.log(params.courseid);
  }, [params]);

  /* useStates untuk keperluan GET detail dari sebuah produk */

  /* useStates untuk keperluan GET detail dari sebuah jadwal */
  const [cekJadwal, setcekJadwal] = useState([]);
  const getcekJadwal = async () => {
    await axios
      .get(`https://localhost:7132/api/Schedule`)
      .then((res) => {
        if (res.status === 200) {
          setcekJadwal(res.data);
          console.log("res data", res.data)
        }
      })
      .catch((err) => { });
  };

  useEffect(() => { getcekJadwal(); }, [])
  /* useStates untuk keperluan GET detail dari sebuah jadwal */

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
      .catch((err) => { });
    console.log("lahhhhh", paramss);
  };
  useEffect(() => {
    getdetailOfACourseCategory((paramss.courseid));
  }, [paramss]);

  //console.log("categoryid",detailOfACourse.categoryId)
  /* useStates untuk keperluan GET detail dari sebuah produk */

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  //Get courses
  // useEffect(() => {
  //   const fetchApiClaimedCourse = async () => {
  //     try {
  //       const response = await api.get(`/Courses/${auth?.userId}`);
  //       console.log("ClaimedCourse", response.data);
  //       setClaimedCourse(response.data);
  //       const claimedCourseState = response?.data.some(
  //         (item) => item.courseId == detailOfACourse.id
  //       );
  //       console.log(detailOfACourse.id);
  //       console.log(claimedCourseState);
  //     } catch (err) {
  //       !err.response
  //         ? console.log(`Error: ${err.message}`)
  //         : console.log(err.response.data);
  //       if (err.response.data === "Not Found") console.log(err.response.status);
  //       console.log(err.response.headers);
  //     }
  //   };
  //   fetchApiClaimedCourse();
  // }, []);

  /* Method to POST new Brand Item */
  const postCart = () => {
    if (!auth?.roles) navigate("/login", { replace: true });
    // const courseValid = claimedCourse.some(
    //   (item) => item.courseId == detailOfACourse.id
    // );
    if (claimedCourse) {
      setErr("Course sudah dibeli");
      return;
    }

    const postDataa = { userId: UserID, courseId: detailOfACourse.id, scheduleId: scheduleCourse };
    console.log(postDataa);
    axios
      .post("https://localhost:7132/api/Cart", postDataa)
      .then((res) => {
        if (res.status === 200) {
          setOpenAlertSucces(true);
          setTimeout(() => setOpenAlertSucces(false), 2000);
          console.log(res.status);
          console.log(res.data);
          setErr("Berhasil menambahkan cart");
        }
      })
      .catch((err) => {
        if (err.status !== 200) {
          setOpenAlertWarning(true);
          setTimeout(() => setOpenAlertWarning(false), 2000);
          console.log("status eror", err.status);
          setErr(err.response.data);
        } else if (err.status === "undefined") {
          setOpenAlertError(true);
          setTimeout(() => setOpenAlertError(false), 2000);
          console.log(err.response.data);
          console.log("status eror", err.status);
          setErr(err.response.data);
        }
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
        fetchDelete(items.courseId);
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
    if (!auth?.roles) navigate("/login", { replace: true });
    // const courseValid = claimedCourse.some(
    //   (item) => item.courseId == detailOfACourse.id
    // );
    if (claimedCourse) {
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
          {claimedCourse ? (
            <Button variant="contained" component={Link} to={`/my-course`}>
              Ke Kelasku
            </Button>
          ) : (
            <>
              <Select
                defaultValue={0}
                value={scheduleCourse}
                onChange={(e) => setScheduleCourse(e.target.value)}
                size="medium"
              >
                <MenuItem value={0}>Pilih Jadwal Kelas</MenuItem>
                {cekJadwal.map((jadwal, i) => (

                  <MenuItem value={jadwal.id}>{jadwal.jadwal}</MenuItem>


                ))}

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
            </>
          )}


        </Grid>

      </Box>
      <Typography>{detailOfACourse.courseDesc}</Typography>

      {/* Alert yang ditampilkan ketika pelanggan menambahkan course */}
      {openAlertSucces === true ?
        <Alert className="success-alert" variant="filled" severity="success">
          kelas berhasil ditambahkan ke keranjang!
        </Alert>
        :
        <></>
      }
      {/* Alert yang ditampilkan ketika pelanggan menambahkan course */}
      {openAlertWarning === true ?
        <Alert className="success-alert" variant="filled" severity="warning">
          Kelas sudah terdapat di keranjang! / Jadwal kelas tidak sinkron
        </Alert>
        :
        <></>
      }
      {/* Alert yang ditampilkan ketika pelanggan menambahkan course */}
      {openAlertError === true ?
        <Alert className="success-alert" variant="filled" severity="error">
          isilah dulu jadwalnya!
        </Alert>
        :
        <></>
      }


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

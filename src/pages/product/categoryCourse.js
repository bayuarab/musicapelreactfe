import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import baseApi from "../../api/baseApi";
import api from "../../api/userAPI";
import { useCart } from "../../context/CartProvider";
import useAuth from "../../hooks/useAuth";
import { StyledPurpleButton } from "../../styles/PurpleContainedButton";
import numberFormat from "../../utilities/NumbeFormat";
import CheckoutDialogs from "../cart/components/CheckoutDialogs";
import {
  generateNewInvoice,
  generateNewMasterInvoice,
} from "../invoice/InvoicesGenerator";

const calculateTotalCost = (carts) => {
  return carts.reduce((totalCost, items) => {
    return totalCost + items.price;
  }, 0);
};

export default function CategoryCourse() {
  const [err, setErr] = useState("");
  const { setCart } = useCart();
  const [checkoutDialogState, setCheckoutDialogState] = useState(false);
  const [selectedOp, setSelectedOp] = useState(null);
  const [registeredInvoice, setRegisteredInvoice] = useState([]);
  const [claimedCourse, setClaimedCourse] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [scheduleCourse, setScheduleCourse] = useState("");
  const [claimedCart, setClaimedCart] = useState(false);
  const [severityType, setSeverityType] = useState("error");
  const [expMore, setExpMore] = useState(true);
  const UserID = auth?.userId;
  const [open, setOpen] = React.useState(false);
  const token = auth?.token;
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  let params = useParams();

  //Get claimed course
  const fetchApiClaimedCourse = async () => {
    try {
      const response = await api.get(`/Courses/${auth?.userId}`, config);
      // console.log("ClaimedCourse", response.data);
      const claimedCourseState = response?.data.some(
        (item) => item.courseId == params.courseid
      );
      setClaimedCourse(claimedCourseState);
      // console.log(detailOfACourse.id);
      // console.log("claimedCourseState", claimedCourseState);
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      if (err.response.data === "Not Found") console.log(err.response.status);
      // console.log(err.response.headers);
    }
  };

  //delete purchased course from cart
  const fetchDelete = async (courseId) => {
    try {
      const response = await api.delete(
        `/Cart/ByCourseId/${UserID}/${courseId}`,
        config
      );
      // console.log(response.data);
      setCart(
        response.data.filter(
          (item) => item.userId === UserID && item.id !== courseId
        )
      );
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      // console.log(err.response.status);
      // console.log(err.response.headers);
    }
  };

  //update cart
  const fetchApiCart = async (userId) => {
    try {
      const response = await api.get(`/Cart/${userId}`, config);
      console.table(response.data);
      setCart(response.data);
      setClaimedCart(
        response?.data.some(
          (item) => item.courseId === parseInt(params.courseid)
        )
      );
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      if (err.response.data === "Not Found") console.log(err.response.status);
      // console.log(err.response.headers);
    }
  };

  /* useStates untuk keperluan GET detail jadwal dari sebuah kelas*/
  const [cekJadwal, setcekJadwal] = useState([]);
  const getcekJadwal = async (courseId) => {
    await baseApi
      .get(`Schedule/ByCourseId/${courseId}`)
      .then((res) => {
        if (res.status === 200) {
          setcekJadwal(res.data);
          // console.log("res data", res.data);
        }
      })
      .catch((err) => {});
  };

  // useEffect(() => {
  //   getcekJadwal();
  // }, []);
  /* useStates untuk keperluan GET detail jadwal dari sebuah kelas */

  const [detailOfACategory, setDetailOfACategory] = useState([]);
  const getdetailOfACategory = async (url) => {
    // console.log("params", url);
    await baseApi
      .get(`CourseCategory/${url}`, {
        url,
      })
      .then((res) => {
        if (res.status === 200) {
          setDetailOfACategory(res.data);
        }
      })
      .catch((err) => {});
    // console.log(params);
  };
  useEffect(() => {
    getdetailOfACategory(detailOfACourse.courseCategoryId);
  }, []);

  /* useStates dan metode-metode untuk keperluan GET detail dari sebuah produk */
  const [detailOfACourseCat, setDetailOfACourseCat] = useState([]);

  const getdetailOfACourseCat = async (category, course) => {
    // console.log("paramss", course);
    // console.log("paramss lah yah", category);
    await baseApi
      .get(
        `https://localhost:7132/api/Course/categoryId/${category}/${course}`,
        {
          category,
          course,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setDetailOfACourseCat(res.data);
          // console.log(res.data);
        }
      })
      .catch((err) => {});
    // console.log(paramss);
  };
  useEffect(() => {
    getdetailOfACourseCat(detailOfACourse.courseCategoryId, params.courseid);
  }, []);

  const [detailOfACourse, setDetailOfACourse] = useState([]);
  const getdetailOfACourse = async (url) => {
    await baseApi
      .get(`https://localhost:7132/api/Course/${url}`, {
        url,
      })
      .then((res) => {
        if (res.status === 200) {
          setDetailOfACourse(res.data);
          getcekJadwal(url);
          getdetailOfACourseCat(res.data.courseCategoryId, res.data.id);
          getdetailOfACategory(res.data.courseCategoryId);
        }
      })
      .catch((err) => {});
    // console.log(params);
  };

  useEffect(() => {
    getdetailOfACourse(params.courseid);
    fetchApiClaimedCourse();
    fetchApiCart(auth.userId);
    // console.log(params.courseid);
  }, [params]);

  /* useStates untuk keperluan GET detail dari sebuah produk */

  let paramss = useParams();
  /* useStates dan metode-metode untuk keperluan GET detail dari sebuah produk */

  //console.log("categoryid",detailOfACourse.categoryId)
  /* useStates untuk keperluan GET detail dari sebuah produk */

  /* Method to POST new Brand Item */
  const postCart = () => {
    if (!auth?.roles) navigate("/login", { replace: true });
    if (claimedCourse) {
      setErr("Course sudah dibeli");
      return;
    }

    const postDataa = {
      userId: UserID,
      courseId: detailOfACourse.id,
      scheduleId: scheduleCourse,
    };
    // console.log(postDataa);
    baseApi
      .post("https://localhost:7132/api/Cart", postDataa, config)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.status);
          // console.log(res.data);
          setSeverityType("success");
          setErr("Berhasil menambahkan cart");
          fetchApiCart(UserID);
          setOpen(true);
        }
      })
      .catch((err) => {
        if (err.status !== 200) {
          // setOpenAlertWarning(true);
          // setTimeout(() => setOpenAlertWarning(false), 2000);
          // console.log("status eror", err.status);
          setErr("Jadwal Tidak Valid");
          setSeverityType("error");
          setOpen(true);
        } else if (err.status === "undefined") {
          // console.log(err.response.data);
          // console.log("status eror", err.status);
          setErr(err.response.data);
        }
      });
  };
  /* Method to POST new Brand Item */

  // Checkpoutdialog
  useEffect(() => {
    const fetchApiInvoices = async () => {
      try {
        const response = await api.get(`/Invoices/${UserID}`, config);
        // console.log(response?.data);
        setRegisteredInvoice(
          response?.data?.map((rawData) => rawData.noInvoice)
        );
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        // console.log(err.response.status);
        // console.log(err.response.headers);
      }
    };
    fetchApiInvoices();
  }, [UserID]);

  const fetchApiPostInvoice = async (url, data) => {
    console.table(data);
    try {
      const response = await api.post(`/${url}`, data, config);
      // console.log(response.data);
      const masterInvoicess = response?.data.id;
      let details = [];
      const selectedCart = [{ ...detailOfACourse, schedule: scheduleCourse }];
      // console.log(selectedCart);
      if (url === "MInvoice") {
        details = selectedCart.map((items) => {
          return {
            noInvoice: generateNewInvoice(registeredInvoice, auth),
            courseId: items.id,
            masterInvoiceId: masterInvoicess,
            scheduleId: items.schedule,
          };
        });
        // console.log("details", details);
      }
      details?.forEach((items) => {
        fetchApiPostInvoice("InvoiceDetails", items);
        fetchDelete(params.courseid);
      });
      // fetchApiCart(auth.userId);
      navigate("/payment-status", { replace: true });
      // setCheckoutState(true);
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      // console.log(err.response.status);
      // console.log(err.response.headers);
    }
  };

  const handleCheckoutClose = (value) => {
    const { paymentOption, paymentState } = value;
    setCheckoutDialogState(false);
    setSelectedOp(paymentOption);
    if (!paymentState) return;
    const selectedCart = [{ ...detailOfACourse, schedule: scheduleCourse }];
    const newInvoiceProp = {
      selectedCart,
      registeredInvoice,
      paymentOption,
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
    if (!scheduleCourse) {
      setErr("Jadwal Tidak Valid");
      setSeverityType("error");
      setOpen(true);
      return;
    }

    const selectedCart = [{ ...detailOfACourse, schedule: scheduleCourse }];
    // console.log("Barang yang di checkout:");
    // console.table(selectedCart);
    // console.log(`Total cost: ${detailOfACourse.price}`);
    setCheckoutDialogState(true);
  };

  const Alerts = React.forwardRef(function Alerts(props, ref) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const expandMore = () => {
    setExpMore(!expMore);
  };
  const gridItems = detailOfACourseCat;
  const itemCount = expMore ? 2 : gridItems.length;

  return (
    <Grid>
      <Box className="Cc" fullwidth>
        <Grid
          sx={{
            width: {
              lg: "45%",
            },
            margin: {
              lg: "1% 0 0 0",
            },
          }}
        >
          <Box
            sx={{
              width: { lg: "90%", sm: "75%" },
              marginLeft: { lg: "13%" },
              marginTop: "3%",
            }}
          >
            <img
              src={`data:image/jpeg;base64,${detailOfACourse.courseImage}`}
              alt={detailOfACourse.courseImage}
              className="CcImg"
            ></img>
          </Box>
        </Grid>
        <Grid
          sx={{
            width: {
              lg: "55%",
              sm: "100%",
            },
            margin: "1% 0 0 0",
          }}
        >
          <Typography
            color="text.secondary"
            sx={{
              fontSize: {
                lg: "16px",
                xs: "12px",
              },
              fontFamily: "Poppins",
              paddingBottom: {
                lg: "10px",
                xs: "4px",
              },
            }}
          >
            {detailOfACategory.category}
          </Typography>
          <Typography
            fontWeight="bold"
            className="cc2"
            sx={{
              fontSize: {
                lg: "24px",
                xs: "16px",
              },

              fontFamily: "Poppins",
              paddingBottom: {
                lg: "10px",
                xs: "4px",
              },
            }}
          >
            {detailOfACourse.courseTitle}
          </Typography>
          <Typography
            color="#5D5FEF"
            sx={{
              fontSize: {
                lg: "22px",
                xs: "16px",
              },
              fontWeight: "600",
              paddingBottom: {
                lg: "10px",
                xs: "4px",
              },
              fontFamily: "Poppins",
            }}
          >
            IDR {numberFormat(detailOfACourse.price)}
          </Typography>
          {claimedCourse ? (
            <Button variant="contained" component={Link} to={`/my-course`}>
              Ke Kelasku
            </Button>
          ) : claimedCart ? (
            <>
              <Box
                sx={{
                  minWidth: { md: 240, xs: "60%" },
                  maxWidth: { md: 358, xs: "80%" },
                }}
              >
                <FormControl width={"90%"}>
                  <InputLabel>Pilih Jadwal Kelas</InputLabel>
                  <Select
                    label="Pilih Jadwal Kelas"
                    value={scheduleCourse}
                    onChange={(e) => setScheduleCourse(e.target.value)}
                    size="medium"
                    sx={{
                      fontSize: {
                        lg: "16px",
                        xs: "12px",
                      },
                    }}
                  >
                    {cekJadwal.map((jadwal, i) => (
                      <MenuItem value={jadwal.id}>{jadwal.jadwal}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box
                display="flex"
                sx={{
                  margin: "3% 0 0 0",
                }}
              >
                <Button variant="contained" component={Link} to={`/cart`}>
                  Ke Cart
                </Button>
                <Button variant="contained" onClick={() => checkout()}>
                  Beli Sekarang
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  minWidth: { md: 240, xs: "60%" },
                  maxWidth: { md: 358, xs: "80%" },
                }}
              >
                <FormControl
                  fullWidth
                  size={{
                    lg: "medium",
                    sm: "small",
                  }}
                >
                  <InputLabel
                    sx={{
                      fontSize: {
                        lg: "16px",
                        xs: "14px",
                      },
                      fontFamily: "Poppins",
                    }}
                  >
                    Pilih Jadwal Kelas
                  </InputLabel>
                  <Select
                    label="Pilih Jadwal Kelas"
                    value={scheduleCourse}
                    onChange={(e) => setScheduleCourse(e.target.value)}
                    size="medium"
                  >
                    {cekJadwal.map((jadwal, i) => (
                      <MenuItem value={jadwal.id}>{jadwal.jadwal}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box
                display="flex"
                sx={{
                  margin: "3% 0 0 0",
                }}
              >
                <StyledPurpleButton
                  variant="outlined"
                  sx={{
                    margin: "0 3% 0 0",
                    fontSize: {
                      lg: "16px",
                      xs: "10px",
                    },
                    color: "#5D5FEF",
                    backgroundColor: "white",
                    fontFamily: "Poppins",
                  }}
                  onClick={async (e) => {
                    await e.preventDefault();
                    await postCart();
                  }}
                >
                  Masukan Keranjang
                </StyledPurpleButton>
                <StyledPurpleButton
                  variant="contained"
                  onClick={() => checkout()}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      xs: "10px",
                    },
                    fontFamily: "Poppins",
                  }}
                >
                  Beli Sekarang
                </StyledPurpleButton>
              </Box>
            </>
          )}
        </Grid>
      </Box>
      <center>
        <Box sx={{ width: "90vw" }}>
          <Typography
            mb="1.5vh"
            mt="4vh"
            sx={{
              textAlign: "left",
              fontWeight: "5semi bold",
              fontSize: {
                lg: "24px",
                xs: "14px",
              },
              fontFamily: "Poppins",
            }}
          >
            Deskripsi
          </Typography>
          <Typography
            sx={{
              paddingBottom: {
                md: "40px",
                xs: "14px",
              },
              textAlign: "left",
              fontSize: {
                lg: "20px",
                xs: "12px",
              },
              fontFamily: "Poppins",
            }}
          >
            {/* <ReadMore> */}

            {detailOfACourse.courseDesc}
            {/* </ReadMore> */}
          </Typography>
        </Box>
      </center>

      <div
        style={{
          paddingTop: {
            md: "40px",
            xs: "14px",
          },
          height: "0px",
          borderBottom: "1px solid grey",
        }}
      />
      <Typography
        color="#5D5FEF"
        sx={{
          paddingTop: {
            md: "30px",
            xs: "10px",
          },
          paddingBottom: {
            md: "30px",
            xs: "10px",
          },
          textAlign: "center",
        }}
      >
        <h4>Kelas Lain Yang Mungkin Kamu Suka</h4>
      </Typography>
      <center>
        <Box mt="3vh" sx={{ width: "90%" }}>
          <Grid container spacing={3}>
            {detailOfACourseCat.slice(0, itemCount).map((item, index) => (
              <Grid key={item.id} item xs={6} md={4}>
                <Card sx={{ margin: "auto auto auto auto" }}>
                  <CardMedia
                    component="img"
                    sx={{
                      maxWidth: "100%",
                      objectFit: "cover",
                      minHeight: "100%",
                    }}
                    image={`data:image/jpeg;base64,${item.courseImage}`}
                    alt="kategori kelas"
                    style={{
                      borderRadius: "16px",
                    }}
                  />
                  <CardActionArea component={Link} to={`/course/${item.id}`}>
                    <CardContent>
                      <Typography
                        color="text.secondary"
                        sx={{
                          fontWeight: "600",
                          textAlign: "left",
                          fontSize: {
                            lg: "16px",
                            xs: "12px",
                          },
                          fontFamily: "Poppins",
                          paddingBottom: {
                            lg: "10px",
                            xs: "4px",
                          },
                        }}
                      >
                        {detailOfACategory.category}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          textAlign: "left",
                          fontSize: {
                            md: "18px",
                            xs: "14px",
                          },
                          fontFamily: "Poppins",
                        }}
                      >
                        {item.courseTitle}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          textAlign: "left",
                          fontSize: {
                            md: "18px",
                            xs: "14px",
                          },
                          fontFamily: "Poppins",
                          color: "#5D5FEF",
                        }}
                      >
                        IDR {numberFormat(item.price)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <IconButton
            size="medium"
            color="primary"
            onClick={() => {
              expandMore();
            }}
          >
            {expMore ? (
              <Box>
                <Typography
                  mb="-7px"
                  sx={{
                    fontSize: "12px",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                >
                  Lainnya
                </Typography>

                <ExpandMore />
              </Box>
            ) : (
              <Box>
                <ExpandLess />
                <Typography
                  mt="-13px"
                  sx={{
                    fontSize: "12px",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                >
                  Sembunyikan
                </Typography>
              </Box>
            )}
          </IconButton>
        </Box>
      </center>
      <CheckoutDialogs
        checkoutDialogState={checkoutDialogState}
        onClose={handleCheckoutClose}
        selectedOp={selectedOp}
      />
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alerts
            onClose={handleClose}
            severity={severityType}
            sx={{ width: "100%" }}
          >
            {err}
          </Alerts>
        </Snackbar>
      </Stack>
    </Grid>
  );
}

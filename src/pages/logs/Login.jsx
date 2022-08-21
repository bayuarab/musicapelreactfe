import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userApi from "../../api/baseApi";
import api from "../../api/userAPI";
import { useCart } from "../../context/CartProvider";
import { useComponentBarState } from "../../context/ComponentStateProvider";
import useAuth from "../../hooks/useAuth";

//---------------
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { auth, setAuth } = useAuth();
  const { setCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setComponentState } = useComponentBarState();
  const [open, setOpen] = React.useState(false);

  const Alerts = React.forwardRef(function Alerts(props, ref) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setComponentState({ paymentPageState: false, footerState: false });
  }, [setComponentState]);

  const fetchApiCart = async (userId) => {
    try {
      const response = await api.get(`/Cart/${userId}`);
      setCart(response.data);
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      if (err.response.data === "Not Found") console.log(err.response.status);
      console.log(err.response.headers);
    }
  };

  const addEmail = (event) => {
    setEmail(event.target.value);
  };

  const addPassword = (event) => {
    setPassword(event.target.value);
  };

  const goLogin = (event) => {
    event.preventDefault();

    const dataLogin = {
      email: email,
      password: password,
    };

    setEmail("");
    setPassword("");

    const fetchApi = async () => {
      try {
        const response = await userApi.post("/UserAuth/Login", dataLogin);
        const roles = response?.data?.userData?.roles;
        const userId = response?.data?.userData?.id;
        const nama = response?.data?.userData?.nama;
        const token = response?.data?.token;
        const userAuth = { roles, userId, nama, token, email: dataLogin.email };
        localStorage.setItem("userAuth", JSON.stringify(userAuth));
        setAuth({
          ...auth,
          nama,
          roles,
          userId,
          email: dataLogin.email,
          token,
        });
        if (roles === "student") fetchApiCart(userId);
        roles === "admin"
          ? navigate("/admin", { replace: true })
          : navigate(from, { replace: true });
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        setErr("Password dan Email tidak sesuai");
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      setOpen(true);
    };
    fetchApi();
  };

  return (
    <Container>
      <CssBaseline />
      <center>
        <Box>
          <Box
            sx={{
              width: {
                lg: "40vw",
                md: "50vw",
                sm: "60vw",
                xs: "80vw",
              },
            }}
          >
            <Box mt="10vh" sx={{ textAlign: "left" }}>
              <Typography
                mb="2.5vh"
                sx={{
                  fontSize: {
                    lg: "24px",
                    md: "23px",
                    xs: "18px",
                  },
                  fontFamily: "Poppins",
                }}
              >
                Selamat Datang Musikers!
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    lg: "16px",
                    md: "15px",
                    xs: "13px",
                  },
                  fontFamily: "Poppins",
                }}
              >
                Login dulu yuk
              </Typography>
            </Box>
            <Box mt="4vh">
              <form>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    id="txtEmail"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(event) => addEmail(event)}
                    InputProps={{
                      style: { fontFamily: "Poppins" },
                    }}
                    variant="outlined"
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      marginRight: "10px",
                    }}
                    InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    id="txtPassword"
                    value={password}
                    onChange={(event) => addPassword(event)}
                    InputProps={{
                      style: { fontFamily: "Poppins" },
                    }}
                    variant="outlined"
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      marginRight: "10px",
                    }}
                    InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                  />
                </FormControl>
                <Box style={{ textAlign: "right" }}>
                  <Link
                    to="/forget"
                    style={{
                      textDecoration: "None",
                      color: "black",
                      fontFamily: "Poppins",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          lg: "16px",
                          md: "15px",
                          xs: "13px",
                        },
                        fontFamily: "Poppins",
                      }}
                    >
                      Lupa kata sandi
                    </Typography>
                  </Link>
                </Box>
                <Box mt="2vh" sx={{ textAlign: "left" }}>
                  <Grid container>
                    <Grid item xs={3.5} md={3}>
                      <Button
                        disabled={
                          email === "" || password === "" ? true : false
                        }
                        onClick={(event) => goLogin(event)}
                        sx={{
                          borderRadius: "7px",
                          fontFamily: "Poppins",
                          backgroundColor: "#5D5FEF",
                          fontSize: {
                            lg: "16px",
                            md: "15px",
                            xs: "13px",
                          },
                          textTransform: "Capitalize",
                          width: "hug",
                          height: "hug",
                        }}
                        variant="contained"
                      >
                        Masuk
                      </Button>
                    </Grid>
                    <Grid item xs={8.5}>
                      <Typography
                        sx={{
                          fontSize: {
                            lg: "16px",
                            md: "15px",
                            xs: "13px",
                          },
                          fontFamily: "Poppins",
                        }}
                      >
                        Belum punya akun?
                        <Link
                          to="/registration"
                          sx={{
                            textAlign: "left",
                            fontSize: {
                              lg: "16px",
                              md: "15px",
                              xs: "13px",
                            },
                            fontFamily: "Poppins",
                          }}
                        >
                          Daftar disini
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </center>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alerts onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {err}
          </Alerts>
        </Snackbar>
      </Stack>
    </Container>
  );
}

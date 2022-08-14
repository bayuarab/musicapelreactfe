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
      console.log(response.data);
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
        const response = await api.post("/Login", dataLogin);
        console.log(response.data);
        const roles = response?.data?.roles;
        const userId = response?.data?.id;
        const nama = response?.data?.nama;
        setAuth({ ...auth, nama, roles, userId });
        if (roles === "student") fetchApiCart(userId);
        roles === "admin"
          ? // <Navigate to="/admin/kelas" replace={true} />
            navigate("/admin", { replace: true })
          : navigate(from, { replace: true });
        //navigate(from, { replace: true });
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
                  />
                </FormControl>
                <Box style={{ textAlign: "right" }}>
                  <Link
                    to="/forget"
                    style={{
                      fontSize: {
                        lg: "16px",
                        md: "15px",
                        xs: "13px",
                      },
                      textDecoration: "None",
                      color: "black",
                    }}
                  >
                    Lupa kata sandi
                  </Link>
                </Box>
                <Box mt="2vh" sx={{ textAlign: "left" }}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Button
                        disabled={
                          email === "" || password === "" ? true : false
                        }
                        onClick={(event) => goLogin(event)}
                        sx={{
                          borderRadius: "7px",
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
                    <Grid>
                      <Typography>
                        Belum punya akun?
                        <Link
                          to="/registration"
                          sx={{
                            textAlign: "left",
                            fontSize: {
                              lg: "16px",
                              md: "15px",
                              sm: "13px",
                              xs: "10px",
                            },
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

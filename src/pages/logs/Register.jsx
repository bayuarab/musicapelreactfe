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
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../../api/baseApi";
import { useComponentBarState } from "../../context/ComponentStateProvider";

const EMAIL_REGEX =
  /^([a-zA-Z0-9_]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

export default function Login() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [err, setErr] = useState("");
  const [regisState, setRegisState] = useState(false);
  const navigate = useNavigate();
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

  const addNama = (event) => {
    setNama(event.target.value);
  };

  const addEmail = (event) => {
    setEmail(event.target.value);
  };

  const addPassword = (event) => {
    setPassword(event.target.value);
  };

  const addRePassword = (event) => {
    setRePassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const vEmail = EMAIL_REGEX.test(email);
    const vPass = PWD_REGEX.test(password);

    if (!vEmail) {
      setErr("Email invalid");
      setOpen(true);
      return;
    }

    if (!vPass) {
      setErr(
        "Password harus terdiri dari 8-24 karakter dan harus terdapat uppercase, lowercase, serta angka"
      );
      setOpen(true);
      return;
    }

    if (password !== rePassword) {
      setErr("Password tidak sesuai");
      setOpen(true);
      return;
    }

    const dataClient = {
      nama: nama,
      email: email,
      password: password,
    };

    setNama("");
    setEmail("");
    setPassword("");
    setRePassword("");

    const fetchApi = async () => {
      try {
        const response = await api.post("/UserAuth/Register", dataClient);
        navigate("/Login", { replace: true });
        setRegisState(true);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        setErr(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      setOpen(true);
    };
    fetchApi();
  };

  return regisState ? (
    <Navigate to="/Login" replace />
  ) : (
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
                Yuk daftar terlebih dahulu akun kamu
              </Typography>
            </Box>
            <Box mt="4vh">
              <form>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    id="txtNama"
                    margin="normal"
                    required
                    fullWidth
                    label="Nama"
                    name="nama"
                    autoComplete="nama"
                    autoFocus
                    value={nama}
                    onChange={(event) => addNama(event)}
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
                    id="txtEmail"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    autoComplete="email"
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
                    value={password}
                    id="txtPassword"
                    onChange={(event) => addPassword(event)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="rePassword"
                    label="Konfirmasi Password"
                    type="password"
                    autoComplete="current-password"
                    id="txtRePassword"
                    value={rePassword}
                    onChange={(event) => addRePassword(event)}
                  />
                  <Box mt="2vh" sx={{ textAlign: "left", flexGrow: 1 }}>
                    <Grid container>
                      <Grid item xs={3.5} md={3}>
                        <Button
                          disabled={
                            nama === "" ||
                            email === "" ||
                            password === "" ||
                            rePassword === ""
                              ? true
                              : false
                          }
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
                          onClick={(event) => handleSubmit(event)}
                        >
                          Daftar
                        </Button>
                      </Grid>
                      <Grid item xs={8.5}>
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: {
                              lg: "16px",
                              md: "15px",
                              xs: "13px",
                            },
                          }}
                        >
                          Sudah punya akun?
                          <Link
                            to="/Login"
                            mt="1vh"
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
                            Login disini
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </FormControl>
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

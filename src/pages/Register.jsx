import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    nama: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const addNama = (event) => {
    setData((prevState) => {
      return { ...prevState, nama: event.target.value };
    });
  };

  const addEmail = (event) => {
    setData((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };

  const addPassword = (event) => {
    setData((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };

  const addRePassword = (event) => {
    setData((prevState) => {
      return { ...prevState, rePassword: event.target.value };
    });
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
            <Box mt="15vh" sx={{ textAlign: "left" }}>
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
                    onChange={(event) => addNama(event)}
                  />
                </FormControl>
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
                    onChange={(event) => addEmail(event)}
                  />
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    id="txtPassword"
                    onChange={(event) => addPassword(event)}
                  />
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="rePassword"
                    label="Konfirmasi Password"
                    type="password"
                    autoComplete="current-password"
                    id="txtRePassword"
                    onChange={(event) => addRePassword(event)}
                  />
                </FormControl>
                <Box mb="2vh" sx={{ textAlign: "left", flexGrow: 1 }}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Button
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
                        onClick={() => console.log(data)}
                      >
                        Daftar
                      </Button>
                    </Grid>
                    <Grid item>
                      <Link
                        to="/login"
                        mt="1vh"
                        sx={{
                          textAlign: "left",
                          fontSize: {
                            lg: "16px",
                            md: "15px",
                            xs: "13px",
                          },
                        }}
                      >
                        Sudah punya akun? Login disini
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Box>
          </Box>
          <Box>
            <Outlet />
          </Box>
        </Box>
      </center>
    </Container>
  );
}

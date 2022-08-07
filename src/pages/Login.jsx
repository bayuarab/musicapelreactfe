import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import api from "../api/userAPI";
import useAuth from "../hooks/useAuth";

//---------------
export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [data, setData] = useState({
    email: "",
    password: "",
  });

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

  const goLogin = () => {
    console.log(data);
    const fetchApi = async () => {
      try {
        const response = await api.post("/Login", { username: data.email });
        console.log(response.data);
        const roles = response?.data?.roles;
        setAuth({ email: data.email, roles });
        navigate(from, { replace: true });
        roles === "admin" ? (
          <Navigate to="/admin/kelas" state={{ from: location }} replace />
        ) : (
          navigate(from, { replace: true })
        );
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
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
                <Link
                  to="forget"
                  style={{
                    itemAlign: "right",
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
                <Box mb="2vh" sx={{ textAlign: "left" }}>
                  <Button
                    onClick={() => goLogin()}
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
                </Box>
              </form>
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
                Belum punya akun? Daftar disini
              </Link>
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
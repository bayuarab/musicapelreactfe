import { Box, Grid, styled } from "@mui/material/";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/courseCatAPI";
import ig from "../assets/footer/ig.svg";
import mail from "../assets/footer/mail.svg";
import phone from "../assets/footer/phone.svg";
import telegram from "../assets/footer/telegram.svg";
import youtube from "../assets/footer/youtube.svg";
import { useComponentBarState } from "../context/ComponentStateProvider";
import useAuth from "../hooks/useAuth";
// import ButtonBase from "@mui/material/ButtonBase";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const classCatDef = [
  "Drum",
  "Piano",
  "Gitar",
  "Bass",
  "Biola",
  "Menyanyi",
  "Flute",
  "Sexophone",
];

export default function Footer() {
  const [dataClass, setDataClass] = useState(classCatDef);
  const { componentState } = useComponentBarState();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await api.get("/");
        console.log(response.data);
        setDataClass(response.data);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    };
    fetchApi();
  }, []);

  const classCat = dataClass;

  return componentState?.footerState && auth?.roles !== "admin" ? (
    <Box
      sx={{
        backgroundColor: "#F2C94C",
        width: "100%",
        height: {
          lg: "32%",
          md: "28%",
          sm: "17%",
          xs: "18%",
        },
        display: "flex",
        flexDirection: "column",
        clear: "both",
      }}
    >
      <center>
        <Box mt="2vh" sx={{ flexGrow: 1, width: "90%", textAlign: "justify" }}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Box
                mt={{
                  lg: "2%",
                  md: "2%",
                  sm: "1%",
                  xs: "1%",
                }}
                mb="0.5vh"
              >
                <Typography
                  sx={{
                    fontsize: {
                      lg: "16px",
                      md: "15px",
                      sm: "13px",
                      xs: "7px",
                    },
                    fontWeight: "500",
                  }}
                >
                  Tentang
                </Typography>
              </Box>
              <Box sx={{ height: "hug" }}>
                <Typography
                  sx={{
                    fontSize: {
                      lg: "14px",
                      md: "13px",
                      sm: "11px",
                      xs: "6px",
                    },
                  }}
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                mt={{
                  lg: "2%",
                  md: "2%",
                  sm: "1%",
                  xs: "1%",
                }}
                mb="0.5vh"
                ml="5vw"
              >
                <Typography
                  sx={{
                    fontsize: {
                      lg: "16px",
                      md: "15px",
                      sm: "13px",
                      xs: "7px",
                    },
                    fontWeight: "500",
                  }}
                >
                  Produk
                </Typography>
              </Box>
              <center>
                <Box sx={{ width: "60%" }}>
                  <Grid container>
                    {classCat.map((item) => (
                      <Grid key={item.id} item xs={5}>
                        <Typography
                          sx={{
                            fontSize: {
                              lg: "12px",
                              md: "12px",
                              sm: "11px",
                              xs: "6px",
                            },
                            textAlign: "left",
                          }}
                        >
                          <Link
                            to="detail"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <li>{item.category}</li>
                          </Link>
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </center>
            </Grid>
            <Grid item xs={4}>
              <Box
                mt={{
                  lg: "2%",
                  md: "2%",
                  sm: "1%",
                  xs: "1%",
                }}
                mb="0.5vh"
              >
                <Typography
                  sx={{
                    fontsize: {
                      lg: "16px",
                      md: "15px",
                      sm: "13px",
                      xs: "7px",
                    },
                    fontWeight: "500",
                  }}
                >
                  Alamat
                </Typography>
              </Box>
              <Box style={{ height: "hug" }}>
                <Typography
                  sx={{
                    fontSize: {
                      lg: "14px",
                      md: "13px",
                      sm: "11px",
                      xs: "6px",
                    },
                  }}
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque.
                </Typography>
              </Box>
              <Box
                mt={{
                  lg: "2vh",
                  md: "2vh",
                  sm: "1vh",
                  xs: "1vh",
                }}
                mb="0.5vh"
              >
                <Typography
                  sx={{
                    fontsize: {
                      lg: "16px",
                      md: "15px",
                      sm: "13px",
                      xs: "7px",
                    },
                    fontWeight: "500",
                  }}
                >
                  Kontak
                </Typography>
              </Box>
              <Box mb="2vh">
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={2}>
                    <Link to="kontak">
                      <Img alt="complex" src={phone} />
                    </Link>
                  </Grid>
                  <Grid item xs={2}>
                    <Link to="kontak">
                      <Img alt="complex" src={ig} />
                    </Link>
                  </Grid>
                  <Grid item xs={2}>
                    <Link to="kontak">
                      <Img alt="complex" src={youtube} />
                    </Link>
                  </Grid>
                  <Grid item xs={2}>
                    <Link to="kontak">
                      <Img alt="complex" src={telegram} />
                    </Link>
                  </Grid>
                  <Grid item xs={2}>
                    <Link to="kontak">
                      <Img alt="complex" src={mail} />
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </center>
    </Box>
  ) : (
    <></>
  );
}

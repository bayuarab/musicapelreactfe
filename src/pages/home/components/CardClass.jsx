import { Box, CardMedia, Grid, Typography } from "@mui/material/";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/courseAPI";
import numberFormat from "../../../utilities/NumbeFormat";

export default function CardClass() {
  const [dataClass, setDataClass] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await api.get("/LandingPage");
        console.log(response.data);
        const limit = response.data.filter((data, index) => index < 6);
        setDataClass(limit);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    };
    fetchApi();
  }, [setDataClass]);

  const gridItems = dataClass;

  return (
    <Box
      sx={{
        flexGrow: 1,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={1.5}>
        {gridItems.map((item) => (
          <Grid key={item.id} item lg={4} xs={6}>
            <Box
              sx={{
                minHeight: {
                  lg: "93%",
                  md: "92%",
                  sm: "90%",
                  xs: "88%",
                },
                maxWidth: "88%",
                marginBottom: "35px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box textAlign={"left"}>
                <Link to={`/course/${item.id}`} sx={{ border: "solid black" }}>
                  <CardMedia
                    component="img"
                    sx={{
                      objectFit: "cover",
                      maxWidth: "100%",
                      // minHeight: {
                      //   lg: "280px",
                      // },
                      maxHeight: "280px",
                      borderRadius: "20px",
                    }}
                    image={`data:image/jpeg;base64,${item.courseImage}`}
                  />
                </Link>
                {/* <Typography
                  sx={{
                    textAlign: "left",
                    paddingLeft: "10px",
                  }}
                > */}
                <Box
                  sx={{
                    paddingTop: "1.2vh",
                    marginBottom: "4px",
                    paddingLeft: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        lg: "18px",
                        md: "14px",
                        sm: "12px",
                        xs: "10px",
                      },
                      fontFamily: "Poppins",
                    }}
                  >
                    {item.category}
                  </Typography>
                </Box>
                <Box sx={{ width: "90%", height: "hug", paddingLeft: "8px" }}>
                  <Typography
                    sx={{
                      fontSize: {
                        lg: "20px",
                        md: "16px",
                        sm: "14px",
                        xs: "12px",
                      },
                      fontWeight: "600",
                      fontFamily: "Poppins",
                    }}
                  >
                    {item.courseTitle}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  textAlign: "left",
                  paddingLeft: "8px",
                  paddingBottom: { md: "15px", xs: "7px" },
                }}
              >
                <Typography
                  mt="4vh"
                  sx={{
                    fontSize: {
                      lg: "20px",
                      md: "16px",
                      sm: "14px",
                      xs: "12px",
                    },
                    fontWeight: "600",
                    color: "#5D5FEF",
                    fontFamily: "Poppins",
                  }}
                >
                  IDR {numberFormat(item.price)}
                </Typography>
              </Box>
              {/* </Typography> */}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

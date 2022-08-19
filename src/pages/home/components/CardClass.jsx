import { Box, CardMedia, Grid, Typography } from "@mui/material/";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/courseAPI";
import drum from "../../../assets/drum.jpg";
import numberFormat from "../../../utilities/NumbeFormat";

const gridItemsDef = [
  {
    categories: "Drum",
    class: "Kursus Drummer Special Coach (Eno Netral)",
    price: "IDR 8.500.000",
    image: drum,
  },
  {
    categories: "Gitar",
    class: "[Beginner] Guitar class for kids",
    price: "IDR 1.600.000",
    image: drum,
  },
  {
    categories: "Biola",
    class: "Biola Mid-Level Course",
    price: "IDR 3.000.000",
    image: drum,
  },
  {
    categories: "Drum",
    class: "Drummer for kids (Level Basic/1)",
    price: "IDR 2.200.000",
    image: drum,
  },
  {
    categories: "Piano",
    class: "Kursu Piano : From Zero to Pro (Full Package)",
    price: "IDR 11.650.000",
    image: drum,
  },
  {
    categories: "Sexophone",
    class: "Expert Level Saxophone",
    price: "IDR 7.350.000",
    image: drum,
  },
];

export default function CardClass() {
  const [dataClass, setDataClass] = useState(gridItemsDef);

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

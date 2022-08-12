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
      <Grid container spacing={2}>
        {gridItems.map((item) => (
          <Grid key={item.id} item lg={4} xs={6}>
            <Box sx={{ maxWidth: "90%", marginBottom: "50px" }}>
              <Link to={`/course/${item.id}`} sx={{ border: "solid black" }}>
                <CardMedia
                  component="img"
                  style={{
                    objectFit: "cover",
                    maxWidth: "100%",
                    maxHeight: "280px",
                    borderRadius: "20px",
                    // border: "solid 1px grey",
                  }}
                  image={item.courseImage}
                />
              </Link>
              <Typography sx={{ textAlign: "left" }}>
                <Box sx={{ paddingTop: "1vh" }}>
                  <Typography
                    sx={{
                      fontSize: {
                        lg: "16px",
                        md: "14px",
                        sm: "12px",
                        xs: "10px",
                      },
                    }}
                  >
                    {item.category}
                  </Typography>
                </Box>
                <Box sx={{ width: "90%", height: "hug" }}>
                  <Typography
                    sx={{
                      fontSize: {
                        lg: "18px",
                        md: "16px",
                        sm: "14px",
                        xs: "12px",
                      },
                      fontWeight: "bold",
                    }}
                  >
                    {item.courseTitle}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    mt="2vh"
                    sx={{
                      fontSize: {
                        lg: "18px",
                        md: "16px",
                        sm: "14px",
                        xs: "12px",
                      },
                      fontWeight: "bold",
                      color: "blue",
                    }}
                  >
                    IDR {numberFormat(item.price)}
                  </Typography>
                </Box>
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

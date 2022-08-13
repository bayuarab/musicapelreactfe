import { Box, CardMedia, Grid, Typography } from "@mui/material/";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/courseCatAPI";
import drum from "../../../assets/drum.jpg";

const gridClassItemsDef = [
  {
    categories: "Drum",
    image: drum,
  },
  {
    categories: "Piano",
    image: drum,
  },
  {
    categories: "Gitar",
    image: drum,
  },
  {
    categories: "Bass",
    image: drum,
  },
  {
    categories: "Biola",
    image: drum,
  },
  {
    categories: "Menyanyi",
    image: drum,
  },
  {
    categories: "Flute",
    image: drum,
  },
  {
    categories: "Sexophone",
    image: drum,
  },
];

export default function GridClassCat() {
  const [dataClass, setDataClass] = useState(gridClassItemsDef);

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

  const gridClassItems = dataClass;

  return (
    <Box
      mt={{
        md: "6vh",
        xs: "4vh",
      }}
      sx={{ flexGrow: 1 }}
    >
      <Grid container spacing={2}>
        {gridClassItems.map((item) => (
          <Grid key={item.id} item xs={3}>
            <Link to={`/category/${item.id}`}>
              <CardMedia
                component="img"
                sx={{
                  objectFit: "cover",
                  minHeight: {
                    lg: "120px",
                  },
                  maxHeight: {
                    lg: "120px",
                    md: "50%",
                    sm: "50%",
                    xs: "50%",
                  },
                  maxWidth: "50%",
                  borderRadius: "20px",
                }}
                alt="img"
                image={`data:image/jpeg;base64,${item.image}`}
              />
            </Link>
            <Typography
              style={{
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              <Box
                mb={{
                  md: "6vh",
                  xs: "4vh",
                }}
                mt={"5%"}
              >
                <Typography
                  sx={{
                    fontSize: {
                      lg: "24px",
                      md: "22px",
                      sm: "16px",
                      xs: "10px",
                    },
                  }}
                >
                  {item.category}
                </Typography>
              </Box>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

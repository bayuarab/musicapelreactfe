import { AspectRatio } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Link, useParams } from "react-router-dom";
import numberFormat from "../../utilities/NumbeFormat";

//#F2C94C
export default function DetailCourse() {
  const [dataClass, setDataClass] = useState("");
  let params = useParams();

  const pageResponsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
      partialVisibilityGutter: 30
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30
    }
  };

  /* useStates dan metode-metode untuk keperluan GET detail dari sebuah produk */
  const [detailOfACategory, setDetailOfACategory] = useState([]);
  const getdetailOfACategory = async (url) => {
    console.log("params", url);
    await axios
      .get(`https://localhost:7132/api/CourseCategory/${url}`, {
        url,
      })
      .then((res) => {
        if (res.status === 200) {
          setDetailOfACategory(res.data);
        }
      })
      .catch((err) => { });
    console.log(params);
  };
  useEffect(() => {
    getdetailOfACategory(params.categoryid);
  }, [params]);

  /* useStates untuk keperluan GET detail dari sebuah produk */

  let paramss = useParams();
  /* useStates dan metode-metode untuk keperluan GET detail dari sebuah produk */
  const [detailOfACourse, setDetailOfACourse] = useState([]);
  const getdetailOfACourse = async (url) => {
    console.log("paramss", url);
    await axios
      .get(`https://localhost:7132/api/Course/categoryId/${url}`, {
        url,
      })
      .then((res) => {
        if (res.status === 200) {
          setDetailOfACourse(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => { });
    console.log(paramss);
  };
  useEffect(() => {
    getdetailOfACourse(paramss.categoryid);
  }, [paramss]);

  /* useStates untuk keperluan GET detail dari sebuah produk */

  // const gridClassItems = dataClass;
  const detailData = detailOfACategory;
  return (
    <Grid>
      <React.Fragment key={detailData.id}>
        <Box
          bottom="0px"
          style={{
            height: "400px",
          }}
          key={detailData.id}
        >
          <img
            src={`data:image/jpeg;base64,${detailData.image}`}
            width="100%"
            alt={detailData.image}
            height="400px"
            objectFit="cover"
          ></img>
        </Box>
        <Typography sx={{ margin: 'auto 2% auto 2%' }}>
          <h4>{detailData.category}</h4>
        </Typography >
        <Typography sx={{ margin: 'auto 2% auto 2%' }}>{detailData.desc}</Typography>

        <div style={{ height: "0px", border: "1px solid grey" }} />
        <Typography color="blue" sx={{ textAlign: "center" }}>
          <h4>Kelas Yang Tersedia</h4>
        </Typography>

        <div >
          
        <Grid container spacing={3} >
          {detailOfACourse.map((item, index) => (
            <Grid key={item.id} item xs={4} className="carouselCategory">
              <Card sx={{ maxWidth: 345, margin: 'auto auto auto auto' }} >
                
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.courseImage}
                    alt="kategori kelas"
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                  <CardActionArea component={Link} to={`/course/${item.id}`}>
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom>
                        {item.courseTitle}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {item.courseDesc}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Typography color="blue">
                        IDR {numberFormat(item.price)}
                      </Typography>
                    </CardActions>
                  </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        </div>
      </React.Fragment>
    </Grid>
  );
}

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
import numberFormat from "../components/NumbeFormat";
import { getKategoriKelas, getMusic } from "../JSON Data/Data";
let kategoris = getKategoriKelas();
let musics = getMusic();

//#F2C94C
export default function DetailCourse() {
  const [dataClass, setDataClass] = useState("");
  //     const { invoiceID } = useParams();
  //     const [detailData, setDetailData] = useState([]);

  //   useEffect(() => {
  //     const fetchApi = async () => {
  //       try {
  //         const response = await axios.get(`https://localhost:7132/api/CourseCategory/${invoiceID}`);
  //         console.log(response.data);
  //         setDetailData(response.data);
  //       } catch (err) {
  //         !err.response
  //           ? console.log(`Error: ${err.message}`)
  //           : console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       }
  //     };

  //     fetchApi();
  //   }, [invoiceID]);
  let params = useParams();

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
      .catch((err) => {});
    console.log(params);
  };
  useEffect(() => {
    getdetailOfACategory(params.categoryid);
  }, [params]);

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
            src={`${detailData.image}`}
            width="100%"
            alt={detailData.image}
            height="400px"
          ></img>
        </Box>
        <Typography>
          <h4>{detailData.category}</h4>
        </Typography>
        <Typography>{detailData.desc}</Typography>

        <div style={{ height: "0px", border: "1px solid grey" }} />
        <Typography color="blue" sx={{ textAlign: "center" }}>
          <h4>Kelas Yang Tersedia</h4>
        </Typography>
        <Box
          className="kategoriKelas"
          style={{
            flex: "1",
          }}
        >
          {kategoris.map((item, i) => (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt="kategori kelas"
                style={{
                  borderRadius: "10px",
                }}
              />
              <CardActionArea component={Link} to={`/detail/${item.id}`}>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Typography color="blue">
                    IDR {numberFormat(item.price)}
                  </Typography>
                </CardActions>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </React.Fragment>
    </Grid>
  );
}

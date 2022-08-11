import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Link, useParams } from "react-router-dom";
import numberFormat from "../../utilities/NumbeFormat";
import useAuth from "../../hooks/useAuth";

//#F2C94C
export default function CategoryCourse() {
  const [age, setAge] = React.useState("");
  const [err, setErr] = useState("");

  let params = useParams();

  /* useStates dan metode-metode untuk keperluan GET detail dari sebuah produk */
  const [detailOfACourse, setDetailOfACourse] = useState([]);
  const getdetailOfACourse = async (url) => {
    await axios
      .get(`https://localhost:7132/api/Course/${url}`, {
        url,
      })
      .then((res) => {
        if (res.status === 200) {
          setDetailOfACourse(res.data);
        }
      })
      .catch((err) => {});
    console.log(params);
  };

  useEffect(
    () => {
      getdetailOfACourse(params.courseid);
    },
    [params],
    console.log(params.courseid)
  );

  /* useStates untuk keperluan GET detail dari sebuah produk */

  let paramss = useParams();
   /* useStates dan metode-metode untuk keperluan GET detail dari sebuah produk */
   const [detailOfACourseCaategory, setDetailOfACourseCategory] = useState([]);
   const getdetailOfACourseCategory = async (url) => {
     console.log("paramss", url);
     await axios
       .get(`https://localhost:7132/api/Course/categoryId/${url}`, {
         url,
       })
       .then((res) => {
         if (res.status === 200) {
          setDetailOfACourseCategory([res.data]);
           console.log(res.data)
         }
       })
       .catch((err) => {});
     console.log(paramss);
     
   };
   useEffect(() => {
    getdetailOfACourseCategory(paramss = detailOfACourse.courseCategoryId);
   }, [paramss]);
 
   //console.log("categoryid",detailOfACourse.categoryId)
   /* useStates untuk keperluan GET detail dari sebuah produk */

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const { auth, setAuth } = useAuth();
   const UserID = auth?.userId;

   /* Method to POST new Brand Item */
   const postCart = () => {
   const postDataa = {userId: UserID, courseId: detailOfACourse.id};
    console.log(postDataa)
    axios.post('https://localhost:7132/api/Cart', postDataa).then((res) => {
        if (res.status === 200) {
            console.log(res.status)
            console.log(res.data)
        }
    }).catch((err) => {console.log(err.response.data); setErr(err.response.data);})
    }
    /* Method to POST new Brand Item */
  return (
    <Grid>
      <Box display="flex">
        <Grid
          width="45%"
          sx={{
            margin: "1% 0 0 5%",
          }}
        >
          <Box
            bottom="0px"
            style={{
              height: "400px",
            }}
          >
            <img
              src={`${detailOfACourse.courseImage}`}
              width="75%"
              alt={detailOfACourse.courseImage}
              style={{
                right: "0px",
                borderRadius: "20px",
              }}
            ></img>
          </Box>
        </Grid>
        <Grid
          width="65%"
          sx={{
            margin: "1% 0 0 0",
          }}
        >
          <Typography color="text.secondary">{detailOfACourse.name}</Typography>
          <Typography variant="body2" fontWeight="bold">
            <h1>{detailOfACourse.courseTitle}</h1>
          </Typography>
          <Typography color="blue">
            <h1>IDR {numberFormat(detailOfACourse.price)}</h1>
          </Typography>

          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            defaultValue={0}
            onChange={handleChange}
            size="small"
          >
            <MenuItem value={0}>pilih jadwal kelas</MenuItem>
            <MenuItem value="1 july 2022">1 july 2022</MenuItem>
            <MenuItem value={"30 july 2022"}>30 july 2022</MenuItem>
            <MenuItem value={"17 agustus 2022"}>17 agustus 2022</MenuItem>
            <MenuItem value={"9 september 2022"}>9 september 2022</MenuItem>
          </Select>

          <Box
            display="flex"
            sx={{
              margin: "3% 0 0 0",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                margin: "0 3% 0 0",
              }}
              onClick={async (e) => { await e.preventDefault(); await postCart(); }}
            >
              Masukan Keranjang
            </Button>
            <Button variant="contained" 
            onClick={async (e) => { await e.preventDefault(); await postCart(); }}
            >Beli Sekarang</Button>
            
          </Box>
          <Typography color="red">{err}</Typography>
        </Grid>
      </Box>
      <Typography>{detailOfACourse.description}</Typography>

      <div style={{ height: "0px", border: "1px solid grey" }} />
      <Typography color="blue" sx={{ textAlign: "center" }}>
        <h4>Kelas Lain Yang Mungkin Kamu Suka</h4>
      </Typography>
      <Box
        className="kategoriKelas"
        style={{
          flex: "1",
        }}
      >
        {detailOfACourseCaategory.filter((items)=>items.id != detailOfACourseCaategory.id ).map((item, i) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={item.courseImage}
              alt="kategori kelas"
              style={{
                borderRadius: "10px",
              }}
            />
            <CardActionArea component={Link} to={`/detail/${item.id}`}>
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
        ))}
      </Box>
    </Grid>
  );
}

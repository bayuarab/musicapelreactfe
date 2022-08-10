import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, CardActionArea } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import numberFormat from "../components/NumbeFormat";
import { getKategoriKelas, getMusic } from "../JSON Data/Data";
import { useState, useEffect } from "react";
import api from "../api/courseCatAPI";
import Carousel from 'react-multi-carousel';
import axios from "axios";
let kategoris = getKategoriKelas();
let musics = getMusic();

//#F2C94C
export default function DetailCourse() {
    const [dataClass, setDataClass] = useState("");
    let params = useParams();

        /* useStates dan metode-metode untuk keperluan GET detail dari sebuah produk */
        const [detailOfACategory, setDetailOfACategory] = useState([]);
        const getdetailOfACategory = async () => {
            await axios.get('https://localhost:7132/api/CourseCategory', {params: { id: params.id },
        }).then((res) => { if (res.status === 200) { setDetailOfACategory(res.data[0]); } }).catch((err) => { })
        console.log(params)}
        useEffect(() => { getdetailOfACategory(); }, [params])
        /* useStates untuk keperluan GET detail dari sebuah produk */

	const gridClassItems = dataClass;
    return (
        <Grid>

            <Box bottom='0px' style={{
                height: '400px'
            }}>
                <img src={`${detailOfACategory.image}`}
                                    width="100%" alt={detailOfACategory.image} height='400px'>
                                </img>
            </Box>
            <Typography>
                <h4>{detailOfACategory.category}</h4>
            </Typography>
            <Typography>
                {detailOfACategory.desc}
            </Typography>


            <div style={{ height: '0px', border: '1px solid grey' }} />
            <Typography color='blue' sx={{ textAlign: 'center' }}>
                <h4>Kelas Yang Tersedia</h4>
            </Typography>
            <Box className="kategoriKelas" style={{
                flex: '1'
            }}>
                {kategoris.map((item, i) => (

                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={item.image}
                            alt="kategori kelas"
                            style={{
                                borderRadius: '10px'
                            }}
                        />
                        <CardActionArea component={Link} to={`/detail/${item.id}`}>
                            <CardContent>
                                <Typography color="text.secondary" gutterBottom>{item.name}

                                </Typography>
                                <Typography variant="body2" fontWeight='bold'>
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Typography color='blue'>
                                    IDR {numberFormat(item.price)}
                                </Typography>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Grid>
    )
}
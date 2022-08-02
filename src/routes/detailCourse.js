import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, CardActionArea } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import numberFormat from "../components/NumbeFormat";
import { getKategoriKelas, getMusic } from "../JSON Data/Data";
import Carousel from 'react-multi-carousel';
let kategoris = getKategoriKelas();
let musics = getMusic();

//#F2C94C
export default function DetailCourse() {
    return (
        <Grid>

            <Box bottom='0px' style={{
                height: '400px'
            }}>
                <img src={`${musics[0].image}`}
                                    width="100%" alt={musics[0].image} height='400px'>
                                </img>
            </Box>
            <Typography>
                <h4>{musics[0].name}</h4>
            </Typography>
            <Typography>
                {musics[0].deskripsi}
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
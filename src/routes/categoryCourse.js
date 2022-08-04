import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, CardActionArea, FormControl, Select, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import numberFormat from "../components/NumbeFormat";
import { getKategoriKelas, getMusic } from "../JSON Data/Data";
import Carousel from 'react-multi-carousel';
let kategoris = getKategoriKelas();
let musics = getMusic();

//#F2C94C
export default function CategoryCourse() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Grid>
            <Box display='flex'>
                <Grid width='45%' sx={{
                        margin:'1% 0 0 5%'
                    }}>
                    <Box bottom='0px' style={{
                        height: '400px'
                    }}>
                        <img src={`${musics[0].image}`}
                            width="75%" alt={musics[0].image}
                            style={{
                                right: '0px',
                                borderRadius: '20px'
                            }}>
                        </img>
                    </Box>
                </Grid>
                <Grid width='65%' sx={{
                        margin:'1% 0 0 0'
                    }}>
                    <Typography color="text.secondary">
                        {musics[0].name}
                    </Typography>
                    <Typography variant="body2" fontWeight='bold'>
                        <h1>{kategoris[0].name}</h1>
                    </Typography>
                    <Typography color='blue'>
                        <h1>IDR {numberFormat(kategoris[0].price)}</h1>
                    </Typography>


                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        defaultValue={0}
                        onChange={handleChange}
                        size='small'
                        
                    >
                        <MenuItem value={0}>
                            pilih jadwal kelas
                        </MenuItem>
                        <MenuItem value="1 july 2022">
                            1 july 2022
                        </MenuItem>
                        <MenuItem value={'30 july 2022'}>30 july 2022</MenuItem>
                        <MenuItem value={'17 agustus 2022'}>17 agustus 2022</MenuItem>
                        <MenuItem value={'9 september 2022'}>9 september 2022</MenuItem>
                    </Select>

                    <Box display='flex' sx={{
                        margin:'3% 0 0 0'
                    }} >
                        <Button  variant="outlined" sx={{
                        margin:'0 3% 0 0'
                    }}>Masukan Keranjang</Button>
                        <Button variant="contained" >Beli Sekarang</Button>
                    </Box>

                </Grid>
            </Box>
            <Typography>
                {kategoris[0].description}
            </Typography>


            <div style={{ height: '0px', border: '1px solid grey' }} />
            <Typography color='blue' sx={{ textAlign: 'center' }}>
                <h4>Kelas Lain Yang Mungkin Kamu Suka</h4>
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
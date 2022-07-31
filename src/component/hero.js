import { Box, Typography,Grid } from "@mui/material";
import React from "react";
import Image from '../JSON Data/hero.jpg'
export default function Hero(){
    const style={
        boxContainer:{
            width: '100%',
            height: '400px',
            backgroundImage: `url(${Image})`,
            textAlign:'center',
            paddingTop:'100px',
            

        }
    }
    return(
        <Box style ={style.boxContainer}>
            <Typography style={{color:'white'}}>
                <h1>HI Musikers Gabung Yuk di Apel Music</h1>
                <h4>Banyak Kelas Keren Yang bisa menunjang bakat bermusik kamu</h4>
            </Typography>
            <Grid></Grid>
        </Box>
    )
}
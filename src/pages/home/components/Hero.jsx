import {
  default as Box,
  default as Typography,
} from "@mui/material/Typography";
import React from "react";
import herobg from "../../../assets/rm383-14.png";
import Fact from "./Fact";

const LandingPage = () => {
  return (
    <Box
      className="hero"
      sx={{
        backgroundImage: `url(${herobg})`,
        backgroundSize: "cover",
        color: "gold",
        width: "100%",
      }}
    >
      <Box
        className="heroTitle"
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          mt={{
            lg: "4%",
            md: "3%",
            xs: "2%",
          }}
          sx={{
            fontSize: {
              lg: "32px",
              md: "28px",
              sm: "24px",
              xs: "17px",
            },
            textAlign: "center",
            fontFamily: "Poppins",
            color: "white",
            fontWeight: "600",
          }}
        >
          Hi Musiker! Gabung yuk di Apel Music
        </Typography>
        <Typography
          mt={{
            md: "2%",
            xs: "1%",
          }}
          sx={{
            fontSize: {
              lg: "24px",
              md: "22px",
              sm: "18px",
              xs: "12px",
            },
            textAlign: "center",
            fontFamily: "Poppins",
            color: "white",
            fontWeight: "400",
          }}
        >
          Banyak kelas keren yang bisa menunjang bakat bermusik kamu
        </Typography>
      </Box>
      <Box
        mt={{
          lg: "4%",
          md: "3%",
          xs: "2%",
        }}
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Fact />
      </Box>
    </Box>
  );
};

export default LandingPage;

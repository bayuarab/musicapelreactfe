import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import {
  default as Box,
  default as Typography,
} from "@mui/material/Typography";
import React from "react";
import GridClassCat from "./GridClassCat";

const ClassCategories = () => {
  return (
    <Container maxWidth="100%" style={{ backgroundColor: "#A5A6F618" }}>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          color: "black",
        }}
      >
        <Box
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            mt="9vh"
            mb="3vh"
            sx={{
              fontSize: {
                lg: "24px",
                md: "22px",
                sm: "18px",
                xs: "16px",
              },
              color: "#5D5FEF",
              fontWeight: "600",
              fontFamily: "Poppins",
            }}
          >
            Pilih kelas impian kamu
          </Typography>
        </Box>
        <center>
          <Box
            style={{
              width: "80%",
              display: "flex",
            }}
          >
            <GridClassCat />
          </Box>
        </center>
      </Box>
    </Container>
  );
};
export default ClassCategories;

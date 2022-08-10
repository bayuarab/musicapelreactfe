import { ArrowForward, Home } from "@mui/icons-material";
import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PaymentSuccess from "../../assets/Purchase Success.png";
import Logo from "../../components/Logo";

const SuccessPayment = () => {
  const DialogButton = styled(Button)(({ theme }) => ({
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    textTransform: "Capitalize",
    paddingTop: "10px",
    paddingBottom: "10px",
  }));

  const LogoContainer = styled(Box)({
    backgroundColor: "white",
    alignContent: "center",
    alignSelf: "center",
    marginTop: "-2px",
    marginBottom: "-2px",
    marginLeft: "-2px",
    paddingLeft: "7px",
    borderRadius: "11px",
  });

  const LogoDiv = styled(Box)({
    display: "flex",
    alignItems: "center",
    paddingTop: "5px",
    paddingBottom: "5px",
  });

  return (
    <Box sx={{ paddingTop: "10px" }}>
      <Logo />
      <Box
        sx={{
          display: "flex",
          minHeight: "50vh",
          width: "100%",
          flexDirection: "column",
          gap: "35px",
          alignItems: "center",
          paddingTop: "20vh",
        }}
      >
        <LogoContainer>
          <LogoDiv>
            <img
              style={{ alignSelf: "center" }}
              src={PaymentSuccess}
              alt={"Payment Success"}
              loading="lazy"
            />
          </LogoDiv>
        </LogoContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "#5D5FEF",
              fontSize: "24px",
              fontFamilyL: "Poppins",
              fontWeight: "500",
            }}
          >
            Pembelian Berhasil
          </Typography>
          <Typography
            sx={{
              color: "#4F4F4F",
              fontSize: "16px",
              fontFamilyL: "Poppins",
              fontWeight: "400",
            }}
          >
            Yey! Kamu telah berhasil membeli kursus di Apel Music
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Link style={{ textDecoration: "none" }} to="/">
            <DialogButton variant="outlined" startIcon={<Home />}>
              Ke Beranda
            </DialogButton>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/my-invoice">
            <DialogButton variant="contained" startIcon={<ArrowForward />}>
              Buka Invoice
            </DialogButton>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SuccessPayment;

import { ArrowForward, Home } from "@mui/icons-material";
import {
  Box,
  Button,
  createTheme,
  styled,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/userAPI";
import PaymentSuccess from "../../assets/Purchase Success.png";
import Logo from "../../components/Logo";
import { useCart } from "../../context/CartProvider";
import { useComponentBarState } from "../../context/ComponentStateProvider";
import useAuth from "../../hooks/useAuth";
import { LogoDiv } from "../../styles/CheckoutDialogStyle";

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            fontFamily: "Poppins",
            fontSize: "16px",
            fontWeight: "600",
            paddingTop: "10px",
            paddingBottom: "10px",
            textTransform: "Capitalize",
            borderRadius: "8px",
            color: "#5D5FEF",
          },
        },
        {
          props: { variant: "contained" },
          style: {
            fontFamily: "Poppins",
            fontSize: "16px",
            fontWeight: "600",
            paddingTop: "10px",
            paddingBottom: "10px",
            textTransform: "Capitalize",
            borderRadius: "8px",
            backgroundColor: "#5D5FEF",
          },
        },
      ],
    },
  },
});

const SuccessPayment = () => {
  const { auth } = useAuth();
  const { setCart } = useCart();
  const { setComponentState } = useComponentBarState();
  const token = auth?.token;
  const UserId = auth?.userId;

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

  useEffect(() => {
    setComponentState({ paymentPageState: true, footerState: false });
  }, [setComponentState]);

  useEffect(() => {
    const fetchApiCart = async () => {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const response = await api.get(`/Cart/${UserId}`, config);
        setCart(response.data);
      } catch (err) {
        setCart([]);
      }
    };
    fetchApiCart();
  }, [setCart, token, UserId]);

  const changeState = () => {
    setComponentState({ paymentPageState: false, footerState: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ paddingTop: "10px" }}>
        <Link
          style={{ textDecoration: "none" }}
          to="/"
          onClick={() => changeState()}
        >
          <Logo />
        </Link>
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
                paddingLeft: { md: "0", xs: "1%" },
                paddingRight: { md: "0", xs: "1%" },
              }}
            >
              Yey! Kamu telah berhasil membeli kursus di Apel Music
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => changeState()}
            >
              <Button variant="outlined" startIcon={<Home />}>
                Ke Beranda
              </Button>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to="/my-invoice"
              onClick={() => changeState()}
            >
              <Button variant="contained" startIcon={<ArrowForward />}>
                Buka Invoice
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SuccessPayment;

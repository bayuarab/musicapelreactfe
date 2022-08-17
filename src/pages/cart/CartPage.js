import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../api/userAPI";
import useAuth from "../../hooks/useAuth";
import numberFormat from "../../utilities/NumbeFormat";
import CartList from "./components/CartList";
import CheckoutDialogs from "./components/CheckoutDialogs";

import {
  generateNewInvoice,
  generateNewMasterInvoice,
} from "../invoice/InvoicesGenerator";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  IndeterminateCheckBox,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import { useCart } from "../../context/CartProvider";
import { useComponentBarState } from "../../context/ComponentStateProvider";

const StyledCheckbox = styled(Checkbox)({
  color: "#BDBDBD",
  "&.Mui-checked": {
    color: "#5D5FEF",
  },
});

const CheckoutButton = styled(Button)(({ theme }) => ({
  display: "none",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: "600",
  backgroundColor: "#5D5FEF",
  borderRadius: "8px",
  textTransform: "Capitalize",
  paddingLeft: "60px",
  paddingRight: "60px",
  paddingTop: "10px",
  paddingBottom: "10px",
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

const calculateTotalCost = (carts) => {
  return carts.reduce((totalCost, items) => {
    return totalCost + items.price;
  }, 0);
};

const findItemsIDInArray = (arr, targetValue) => {
  return arr.some((items) => items.id === targetValue);
};

const filterCartItems = (arr, filterValue, operator) => {
  return arr.filter((items) => {
    return operator === "equality"
      ? items.id === filterValue
      : items.id !== filterValue;
  });
};

const CartPage = () => {
  const { setComponentState } = useComponentBarState();
  const { cart, setCart } = useCart();
  const [selectedCart, setSelectedCart] = useState([]);
  const [cost, setCost] = useState(calculateTotalCost(cart));
  const [selectedOp, setSelectedOp] = useState(null);
  const [checkoutDialogState, setCheckoutDialogState] = useState(false);
  const [registeredInvoice, setRegisteredInvoice] = useState([]);
  const [checkoutState, setCheckoutState] = useState(false);
  const [apiDataMessage, setApiDataMessage] = useState(
    "Mengambil data ke server, harap tunggu"
  );

  const navigate = useNavigate();
  const { auth } = useAuth();
  const userID = auth?.userId;

  const fetchDelete = async (id) => {
    try {
      const response = await api.delete(`/Cart/${userID}/${id}`);
      console.log(response.data);
      setCart(
        response.data.filter((item) => item.userId === userID && item.id !== id)
      );
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
  };

  const fetchApiCart = async () => {
    try {
      const response = await api.get(`/Cart/${userID}`);
      console.log(response.data);
      setCart(response.data);
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      if (err.response.data === "Not Found")
        setApiDataMessage("Masih kosong, silahkan belanja");
      console.log(err.response.status);
      console.log(err.response.headers);
    }
  };

  useEffect(() => {
    setComponentState({ paymentPageState: false, footerState: false });
  }, [setComponentState]);

  useEffect(() => {
    const fetchApiInvoices = async () => {
      try {
        const response = await api.get(`/Invoices/${userID}`);
        console.log(response?.data);
        setRegisteredInvoice(
          response?.data?.map((rawData) => rawData.noInvoice)
        );
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    };
    fetchApiInvoices();
  }, [userID]);

  useEffect(() => {
    fetchApiCart();
  }, [setCart, userID, cart?.length]);

  useEffect(() => {
    setCost(calculateTotalCost(selectedCart));
  }, [selectedCart]);

  const fetchApiPostInvoice = async (url, data) => {
    try {
      const response = await api.post(`/${url}`, data);
      console.log(response.data);
      const masterInvoicess = response?.data.id;
      let details = [];
      if (url === "MInvoice") {
        details = selectedCart.map((items) => {
          return {
            noInvoice: generateNewInvoice(registeredInvoice, auth),
            courseId: items.courseId,
            masterInvoiceId: masterInvoicess,
            scheduleId: items.scheduleId,
          };
        });
        console.log(details);
      }
      details?.forEach((items) => {
        fetchApiPostInvoice("InvoiceDetails", items);
      });
      navigate("/payment-status", { replace: true });
      setCheckoutState(true);
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
  };

  const checkout = () => {
    console.log("Barang yang di checkout:");
    console.table(selectedCart);
    console.log(`Total cost: ${cost}`);
    setCheckoutDialogState(true);
  };

  const handleCheckoutClose = (value) => {
    const { paymentOption, paymentState } = value;
    console.log("paymentOption", paymentOption);
    setCheckoutDialogState(false);
    setSelectedOp(paymentOption);
    if (!paymentState) return;
    const newInvoiceProp = {
      selectedCart,
      registeredInvoice,
      paymentOption,
      auth,
      calculateTotalCost,
    };
    fetchApiPostInvoice("MInvoice", generateNewMasterInvoice(newInvoiceProp));
    selectedCart.forEach((items) => {
      fetchDelete(items.id);
    });
  };

  const handleChangeAll = () => {
    return selectedCart.length !== cart.length
      ? setSelectedCart(cart)
      : setSelectedCart([]);
  };

  const handleChange = (event) => {
    const targetValue = parseInt(event.target.value);
    const status = findItemsIDInArray(selectedCart, targetValue);
    status
      ? setSelectedCart(
          filterCartItems(selectedCart, targetValue, "unEquality")
        )
      : setSelectedCart([
          ...selectedCart,
          ...filterCartItems(cart, targetValue, "equality"),
        ]);
  };

  const handleCheck = (value) => {
    return findItemsIDInArray(selectedCart, value);
  };

  const handleDelete = (itemID) => {
    fetchDelete(itemID);
  };

  return checkoutState ? (
    <Navigate to="/payment-success" replace />
  ) : cart?.length <= 0 ? (
    <Box sx={{ marginTop: "60px" }}>
      <Typography variant="h5" sx={{ textAlign: "center", color: "#5D5FEF" }}>
        {apiDataMessage}
      </Typography>
    </Box>
  ) : (
    <Box
      style={{
        paddingTop: "45px",
        paddingLeft: "4%",
        paddingRight: "4%",
        paddingBottom: "100px",
      }}
    >
      <Box>
        <FormControlLabel
          sx={{
            ml: "-2px",
            mb: "12px",
          }}
          label="Pilih Semua"
          control={
            <StyledCheckbox
              indeterminateIcon={
                <IndeterminateCheckBox sx={{ color: "#5D5FEF" }} />
              }
              checked={selectedCart.length === cart.length}
              indeterminate={
                selectedCart.length !== cart.length && selectedCart.length !== 0
              }
              onChange={handleChangeAll}
            />
          }
        />
        <Divider sx={{ mb: "18px" }} />
        <CartList
          Cart={cart}
          handleChange={handleChange}
          handleCheck={handleCheck}
          StyledCheckbox={StyledCheckbox}
          handleDelete={handleDelete}
        />
        <AppBar
          position="fixed"
          color="primary"
          sx={{
            top: "auto",
            bottom: 0,
            backgroundColor: "white",
          }}
        >
          <Toolbar
            sx={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "space-between",
              height: "82px",
            }}
          >
            <Box
              sx={{
                paddingLeft: "2%",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Typography
                sx={{
                  display: { xs: "none", sm: "none", md: "block" },
                  color: "#333333",
                  fontSize: "18px",
                  fontFamilyL: "Poppins",
                  fontWeight: "400",
                }}
              >
                Total Biaya
              </Typography>
              <Typography
                sx={{
                  color: "#5D5FEF",
                  fontSize: { md: "24px", sm: "20px", xs: "18px" },
                  fontFamilyL: "Poppins",
                  fontWeight: "500",
                }}
              >
                IDR {numberFormat(cost)}
              </Typography>
            </Box>
            <Box sx={{ paddingRight: "2%" }}>
              <CheckoutButton
                variant="contained"
                disabled={selectedCart.length <= 0}
                onClick={() => checkout()}
              >
                Bayar Sekarang
              </CheckoutButton>
              <IconButton
                size="small"
                sx={{ display: { md: "none" } }}
                onClick={() => checkout()}
                disabled={selectedCart.length <= 0}
              >
                <Avatar
                  sizes="small"
                  sx={{
                    bgcolor: selectedCart.length <= 0 ? "#AfAfAf" : "#5D5FEF",
                  }}
                >
                  <ShoppingCartCheckout
                    fontSize="inherit"
                    sx={{
                      color: "white",
                      // fontSize: 30,
                    }}
                  />
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <CheckoutDialogs
        checkoutDialogState={checkoutDialogState}
        onClose={handleCheckoutClose}
        selectedOp={selectedOp}
      />
    </Box>
  );
};

export default CartPage;

import {
  IndeterminateCheckBox,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../api/userAPI";
import Loading from "../../components/Loading";
import { useCart } from "../../context/CartProvider";
import { useComponentBarState } from "../../context/ComponentStateProvider";
import useAuth from "../../hooks/useAuth";
import { CheckoutButton, StyledCheckbox } from "../../styles/CartStyle";
import numberFormat from "../../utilities/NumbeFormat";
import {
  generateNewInvoice,
  generateNewMasterInvoice,
} from "../invoice/InvoicesGenerator";
import CartList from "./components/CartList";
import CheckoutDialogs from "./components/CheckoutDialogs";
import {
  calculateTotalCost,
  filterCartItems,
  findItemsIDInArray,
} from "./components/Methods";

const CartPage = () => {
  const { setComponentState } = useComponentBarState();
  const { cart, setCart } = useCart();
  const [selectedCart, setSelectedCart] = useState([]);
  const [cost, setCost] = useState(calculateTotalCost(cart));
  const [selectedOp, setSelectedOp] = useState(null);
  const [checkoutDialogState, setCheckoutDialogState] = useState(false);
  const [registeredInvoice, setRegisteredInvoice] = useState([]);
  const [checkoutState, setCheckoutState] = useState(false);
  const [loadState, setLoadState] = useState(true);
  const [apiDataMessage, setApiDataMessage] = useState("");
  const navigate = useNavigate();
  const { auth } = useAuth();
  const userID = auth?.userId;
  const token = auth?.token;
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const fetchDelete = async (id) => {
    try {
      const response = await api.delete(`/Cart/${userID}/${id}`, config);
      if (response?.data) {
        setCart(
          response.data.filter(
            (item) => item.userId === userID && item.id !== id
          )
        );
      }
    } catch (err) {
      setApiDataMessage("Terjadi kesalahan");
    }
  };

  useEffect(() => {
    setComponentState({ paymentPageState: false, footerState: false });
  }, [setComponentState]);

  useEffect(() => {
    const fetchApiInvoices = async () => {
      const reqConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const response = await api.get(`/Invoices/${userID}`, reqConfig);

        setRegisteredInvoice(
          response?.data?.map((rawData) => rawData.noInvoice)
        );
      } catch (err) {}
    };
    fetchApiInvoices();
  }, [userID, token]);

  useEffect(() => {
    const fetchApiCart = async () => {
      const reqConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const response = await api.get(`/Cart/${userID}`, reqConfig);
        setCart(response.data);
        setLoadState(false);
        setApiDataMessage(null);
      } catch (err) {
        setLoadState(false);
        if (err.response.data === "Not Found")
          setApiDataMessage("Masih kosong, silahkan belanja");
      }
    };
    fetchApiCart();
  }, [setCart, userID, cart?.length, token]);

  useEffect(() => {
    setCost(calculateTotalCost(selectedCart));
  }, [selectedCart]);

  const fetchApiPostInvoice = async (url, data) => {
    try {
      const response = await api.post(`/${url}`, data, config);
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
      }
      details?.forEach((items) => {
        fetchApiPostInvoice("InvoiceDetails", items);
      });
      navigate("/payment-status", { replace: true });
      setCheckoutState(true);
    } catch (err) {
      setApiDataMessage("Terjadi kesalahan");
    }
  };

  const checkout = () => {
    setCheckoutDialogState(true);
  };

  const handleCheckoutClose = (value) => {
    const { paymentOption, paymentState } = value;
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
  ) : loadState ? (
    <Box sx={{ paddingTop: { md: "50px", xs: "20px" } }}>
      <Loading />
    </Box>
  ) : cart?.length <= 0 ? (
    <Box sx={{ marginTop: "60px" }}>
      <Typography variant="h5" sx={{ textAlign: "center", color: "#5D5FEF" }}>
        {apiDataMessage}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        paddingTop: { md: "45px", xs: "20px" },
        paddingLeft: "4%",
        paddingRight: "4%",
        paddingBottom: "80px",
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

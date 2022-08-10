import React, { useContext, useEffect, useState } from "react";
// import { DataContext } from "../../context/DataProvider";
import api from "../../api/userAPI";
import numberFormat from "../../components/NumbeFormat";
import CartList from "./components/CartList";
import CheckoutDialogs from "./components/CheckoutDialogs";

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
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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
  return arr.some(function (items) {
    return items.id === targetValue;
  });
};

const filterCartItems = (arr, filterValue, operator) => {
  return arr.filter((items) => {
    return operator === "equality"
      ? items.id === filterValue
      : items.id !== filterValue;
  });
};

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedCart, setSelectedCart] = useState([]);
  const [cost, setCost] = useState(calculateTotalCost(cart));
  const [selectedOp, setSelectedOp] = useState(null);
  const [checkoutDialogState, setCheckoutDialogState] = useState(false);
  const [registeredInvoice, setRegisteredInvoice] = useState([]);
  const [checkoutState, setCheckoutState] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();
  const userID = auth?.userId;

  const generateNewInvoice = () => {
    const getResnum = (resNum = 0) => {
      registeredInvoice?.forEach((invoices) => {
        const refNum = parseInt(invoices.substring(3, invoices.length));
        resNum = resNum <= refNum ? refNum + 1 : resNum;
      });
      return resNum;
    };

    const getRef = () => {
      return registeredInvoice?.length <= 0
        ? {
            resNum: 0,
            refToken: auth?.email.substring(0, 3),
          }
        : {
            resNum: getResnum(),
            refToken: registeredInvoice[0]?.substring(0, 3),
          };
    };

    const getInvoiceSepNum = (i) => {
      if (i === 0) return "";
      return "0" + getInvoiceSepNum(i - 1);
    };

    const invoiceLength = registeredInvoice[0]
      ? registeredInvoice[0].length
      : 8;
    const { resNum, refToken } = getRef();
    console.log(resNum, refToken, invoiceLength);
    const loop = invoiceLength - refToken.length - resNum.toString().length;
    const newInvoiceNum = getInvoiceSepNum(loop);
    return refToken + newInvoiceNum + resNum;
  };

  const generateNewMasterInvoice = () => {
    return {
      NoInvoice: generateNewInvoice(),
      PurchaseDate: "17 Agusutus 2022",
      Qty: selectedCart.length,
      Cost: calculateTotalCost(selectedCart),
      UserId: userID,
    };
  };

  useEffect(() => {
    const fetchApiInvoices = async () => {
      try {
        const response = await api.get(`/Invoices/${userID}`);
        console.log(response?.data);
        setRegisteredInvoice(
          response?.data?.map((rawData) => {
            return rawData.noInvoice;
          })
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
    const fetchApiCart = async () => {
      try {
        const response = await api.get(`/Cart/${userID}`);
        console.log(response.data);
        setCart(response.data);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    };
    fetchApiCart();
  }, [cart.length, userID]);

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
            NoInvoice: generateNewInvoice(),
            CourseId: items.courseId,
            MasterInvoiceId: masterInvoicess,
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
    console.log(selectedCart);
    console.log(`Total cost: ${cost}`);
    setCheckoutDialogState(true);
  };

  const handleCheckoutClose = (value) => {
    const { paymentOption, paymentState } = value;
    setCheckoutDialogState(false);
    setSelectedOp(paymentOption);
    if (!paymentState) return;
    fetchApiPostInvoice("MInvoice", generateNewMasterInvoice());
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
    // setSelectedCart(filterCartItems(selectedCart, itemID, "unEquality"));
    // setCart(filterCartItems(cart, itemID, "unEquality"));
    const fetchDelete = async (id) => {
      try {
        const response = await api.delete(`/Cart/${userID}/${id}`);
        console.log(response.data);
        setCart(
          response.data.filter(
            (item) => item.userId === userID && item.id !== id
          )
        );
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    };
    fetchDelete(itemID);
  };

  return checkoutState ? (
    <Navigate to="/payment-success" replace />
  ) : cart?.length <= 0 ? (
    <Box sx={{ marginTop: "45px" }}>
      <Typography variant="h2" sx={{ textAlign: "center", color: "#5D5FEF" }}>
        Masih kosong dek, belanja dong
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
                  fontSize: "24px",
                  fontFamilyL: "Poppins",
                  fontWeight: "500",
                }}
              >
                {/* cost.toLocaleString("de-DE") */}
                IDR {numberFormat(cost)}
              </Typography>
            </Box>
            <Box sx={{ paddingRight: "2%" }}>
              <CheckoutButton variant="contained" onClick={() => checkout()}>
                Bayar Sekarang
              </CheckoutButton>
              <IconButton
                sx={{ display: { md: "none" } }}
                onClick={() => checkout()}
              >
                <Avatar sx={{ bgcolor: "#5D5FEF" }}>
                  <ShoppingCartCheckout
                    sx={{
                      color: "white",
                      fontSize: 30,
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

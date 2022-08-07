import React, { useContext, useState } from "react";
// import { DataContext } from "../../context/DataProvider";
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
    return items.id_product === targetValue;
  });
};

const filterCartItems = (arr, filterValue, operator) => {
  return arr.filter((items) => {
    return operator === "equality"
      ? items.id_product === filterValue
      : items.id_product !== filterValue;
  });
};

const listsCart = [
  {
    id_product: "1",
    course_category_id: "1",
    course_category: "Drum",
    course_name: "Kursus Drummer Special Coach (Eno Netral)",
    price: 8500000,
    schedule: "Senin, 25 Juli 2022",
  },
  {
    id_product: "2",
    course_category_id: "1",
    course_category: "Drum",
    course_name: "Intermediate Drum",
    price: 5500000,
    schedule: "Sabtu, 23 Juli 2022",
  },
  {
    id_product: "3",
    course_category_id: "2",
    course_category: "Guitar",
    course_name: "Guitar from zero to hero",
    price: 11000000,
    schedule: "Rabu, 27 Juli 2022",
  },
  {
    id_product: "4",
    course_category_id: "2",
    course_category: "Guitar",
    course_name: "Guitar from hero to superhero",
    price: 21000000,
    schedule: "Minggu, 31 Juli 2022",
  },
];

const CartPage = () => {
  const [cart, setCart] = useState(listsCart);
  const [checkoutDialogState, setCheckoutDialogState] = useState(false);
  const [selectedCart, setSelectedCart] = useState(cart);
  const [cost, setCost] = useState(calculateTotalCost(cart));
  const [selectedOp, setSelectedOp] = useState(null);

  React.useEffect(() => {
    setCost(calculateTotalCost(selectedCart));
  }, [selectedCart]);

  const checkout = () => {
    console.log("Barang yang di checkout:");
    console.log(selectedCart);
    console.log(`Total cost: ${cost}`);
    setCheckoutDialogState(true);
  };

  const handleCheckoutClose = (value) => {
    setCheckoutDialogState(false);
    setSelectedOp(value);
    console.log(value);
  };

  const handleChangeAll = () => {
    return selectedCart.length !== cart.length
      ? setSelectedCart(cart)
      : setSelectedCart([]);
  };

  const handleChange = (event) => {
    const status = findItemsIDInArray(selectedCart, event.target.value);
    status
      ? setSelectedCart(
          filterCartItems(selectedCart, event.target.value, "unEquality")
        )
      : setSelectedCart([
          ...selectedCart,
          ...filterCartItems(cart, event.target.value, "equality"),
        ]);
  };

  const handleCheck = (value) => {
    return findItemsIDInArray(selectedCart, value);
  };

  const handleDelete = (itemID) => {
    setSelectedCart(filterCartItems(selectedCart, itemID, "unEquality"));
    setCart(filterCartItems(cart, itemID, "unEquality"));
  };

  return (
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
                IDR {cost.toLocaleString("de-DE")}
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

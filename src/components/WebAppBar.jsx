import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

import { Logout, Menu, Person, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#F2C94C",
  height: "76px",
});

const SideIcons = styled(Box)(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "35px",
  marginRight: "10px",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const BlackButton = styled(Button)({
  color: "black",
  textTransform: "Capitalize",
  fontSize: "16px",
  fontFamily: "Poppins",
  fontWeight: "500",
});

const loggedIn = (
  <SideIcons sx={{ color: "black" }}>
    <Link style={{ textDecoration: "none" }} to="/my-account">
      <IconButton>
        <Person />
      </IconButton>
    </Link>
    <IconButton sx={{ color: "black" }}>
      <Logout />
    </IconButton>
  </SideIcons>
);

const signUp = (
  <SideIcons>
    <Link style={{ textDecoration: "none" }} to="/registration">
      <BlackButton>Daftar Sekarang</BlackButton>
    </Link>
    <Link style={{ textDecoration: "none" }} to="/login">
      <Button
        variant="contained"
        sx={{
          fontFamily: "Poppins",
          fontSize: "16px",
          backgroundColor: "#5D5FEF",
          borderRadius: "8px",
          textTransform: "Capitalize",
        }}
      >
        Masuk
      </Button>
    </Link>
  </SideIcons>
);

function WebAppBar(props) {
  const { window, logState } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { link: "/cart", mobile: "Cart" },
    { link: "/my-course", mobile: "Kelasku" },
    { link: "/my-invoice", mobile: "Pembelian" },
    {
      link: `${logState ? "/my-account" : "/registration"}`,
      mobile: `${logState ? "Akun Saya" : "Daftar Sekarang"}`,
    },
    {
      link: `${logState ? "/log-out" : "/login"}`,
      mobile: `${logState ? "Log Out" : "Masuk"}`,
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MENU
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link
            key={item.mobile}
            to={item.link}
            style={{
              textDecoration: "none",
              textAlign: "center",
              color: "black",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton key={item.mobile} sx={{ textAlign: "center" }}>
                <ListItemText primary={item.mobile} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar position="fixed" sx={{ backgroundColor: "#F2C94C" }}>
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 0.2, mr: 2, display: { md: "none" } }}
          >
            <Menu sx={{ color: "black" }} />
          </IconButton>
          <Link style={{ textDecoration: "none" }} to="/">
            <Box sx={{ display: { md: "block" } }}>
              <Logo />
            </Box>
          </Link>

          <SideIcons>
            <Link to="/cart">
              <IconButton sx={{ color: "black" }}>
                <ShoppingCart />
              </IconButton>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/my-course">
              <BlackButton>Kelasku</BlackButton>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/my-invoice">
              <BlackButton>Pembelian</BlackButton>
            </Link>
            <Typography
              variant="a"
              sx={{
                color: "black",
                fontWeight: "200",
                fontSize: "24px",
                textAlign: "center",
              }}
            >
              |
            </Typography>
            {logState ? loggedIn : signUp}
          </SideIcons>
        </StyledToolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "52%",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar sx={{ height: "76px" }} />
    </Box>
  );
}

export default WebAppBar;

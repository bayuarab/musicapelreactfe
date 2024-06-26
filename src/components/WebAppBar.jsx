import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

import {
  Logout as LogoutIcon,
  Menu,
  Person,
  ShoppingCart,
} from "@mui/icons-material";

import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useCart } from "../context/CartProvider";
import { useComponentBarState } from "../context/ComponentStateProvider";
import useAuth from "../hooks/useAuth";
import { StyledPurpleButton } from "../styles/PurpleContainedButton";
import {
  BlackButton,
  SideIcons,
  StyledBadge,
  StyledToolbar,
} from "../styles/WebAppBarStyle";
import LogoutDialog from "./LogoutDialog";
//------------------------------------------------------------------------

function WebAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const { auth, setAuth } = useAuth();
  const { componentState } = useComponentBarState();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const handleCloseLogout = (state) => {
    if (!state) return setOpenLogout(false);
    localStorage.clear();
    setAuth({});
    setCart([]);
    navigate("/", { replace: true });
    setOpenLogout(false);
  };

  const handleClickOpenLogout = () => {
    setOpenLogout(true);
  };

  const loggedIn = (
    <SideIcons sx={{ color: "black" }}>
      <Link style={{ textDecoration: "none" }} to="/my-account">
        <IconButton>
          <Person />
        </IconButton>
      </Link>
      <IconButton
        sx={{ color: "black" }}
        onClick={() => handleClickOpenLogout()}
      >
        <LogoutIcon />
      </IconButton>
    </SideIcons>
  );

  const signUp = (
    <SideIcons>
      <Link style={{ textDecoration: "none" }} to="/registration">
        <BlackButton>Daftar Sekarang</BlackButton>
      </Link>
      <Link style={{ textDecoration: "none" }} to="/login">
        <StyledPurpleButton variant="contained">Masuk</StyledPurpleButton>
      </Link>
    </SideIcons>
  );

  const cartIcon = () => {
    return (
      <IconButton sx={{ color: "black" }}>
        <StyledBadge badgeContent={cart?.length || 0} color="secondary">
          <ShoppingCart />
        </StyledBadge>
      </IconButton>
    );
  };

  const navItems = [
    { link: "/cart", mobile: cartIcon() },
    { link: "/my-course", mobile: "Kelasku" },
    { link: "/my-invoice", mobile: "Pembelian" },
    {
      link: `${auth?.roles ? "/my-account" : "/registration"}`,
      mobile: `${auth?.roles ? "Akun Saya" : "Daftar Sekarang"}`,
    },
    {
      link: `${auth?.roles ? "/log-out" : "/login"}`,
      mobile: `${auth?.roles ? "Log Out" : "Masuk"}`,
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerNavSet = () => {
    const set = auth?.roles
      ? navItems.filter((item) => item.mobile !== "Log Out")
      : navItems;
    return set;
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MENU
      </Typography>
      <Divider />
      <List>
        {drawerNavSet().map((item) => {
          return (
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
          );
        })}
        {auth?.roles ? (
          <ListItem disablePadding>
            <ListItemButton
              key={"Log Out"}
              sx={{ textAlign: "center" }}
              onClick={() => handleClickOpenLogout()}
            >
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>
        ) : (
          <></>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return componentState.paymentPageState === true || auth?.roles === "admin" ? (
    <></>
  ) : (
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
                <StyledBadge badgeContent={cart?.length || 0} color="secondary">
                  <ShoppingCart />
                </StyledBadge>
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
            {auth?.roles ? loggedIn : signUp}
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
        <LogoutDialog logState={openLogout} onClose={handleCloseLogout} />
      </Box>
      <StyledToolbar />
    </Box>
  );
}

export default WebAppBar;

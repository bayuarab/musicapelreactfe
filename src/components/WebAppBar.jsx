import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import Logo from "./Logo";
import WebAppLogAccMenu from "./WebAppLogAccMenu";
import { Menu } from "@mui/icons-material";

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
  gap: "40px",
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

const drawerWidth = 240;
const navItems = [
  { link: "/my-cart", mobile: "Cart" },
  { link: "/my-classes", mobile: "Kelasku" },
  { link: "/checkout", mobile: "Pembelian" },
  { link: "/registration", mobile: "Registrasi" },
  { link: "/sign-in", mobile: "Masuk" },
];

function WebAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
          // <Link
          //   to={item.link}
          //   style={{
          //     textDecoration: "none",
          //     textAlign: "center",
          //     color: "black",
          //   }}
          // >
          <ListItem key={item.mobile} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.mobile} />
            </ListItemButton>
          </ListItem>
          // </Link>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar position="sticky">
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <Menu sx={{ color: "black" }} />
          </IconButton>
          <Box sx={{ display: { md: "block" } }}>
            <Logo />
          </Box>
          <SideIcons>
            <IconButton sx={{ color: "black" }}>
              <ShoppingCart />
            </IconButton>
            <BlackButton>Kelasku</BlackButton>
            <BlackButton>Pembelian</BlackButton>
            <Typography
              variant="a"
              sx={{
                color: "black",
                fontWeight: "200",
                fontSize: "26px",
                textAlign: "center",
              }}
            >
              |
            </Typography>
            <WebAppLogAccMenu></WebAppLogAccMenu>
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ pt: 0 }}>
        {/* <Outlet /> */}
      </Box>
    </Box>
  );
}

export default WebAppBar;

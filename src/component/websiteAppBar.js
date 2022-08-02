import AppleIcon from "@mui/icons-material/Apple";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  InputBase,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import React from "react";

export default function HeaderBar() {
  return (
    <Box>
      <AppBar
        variant="dense"
        position="fixed"
        style={{ backgroundColor: "#F2C94C" }}
      >
        <Toolbar>
          {/* <IconButton><AppleIcon/></IconButton> */}
          <Grid>
            <Typography color="#000000" style={{ fontWeight: "bold" }}>
              <AppleIcon />
              MUSIC
            </Typography>
          </Grid>
          <Grid style={{ display: "flex", margin: "auto 0 auto auto" }}>
            <IconButton style={{ right: "0px" }}>
              <ShoppingCartIcon />
            </IconButton>
            <Button
              style={{
                margin: "auto 0 auto auto",
                color: "#000000",
                paddingRight: "30px",
                paddingLeft: "30px",
              }}
            >
              Kelasku
            </Button>
            <Button
              style={{
                right: "0px",
                color: "#000000",
                paddingRight: "30px",
                paddingLeft: "30px",
              }}
            >
              Pembelian
            </Button>
            <div
              style={{
                height: "20px",
                width: "0px",
                border: "1px solid black",
                margin: "auto auto",
              }}
            ></div>
            <Button
              style={{
                right: "0px",
                color: "#000000",
                paddingRight: "30px",
                paddingLeft: "30px",
              }}
            >
              Daftar Sekarang
            </Button>
            <Button href="/Login" variant="contained" style={{ right: "0px" }}>
              Masuk
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

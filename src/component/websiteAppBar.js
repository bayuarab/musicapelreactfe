import React from "react";
import {
  AppBar, Box, Toolbar, Typography, Button, styled, InputBase, Tooltip, Zoom, Drawer, IconButton
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppleIcon from '@mui/icons-material/Apple';

export default function HeaderBar(){
  return(
    <Box>
      <AppBar variant="dense" position="fixed" style={{ backgroundColor: '#F2C94C' }}>
        <Toolbar style={{justifyItems:'center'}}>
          <IconButton><AppleIcon/></IconButton>
          <Typography color='#000000'>
            Music
          </Typography>
          <IconButton><ShoppingCartIcon/></IconButton>
          <Button style={{margin:'auto 0 auto auto', color:'#000000'}}>
            Kelasku
          </Button>
          <Button style={{margin:'auto 0 auto auto', color:'#000000'}}>
            Pembelian
          </Button>
          <Button style={{margin:'auto 0 auto auto', color:'#000000'}}>
            Daftar Sekarang
          </Button>
          <Button variant="contained" style={{margin:'auto 0 auto auto '}}>
            Masuk
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

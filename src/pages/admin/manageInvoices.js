import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import HeaderbarAdmin from "../component/HeaderBarAdmin.js";
import HeaderSet from "../../components/HeaderSet.js";
import numberFormat from "../../components/NumbeFormat.js";
import useAuth from "../../hooks/useAuth.js";
import { getKategoriKelas, getMusic } from "../../JSON Data/Data";
let kategoris = getKategoriKelas();
let musics = getMusic();
const theme = createTheme({
  palette: {
    primary: {
      main: "#F2C94C",
    },
    secondary: {
      main: "#F2C94C",
    },
    white: {
      main: "#ffffff",
    },
  },
});

function ManageInvoices() {
  /* useStates dan metode-metode untuk keperluan GET daftar semua invoice */
  const [refreshPage, setRefreshPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  /* useStates untuk membuka dialog untuk POST invoice baru */
  const [openAdd, setOpenAdd] = useState(false);
  /* useStates untuk membuka dialog untuk POST invoice baru */

  /* useStates untuk membuka dialog untuk POST edit dan verifikasi invoice*/
  const [editItemData, setEditItemData] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);
  const [openViewItems, setOpenViewItems] = useState(false);
  /* useStates untuk membuka dialog untuk POST edit dan verifikasi invoice */
  const { auth } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Header bar */}

        <HeaderSet roles={`${auth?.roles}`} />

        {/* Body Content */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {/* TITLE */}
                  <Typography
                    variant="h5"
                    color="secondary"
                    style={{ fontWeight: "bold" }}
                  >
                    Manage Invoices
                  </Typography>

                  {/* BOX PENCARIAN DATA */}
                  <div style={{ display: "flex", padding: "20px 0" }}>
                    <TextField
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      id="input-with-icon-textfield"
                      label="Pencarian Berdasarkan Email"
                      InputProps={{
                        endAdornment: <SearchIcon color="primary" />,
                      }}
                      variant="outlined"
                      style={{
                        display: "flex",
                        flexGrow: 1,
                        marginRight: "10px",
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setOpenAdd(true);
                      }}
                      style={{ width: "auto", color: "white" }}
                    >
                      Tambah Baru
                    </Button>
                  </div>

                  {musics.map((invoice) => (
                    <Card
                      key={invoice.id}
                      style={{ margin: "1% 0" }}
                      elevation={2}
                    >
                      <Grid container>
                        <Grid item xs={12} md={2}>
                          {invoice.payment_verification_image === "" ? (
                            <Alert severity="error">
                              Gambar resi pembayaran / pengiriman belum tersedia
                            </Alert>
                          ) : (
                            <CardMedia
                              component="img"
                              style={{ objectFit: "contain" }}
                              image={`${invoice.image}`}
                              alt="Image"
                            />
                          )}
                        </Grid>
                        <Grid item xs={12} md={10}>
                          <CardContent>
                            {invoice.status === "Diterima" ? (
                              <Alert severity="success">
                                Produk telah diterima
                              </Alert>
                            ) : invoice.status === "Dikirim" ? (
                              <Alert severity="info">
                                Admin telah upload resi pengiriman -- menunggu
                                konfirmasi penerimaan dari pembeli..
                              </Alert>
                            ) : invoice.status === "Terverifikasi" ? (
                              <Alert severity="warning">
                                Admin telah mengkonfirmasi pembayaran --
                                menunggu resi pengiriman dari admin..
                              </Alert>
                            ) : invoice.status === "Terbayar" ? (
                              <Alert severity="info">
                                Pembeli telah upload bukti pembayaran --
                                menunggu verifikasi admin..
                              </Alert>
                            ) : invoice.status === "Checkout" ? (
                              <Alert severity="warning">
                                Pembeli telah checkout -- menunggu bukti
                                pembayaran..
                              </Alert>
                            ) : (
                              <Alert severity="info">
                                Pembeli belum checkout.
                              </Alert>
                            )}

                            <TableContainer
                              component={Paper}
                              style={{ margin: "1% 0" }}
                            >
                              <Table
                                sx={{ minWidth: 650 }}
                                size="small"
                                aria-label="a dense table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell>No. invoice</TableCell>
                                    <TableCell>Alamat pengiriman</TableCell>
                                    <TableCell>No. telepon</TableCell>
                                    <TableCell>Alamat Email</TableCell>
                                    <TableCell>Bank</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell>
                                      {invoice.invoice_number}
                                    </TableCell>
                                    <TableCell>
                                      {invoice.customer_address}
                                    </TableCell>
                                    <TableCell>
                                      {invoice.customer_phone}
                                    </TableCell>
                                    <TableCell>
                                      {invoice.customer_email}
                                    </TableCell>
                                    <TableCell>
                                      {invoice.payment_method}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>

                            <Grid container spacing={1}>
                              <Grid item xs={12} md={4}>
                                <Button
                                  size="small"
                                  fullWidth
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpenVerify(true);
                                    setEditItemData(invoice);
                                  }}
                                  style={{ color: "white" }}
                                  variant="contained"
                                >
                                  Konfirmasi Pembayaran{" "}
                                  {numberFormat(invoice.payment_total)}
                                </Button>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <Button
                                  size="small"
                                  fullWidth
                                  variant="outlined"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpenEdit(true);
                                    setEditItemData(invoice);
                                  }}
                                >
                                  Edit Invoice
                                </Button>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <Button
                                  size="small"
                                  fullWidth
                                  variant="text"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpenViewItems(true);
                                    setEditItemData(invoice);
                                  }}
                                >
                                  Daftar Produk
                                </Button>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Grid>
                        {/* <Grid item xs={12} md={4}>
                                                    <Button fullWidth variant="outlined" onClick={ async (e) => { e.preventDefault(); await setIdToDelete(invoice.id); deleteInvoice();}} >Hapus Invoice</Button>
                                                </Grid> */}
                      </Grid>
                    </Card>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ManageInvoices;

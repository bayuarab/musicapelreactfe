import { ArrowForward, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import api from "../../api/Invoices";
import HeaderSet from "../../components/HeaderSet";
import useAuth from "../../hooks/useAuth";
import {
  StyledPaper,
  StyledTableCell,
  StyledTableRow,
} from "../../styles/TableStyle";
import DetailInvoiceDialog from "./components/DetailInvoiceDialog";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F2C94C",
    },
    secondary: {
      main: "#4F4F4F",
    },
    white: {
      main: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            fontFamily: "Poppins",
            fontSize: "16px",
            fontWeight: "600",
            paddingTop: "10px",
            paddingBottom: "10px",
            textTransform: "Capitalize",
            borderRadius: "8px",
            color: "#4F4F4F",
          },
        },
      ],
    },
  },
});

function UserInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [searchState, setSearchState] = useState("");
  const [masterInvoice, setMasterInvoice] = useState({});
  const [openDetail, setOpenDetail] = useState(false);
  const [loadMessage, setLoadMessage] = useState(
    "Sedang mengambil data ke server harap tunggu"
  );

  const { auth } = useAuth();
  const token = auth?.token;

  const handleCloseDialog = () => {
    setOpenDetail(false);
  };

  const handleClickOpenDetail = (masterInvoice) => {
    setMasterInvoice(masterInvoice);
    setOpenDetail(true);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const response = await api.get(`/AllInvoices`, config);
        setLoadMessage(null);
        setInvoices(response.data);
      } catch (err) {
        setLoadMessage("Terjadi kesalahan");
        if (err.response.status === 401 || err.response.status === 403)
          setLoadMessage("Otoritas tidak berlaku silahkan login kembali");
      }
    };

    fetchApi();
  }, [setInvoices, token]);

  const invoicesFilter = () => {
    return searchState?.length >= 0
      ? invoices?.filter(
          (item) =>
            item.nama.includes(searchState) ||
            item.noInvoice.includes(searchState)
        )
      : invoices;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HeaderSet roles={`admin`} />

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
                  <Typography
                    variant="h5"
                    color="secondary"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { md: "24px", xs: "18px" },
                      fontFamily: "Poppins",
                    }}
                  >
                    User Invoices
                  </Typography>

                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      padding: "20px 0",
                    }}
                  >
                    <TextField
                      value={searchState}
                      onChange={(e) => setSearchState(e.target.value)}
                      id="input-with-icon-textfield"
                      label="Pencarian"
                      InputProps={{
                        style: { fontFamily: "Poppins" },
                        endAdornment: <Search color="primary" />,
                      }}
                      InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                      variant="outlined"
                      style={{
                        display: "flex",
                        flexGrow: 1,
                      }}
                    />
                  </Box>
                  {loadMessage ? (
                    <Typography
                      sx={{
                        paddingTop: "5px",
                        paddingBottom: "15px",
                      }}
                    >
                      {loadMessage}
                    </Typography>
                  ) : (
                    <TableContainer component={StyledPaper}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center" size="small">
                              Nama Pembeli
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              No. Invoice
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Metode Pembayaran
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Waktu Pembelian
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Detail Invoice
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {invoicesFilter()?.map((row, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell align="center">
                                {row.nama}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.noInvoice}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.method}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.purchasedDate}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Box
                                  sx={{
                                    display: { md: "block", xs: "none" },
                                  }}
                                >
                                  <Button
                                    onClick={() =>
                                      handleClickOpenDetail(row.masterInvoiceId)
                                    }
                                    variant="outlined"
                                    startIcon={<ArrowForward />}
                                    aria-label="delete"
                                  >
                                    Rincian
                                  </Button>
                                </Box>
                                <Box
                                  sx={{
                                    display: { md: "none", xs: "block" },
                                  }}
                                >
                                  <Button
                                    onClick={() =>
                                      handleClickOpenDetail(row.masterInvoiceId)
                                    }
                                    variant="outlined"
                                    startIcon={
                                      <ArrowForward
                                        sx={{
                                          marginLeft: "12px",
                                          height: "18px",
                                        }}
                                      />
                                    }
                                    aria-label="delete"
                                  ></Button>
                                </Box>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <DetailInvoiceDialog
          StyledTableCell={StyledTableCell}
          StyledPaper={StyledPaper}
          StyledTableRow={StyledTableRow}
          masterInvoiceId={masterInvoice}
          logState={openDetail}
          onClose={handleCloseDialog}
        />
      </Box>
    </ThemeProvider>
  );
}

export default UserInvoices;

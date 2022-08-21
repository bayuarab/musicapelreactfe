import { AddCircle, DeleteForever, Edit, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import api from "../../api/baseApi";
import HeaderSet from "../../components/HeaderSet";
import SnackBar from "../../components/SnackBar";
import useAuth from "../../hooks/useAuth";
import {
  StyledPaper,
  StyledTableCell,
  StyledTableRow,
} from "../../styles/TableStyle";
import PaymentMethodDialog from "./components/PaymentMethodDialog";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F2C94C",
    },
    secondary: {
      main: "#4F4F4F",
    },
    remove: {
      main: "#9F290F",
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
          },
        },
      ],
    },
  },
});

function ManagePaymentMethod() {
  const [options, setOptions] = useState([]);
  const [searchOption, setSearchOption] = useState("");
  const [selectedOption, setSelectedOption] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [severityType, setSeverityType] = useState("error");
  const [message, setMessage] = useState("");
  const [snackbarState, setSnackbarState] = useState(false);
  const [dialogOption, setDialogOption] = useState("delete");
  const [refreshState, setRefreshState] = useState(true);
  const [loadMessage, setLoadMessage] = useState(
    "Sedang mengambil data ke server harap tunggu"
  );
  const { auth } = useAuth();
  const token = auth?.token;
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const fetchDelete = async () => {
    try {
      const response = await api.delete(
        `/Payment/${selectedOption.id}`,
        config
      );
      if (response?.data) {
        setOptions((item) =>
          item.filter((item) => item.id !== selectedOption.id)
        );
        setRefreshState((status) => !status);
      }
      setSeverityType("warning");
      setMessage("Opsi pembayaran telah dihapus dari daftar");
      setSnackbarState(true);
    } catch (err) {
      setSeverityType("error");
      setMessage("Error: Gagal menghapus, terjadi kesalahan");
      setSnackbarState(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarState(false);
  };

  const handleCloseDialog = (state, postData = null) => {
    if (!state) return setOpenDialog(false);
    if (state && dialogOption === "delete") fetchDelete();
    else {
      const { severity, msg } = postData;
      setSeverityType(severity);
      setMessage(msg);
      setSnackbarState(true);
      setRefreshState((status) => !status);
    }
    setOpenDialog(false);
  };

  const handleClickOpenDialog = (dialogOps, data) => {
    setDialogOption(dialogOps);
    setSelectedOption(data);
    setOpenDialog(true);
  };

  useEffect(() => {
    const fetchApiGet = async () => {
      const reqConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const response = await api.get(`/Payment`, reqConfig);

        setLoadMessage(null);
        setOptions(response.data);
      } catch (err) {
        setLoadMessage("Terjadi kesalahan");
        if (err.response.status === 401 || err.response.status === 403)
          setLoadMessage("Otoritas tidak berlaku silahkan login kembali");
      }
    };
    fetchApiGet();
  }, [setOptions, refreshState, token]);

  const optionFilter = () => {
    return searchOption?.length > 0
      ? options?.filter((item) => item.method.includes(searchOption))
      : options;
  };

  return (
    <div>
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
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Typography
                      variant="h5"
                      color="secondary"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { md: "24px", xs: "18px" },
                        fontFamily: "Poppins",
                      }}
                    >
                      Manage Opsi Pembayaran
                    </Typography>

                    <Box
                      component={"div"}
                      sx={{
                        display: "flex",
                        padding: "20px 0",
                        gap: { md: "20px", xs: "10px" },
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        value={searchOption}
                        onChange={(e) => setSearchOption(e.target.value)}
                        id="input-with-icon-textfield"
                        label="Pencarian opsi"
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
                      <Box sx={{ paddingRight: { md: "10px", xs: "1px" } }}>
                        <Tooltip
                          TransitionComponent={Zoom}
                          title="Tambah opsi pembayaran"
                          placement="top"
                        >
                          <IconButton
                            size="small"
                            sx={{
                              color: "#4f4f4f",
                            }}
                            onClick={() => handleClickOpenDialog("add", null)}
                          >
                            <AddCircle />
                          </IconButton>
                        </Tooltip>
                      </Box>
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
                        <Table sx={{}} aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">
                                Opsi Pembayaran
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Action
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {optionFilter()?.map((row, index) => (
                              <StyledTableRow key={index}>
                                <StyledTableCell align="center">
                                  <Box
                                    sx={{
                                      marginLeft: { md: "30%", xs: "10%" },
                                      paddingLeft: "10px",
                                      paddingRight: "15px",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: { md: "30px", xs: "10px" },
                                    }}
                                  >
                                    <Box
                                      component={"img"}
                                      style={{ alignSelf: "center" }}
                                      src={`data:image/jpeg;base64,${row.icon}`}
                                      alt={row.method}
                                      loading="lazy"
                                      sx={{
                                        width: { md: "37px", xs: "28px" },
                                        height: { md: "37px", xs: "28px" },
                                        display: { md: "block", xs: "block" },
                                      }}
                                    />
                                    <Box>{row.method}</Box>
                                  </Box>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  <Box
                                    sx={{
                                      display: { md: "flex", xs: "none" },
                                      gap: "30px",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Button
                                      onClick={() =>
                                        handleClickOpenDialog("edit", row)
                                      }
                                      color="secondary"
                                      variant="outlined"
                                      startIcon={<Edit />}
                                    >
                                      Ubah
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        handleClickOpenDialog("delete", row)
                                      }
                                      color="remove"
                                      variant="outlined"
                                      startIcon={<DeleteForever />}
                                    >
                                      Hapus
                                    </Button>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: { md: "none", xs: "flex" },
                                      gap: "20px",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Button
                                      onClick={() =>
                                        handleClickOpenDialog("edit", row)
                                      }
                                      color="secondary"
                                      variant="outlined"
                                      startIcon={
                                        <Edit
                                          sx={{
                                            marginLeft: "12px",
                                            height: "18px",
                                          }}
                                        />
                                      }
                                    ></Button>
                                    <Button
                                      onClick={() =>
                                        handleClickOpenDialog("delete", row)
                                      }
                                      color="remove"
                                      variant="outlined"
                                      startIcon={
                                        <DeleteForever
                                          sx={{
                                            marginLeft: "12px",
                                            height: "18px",
                                          }}
                                        />
                                      }
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
          <PaymentMethodDialog
            dialogOption={dialogOption}
            selectedOption={selectedOption}
            logState={openDialog}
            onClose={handleCloseDialog}
            config={config}
          />
        </Box>
      </ThemeProvider>
      <SnackBar
        message={message}
        snackbarState={snackbarState}
        handleCloseSnackbar={handleCloseSnackbar}
        severityType={severityType}
      />
    </div>
  );
}

export default ManagePaymentMethod;

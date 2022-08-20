import { AddCircle, DeleteForever, Edit, Search } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
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
import useAuth from "../../hooks/useAuth";
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
        // {
        //   props: { variant: "contained" },
        //   style: {
        //     fontFamily: "Poppins",
        //     fontSize: "16px",
        //     fontWeight: "600",
        //     paddingTop: "10px",
        //     paddingBottom: "10px",
        //     textTransform: "Capitalize",
        //     borderRadius: "8px",
        //     backgroundColor: "#4F4F4F",
        //     color: "white",
        //   },
        // },
      ],
    },
  },
});

const StyledPaper = styled(Paper)({
  border: 0,
  boxShadow: "none",
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: "Poppins",
  fontSize: "16px",
  border: 0,
  paddingTop: "21px",
  paddingBottom: "21px",
  color: "#4F4F4F",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F2C94C",
    fontWeight: "700",
  },
  [`&.${tableCellClasses.body}`]: {
    fontWeight: "500",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  border: 0,
  "&:nth-of-type(even)": {
    backgroundColor: "#F2C94C33",
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Alerts = React.forwardRef(function Alerts(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
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
  const { auth } = useAuth();
  const token = auth?.token;
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const fetchApiGet = async () => {
    try {
      const response = await api.get(`/Payment`, config);
      console.log(response.data);
      setOptions(response.data);
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      if (err.response.data === "Not Found") console.log(err.response.status);
      console.log(err.response.headers);
    }
  };

  const fetchDelete = async () => {
    try {
      const response = await api.delete(
        `/Payment/${selectedOption.id}`,
        config
      );
      console.log(response.data);
      setOptions((item) =>
        item.filter((item) => item.id !== selectedOption.id)
      );
      fetchApiGet();
      setSeverityType("warning");
      setMessage("Opsi pembayaran telah dihapus dari daftar");
      setSnackbarState(true);
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
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
      fetchApiGet();
    }
    setOpenDialog(false);
  };

  const handleClickOpenDialog = (dialogOps, data) => {
    setDialogOption(dialogOps);
    setSelectedOption(data);
    console.table(data);
    setOpenDialog(true);
  };

  useEffect(() => {
    fetchApiGet();
  }, [setOptions]);

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
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    {/* TITLE */}
                    <Typography
                      variant="h5"
                      color="secondary"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { md: "24px", xs: "18px" },
                      }}
                    >
                      Manage Opsi Pembayaran
                    </Typography>

                    {/* BOX PENCARIAN DATA */}
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
                          endAdornment: <Search color="primary" />,
                        }}
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
                                      // setSelectedOption(row)
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
                                      // setSelectedOption(row)
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
          />
        </Box>
      </ThemeProvider>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={snackbarState}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alerts
            onClose={handleCloseSnackbar}
            severity={severityType}
            sx={{ width: "100%" }}
          >
            {message}
          </Alerts>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default ManagePaymentMethod;

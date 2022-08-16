import { DeleteForever, Search } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
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
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import api from "../../api/userAPI";
import HeaderSet from "../../components/HeaderSet";
import DeleteDialog from "./components/DeleteDialog";

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

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [openLogout, setOpenLogout] = useState(false);
  const [severityType, setSeverityType] = useState("error");
  const [message, setMessage] = useState("");
  const [snackbarState, setSnackbarState] = React.useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarState(false);
  };

  const handleCloseLogout = (state) => {
    if (!state) return setOpenLogout(false);
    const fetchDelete = async () => {
      try {
        const response = await api.delete(`/${selectedUser.email}`);
        console.log(response.data);
        setUsers((item) =>
          item.filter((item) => item.email !== selectedUser.email)
        );
        setSeverityType("warning");
        setMessage("User telah dihapus dari daftar");
        setSnackbarState(true);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        setSeverityType("danger");
        setMessage("Error: Gagal menghapus, terjadi kesalahan");
        setSnackbarState(true);
      }
    };
    fetchDelete();
    setOpenLogout(false);
  };

  const handleClickOpenLogout = (user) => {
    setSelectedUser(user);
    setOpenLogout(true);
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await api.get(`/AllUser`);
        console.log(response.data);
        setUsers(response.data);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        if (err.response.data === "Not Found") console.log(err.response.status);
        console.log(err.response.headers);
      }
    };

    fetchApi();
  }, [setUsers]);

  const userFilter = () => {
    return searchUser?.length > 0
      ? users?.filter(
          (item) =>
            item.nama.includes(searchUser) || item.email.includes(searchUser)
        )
      : users;
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
                      style={{ fontWeight: "bold" }}
                    >
                      Manage User
                    </Typography>

                    {/* BOX PENCARIAN DATA */}
                    <div style={{ display: "flex", padding: "20px 0" }}>
                      <TextField
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                        id="input-with-icon-textfield"
                        label="Pencarian User"
                        InputProps={{
                          endAdornment: <Search color="primary" />,
                        }}
                        variant="outlined"
                        style={{
                          display: "flex",
                          flexGrow: 1,
                        }}
                      />
                    </div>
                    <TableContainer component={StyledPaper}>
                      <Table sx={{}} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="left" size="small">
                              No
                            </StyledTableCell>
                            <StyledTableCell align="left">Nama</StyledTableCell>
                            <StyledTableCell align="left">
                              Email
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Action
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {userFilter()?.map((row, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                size="small"
                              >
                                {index + 1}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {row.nama}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {row.email}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Button
                                  onClick={() => handleClickOpenLogout(row)}
                                  variant="outlined"
                                  color="remove"
                                  startIcon={<DeleteForever />}
                                  aria-label="delete"
                                >
                                  Hapus
                                </Button>
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
          <DeleteDialog
            selectedUser={selectedUser}
            logState={openLogout}
            onClose={handleCloseLogout}
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

export default ManageUser;

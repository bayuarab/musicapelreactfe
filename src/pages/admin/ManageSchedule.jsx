import {
  AddCircle,
  DeleteForever,
  ModeEdit,
  Search,
} from "@mui/icons-material";
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
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import React, { useEffect, useState } from "react";
import api from "../../api/baseApi";
import HeaderSet from "../../components/HeaderSet";
import useAuth from "../../hooks/useAuth";
import {
  StyledPaper,
  StyledTableCell,
  StyledTableRow,
} from "../../styles/TableStyle";
import AddDialog from "./components/DialogAddSchedule";
import DeleteDialog from "./components/DialogDeleteSchedule";
import EditDialog from "./components/DialogEditSchedule";

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
            fontSize: {
              md: "16px",
              xs: "10px",
            },
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

const Alerts = React.forwardRef(function Alerts(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ManageSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [searchSchedule, setSearchSchedule] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [severityType, setSeverityType] = useState("error");
  const [message, setMessage] = useState("");
  const [snackbarState, setSnackbarState] = React.useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [editItemData, setEditItemData] = useState();
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

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarState(false);
  };

  const handleCloseLogout = (state) => {
    if (!state) return setOpenDialog(false);
    const fetchDelete = async () => {
      try {
        const response = await api.delete(
          `/Schedule/${selectedSchedule.id}`,
          config
        );
        setSchedules((item) =>
          item.filter((item) => item.id !== selectedSchedule.id)
        );
        setSeverityType("warning");
        setMessage("Jadwal telah dihapus dari daftar");
        setSnackbarState(true);
      } catch (err) {
        // !err.response ? console.log(`Error: ${err.message}`) : console.log(err.response.data);
        // console.log(err.response.status);
        // console.log(err.response.headers);
        setSeverityType("error");
        setMessage("Error: Gagal menghapus, terjadi kesalahan");
        setSnackbarState(true);
      }
    };
    fetchDelete();
    setOpenDialog(false);
  };

  const handleClickOpenLogout = (user) => {
    setSelectedSchedule(user);
    setOpenDialog(true);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const reqConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const response = await api.get("/Schedule/Admin", reqConfig);
        setLoadMessage(null);
        setSchedules(response.data);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        if (err.response.data === "Not Found") console.log(err.response.status);
        // console.log(err.response.headers);
        setLoadMessage("Terjadi kesalahan");
        if (err.response.status === 401 || err.response.status === 403)
          setLoadMessage("Otoritas tidak berlaku silahkan login kembali");
      }
    };

    fetchApi();
  }, [setSchedules, schedules?.length, refreshPage, token]);

  const userFilter = () => {
    return searchSchedule?.length > 0
      ? schedules?.filter(
          (item) =>
            item.courseTitle.includes(searchSchedule) ||
            item.courseId.toString().includes(searchSchedule)
        )
      : schedules;
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
                      Manage Jadwal
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
                        value={searchSchedule}
                        onChange={(e) => setSearchSchedule(e.target.value)}
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
                      <Box sx={{ paddingRight: { md: "10px", xs: "1px" } }}>
                        <Tooltip
                          TransitionComponent={Zoom}
                          title="Tambah Jadwal"
                          placement="top"
                        >
                          <IconButton
                            size="small"
                            sx={{
                              color: "#4f4f4f",
                            }}
                            onClick={() => setOpenAdd(true)}
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
                              <StyledTableCell align="left" size="small">
                                No
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                Kelas
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                Jadwal
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
                                  {row.courseTitle}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {row.jadwal}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  <Grid
                                    container
                                    sx={{ display: { md: "flex", xs: "none" } }}
                                  >
                                    <Grid item mb="0.5vh" xs={10} md={6}>
                                      <Button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenEdit(true);
                                          setEditItemData(row);
                                        }}
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<ModeEdit />}
                                        aria-label="delete"
                                      >
                                        Edit
                                      </Button>
                                    </Grid>
                                    <Grid item mb="0.5vh" xs={10} md={6}>
                                      <Button
                                        onClick={() =>
                                          handleClickOpenLogout(row)
                                        }
                                        variant="outlined"
                                        color="remove"
                                        startIcon={<DeleteForever />}
                                        aria-label="delete"
                                      >
                                        Hapus
                                      </Button>
                                    </Grid>
                                  </Grid>
                                  <Grid
                                    container
                                    sx={{ display: { md: "none", xs: "flex" } }}
                                  >
                                    <Grid item mb="0.5vh" xs={10} md={6}>
                                      <Button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenEdit(true);
                                          setEditItemData(row);
                                        }}
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={
                                          <ModeEdit
                                            sx={{ marginLeft: "10px" }}
                                          />
                                        }
                                        aria-label="delete"
                                      ></Button>
                                    </Grid>
                                    <Grid item mb="0.5vh" xs={10} md={6}>
                                      <Button
                                        onClick={() =>
                                          handleClickOpenLogout(row)
                                        }
                                        variant="outlined"
                                        color="remove"
                                        startIcon={
                                          <DeleteForever
                                            sx={{ marginLeft: "10px" }}
                                          />
                                        }
                                        aria-label="delete"
                                      ></Button>
                                    </Grid>
                                  </Grid>
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
          <DeleteDialog
            selectedSchedule={selectedSchedule}
            logState={openDialog}
            onClose={handleCloseLogout}
          />
          <EditDialog
            selectedSchedule={editItemData}
            openDialog={openEdit}
            onClose={() => {
              setOpenEdit(false);
              setRefreshPage((status) => !status);
            }}
          />
          <AddDialog
            open={openAdd}
            onClose={() => {
              setOpenAdd(false);
              setRefreshPage((status) => !status);
            }}
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

export default ManageSchedule;

import {
  AddCircle,
  DeleteForever,
  List,
  ModeEdit,
  Search,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiBase from "../../api/baseApi";
import api from "../../api/courseCatAPI";
import DialogAddKelas from "../../components/DialogAddKelas";
import DialogDeleteCat from "../../components/DialogDeleteCat";
import DialogEditCat from "../../components/DialogEditCat";
import HeaderSet from "../../components/HeaderSet";
import useAuth from "../../hooks/useAuth";

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
            textTransform: "Capitalize",
            borderRadius: "5px",
          },
        },
      ],
    },
  },
});

const Alerts = React.forwardRef(function Alerts(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Typography className="text">
      {isReadMore ? text.slice(0, 120) : text}
      <span
        style={{
          color: "#5D5FEF",
          fontWeight: "500",
          fontSize: "15px",
          fontFamily: "Poppins",
        }}
        onClick={toggleReadMore}
        className="read-or-hide"
      >
        {isReadMore ? "...lebih lanjut" : "sembunyikan"}
      </span>
    </Typography>
  );
};

function ManageKelas() {
  const [refreshPage, setRefreshPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [listOfBrands, setListOfBrands] = useState([]);
  const [selectedCat, setSelectedCat] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [severityType, setSeverityType] = useState("error");
  const [err, setErr] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [editItemData, setEditItemData] = useState();
  const [openEdit, setOpenEdit] = useState(false);
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseDelete = (state) => {
    if (!state) return setOpenDelete(false);
    const fetchDelete = async () => {
      try {
        const response = await api.delete(`/${selectedCat.id}`, config);
        getListOfBrands();
        setSeverityType("warning");
        setErr("Kategori telah dihapus dari daftar");
        setOpen(true);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        setSeverityType("error");
        setErr("Error: Gagal menghapus, terjadi kesalahan");
        if (err.status === 401 || err.status === 403)
          setErr("Otoritas tidak berlaku silahkan login kembali");
        setOpen(true);
      }
    };
    fetchDelete();
    setOpenDelete(false);
  };

  const handleClickOpenDelete = (category) => {
    setSelectedCat(category);
    setOpenDelete(true);
  };

  const getListOfBrands = async () => {
    await apiBase
      .get("/CourseCategory")
      .then((res) => {
        if (res.status === 200) {
          setListOfBrands(res.data);
          setLoadMessage(null);
        }
      })
      .catch((err) => {
        setLoadMessage("Terjadi kesalahan");
        if (err.status === 401 || err.status === 403)
          setLoadMessage("Otoritas tidak berlaku silahkan login kembali");
      });
  };

  useEffect(() => {
    getListOfBrands();
  }, [refreshPage]);

  const kategoriFilter = () => {
    return searchQuery?.length > 0
      ? listOfBrands?.filter(
          (item) =>
            item.category.includes(searchQuery) ||
            item.id.toString().includes(searchQuery)
        )
      : listOfBrands;
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
            <Container maxWidth="lg" sx={{ mt: { md: 9, xs: 8 }, mb: 4 }}>
              <Grid container spacing={3} mt="3vh">
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
                      Manage Kategori Kursus
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        id="input-with-icon-textfield"
                        label="Pencarian Berdasarkan Nama atau Id Kategori"
                        InputProps={{
                          style: { fontFamily: "Poppins" },
                          endAdornment: <Search color="primary" />,
                        }}
                        InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                        variant="outlined"
                        style={{
                          display: "flex",
                          flexGrow: 1,
                          marginRight: "10px",
                        }}
                      />
                      <Box sx={{ paddingRight: { md: "10px", xs: "1px" } }}>
                        <Tooltip
                          TransitionComponent={Zoom}
                          title="Tambah Kategori"
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
                    <Typography>{loadMessage}</Typography>
                    {kategoriFilter().map((item) => (
                      <Grid key={item.id} style={{ margin: "2% 0" }}>
                        <Grid container mb="2vh">
                          <Grid item xs={12} md={2}>
                            <CardMedia
                              component="img"
                              style={{ objectFit: "contain" }}
                              height="100%"
                              image={`data:image/jpeg;base64,${item.image}`}
                              alt="Image"
                            />
                          </Grid>
                          <Grid item xs={12} md={8}>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{ fontFamily: "Poppins" }}
                              >
                                {item.category}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontFamily: "Poppins" }}
                              >
                                <ReadMore>{item.desc}</ReadMore>
                              </Typography>
                            </CardContent>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={2}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <Grid container spacing={1}>
                              <Grid item mb="0.5%" xs={4} md={12}>
                                <Button
                                  fullWidth
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      md: "16px",
                                    },
                                  }}
                                  variant="outlined"
                                  startIcon={<List />}
                                  color="secondary"
                                  component={Link}
                                  to={`/admin/category`}
                                  state={{ categoryFilter: item.category }}
                                >
                                  Kelas
                                </Button>
                              </Grid>
                              <Grid item mb="0.5%" xs={4} md={12}>
                                <Button
                                  fullWidth
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      md: "16px",
                                    },
                                  }}
                                  startIcon={<ModeEdit />}
                                  variant="outlined"
                                  color="secondary"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpenEdit(true);
                                    setEditItemData(item);
                                  }}
                                >
                                  Edit
                                </Button>
                              </Grid>
                              <Grid item mb="0.5%" xs={4} md={12}>
                                <Button
                                  fullWidth
                                  sx={{
                                    fontSize: {
                                      xs: "10px",
                                      md: "16px",
                                    },
                                  }}
                                  variant="outlined"
                                  color="remove"
                                  startIcon={<DeleteForever />}
                                  onClick={() => handleClickOpenDelete(item)}
                                >
                                  Hapus
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Box
                          sx={{
                            height: "0px",
                            borderBottom: "0.5px solid gray",
                          }}
                        ></Box>
                      </Grid>
                    ))}
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Toolbar />

          <DialogAddKelas
            open={openAdd}
            onClose={() => {
              setOpenAdd(false);
              setRefreshPage((status) => !status);
            }}
          />

          <DialogEditCat
            selectedCat={editItemData}
            openDialog={openEdit}
            onClose={() => {
              setOpenEdit(false);
              setRefreshPage((status) => !status);
            }}
          />

          <DialogDeleteCat
            selectedCat={selectedCat}
            logState={openDelete}
            onClose={handleCloseDelete}
          />
        </Box>
      </ThemeProvider>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alerts
            onClose={handleClose}
            severity={severityType}
            sx={{ width: "100%" }}
          >
            {err}
          </Alerts>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default ManageKelas;

import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import HeaderbarAdmin from "../component/HeaderBarAdmin";
import HeaderSet from "../../components/HeaderSet";
// import ManageBrandDialogAddItem from '../components/ManageBrandDialogAddItem';
// import ManageBrandDialogEditItem from '../components/ManageBrandDialogEditItem';
// import { APIRequest } from '../components/APICalls';
import axios from "axios";
import api from "../../api/courseCatAPI";
import DialogAddKelas from "../../components/DialogAddKelas";
import DialogDeleteCat from "../../components/DialogDeleteCat";
import DialogEditCat from "../../components/DialogEditCat";
// import { getKategoriKelas, getMusic } from "../../JSON Data/Data";
// let kategoris = getKategoriKelas();
// let musics = getMusic();

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
});

const Alerts = React.forwardRef(function Alerts(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ManageKelas() {
  /* useStates dan metode-metode untuk keperluan GET daftar semua merk */
  const [refreshPage, setRefreshPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [listOfBrands, setListOfBrands] = useState([]);
  // const [category, setCat] = useState([]);
  const [selectedCat, setSelectedCat] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [severityType, setSeverityType] = useState("error");
  const [err, setErr] = useState("");
  const [open, setOpen] = React.useState(false);

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
        const response = await api.delete(`/${selectedCat.id}`);
        console.log(response.data);
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
        setSeverityType("danger");
        setErr("Error: Gagal menghapus, terjadi kesalahan");
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
    await axios
      .get("https://localhost:7132/api/CourseCategory")
      .then((res) => {
        if (res.status === 200) {
          setListOfBrands(res.data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getListOfBrands();
  }, [refreshPage]);
  /* useStates untuk keperluan GET daftar semua merk */

  // useEffect(() => {
  // 	getListOfBrands();
  // }, [searchQuery]);

  // useEffect(() => {
  //   console.log(searchQuery);
  //   console.log(listOfBrands);
  // }, [searchQuery]);

  /* useStates untuk membuka dialog untuk POST merk baru */
  const [openAdd, setOpenAdd] = useState(false);

  /* useStates untuk membuka dialog untuk POST edit merk */
  const [editItemData, setEditItemData] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  /* useStates untuk membuka dialog untuk POST edit merk */

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
          {/* Header bar */}
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

            {/* DIALOG ADD*/}
            <DialogAddKelas
              open={openAdd}
              onClose={() => {
                setOpenAdd(false);
                setRefreshPage((status) => !status);
              }}
            />

            {/* DIALOG EDIT */}
            <DialogEditCat
              open={openEdit}
              onClose={() => {
                setOpenEdit(false);
                setRefreshPage((status) => !status);
              }}
            />
            {/* <ManageBrandDialogEditItem open={openEdit} editItemData={editItemData} onClose={() => { setOpenEdit(false); setRefreshPage((status) => !status); }} /> */}

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
                      Manage Kategori Kursus
                    </Typography>

                    {/* BOX PENCARIAN DATA */}
                    <div style={{ display: "flex", padding: "20px 0" }}>
                      <TextField
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        id="input-with-icon-textfield"
                        label="Pencarian Berdasarkan Nama atau Id Kategori"
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

                    {kategoriFilter().map((item) => (
                      <Card key={item.id} style={{ margin: "2% 0" }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={2}>
                            <CardMedia
                              component="img"
                              style={{ objectFit: "contain" }}
                              height="100"
                              image={`data:image/jpeg;base64,${item.image}`}
                              alt="Image"
                            />
                          </Grid>
                          <Grid item xs={12} md={10}>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {item.category}
                              </Typography>
                              <Typography variant="h7" color="div">
                                Id {item.id}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {item.desc}
                              </Typography>

                              <Grid container spacing={1}>
                                <Grid item xs={12} md={4}>
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    component={Link}
                                    to={`/admin/category`}
                                  >
                                    Daftar Kelas
                                  </Button>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setOpenEdit(true);
                                      setEditItemData(item);
                                    }}
                                  >
                                    Edit Kategori
                                  </Button>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleClickOpenDelete(item)}
                                  >
                                    Hapus Kategori
                                  </Button>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Grid>
                        </Grid>
                      </Card>
                    ))}
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
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

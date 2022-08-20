import {
  AddCircle,
  DeleteForever,
  ModeEdit,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Input,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import courseApi from "../../api/courseAPI";

// import SearchIcon from '@mui/icons-material/Search';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HideImageIcon from "@mui/icons-material/HideImage";

// import { getNewArrivals } from '../jsonData/Data';
// import HeaderbarAdmin from "../component/HeaderBarAdmin";
// import ManageProductDialogAddItem from '../components/ManageProductDialogAddItem'
// import ManageProductDialogEditItem from '../components/ManageProductDialogEditItem'
// // import ManageProductDialogDeleteItem from '../components/ManageProductDialogDeleteItem';
// import { APIRequest } from '../components/APICalls';
import DialogDeleteCourse from "../../components/DialogDeleteCourse";
import HeaderSet from "../../components/HeaderSet";
import useAuth from "../../hooks/useAuth";
import numberFormat from "../../utilities/NumbeFormat";
import DialogAddCourse from "./components/DialogAddCourse";
import DialogEditCourse from "./components/DialogEditCourse";

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
});

function ManageKategori(
  props = {
    open: false,
    id: props.id,
    onClose: () => {},
    onAdd: () => {},
  }
) {
  /* useStates untuk keperluan POST merk baru */
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseCategoryId, setCourseCategoryId] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [base64, setBase64] = useState("");
  const [err, setErr] = useState("");
  const location = useLocation();
  const categoryFilter = location.state?.categoryFilter;
  const [search, setSearch] = useState(categoryFilter ? categoryFilter : "");
  const [refreshPage, setRefreshPage] = useState(false);
  // const [searchQuery, setSearchQuery] = useState();
  const [listOfBrands, setListOfBrands] = useState([]);
  const [openAll, setOpenAll] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [editItemData, setEditItemData] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [severityType, setSeverityType] = useState("error");
  const [selectedCou, setSelectedCou] = useState({});
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

  const getListOfBrands = async () => {
    await courseApi
      .get("/LandingPage")
      .then((res) => {
        if (res.status === 200) {
          setListOfBrands(res.data);
          setLoadMessage(null);
        }
      })
      .catch((err) => {
        setLoadMessage("Terjadi kesalahan");
      });
  };

  useEffect(() => {
    getListOfBrands();
  }, [refreshPage]);

  const filterList = () => {
    return search?.length > 0
      ? listOfBrands?.filter(
          (item) =>
            item.category.includes(search) || item.courseTitle.includes(search)
        )
      : listOfBrands;
  };

  /* Methods to convert image input into base64 */
  const onFileSubmit = (e) => {
    e.preventDefault();
    console.log(base64);
  };
  const onChange = (e) => {
    console.log("file", e.target.files[0]);
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const handleClickOpenAll = () => {
    setOpenAll(true);
  };

  const handleCloseAll = () => {
    setOpenAll(false);
  };

  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setBase64(btoa(binaryString));
  };
  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log("reader", reader);
    console.log("file", file);
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setOpen(true);
  };

  const handleCloseDelete = (state) => {
    if (!state) return setOpenDelete(false);
    const fetchDelete = async () => {
      try {
        const response = await courseApi.delete(`/${selectedCou.id}`, config);
        console.log(response.data);
        getListOfBrands();
        setSeverityType("warning");
        setErr("Kelas telah dihapus dari daftar");
        setOpen(true);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        setSeverityType("error");
        setErr("Error: Gagal menghapus, terjadi kesalahan");
        if (err.response.status === 401 || err.response.status === 403)
          setErr("Otoritas tidak berlaku silahkan login kembali");
        setOpen(true);
      }
    };
    fetchDelete();
    setOpenDelete(false);
  };

  const handleClickOpenDelete = (course) => {
    setSelectedCou(course);
    setOpenDelete(true);
  };

  /* useStates dan metode-metode untuk keperluan Add kelas */
  const [openAdd, setOpenAdd] = useState(false);
  /* useStates untuk keperluan POST Add Product */

  /* useStates dan metode-metode untuk keperluan Edit kelas */
  const [editItemProduct, setEditItemProduct] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  /* useStates untuk keperluan POST Edit Product */

  const renderList = (item, index) => {
    return (
      <Grid item xs={12} sm={3} key={index}>
        <Grid>
          <Card>
            <CardActionArea disable>
              <Box
                style={{
                  height: 200,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.courseImage ? (
                  <img
                    src={`data:image/jpeg;base64,${item.courseImage}`}
                    alt="No Image"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <HideImageIcon sx={{ height: "120px", width: "120px" }} />
                )}
              </Box>

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "120px",
                  textAlign: "center",
                }}
              >
                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    overflowWrap: "break-word",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.courseTitle}
                </Typography>

                {/* Brand Name */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    overflowWrap: "break-word",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.category}
                </Typography>

                {/* Price */}
                <Typography variant="subtitle1">
                  IDR {numberFormat(item.price)}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions
              style={{ backgroundColor: "", justifyContent: "center" }}
            >
              {/* Edit button */}
              <Button
                startIcon={<ModeEdit />}
                variant="outlined"
                size="medium"
                color="secondary"
                style={{ backgroundColor: "F2C94C", color: "black" }}
                onClick={async (e) => {
                  await e.preventDefault();
                  setOpenEdit(true);
                  setEditItemData(item);
                }}
              >
                Edit
              </Button>

              {/* Delete button */}
              <Button
                startIcon={<DeleteForever />}
                variant="outlined"
                size="medium"
                color="remove"
                style={{ backgroundColor: "F2C94C" }}
                onClick={() => handleClickOpenDelete(item)}
              >
                Hapus
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  };

  return (
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

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {/* TITLE */}
                  <Typography
                    variant="h5"
                    color="secondary"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { md: "24px", xs: "18px" },
                    }}
                  >
                    Manage Kelas
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
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      id="input-with-icon-textfield"
                      label="Pencarian Berdasarkan Nama Kelas"
                      InputProps={{
                        endAdornment: <Search color="primary" />,
                      }}
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
                        title="Add Product Items"
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
                    <></>
                  )}

                  {/* ITEM LIST */}
                  <Grid container spacing={2}>
                    {filterList().map((item, index) => renderList(item, index))}
                  </Grid>

                  {/* DIALOG ADD*/}
                  <DialogAddCourse
                    open={openAdd}
                    onClose={() => {
                      setOpenAdd(false);
                      setRefreshPage((status) => !status);
                    }}
                  />

                  {/* DIALOG EDIT */}
                  <DialogEditCourse
                    selectedCourse={editItemData}
                    openDialog={openEdit}
                    onClose={() => {
                      setOpenEdit(false);
                      setRefreshPage((status) => !status);
                    }}
                  />
                  <DialogDeleteCourse
                    selectedCat={selectedCou}
                    logState={openDelete}
                    onClose={handleCloseDelete}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ManageKategori;

// function Copyright(props) {
// return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//     {'Copyright © '}
//     <Link color="inherit" href="/">
//         1ELECTRONIC
//     </Link>{' '}
//     {new Date().getFullYear()}
//     {'.'}
//     </Typography>
// );
// }

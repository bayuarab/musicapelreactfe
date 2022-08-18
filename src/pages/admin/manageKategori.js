import AddIcon from "@mui/icons-material/Add";
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Container,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	Icon,
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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// import SearchIcon from '@mui/icons-material/Search';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HideImageIcon from "@mui/icons-material/HideImage";
import { DeleteForever, ModeEdit, Search } from "@mui/icons-material";

// import { getNewArrivals } from '../jsonData/Data';
// import HeaderbarAdmin from "../component/HeaderBarAdmin";
// import ManageProductDialogAddItem from '../components/ManageProductDialogAddItem'
// import ManageProductDialogEditItem from '../components/ManageProductDialogEditItem'
// // import ManageProductDialogDeleteItem from '../components/ManageProductDialogDeleteItem';
// import { APIRequest } from '../components/APICalls';
import StyledEngine from "@mui/styled-engine";
import HeaderSet from "../../components/HeaderSet";
import useAuth from "../../hooks/useAuth";
import { getKategoriKelas, getMusic } from "../../JSON Data/Data";
import numberFormat from "../../utilities/NumbeFormat";
import DialogAddCourse from "./components/DialogAddCourse";
import DialogEditCourse from "./components/DialogEditCourse";
import { useParams } from "react-router-dom";

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
		onClose: () => { },
		onAdd: () => { },
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

	const getListOfBrands = async () => {
		await axios
			.get("https://localhost:7132/api/Course/LandingPage")
			.then((res) => {
				if (res.status === 200) {
					setListOfBrands(res.data);
					setRefreshPage((status) => !status);
				}
			})
			.catch((err) => { });
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
	/* Methods to convert image input into base64 */

	const [idToDelete, setIdToDelete] = useState();
	const deleteCourse = async () => {
		console.log("idtodelete", idToDelete);

		await axios
			.delete(`https://localhost:7132/api/Course/${idToDelete}`, { idToDelete })
			.then((res) => {
				if (res.status === 200) {
					setIdToDelete(res.data);
					console.log(res.data);
					setRefreshPage((status) => !status);
				}
			})
			.catch((err) => { });
	};
	useEffect(() => {
		deleteCourse();
	}, [refreshPage]);

	/* useStates dan metode-metode untuk keperluan Add kelas */
	const [openAdd, setOpenAdd] = useState(false);
	/* useStates untuk keperluan POST Add Product */

	/* useStates dan metode-metode untuk keperluan Edit kelas */
	const [editItemProduct, setEditItemProduct] = useState();
	const [openEdit, setOpenEdit] = useState(false);
	/* useStates untuk keperluan POST Edit Product */

	const { auth } = useAuth();

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
									{item.id} - {item.courseTitle}
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
								variant="contained"
								size="medium"
								style={{ backgroundColor: "F2C94C", color: "black" }}
								onClick={async (e) => {
									await e.preventDefault();
									setRefreshPage((status) => !status);
									setOpenEdit(true);
								}}
							>
								Edit
							</Button>

							{/* Delete button */}
							<Button
								variant="outlined"
								size="medium"
								style={{ backgroundColor: "F2C94C", color: "black" }}
								onClick={async (e) => {
									await e.preventDefault();
									await setIdToDelete(item.id);
									await deleteCourse();
									setRefreshPage((status) => !status);
								}}
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
										style={{ fontWeight: "bold" }}
									>
										Manage Kelas
									</Typography>

									{/* BOX PENCARIAN DATA */}
									<div style={{ display: "flex", padding: "20px 0" }}>
										<TextField
											value={search}
											onChange={(e) => setSearch(e.target.value)}
											id="input-with-icon-textfield"
											label="Pencarian Berdasarkan Nama Kategori"
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
										<Tooltip
											TransitionComponent={Zoom}
											title="Add Product Items"
											placement="top"
										>
											<Button
												variant="contained"
												color="primary"
												display="none"
												onClick={() => {
													setOpenAdd(true);
												}}
												style={{
													width: "auto",
													backgroundColor: "#F2C94C",
													borderRadius: "",
													color: "white",
												}}
											>
												Tambah Baru
											</Button>
										</Tooltip>
									</div>

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
										open={openEdit}
										editItemProduct={editItemProduct}
										onClose={() => {
											setOpenEdit(false);
											setRefreshPage((status) => !status);
										}}
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

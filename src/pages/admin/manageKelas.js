import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, ButtonGroup, Card, CardContent, CardMedia, Container, Grid, Paper, TextField, Toolbar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import HeaderbarAdmin from "../component/HeaderBarAdmin";
import HeaderSet from "../../components/HeaderSet";
import useAuth from "../../hooks/useAuth";
// import ManageBrandDialogAddItem from '../components/ManageBrandDialogAddItem';
// import ManageBrandDialogEditItem from '../components/ManageBrandDialogEditItem';
// import { APIRequest } from '../components/APICalls';
import axios from "axios";
import APIRequest from "../../components/APICalls";
import DialogAddKelas from "../../components/DialogAddKelas";
import DialogEditCat from "../../components/DialogEditCat";
import { getKategoriKelas, getMusic } from "../../JSON Data/Data";

let kategoris = getKategoriKelas();
let musics = getMusic();

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

function ManageKelas() {
	/* useStates dan metode-metode untuk keperluan GET daftar semua merk */
	const [refreshPage, setRefreshPage] = useState(false);
	const [searchQuery, setSearchQuery] = useState();
	const [listOfBrands, setListOfBrands] = useState([]);
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
	}, [searchQuery, refreshPage]);
	/* useStates untuk keperluan GET daftar semua merk */

	/* useStates untuk membuka dialog untuk POST merk baru */
	const [openAdd, setOpenAdd] = useState(false);
	/* useStates untuk membuka dialog untuk POST merk baru */

	/* useStates untuk membuka dialog untuk POST edit merk */
	const [editItemData, setEditItemData] = useState();
	const [openEdit, setOpenEdit] = useState(false);
	/* useStates untuk membuka dialog untuk POST edit merk */

	const { auth } = useAuth();

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
						backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
						flexGrow: 1,
						height: "100vh",
						overflow: "auto",
					}}>
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
								<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
									{/* TITLE */}
									<Typography variant="h5" color="secondary" style={{ fontWeight: "bold" }}>
										Manage Kategori Kursus
									</Typography>

									{/* BOX PENCARIAN DATA */}
									<div style={{ display: "flex", padding: "20px 0" }}>
										<TextField
											// value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
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
										<Button
											variant="contained"
											color="primary"
											onClick={() => {
												setOpenAdd(true);
											}}
											style={{ width: "auto", color: "white" }}>
											Tambah Baru
										</Button>
									</div>

									{listOfBrands.map((invoice) => (
										<Card key={invoice.id} style={{ margin: "2% 0" }}>
											<Grid container spacing={3}>
												<Grid item xs={12} md={2}>
													<CardMedia component="img" style={{ objectFit: "contain" }} height="100" image={`data:image/jpeg;base64,${invoice.image}`} alt="Image" />
												</Grid>
												<Grid item xs={12} md={10}>
													<CardContent>
														<Typography gutterBottom variant="h5" component="div">
															{invoice.category}
														</Typography>
														<Typography variant="h7" color="div">
															Id {invoice.id}
														</Typography>
														<Typography variant="body2" color="text.secondary">
															{invoice.desc}
														</Typography>

														<Grid container spacing={1}>
															<Grid item xs={12} md={4}>
																<Button fullWidth variant="outlined" color="primary" component={Link} to={`/category/${invoice.id}`}>
																	Daftar Kategori
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
																		setEditItemData(invoice);
																	}}>
																	Edit Kategori
																</Button>
															</Grid>
															<Grid item xs={12} md={4}>
																<Button
																	fullWidth
																	variant="outlined"
																	color="primary"
																	// onClick={async (e) => { await e.preventDefault(); await setIdToDelete(invoice.id); await deleteBrand(); }}
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
			</Box>
		</ThemeProvider>
	);
}

export default ManageKelas;

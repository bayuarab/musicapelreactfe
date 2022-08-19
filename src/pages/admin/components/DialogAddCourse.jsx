import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, TextField, Grid, DialogTitle, DialogContent, Input, Stack, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

function DialogAddCourse(
	props = {
		open: false,
		id: 0,
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
	const [open, setOpen] = React.useState(false);
	const [refreshPage, setRefreshPage] = useState(false);
	const [scheduleCourse, setScheduleCourse] = useState("");
	const [severityType, setSeverityType] = useState("error");
	/* useStates untuk keperluan POST merk baru */

	const Alerts = React.forwardRef(function Alerts(props, ref) {
		return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
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
	};
	/* Methods to convert image input into base64 */

	/* Method to POST new Brand Item */
	const postKelas = () => {
		const postDataa = { courseTitle: courseTitle, courseCategoryId: scheduleCourse, courseDesc: courseDesc, price: coursePrice, courseimage: base64 };
		console.log(postDataa);
		axios
			.post("https://localhost:7132/api/Course", postDataa)
			.then((res) => {
				if (res.status === 200) {
					console.log(res.status);
					console.log(res.data);
					props.onClose();
					setRefreshPage((status) => !status);
					setOpen(true);
					setSeverityType("success");
					setErr("Berhasil menambahkan kategori");
				}
			})
			.catch((err) => {
				console.log(err.response.data);
				setSeverityType("error");
				setErr("Error : Kategori Tidak Valid");
				setOpen(true);
			});
		
	};
	// useEffect(() => {
	// 	postKelas();
	// }, [refreshPage]);
	/* Method to POST new Brand Item */

	
	const [cekKategori, setCekKategori] = useState([]);
	const getCekKategori = async (courseId) => {
		await axios
			.get(`https://localhost:7132/api/CourseCategory/Footer`)
			.then((res) => {
				if (res.status === 200) {
					setCekKategori(res.data);
					console.log("res data", res.data);
				}
			})
			.catch((err) => {});
	};
	useEffect(() => {
		getCekKategori();
		}, []);

	return (
		<div>
			<Dialog open={props.open} onClose={props.onClose}>
				<div style={{ padding: "20px", width: "100%" }}>
					{/* TITLE */}
					<DialogTitle>Tambahkan Kelas Baru</DialogTitle>
					<DialogContent>
						{/* FORM INPUT */}
						<form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)}>
							{imagePreview === "" ? "" : <img style={{ width: "100%", height: "100%" }} src={imagePreview} alt="upload" />}
							<Input type="file" name="avatar" id="file" accept=".jpef, .png, .jpg" onChange={photoUpload} src={imagePreview} />
						</form>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								postKelas();
							}}>
							<Grid columnGap="10px" justifyContent="center" style={{ paddingBottom: "10px" }}>
								<Grid>
									<Box noValidate>
										<TextField id="name" value={courseTitle} label="Nama Kelas" onChange={(e) => setCourseTitle(e.target.value)} style={{ display: "flex", flexGrow: 1, marginTop: "20px", marginBottom: "20px" }} />
										<FormControl fullWidth>
											<InputLabel>Pilih Kategori Kelas</InputLabel>
											<Select
												label="Pilih Kategori Kelas"
												value={scheduleCourse}
												onChange={(e) => setScheduleCourse(e.target.value)}
												size="medium"
											>
												{cekKategori.map((kategori, i) => (
													<MenuItem value={kategori.id}>{kategori.category}</MenuItem>
												))}
											</Select>
										</FormControl>
										<TextField id="description" value={courseDesc} label="Deskripsi Kelas" onChange={(e) => setCourseDesc(e.target.value)} style={{ display: "flex", flexGrow: 1, marginTop: "20px", marginBottom: "20px" }} />
										<TextField id="price" value={coursePrice} label="Harga Kelas" onChange={(e) => setCoursePrice(e.target.value)} style={{ display: "flex", flexGrow: 1, marginTop: "20px", marginBottom: "20px" }} />

										<Button disabled={courseTitle === "" || courseDesc === "" || coursePrice === "" || scheduleCourse === "" || base64 === "" ? true : false} type="submit" fullWidth variant="contained" style={{ display: "flex", flexGrow: 1, marginTop: "20px", marginBottom: "20px" }}>
											Tambahkan Kelas Baru
										</Button>
									</Box>
								</Grid>
							</Grid>
						</form>
					</DialogContent>
				</div>
			</Dialog>
			<Stack spacing={2} sx={{ width: "100%" }}>
				<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
					<Alerts onClose={handleClose} severity={severityType} sx={{ width: "100%" }}>
						{err}
					</Alerts>
				</Snackbar>
			</Stack>
		</div>
	);
}

export default DialogAddCourse;

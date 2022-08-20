import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, Grid, Input, Snackbar, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { APIRequest } from "./APICalls";

function DialogAddKelas(
	props = {
		open: false,
		id: 0,
		onClose: () => {},
		onAdd: () => {},
	}
) {
	/* useStates untuk keperluan POST merk baru */
	const [categoryName, setcategoryName] = useState("");
	const [categoryDescription, setcategoryDescription] = useState("");
	const [imagePreview, setImagePreview] = useState("");
	const [base64, setBase64] = useState("");
	const [err, setErr] = useState("");
	const [open, setOpen] = React.useState(false);
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
		const postDataa = {
			category: categoryName,
			image: base64,
			desc: categoryDescription,
		};
		console.log(postDataa);
		axios
			.post("https://localhost:7132/api/CourseCategory", postDataa)
			.then((res) => {
				if (res.status === 200) {
					console.log(res.status);
					console.log(res.data);
					setSeverityType("success");
					setErr("Berhasil menambahkan kategori");
					setOpen(true);
					props.onClose();
				}
			})
			.catch((err) => {
				console.log(err.response.data);
				setSeverityType("error");
				setErr("Error : Kategori Tidak Valid");
				setOpen(true);
			});
	};
	/* Method to POST new Brand Item */


	return (
		<div>
			<Dialog open={props.open} onClose={props.onClose}>
				<div style={{ padding: "20px", width: "100%" }}>
					{/* TITLE */}
					<DialogTitle>Tambahkan Kategori Baru</DialogTitle>
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
										<TextField
											id="name"
											value={categoryName}
											label="Nama Kategori"
											onChange={(e) => setcategoryName(e.target.value)}
											style={{
												display: "flex",
												flexGrow: 1,
												marginTop: "20px",
												marginBottom: "20px",
											}}
										/>
										<TextField
											id="description"
											value={categoryDescription}
											label="Deskripsi Kategori"
											onChange={(e) => setcategoryDescription(e.target.value)}
											style={{
												display: "flex",
												flexGrow: 1,
												marginTop: "20px",
												marginBottom: "20px",
											}}
										/>

										<Button
											disabled={categoryName === "" || categoryDescription === "" || base64 === "" ? true : false}
											type="submit"
											fullWidth
											variant="contained"
											style={{
												display: "flex",
												flexGrow: 1,
												marginTop: "20px",
												marginBottom: "20px",
											}}>
											Tambah Kategori
										</Button>
									</Box>
								</Grid>
							</Grid>
						</form>
					</DialogContent>
				</div>
			</Dialog>
			<Stack spacing={2} sx={{ width: "100%" }}>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alerts onClose={handleClose} severity={severityType} sx={{ width: "100%" }}>
						{err}
					</Alerts>
				</Snackbar>
			</Stack>
		</div>
	);
}

export default DialogAddKelas;

import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, Grid, Snackbar, Stack, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import api from "../../../api/baseApi";
import React, { useState, useEffect } from "react";

function DialogAddJadwal(
	props = {
		open: false,
		id: 0,
		onClose: () => {},
		onAdd: () => {},
	}
) {
	const [jadwal, setJadwal] = useState("");
	const [courseId, setCourseId] = useState("");
	const [err, setErr] = useState("");
	const [open, setOpen] = React.useState(false);
	const [listCourse, setListCourse] = useState([]);
	const [severityType, setSeverityType] = useState("error");
	const Alerts = React.forwardRef(function Alerts(props, ref) {
		return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const postJadwal = async () => {
		const postDataa = {
			jadwal: jadwal,
			courseId: courseId,
		};
		try {
			const res = await api.post("/Schedule", postDataa);
			if (res.status === 200) {
				console.log(res.data);
				setSeverityType("success");
				setErr("Berhasil menambahkan jadwal kelas");
				setOpen(true);
				props.onClose();
			}
		} catch (err) {
			console.log(err.response.data);
			setSeverityType("error");
			setErr("Error : Jadwal Tidak Valid");
			setOpen(true);
		}
	};

	useEffect(() => {
		const getCourse = async () => {
			try {
				const response = await api.get("Course/AdminDialog");
				console.log(response.data);
				setListCourse(response.data);
			} catch (err) {
				!err.response ? console.log(`Error: ${err.message}`) : console.log(err.response.data);
				if (err.response.data === "Not Found") console.log(err.response.status);
				console.log(err.response.headers);
			}
		};
		getCourse();
	}, [setListCourse]);

	return (
		<div>
			<Dialog open={props.open} onClose={props.onClose}>
				<div style={{ padding: "20px", width: "100%" }}>
					{/* TITLE */}
					<DialogTitle>Tambahkan Jadwal Kelas Baru</DialogTitle>
					<DialogContent>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								postJadwal();
							}}>
							<Grid columnGap="10px" justifyContent="center" style={{ paddingBottom: "10px" }}>
								<Grid>
									<Box noValidate>
										<TextField
											id="name"
											value={jadwal}
											label="Jadwal"
											onChange={(e) => setJadwal(e.target.value)}
											style={{
												display: "flex",
												flexGrow: 1,
												marginTop: "20px",
												marginBottom: "20px",
											}}
										/>
										{/* <TextField
											id="description"
											value={courseId}
											label="Id Kelas"
											onChange={(e) => setCourseId(e.target.value)}
											style={{
												display: "flex",
												flexGrow: 1,
												marginTop: "20px",
												marginBottom: "20px",
											}}
										/>*/}
										<InputLabel>Pilih Kelas</InputLabel>
										<Select label="Pilih Kelas" value={courseId} onChange={(e) => setCourseId(e.target.value)} size="medium">
											{listCourse.map((course, i) => (
												<MenuItem value={course.id}>{course.courseTitle}</MenuItem>
											))}
										</Select>

										<Button
											disabled={jadwal === "" || courseId === "" ? true : false}
											type="submit"
											fullWidth
											variant="contained"
											style={{
												display: "flex",
												flexGrow: 1,
												marginTop: "20px",
												marginBottom: "20px",
											}}>
											Tambahkan Jadwal Baru
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

export default DialogAddJadwal;

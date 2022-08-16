import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, Grid, Snackbar, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

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

	/* Method to POST new Brand Item */
	const postJadwal = () => {
		const postDataa = {
			jadwal: jadwal,
			courseId: courseId,
		};
		console.log(postDataa);
		axios
			.post("https://localhost:7132/api/Schedule", postDataa)
			.then((res) => {
				if (res.status === 200) {
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
										<TextField
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
										/>

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

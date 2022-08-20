import { Box, Button, Container, CssBaseline, FormControl, TextField, Typography, Stack, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import api from "../../api/userAPI";

//---------------
export default function Login() {
	const [email, setEmail] = useState("");
	const [err, setErr] = useState("");
	const [ok, setOk] = useState("");
	const [open, setOpen] = React.useState(false);

	const Alerts = React.forwardRef(function Alerts(props, ref) {
		return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const addEmail = (event) => {
		setEmail(event.target.value);
	};

	const goLogin = (event) => {
		event.preventDefault();

		const dataLogin = {
			email: email,
		};

		setEmail("");

		const fetchApi = async () => {
			try {
				const response = await api.post("/CheckEmail", dataLogin);
				console.log(response.status);
				setOk("Sukses");
				setErr("");
			} catch (err) {
				!err.response ? console.log(`Error: ${err.message}`) : console.log(err.response.data);
				setErr("Email Invalid");
				setOk("");
				console.log(err.response.status);
				console.log(err.response.headers);
			}
			setOpen(true);
		};
		fetchApi();
	};

	return (
		<Container>
			<CssBaseline />
			<center>
				<Box>
					<Box
						sx={{
							width: {
								lg: "40vw",
								md: "50vw",
								sm: "60vw",
								xs: "80vw",
							},
						}}>
						<Box mt="10vh" sx={{ textAlign: "left" }}>
							<Typography
								mb="2.5vh"
								sx={{
									fontSize: {
										lg: "24px",
										md: "23px",
										xs: "18px",
									},
									fontFamily: "Poppins",
								}}>
								Lupa password kamu?
							</Typography>
							<Typography
								sx={{
									fontSize: {
										lg: "16px",
										md: "15px",
										xs: "13px",
									},
									fontFamily: "Poppins",
								}}>
								Silahkan isi email dulu
							</Typography>
						</Box>
						<Box mt="4vh">
							<form>
								<FormControl sx={{ width: "100%" }}>
									<TextField id="txtEmail" margin="normal" required fullWidth label="Email" name="email" autoComplete="email" autoFocus value={email} onChange={(event) => addEmail(event)} />
								</FormControl>
								<Box mt="2vh" sx={{ textAlign: "left" }}>
									<Button
										disabled={email === "" ? true : false}
										onClick={(event) => goLogin(event)}
										sx={{
											borderRadius: "7px",
											fontFamily: "Poppins",
											backgroundColor: "#5D5FEF",
											fontSize: {
												lg: "16px",
												md: "15px",
												xs: "13px",
											},
											textTransform: "Capitalize",
											width: "hug",
											height: "hug",
										}}
										variant="contained">
										Kirim
									</Button>
								</Box>
							</form>
						</Box>
					</Box>
				</Box>
			</center>
			<Stack spacing={2} sx={{ width: "100%" }}>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					{ok === "" ? (
						<Alerts onClose={handleClose} severity="error" sx={{ width: "100%" }}>
							{err}
						</Alerts>
					) : (
						<Alerts onClose={handleClose} severity="success" sx={{ width: "100%" }}>
							{ok}
						</Alerts>
					)}
				</Snackbar>
			</Stack>
		</Container>
	);
}

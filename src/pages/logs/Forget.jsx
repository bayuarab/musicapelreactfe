import { Box, Button, Container, CssBaseline, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import api from "../../api/userAPI";

//---------------
export default function Login() {
	const [email, setEmail] = useState("");
	const [err, setErr] = useState("");
	const [ok, setOk] = useState("");

	const addEmail = (event) => {
		setEmail(event.target.value);
	};

	const goLogin = (event) => {
		event.preventDefault();

		if (email === "") {
			return setErr("Field cannot be empty");
		}

		const dataLogin = {
			email: email,
		};

		setEmail("");

		const fetchApi = async () => {
			try {
				const response = await api.post("/CheckEmail", dataLogin);
				setOk(response.data);
				setErr("");
			} catch (err) {
				!err.response ? console.log(`Error: ${err.message}`) : console.log(err.response.data);
				setErr(err.response.data);
				setOk("");
				console.log(err.response.status);
				console.log(err.response.headers);
			}
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
						<Box mt="15vh" sx={{ textAlign: "left" }}>
							<Typography
								mb="2.5vh"
								sx={{
									fontSize: {
										lg: "24px",
										md: "23px",
										xs: "18px",
									},
								}}>
								Anda lupa password anda?
							</Typography>
							<Typography
								sx={{
									fontSize: {
										lg: "16px",
										md: "15px",
										xs: "13px",
									},
								}}>
								Silahkan isi email anda
							</Typography>
						</Box>
						<Box mt="4vh">
							<form>
								<FormControl sx={{ width: "100%" }}>
									<TextField id="txtEmail" margin="normal" required fullWidth label="Email" name="email" autoComplete="email" autoFocus value={email} onChange={(event) => addEmail(event)} />
								</FormControl>
								<Typography sx={{ color: "green", fontSize: "12px" }}>{ok}</Typography>
								<Typography sx={{ color: "red", fontSize: "12px" }}>{err}</Typography>
								<Box mb="2vh" sx={{ textAlign: "left" }}>
									<Button
										onClick={(event) => goLogin(event)}
										sx={{
											borderRadius: "7px",
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
		</Container>
	);
}

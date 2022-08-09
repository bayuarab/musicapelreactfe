import { Box, Button, FormControl, TextField, Typography, Container, CssBaseline, Link } from "@mui/material";
import React, { useState } from "react";
import api from "../api/userAPI";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState("");

	const addEmail = (event) => {
		setEmail(event.target.value);
	};

	const addPassword = (event) => {
		setPassword(event.target.value);
	};

	const handleLogin = (event) => {
		event.preventDefault();

		if (email === "" || password === "") {
			return setErr("Field cannot be empty");
		}

		const dataLogin = {
			email: email,
			password: password,
		};

		setEmail("");
		setPassword("");

		const fetchApi = async () => {
			try {
				const response = await api.post("/Login", dataLogin);
				console.log(response.data);
			} catch (err) {
				!err.response ? console.log(`Error: ${err.message}`) : console.log(err.response.data);
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
								Selamat Datang Musikers!
							</Typography>
							<Typography
								sx={{
									fontSize: {
										lg: "16px",
										md: "15px",
										xs: "13px",
									},
								}}>
								Login dulu yuk
							</Typography>
						</Box>
						<Box mt="4vh">
							<form>
								<FormControl sx={{ width: "100%" }}>
									<TextField id="txtEmail" margin="normal" required fullWidth label="Email" name="email" autoComplete="email" autoFocus value={email} onChange={(event) => addEmail(event)} />
									<TextField margin="normal" required fullWidth name="password" label="Password" type="password" autoComplete="current-password" id="txtPassword" value={password} onChange={(event) => addPassword(event)} />
								</FormControl>
								<Typography sx={{ color: "red", fontSize: "12px" }}>{err}</Typography>
								<Link
									href="forget"
									style={{
										itemAlign: "right",
										fontSize: {
											lg: "16px",
											md: "15px",
											xs: "13px",
										},
										textDecoration: "None",
										color: "black",
									}}>
									Lupa kata sandi
								</Link>
								<Box mb="2vh" sx={{ textAlign: "left" }}>
									<Button
										onClick={(event) => handleLogin(event)}
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
										Masuk
									</Button>
								</Box>
							</form>
							<Link
								href="/registrasi"
								sx={{
									textAlign: "left",
									fontSize: {
										lg: "16px",
										md: "15px",
										xs: "13px",
									},
								}}>
								Belum punya akun? Daftar disini
							</Link>
						</Box>
					</Box>
				</Box>
			</center>
		</Container>
	);
}

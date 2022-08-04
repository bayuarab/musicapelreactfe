import React from "react";
import { Box, Grid, styled } from "@mui/material/";
import Typography from "@mui/material/Typography";
import ig from "../assets/footer/ig.svg";
import mail from "../assets/footer/mail.svg";
import phone from "../assets/footer/phone.svg";
import telegram from "../assets/footer/telegram.svg";
import youtube from "../assets/footer/youtube.svg";
// import ButtonBase from "@mui/material/ButtonBase";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

const classCat = ["Drum", "Piano", "Gitar", "Bass", "Biola", "Menyanyi", "Flute", "Sexophone"];

export default function Footer() {
	return (
		<Box
			mt="3vh"
			sx={{
				backgroundColor: "#F2C94C",
				width: "100%",
				height: {
					lg: "32%",
					md: "28%",
					sm: "17%",
					xs: "18%",
				},
				display: "flex",
				flexDirection: "column",
			}}>
			<center>
				<Box mt="2vh" sx={{ flexGrow: 1, width: "90%", textAlign: "justify" }}>
					<Grid container spacing={1}>
						<Grid item xs={4}>
							<Box
								mt={{
									lg: "2%",
									md: "2%",
									sm: "1%",
									xs: "1%",
								}}
								mb="0.5vh">
								<Typography
									sx={{
										fontsize: {
											lg: "16px",
											md: "15px",
											sm: "13px",
											xs: "7px",
										},
										fontWeight: "500",
									}}>
									Tentang
								</Typography>
							</Box>
							<Box sx={{ height: "hug" }}>
								<Typography
									sx={{
										fontSize: {
											lg: "14px",
											md: "13px",
											sm: "11px",
											xs: "6px",
										},
									}}>
									Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.{" "}
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={4}>
							<Box
								mt={{
									lg: "2%",
									md: "2%",
									sm: "1%",
									xs: "1%",
								}}
								mb="0.5vh"
								ml="5vw">
								<Typography
									sx={{
										fontsize: {
											lg: "16px",
											md: "15px",
											sm: "13px",
											xs: "7px",
										},
										fontWeight: "500",
									}}>
									Produk
								</Typography>
							</Box>
							<center>
								<Box sx={{ width: "60%" }}>
									<Grid container>
										{classCat.map((item) => (
											<Grid key={item} item xs={5}>
												<Typography
													sx={{
														fontSize: {
															lg: "14px",
															md: "13px",
															sm: "11px",
															xs: "6px",
														},
														textAlign: "left",
													}}>
													<li>{item}</li>
												</Typography>
											</Grid>
										))}
									</Grid>
								</Box>
							</center>
						</Grid>
						<Grid item xs={4}>
							<Box
								mt={{
									lg: "2%",
									md: "2%",
									sm: "1%",
									xs: "1%",
								}}
								mb="0.5vh">
								<Typography
									sx={{
										fontsize: {
											lg: "16px",
											md: "15px",
											sm: "13px",
											xs: "7px",
										},
										fontWeight: "500",
									}}>
									Alamat
								</Typography>
							</Box>
							<Box style={{ height: "hug" }}>
								<Typography
									sx={{
										fontSize: {
											lg: "14px",
											md: "13px",
											sm: "11px",
											xs: "6px",
										},
									}}>
									Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
								</Typography>
							</Box>
							<Box
								mt={{
									lg: "2vh",
									md: "2vh",
									sm: "1vh",
									xs: "1vh",
								}}
								mb="0.5vh">
								<Typography
									sx={{
										fontsize: {
											lg: "16px",
											md: "15px",
											sm: "13px",
											xs: "7px",
										},
										fontWeight: "500",
									}}>
									Kontak
								</Typography>
							</Box>
							<Box mb="2vh">
								<Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
									<Grid item xs={2}>
										<Img alt="complex" src={phone} />
									</Grid>
									<Grid item xs={2}>
										<Img alt="complex" src={ig} />
									</Grid>
									<Grid item xs={2}>
										<Img alt="complex" src={youtube} />
									</Grid>
									<Grid item xs={2}>
										<Img alt="complex" src={telegram} />
									</Grid>
									<Grid item xs={2}>
										<Img alt="complex" src={mail} />
									</Grid>
								</Grid>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</center>
		</Box>
	);
}

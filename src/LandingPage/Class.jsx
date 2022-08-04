import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Typography";
import CardClass from "../component/CardClass";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

const Class = () => {
	return (
		<Container maxWidth="100%">
			<CssBaseline />
			<Box
				sx={{
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
				}}>
				<Typography
					mt="6vh"
					sx={{
						fontSize: {
							lg: "24px",
							md: "22px",
							sm: "18px",
							xs: "14px",
						},
						color: "blue",
						fontWeight: "600",
					}}>
					Explore kelas favorit
				</Typography>
			</Box>
			<center>
				<Box
					mt="5vh"
					sx={{
						width: "88%",
					}}>
					<CardClass />
				</Box>
			</center>
		</Container>
	);
};

export default Class;

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { default as Box, default as Typography } from "@mui/material/Typography";
import React from "react";
import CardClass from "./CardClass";

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
					mt={{
						md: "6vh",
						sm: "4vh",
						xs: "3.5vh",
					}}
					sx={{
						fontSize: {
							lg: "24px",
							md: "22px",
							sm: "18px",
							xs: "14px",
						},
						color: "#5D5FEF",
						fontWeight: "600",
					}}>
					Explore kelas favorit
				</Typography>
			</Box>
			<center>
				<Box
					mt="6vh"
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

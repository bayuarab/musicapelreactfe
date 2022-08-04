import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Typography";
import GridClassCat from "../component/GridClassCat";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

const ClassCategories = () => {
	return (
		<Container maxWidth="100%">
			<CssBaseline />
			<Box
				sx={{
					width: "100%",
					color: "black",
				}}>
				<Box
					style={{
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
								xs: "16px",
							},
							color: "blue",
							fontWeight: "600",
						}}>
						Pilih kelas impian kamu
					</Typography>
				</Box>
				<center>
					<Box
						style={{
							width: "80%",
							display: "flex",
						}}>
						<GridClassCat />
					</Box>
				</center>
			</Box>
		</Container>
	);
};
export default ClassCategories;

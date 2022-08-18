import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
import Stepper from "./Stepper";

const factItems = [
	{
		title: "500+",
		subtitle: "Lebih dari sekedar kelas biasa yang bisa mengeluarkan bakat kalian",
	},
	{
		title: "50+",
		subtitle: "Lulusan yang menjadi musisi ternama dengan skill memukau",
	},
	{
		title: "10+",
		subtitle: "Coach Special kolaborasi dengan musisi terkenal",
	},
];

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
	borderRadius: "20px",
}));

export default function Fact(props) {
	const { window } = props;

	const drawer = <Stepper />;

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box
			mb={{
				md: "4%",
				xs: "3%",
			}}
			sx={{ flexGrow: 1, width: "78%" }}>
			<Grid
				container
				component="fact"
				sx={{
					display: { xs: "none", sm: "flex" },
				}}
				spacing={{
					lg: 7,
					md: 5,
					sm: 3,
					xs: 2,
				}}>
				{factItems.map((item, index) => (
					<Grid key={index} item xs={4}>
						<Item
							sx={{
								height: "100%",
								// {
								// 	md: "32vh",
								// 	sm: "20vh",
								// 	xs: "18vh",
								// },
								paddingBottom: "15%",
							}}>
							<Box>
								<Typography
									mt="1.8vh"
									sx={{
										color: "#5D5FEF",
										textAlign: "center",
										fontFamily: "Poppins",
										fontWeight: "600",
										fontSize: {
											lg: "48px",
											md: "40px",
											sm: "32px",
											xs: "20px",
										},
									}}>
									{item.title}
								</Typography>
							</Box>
							<Box sx={{ height: "hug", paddingLeft: "2%", paddingRight: "2%" }}>
								<Typography
									mt="3vh"
									sx={{
										fontWeight: "600",
										fontFamily: "Poppins",
										fontSize: {
											lg: "16px",
											md: "14px",
											sm: "12px",
											xs: "6px",
										},
									}}>
									{item.subtitle}
								</Typography>
							</Box>
						</Item>
					</Grid>
				))}
			</Grid>
			<Box component="fact">
				<Box
					container={container}
					sx={{
						display: { xs: "block", sm: "none" },
					}}>
					{drawer}
				</Box>
			</Box>
		</Box>
	);
}

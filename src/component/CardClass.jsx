import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import "../App.css";
import drum from "../assets/drum.jpg";

const gridItems = [
	{
		categories: "Drum",
		class: "Kursus Drummer Special Coach (Eno Netral)",
		price: "IDR 8.500.000",
		image: drum,
	},
	{
		categories: "Gitar",
		class: "[Beginner] Guitar class for kids",
		price: "IDR 1.600.000",
		image: drum,
	},
	{
		categories: "Biola",
		class: "Biola Mid-Level Course",
		price: "IDR 3.000.000",
		image: drum,
	},
	{
		categories: "Drum",
		class: "Drummer for kids (Level Basic/1)",
		price: "IDR 2.200.000",
		image: drum,
	},
	{
		categories: "Piano",
		class: "Kursu Piano : From Zero to Pro (Full Package)",
		price: "IDR 11.650.000",
		image: drum,
	},
	{
		categories: "Sexophone",
		class: "Expert Level Saxophone",
		price: "IDR 7.350.000",
		image: drum,
	},
];

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
	borderRadius: "20px",
	border: "solid 1px grey",
});

export default function CardClass() {
	return (
		<Box sx={{ flexGrow: 1, alignItems: "center", display: "flex", flexDirection: "column" }}>
			<Grid container spacing={2}>
				{gridItems.map((item, index) => (
					<Grid key={index} item lg={4} xs={6}>
						<ButtonBase>
							<Img alt="complex" src={item.image} />
						</ButtonBase>
						<Typography sx={{ textAlign: "left" }}>
							<Box sx={{ paddingTop: "1vh" }}>
								<Typography
									sx={{
										fontSize: {
											lg: "16px",
											md: "14px",
											sm: "12px",
											xs: "10px",
										},
									}}>
									{item.categories}
								</Typography>
							</Box>
							<Box sx={{ width: "90%", height: "hug" }}>
								<Typography
									sx={{
										fontSize: {
											lg: "18px",
											md: "16px",
											sm: "14px",
											xs: "12px",
										},
										fontWeight: "bold",
									}}>
									{item.class}
								</Typography>
							</Box>
							<Box>
								<Typography
									mt="2vh"
									sx={{
										fontSize: {
											lg: "18px",
											md: "16px",
											sm: "14px",
											xs: "12px",
										},
										fontWeight: "bold",
										color: "blue",
									}}>
									{item.price}
								</Typography>
							</Box>
						</Typography>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

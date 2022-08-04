import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import "../App.css";
import drum from "../assets/drum.jpg";

const gridClassItems = [
	{
		categories: "Drum",
		image: drum,
	},
	{
		categories: "Piano",
		image: drum,
	},
	{
		categories: "Gitar",
		image: drum,
	},
	{
		categories: "Bass",
		image: drum,
	},
	{
		categories: "Biola",
		image: drum,
	},
	{
		categories: "Menyanyi",
		image: drum,
	},
	{
		categories: "Flute",
		image: drum,
	},
	{
		categories: "Sexophone",
		image: drum,
	},
];

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "50%",
	maxHeight: "50%",
	borderRadius: "20px",
	border: "solid 1px grey",
});

export default function GridClassCat() {
	return (
		<Box
			mt={{
				md: "6vh",
				xs: "4vh",
			}}
			sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				{gridClassItems.map((item) => (
					<Grid key={item.categories} item xs={3}>
						<ButtonBase>
							<Img alt="complex" src={item.image} />
						</ButtonBase>
						<Typography
							style={{
								textAlign: "center",
								fontWeight: "400",
							}}>
							<Box
								mb={{
									md: "6vh",
									xs: "4vh",
								}}>
								<Typography sx={{ fontSize: { lg: "24px", md: "22px", sm: "16px", xs: "10px" } }}>{item.categories}</Typography>
							</Box>
						</Typography>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

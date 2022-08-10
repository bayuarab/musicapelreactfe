import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import "../App.css";
import { Link } from "react-router-dom";
import numberFormat from "../components/NumbeFormat";
import drum from "../assets/drum.jpg";
import api from "../api/courseAPI";

const gridItemsDef = [
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
	const [dataClass, setDataClass] = useState(gridItemsDef);

	useEffect(() => {
		const fetchApi = async () => {
			try {
				const response = await api.get("/LandingPage");
				console.log(response.data);
				setDataClass(response.data);
			} catch (err) {
				!err.response ? console.log(`Error: ${err.message}`) : console.log(err.response.data);
				console.log(err.response.status);
				console.log(err.response.headers);
			}
		};
		fetchApi();
	}, []);

	const gridItems = dataClass;

	return (
		<Box sx={{ flexGrow: 1, alignItems: "center", display: "flex", flexDirection: "column" }}>
			<Grid container spacing={2}>
				{gridItems.map((item) => (
					<Grid key={item.id} item lg={4} xs={6}>
						<Link to={`/course/${item.id}`}>
							<ButtonBase>
								<Img alt="complex" src={item.courseImage} />
							</ButtonBase>
						</Link>
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
									{item.category}
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
									{item.courseTitle}
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
									IDR {numberFormat(item.price)}
								</Typography>
							</Box>
						</Typography>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

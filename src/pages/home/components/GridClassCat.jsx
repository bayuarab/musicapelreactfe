import { Box, CardMedia, Grid, Typography } from "@mui/material/";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import api from "../../../api/courseCatAPI";

export default function GridClassCat() {
	const [dataClass, setDataClass] = useState([]);
	const [loadingState, setLoadingState] = useState(true);

	useEffect(() => {
		const fetchApi = async () => {
			try {
				const response = await api.get("/");
				setDataClass(response.data);
				setLoadingState(false);
			} catch (err) {
				!err.response ? console.log(`Error: ${err.message}`) : console.log(err.response.data);
				console.log(err.response.status);
				console.log(err.response.headers);
			}
		};
		fetchApi();
	}, []);

	const gridClassItems = dataClass;

	return loadingState ? (
		<Loading />
	) : (
		<Box
			mt={{
				md: "6vh",
				xs: "2vh",
			}}
			sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				{gridClassItems.map((item) => (
					<Grid key={item.id} item xs={3}>
						<Link to={`/category/${item.id}`}>
							<CardMedia
								component="img"
								sx={{
									objectFit: "cover",
									minHeight: {
										lg: "120px",
									},
									maxHeight: {
										lg: "120px",
										xs: "75%",
									},
									maxWidth: "75%",
									borderRadius: {
										md: "20px",
										xs: "5px",
									},
								}}
								alt="img"
								image={`data:image/jpeg;base64,${item.image}`}
							/>
						</Link>
						<Typography
							style={{
								textAlign: "center",
								fontWeight: "400",
							}}>
							<Box
								mb={{
									md: "6vh",
									xs: "2vh",
								}}
								mt={"5%"}>
								<Typography
									sx={{
										fontSize: {
											lg: "24px",
											md: "22px",
											sm: "16px",
											xs: "11px",
										},
										fontFamily: "Poppins",
									}}>
									{item.category}
								</Typography>
							</Box>
						</Typography>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

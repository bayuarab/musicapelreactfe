import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Link, useParams } from "react-router-dom";
import numberFormat from "../../utilities/NumbeFormat";

//#F2C94C
export default function DetailCourse() {
	const [dataClass, setDataClass] = useState("");
	let params = useParams();

	/* useStates dan metode-metode untuk keperluan GET detail dari sebuah produk */
	const [detailOfACategory, setDetailOfACategory] = useState([]);
	const getdetailOfACategory = async (url) => {
		console.log("params", url);
		await axios
			.get(`https://localhost:7132/api/CourseCategory/${url}`, {
				url,
			})
			.then((res) => {
				if (res.status === 200) {
					setDetailOfACategory(res.data);
				}
			})
			.catch((err) => {});
		console.log(params);
	};
	useEffect(() => {
		getdetailOfACategory(params.categoryid);
	}, [params]);

	/* useStates untuk keperluan GET detail dari sebuah produk */

	let paramss = useParams();
	/* useStates dan metode-metode untuk keperluan GET detail dari sebuah produk */
	const [detailOfACourse, setDetailOfACourse] = useState([]);
	const getdetailOfACourse = async (url) => {
		console.log("paramss", url);
		await axios
			.get(`https://localhost:7132/api/Course/categoryId/${url}`, {
				url,
			})
			.then((res) => {
				if (res.status === 200) {
					setDetailOfACourse(res.data);
					console.log(res.data);
				}
			})
			.catch((err) => {});
		console.log(paramss);
	};
	useEffect(() => {
		getdetailOfACourse(paramss.categoryid);
	}, [paramss]);

	/* useStates untuk keperluan GET detail dari sebuah produk */

	// const gridClassItems = dataClass;
	const detailData = detailOfACategory;
	return (
		<Grid>
			<React.Fragment key={detailData.id}>
				<Box
					bottom="0px"
					sx={{
						height: {
							md: "60vh",
							xs: "40vh",
						},
					}}
					key={detailData.id}>
					<img src={`data:image/jpeg;base64,${detailData.image}`} width="100%" alt={detailData.image} style={{ height: "100%", objectFit: "cover" }}></img>
				</Box>
				<center>
					<Box sx={{ width: "95%" }}>
						<Typography
							sx={{
								fontSize: {
									md: "24px",
									xs: "14px",
								},
								margin: "auto 2% auto 2%",
								textAlign: "left",
							}}>
							<h4>{detailData.category}</h4>
						</Typography>
						<Typography
							sx={{
								margin: "auto 2% auto 2%",
								fontSize: {
									md: "16px",
									xs: "12px",
								},
								textAlign: "left",
							}}>
							{detailData.desc}
						</Typography>
					</Box>
				</center>
				<Typography
					color="blue"
					sx={{
						textAlign: "center",
						fontSize: {
							md: "24px",
							xs: "14px",
						},
					}}>
					<h4>Kelas Yang Tersedia</h4>
				</Typography>
				<center>
					<Box mt="6vh" sx={{ width: "90%" }}>
						<Grid container spacing={3}>
							{detailOfACourse.map((item, index) => (
								<Grid key={item.id} item xs={6} md={4}>
									<Card sx={{ margin: "auto auto auto auto" }}>
										<CardMedia
											component="img"
											sx={{
												maxWidth: "100%",
												maxHeight: "100%",
												objectFit: "cover",
											}}
											image={`data:image/jpeg;base64,${item.courseImage}`}
											alt="kategori kelas"
											style={{
												borderRadius: "10px",
											}}
										/>
										<CardActionArea component={Link} to={`/course/${item.id}`}>
											<CardContent>
												<Typography
													sx={{
														fontWeight: "600",
														textAlign: "left",
														fontSize: {
															md: "18px",
															xs: "14px",
														},
													}}>
													{item.courseTitle}
												</Typography>
											</CardContent>
											<CardContent>
												<Typography
													sx={{
														fontWeight: "600",
														textAlign: "left",
														fontSize: {
															md: "18px",
															xs: "14px",
														},
													}}
													color="blue">
													IDR {numberFormat(item.price)}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								</Grid>
							))}
						</Grid>
					</Box>
				</center>
			</React.Fragment>
		</Grid>
	);
}

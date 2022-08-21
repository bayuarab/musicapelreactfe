import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
	borderRadius: "20px",
}));

const responsive = {
	mobile: {
		breakpoint: { max: 600, min: 0 },
		items: 1,
	},
};

const Stepper = (props) => {
	const { factItems } = props;
	return (
		<div>
			<Carousel responsive={responsive}>
				{factItems.map((item, index) => (
					<center>
						<Box mb="1.5vh" mt="1vh" sx={{ width: "60%" }}>
							<Grid key={index} item xs={12}>
								<Item
									sx={{
										height: "100%",
										paddingBottom: "10%",
									}}>
									<Box>
										<Typography
											mt="1.5vh"
											sx={{
												color: "#5D5FEF",
												textAlign: "center",
												fontFamily: "Poppins",
												fontWeight: "600",
												fontSize: "24px",
											}}>
											{item.title}
										</Typography>
									</Box>
									<Box sx={{ height: "hug", paddingLeft: "2%", paddingRight: "2%" }}>
										<Typography
											mt="2vh"
											sx={{
												fontWeight: "500",
												fontFamily: "Poppins",
												fontSize: "10px",
											}}>
											{item.subtitle}
										</Typography>
									</Box>
								</Item>
							</Grid>
						</Box>
					</center>
				))}
			</Carousel>
		</div>
	);
};

export default Stepper;

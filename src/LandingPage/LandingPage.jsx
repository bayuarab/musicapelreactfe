import React from "react";
import Hero from "../LandingPage/Hero";
import Class from "../LandingPage/Class";
import ClassCategories from "../LandingPage/ClassCategories";
import Benefit from "../LandingPage/Benefit";
import Footer from "../LandingPage/Footer";

const LandingPage = () => {
	return (
		<div margin="0">
			<div>
				<Hero />
			</div>
			<div>
				<Class />
			</div>
			<div>
				<ClassCategories />
			</div>
			<div>
				<Benefit />
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default LandingPage;

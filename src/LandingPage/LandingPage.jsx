import React from "react";
import Hero from "./Hero";
import Class from "./Class";
import ClassCategories from "./ClassCategories";
import Benefit from ".//Benefit";
import Footer from "./Footer";

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

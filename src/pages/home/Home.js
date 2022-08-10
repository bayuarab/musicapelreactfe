import React from "react";
import Footer from "../../components/Footer";
import Benefit from "./components/Benefit";
import Class from "./components/Class";
import ClassCategories from "./components/ClassCategories";
import Hero from "./components/Hero";

const Home = () => {
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

export default Home;

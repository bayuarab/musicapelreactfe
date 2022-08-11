import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import useAuth from "../../hooks/useAuth";
import Benefit from "./components/Benefit";
import Class from "./components/Class";
import ClassCategories from "./components/ClassCategories";
import Hero from "./components/Hero";

const Home = () => {
  const { setAuth } = useAuth();

  useEffect(() => {
    setAuth((prevState) => ({ ...prevState, paymentPageState: false }));
  }, [setAuth]);

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
      <div style={{ marginBottom: "3vh" }}>
        <Benefit />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

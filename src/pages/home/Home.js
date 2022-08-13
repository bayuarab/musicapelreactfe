import React, { useEffect } from "react";
import { useComponentBarState } from "../../context/ComponentStateProvider";
import Benefit from "./components/Benefit";
import Class from "./components/Class";
import ClassCategories from "./components/ClassCategories";
import Hero from "./components/Hero";

const Home = () => {
  const { setComponentState } = useComponentBarState();

  useEffect(() => {
    setComponentState({ paymentPageState: false, footerState: true });
  }, [setComponentState]);

  return (
    <div margin="0">
      <div>
        <Hero />
      </div>
      <div style={{ paddingTop: "30px", paddingBottom: "60px" }}>
        <Class />
      </div>
      <div>
        <ClassCategories />
      </div>
      <div style={{ marginBottom: "3vh", paddingTop: "90px" }}>
        <Benefit />
      </div>
    </div>
  );
};

export default Home;

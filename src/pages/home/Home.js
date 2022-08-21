import { Box } from "@mui/material";
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
    <>
      <Box>
        <Hero />
      </Box>
      <Box
        sx={{
          paddingTop: { md: "30px", xs: "15px" },
          paddingBottom: { md: "60px", xs: "5px" },
        }}
      >
        <Class />
      </Box>
      <Box>
        <ClassCategories />
      </Box>
      <Box
        sx={{
          marginBottom: { md: "3vh", xs: "0" },
          paddingTop: { md: "60px", xs: "25px" },
        }}
      >
        <Benefit />
      </Box>
    </>
  );
};

export default Home;

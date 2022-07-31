import React from "react";
import Button from "@mui/material/Button";
import AppleIcon from "@mui/icons-material/Apple";

const Logo = () => {
  return (
    <Button
      startIcon={<AppleIcon />}
      sx={{
        color: "black",
        fontSize: "20px",
        fontWeight: "700",
        marginLeft: "20px",
      }}
    >
      MUSIC
    </Button>
  );
};

export default Logo;

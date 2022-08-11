import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const NotFound = () => {
  return (
    <Box sx={{ marginTop: "45px" }}>
      <Typography variant="h2" sx={{ textAlign: "center", color: "#5D5FEF" }}>
        Oops, Terjadi kesalahan
      </Typography>
    </Box>
  );
};

export default NotFound;

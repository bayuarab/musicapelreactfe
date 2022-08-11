import { Box, Typography } from "@mui/material";
import React from "react";

const Missing = () => {
  return (
    <Box sx={{ marginTop: "45px" }}>
      <Typography variant="h2" sx={{ textAlign: "center", color: "#5D5FEF" }}>
        Oops, Terjadi kesalahan
      </Typography>
    </Box>
  );
};

export default Missing;

import { CircularProgress, Stack } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Stack
      sx={{ color: "grey.500" }}
      spacing={2}
      direction="row"
      justifyContent={"center"}
    >
      <CircularProgress color="secondary" />
    </Stack>
  );
};

export default Loading;

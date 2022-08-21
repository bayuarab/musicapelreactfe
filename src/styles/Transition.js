import { Slide } from "@mui/material";
import { forwardRef } from "react";

export const SlideUpTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

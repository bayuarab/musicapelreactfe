import { Box, Button, styled } from "@mui/material";

export const DialogButton = styled(Button)({
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: "600",
  width: "44%",
  borderRadius: "8px",
  textTransform: "Capitalize",
  paddingTop: "10px",
  paddingBottom: "10px",
});

export const LogoContainer = styled(Box)({
  backgroundColor: "white",
  alignContent: "center",
  alignSelf: "center",
  marginTop: "-2px",
  marginBottom: "-2px",
  marginLeft: "-2px",
  paddingLeft: "7px",
  borderRadius: "11px",
  width: "48px",
});

export const LogoDiv = styled(Box)({
  display: "flex",
  alignItems: "center",
  paddingTop: "5px",
  paddingBottom: "5px",
});

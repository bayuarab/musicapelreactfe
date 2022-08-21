import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
  borderColor: "#F2C94C",
  color: "black",
  fontFamily: "Poppins",
  textTransform: "capitalize",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    fontSize: "14px",
  },
}));

export const DialogButton = styled(Button)(({ theme }) => ({
  display: "block",
  fontFamily: "Poppins",
  width: "100%",
  fontSize: "16px",
  fontWeight: "500",
  borderRadius: "8px",
  textTransform: "Capitalize",
  paddingTop: "7px",
  paddingBottom: "7px",
  color: "white",
  backgroundColor: "#5D5FEF",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    fontSize: "12px",
  },
}));

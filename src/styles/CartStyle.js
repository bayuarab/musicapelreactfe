import { Box, Button, Checkbox, styled, Typography } from "@mui/material";

export const StyledCheckbox = styled(Checkbox)({
  color: "#BDBDBD",
  "&.Mui-checked": {
    color: "#5D5FEF",
  },
});

export const CheckoutButton = styled(Button)(({ theme }) => ({
  display: "none",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: "600",
  backgroundColor: "#5D5FEF",
  borderRadius: "8px",
  textTransform: "Capitalize",
  paddingLeft: "60px",
  paddingRight: "60px",
  paddingTop: "10px",
  paddingBottom: "10px",
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

export const DeleteText = styled(Typography)(({ theme }) => ({
  display: "none",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: "500",
  color: "#333333",
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

export const ImgContainer = styled(Box)(({ theme }) => ({
  display: "none",
  marginLeft: "2%",
  marginRight: "15px",
  width: "200px",
  height: "133px",
  borderRadius: "16px",
  borderColor: "#828282",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

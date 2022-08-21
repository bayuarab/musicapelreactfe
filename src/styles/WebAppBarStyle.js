import { Badge, Button, styled, Toolbar } from "@mui/material";
import { Box } from "@mui/system";

export const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#F2C94C",
  height: { md: "76px", xs: "40px" },
});

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const SideIcons = styled(Box)(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "35px",
  marginRight: "10px",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

export const BlackButton = styled(Button)({
  color: "black",
  textTransform: "Capitalize",
  fontSize: "16px",
  fontFamily: "Poppins",
  fontWeight: "500",
});

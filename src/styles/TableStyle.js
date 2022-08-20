import {
  Paper,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
  Typography,
} from "@mui/material";

export const StyledPaper = styled(Paper)({
  border: 0,
  boxShadow: "none",
});

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  border: 0,
  "&:nth-of-type(even)": {
    backgroundColor: "#F2C94C33",
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StyledNavLink = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: "600",
  fontSize: "16px",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    fontSize: "12px",
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: "Poppins",
  fontSize: "16px",
  border: 0,
  paddingTop: "21px",
  paddingBottom: "21px",
  color: "#4F4F4F",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F2C94C",
    fontWeight: "700",
  },
  [`&.${tableCellClasses.body}`]: {
    fontWeight: "500",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));

import {
  Box,
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import React from "react";
import { Link } from "react-router-dom";

const StyledPaper = styled(Paper)({
  border: 0,
  boxShadow: "none",
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  border: 0,
  "&:nth-of-type(even)": {
    backgroundColor: "#F2C94C33",
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledNavLink = styled(Typography)({
  fontFamily: "Poppins",
  fontWeight: "600",
  fontSize: "16px",
});

function createData(noInvoice, date, qty, cost, details) {
  return { noInvoice, date, qty, cost, details };
}

const rows = [
  createData("APM00003", "12 Juni 2022", 2, "IDR 11.500.000", "Rincian"),
  createData("APM00003", "05 Februari 2022", 1, "IDR 11.500.000", "Rincian"),
  createData("APM00003", "30 Agustus 2021", 1, "IDR 11.500.000", "Rincian"),
];

const InvoiceMaster = () => {
  return (
    <Box sx={{ padding: "5.5%", paddingTop: "50px", paddingBottom: "40px" }}>
      <Box mb={"34px"} sx={{ display: "flex", gap: "10px" }}>
        <Link style={{ textDecoration: "none" }} to="/">
          <StyledNavLink color={"#828282"}>Beranda {`>`}</StyledNavLink>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/my-invoice">
          <StyledNavLink color={"#5D5FEF"}>Invoice</StyledNavLink>
        </Link>
      </Box>
      <Typography
        mb={"24px"}
        sx={{
          fontFamily: "Poppins",
          color: "#4F4F4F",
          fontWeight: "600",
          fontSize: "20px",
        }}
      >
        Menu Invoice
      </Typography>
      <TableContainer component={StyledPaper}>
        <Table sx={{}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">No. Invoice</StyledTableCell>
              <StyledTableCell align="center">Tanggal Beli</StyledTableCell>
              <StyledTableCell align="center">Jumlah Kursus</StyledTableCell>
              <StyledTableCell align="center">Total Harga</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.noInvoice}
                </StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                <StyledTableCell align="center">{row.qty}</StyledTableCell>
                <StyledTableCell align="center">{row.cost}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      backgroundColor: "#5D5FEF",
                      borderRadius: "8px",
                      textTransform: "Capitalize",
                      paddingLeft: "20px",
                      width: "80%",
                    }}
                  >
                    {row.details}
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InvoiceMaster;
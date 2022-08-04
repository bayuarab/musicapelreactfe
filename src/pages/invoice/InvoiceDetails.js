import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import api from "../../api/invoiceDetails";

import {
  Box,
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

//--
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

//No Nama Course Category Jadwal Harga
function createData(courseName, courseCategory, schedule, price) {
  return { courseName, courseCategory, schedule, price };
}

const defaultRows = [
  createData(
    "Kursus Drummer Special Coach (Eno Netral)",
    "Drum",
    "Senin, 25 Juni 2022",
    "IDR 8.500.000"
  ),
  createData(
    "Biola Mid-Level Course",
    "Biola",
    "Sabtu, 23 Juli 2022",
    "IDR 3.000.000"
  ),
];

const InvoiceDetails = () => {
  const { invoiceID } = useParams();
  const { date, cost } = useLocation().state;
  const [invoiceDetailData, setInvoiceDetailData] = useState(defaultRows);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await api.get(`/${invoiceID}`);
        console.log(response.data);
        setInvoiceDetailData(response.data);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    };

    fetchApi();
  }, [invoiceID]);

  const rows = invoiceDetailData;

  return (
    <Box sx={{ padding: "5.5%", paddingTop: "50px", paddingBottom: "40px" }}>
      <Box mb={"34px"} sx={{ display: "flex", gap: "10px" }}>
        <Link style={{ textDecoration: "none" }} to="/">
          <StyledNavLink color={"#828282"}>Beranda {`>`}</StyledNavLink>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/my-invoice">
          <StyledNavLink color={"#828282"}>Invoice {`>`}</StyledNavLink>
        </Link>
        <StyledNavLink color={"#5D5FEF"}>Rincian Invoice</StyledNavLink>
      </Box>
      <Typography
        mb={"24px"}
        sx={{
          fontFamily: "Poppins",
          color: "#4F4F4F",
          fontWeight: "700",
          fontSize: "20px",
        }}
      >
        Rincian Invoice
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "32px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            color: "#4F4F4F",
            fontWeight: "500",
            fontSize: "18px",
          }}
        >
          No. Invoice&nbsp;&nbsp;&nbsp;&nbsp;: {invoiceID}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              color: "#4F4F4F",
              fontWeight: "500",
              fontSize: "18px",
            }}
          >
            Tanggal Beli&nbsp;: {date}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              color: "#4F4F4F",
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            Total Harga:&nbsp;&nbsp; IDR {cost.toLocaleString("de-DE")}
          </Typography>
        </Box>
      </Box>
      <TableContainer component={StyledPaper}>
        <Table sx={{}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">No</StyledTableCell>
              <StyledTableCell align="center">Nama Course</StyledTableCell>
              <StyledTableCell align="center">Kategori</StyledTableCell>
              <StyledTableCell align="center">Jadwal</StyledTableCell>
              <StyledTableCell align="center">Harga</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row" align="center">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{row.course}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.courseCategory}
                </StyledTableCell>
                <StyledTableCell align="center">{row.schedule}</StyledTableCell>
                <StyledTableCell align="center">
                  IDR {row.price.toLocaleString("de-DE")}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InvoiceDetails;

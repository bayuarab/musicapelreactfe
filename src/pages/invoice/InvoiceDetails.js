import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/userAPI";
import numberFormat from "../../utilities/NumbeFormat";

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
import { useComponentBarState } from "../../context/ComponentStateProvider";
import useAuth from "../../hooks/useAuth";

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
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
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

const StyledNavLink = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: "600",
  fontSize: "16px",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    fontSize: "12px",
  },
}));

const InvoiceDetails = () => {
  const { invoiceID } = useParams();
  const [invoiceDetailData, setInvoiceDetailData] = useState([]);
  const { setComponentState } = useComponentBarState();
  const [apiDataMessage, setApiDataMessage] = useState(
    "Mengambil data ke server, harap tunggu"
  );
  const { auth } = useAuth();

  useEffect(() => {
    setComponentState({ paymentPageState: false, footerState: true });
  }, [setComponentState]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await api.get(
          `/InvoicesDetails/${auth.userId}/${invoiceID}`
        );
        console.log(response.data);
        setInvoiceDetailData(response.data);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        setApiDataMessage("Oops, terjadi kesalahan");
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    };

    fetchApi();
  }, [invoiceID]);

  return invoiceDetailData?.length <= 0 ? (
    <Box sx={{ marginTop: "60px" }}>
      <Typography variant="h5" sx={{ textAlign: "center", color: "#5D5FEF" }}>
        {apiDataMessage}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        padding: "5.5%",
        paddingTop: { md: "50px", xs: "20px" },
        paddingBottom: "90px",
      }}
    >
      <Box
        sx={{ display: "flex", gap: "10px", mb: { md: "34px", xs: "20px" } }}
      >
        <Link style={{ textDecoration: "none" }} to="/">
          <StyledNavLink color={"#828282"}>Beranda {`>`}</StyledNavLink>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/my-invoice">
          <StyledNavLink color={"#828282"}>Invoice {`>`}</StyledNavLink>
        </Link>
        <StyledNavLink color={"#5D5FEF"}>Rincian Invoice</StyledNavLink>
      </Box>
      <Typography
        sx={{
          fontFamily: "Poppins",
          color: "#4F4F4F",
          fontWeight: "700",
          fontSize: { md: "20px", xs: "16px" },
          mb: { md: "24px", xs: "8px" },
        }}
      >
        Rincian Invoice
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { md: "8px", xs: "1px" },
          marginBottom: "32px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            color: "#4F4F4F",
            fontWeight: "500",
            fontSize: { md: "18px", xs: "14px" },
          }}
        >
          No. Invoice&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {invoiceID}
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
              fontSize: { md: "18px", xs: "14px" },
            }}
          >
            Tanggal Beli&nbsp;&nbsp;:{" "}
            {invoiceDetailData[0] ? invoiceDetailData[0].purchasedDate : "-"}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              color: "#4F4F4F",
              fontWeight: "700",
              fontSize: { md: "18px", xs: "14px" },
              display: { md: "block", xs: "none" },
            }}
          >
            {/* .toLocaleString("de-DE") */}
            Total Harga&nbsp;:&nbsp;&nbsp; IDR{" "}
            {invoiceDetailData[0]
              ? numberFormat(invoiceDetailData[0].cost)
              : "-"}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: "Poppins",
            color: "#4F4F4F",
            fontWeight: "700",
            fontSize: { md: "18px", xs: "14px" },
            display: { md: "none", xs: "block" },
          }}
        >
          {/* .toLocaleString("de-DE") */}
          Total Harga &nbsp;&nbsp;:&nbsp;&nbsp; IDR{" "}
          {invoiceDetailData[0] ? numberFormat(invoiceDetailData[0].cost) : "-"}
        </Typography>
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
            {invoiceDetailData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row" align="center">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{row.course}</StyledTableCell>
                <StyledTableCell align="center">{row.category}</StyledTableCell>
                <StyledTableCell align="center">{row.schedule}</StyledTableCell>
                <StyledTableCell align="center">
                  IDR {numberFormat(row.price)}
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

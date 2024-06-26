import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/userAPI";
import numberFormat from "../../utilities/NumbeFormat";

import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Loading from "../../components/Loading";
import { useComponentBarState } from "../../context/ComponentStateProvider";
import useAuth from "../../hooks/useAuth";
import {
  StyledNavLink,
  StyledPaper,
  StyledTableCell,
  StyledTableRow,
} from "../../styles/TableStyle";

const InvoiceDetails = () => {
  const { invoiceID } = useParams();
  const [invoiceDetailData, setInvoiceDetailData] = useState([]);
  const { setComponentState } = useComponentBarState();
  const [loadState, setLoadState] = useState(true);
  const [apiDataMessage, setApiDataMessage] = useState(
    "Mengambil data ke server, harap tunggu"
  );
  const { auth } = useAuth();
  const UserId = auth?.userId;
  const token = auth?.token;

  useEffect(() => {
    setComponentState({ paymentPageState: false, footerState: true });
  }, [setComponentState]);

  useEffect(() => {
    const fetchApi = async () => {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const response = await api.get(
          `/InvoicesDetails/${UserId}/${invoiceID}`,
          config
        );
        setLoadState(false);
        setInvoiceDetailData(response.data);
      } catch (err) {
        setLoadState(false);
        setApiDataMessage("Oops, terjadi kesalahan");
      }
    };

    fetchApi();
  }, [invoiceID, token, UserId]);

  return loadState ? (
    <Box sx={{ paddingTop: { md: "50px", xs: "20px" } }}>
      <Loading />
    </Box>
  ) : invoiceDetailData?.length <= 0 ? (
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
          gap: { md: "8px", xs: "2px" },
          marginBottom: "32px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            color: "#4F4F4F",
            fontWeight: "500",
            fontSize: { md: "18px", xs: "12px" },
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
              fontSize: { md: "18px", xs: "12px" },
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
              fontSize: { md: "18px", xs: "12px" },
              display: { md: "block", xs: "none" },
            }}
          >
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
            mt: "2px",
            fontSize: { md: "18px", xs: "12px" },
            display: { md: "none", xs: "block" },
          }}
        >
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

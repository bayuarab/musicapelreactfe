import {
  Box,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/userAPI";
import Loading from "../../components/Loading";
import { useComponentBarState } from "../../context/ComponentStateProvider";
import useAuth from "../../hooks/useAuth";
import {
  StyledNavLink,
  StyledPaper,
  StyledTableCell,
  StyledTableRow,
} from "../../styles/TableStyle";
import numberFormat from "../../utilities/NumbeFormat";

const InvoiceMaster = () => {
  const [masterInvoiceData, setMasterInvoiceData] = useState([]);
  const { setComponentState } = useComponentBarState();
  const [loadState, setLoadState] = useState(true);
  const { auth } = useAuth();
  const UserID = auth?.userId;
  const token = auth?.token;

  const [apiDataMessage, setApiDataMessage] = useState(
    "Mengambil data ke server, harap tunggu"
  );

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
        const response = await api.get(`/Invoices/${UserID}`, config);
        setLoadState(false);
        setMasterInvoiceData(response.data);
      } catch (err) {
        setLoadState(false);
        if (err.response.data === "Not Found")
          setApiDataMessage("Masih kosong, silahkan belanja");
      }
    };

    fetchApi();
  }, [UserID, token]);

  return loadState ? (
    <Box sx={{ paddingTop: { md: "50px", xs: "20px" } }}>
      <Loading />
    </Box>
  ) : masterInvoiceData?.length <= 0 ? (
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
          <StyledNavLink color={"#5D5FEF"}>Invoice</StyledNavLink>
        </Link>
      </Box>
      <Typography
        sx={{
          fontFamily: "Poppins",
          color: "#4F4F4F",
          fontWeight: "600",
          fontSize: { md: "20px", xs: "16px" },
          mb: { md: "24px", xs: "15px" },
        }}
      >
        Menu Invoice
      </Typography>
      <TableContainer component={StyledPaper}>
        <Table sx={{}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">No</StyledTableCell>
              <StyledTableCell align="center">No. Invoice</StyledTableCell>
              <StyledTableCell align="center">Tanggal Beli</StyledTableCell>
              <StyledTableCell align="center">Jumlah Kursus</StyledTableCell>
              <StyledTableCell align="center">Total Harga</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {masterInvoiceData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.noInvoice}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.purchaseDate}
                </StyledTableCell>
                <StyledTableCell align="center">{row.qty}</StyledTableCell>
                <StyledTableCell align="center">
                  IDR {numberFormat(row.cost)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/my-invoice/${row.noInvoice}`}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: { md: "14px", xs: "12px" },
                        backgroundColor: "#5D5FEF",
                        borderRadius: "8px",
                        textTransform: "Capitalize",
                        paddingLeft: "20px",
                        width: "80%",
                      }}
                    >
                      Rincian
                    </Button>
                  </Link>
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

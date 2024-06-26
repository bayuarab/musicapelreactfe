import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import api from "../../../api/Invoices";
import useAuth from "../../../hooks/useAuth";
import { SlideUpTransition } from "../../../styles/Transition";
import numberFormat from "../../../utilities/NumbeFormat";

const DetailInvoiceDialog = (props) => {
  const {
    StyledTableCell,
    StyledTableRow,
    StyledPaper,
    onClose,
    logState,
    masterInvoiceId,
  } = props;
  const { auth } = useAuth();
  const token = auth?.token;
  const [invoiceDetailData, setInvoiceDetailData] = useState([]);

  const handleClose = () => {
    onClose(false);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const response = await api.get(
          `/DetailsByMasterId/${masterInvoiceId}`,
          config
        );
        setInvoiceDetailData(response.data);
      } catch (err) {}
    };
    if (logState) fetchApi();
  }, [setInvoiceDetailData, logState, masterInvoiceId, token]);

  return (
    <div>
      <Dialog
        fullScreen
        open={logState}
        onClose={handleClose}
        TransitionComponent={SlideUpTransition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Detail Invoice
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            padding: "5.5%",
            paddingTop: { md: "50px", xs: "30px" },
            paddingBottom: "90px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { md: "8px", xs: "1px" },
              marginBottom: { md: "32px", xs: "20px" },
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
              No. Invoice&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
              {invoiceDetailData.length > 0
                ? invoiceDetailData[0].noInvoice
                : "-"}
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
                {invoiceDetailData.length > 0
                  ? invoiceDetailData[0].purchasedDate
                  : "-"}
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
              Total Harga &nbsp;&nbsp;:&nbsp;&nbsp; IDR{" "}
              {invoiceDetailData[0]
                ? numberFormat(invoiceDetailData[0].cost)
                : "-"}
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
                {invoiceDetailData?.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.course}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.category}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.schedule}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      IDR {numberFormat(row.price)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Dialog>
    </div>
  );
};

export default DetailInvoiceDialog;

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
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { forwardRef, useEffect, useState } from "react";
import api from "../../../api/Invoices";
import numberFormat from "../../../utilities/NumbeFormat";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DetailInvoiceDialog = (props) => {
  const {
    StyledTableCell,
    StyledTableRow,
    StyledPaper,
    onClose,
    logState,
    masterInvoiceId,
  } = props;

  const [invoiceDetailData, setInvoiceDetailData] = useState([]);

  const handleClose = () => {
    onClose(false);
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await api.get(`/DetailsByMasterId/${masterInvoiceId}`);
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

    if (logState) fetchApi();
  }, [setInvoiceDetailData, logState]);

  return (
    <div>
      <Dialog
        fullScreen
        open={logState}
        onClose={handleClose}
        TransitionComponent={Transition}
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
            paddingTop: "50px",
            paddingBottom: "90px",
          }}
        >
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
              No. Invoice&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
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
                  fontSize: "18px",
                }}
              >
                Tanggal Beli&nbsp;:{" "}
                {invoiceDetailData.length > 0
                  ? invoiceDetailData[0].purchasedDate
                  : "-"}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  color: "#4F4F4F",
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                {/* .toLocaleString("de-DE") */}
                Total Harga:&nbsp;&nbsp; IDR{" "}
                {invoiceDetailData.length > 0
                  ? numberFormat(invoiceDetailData[0].cost)
                  : "-"}
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

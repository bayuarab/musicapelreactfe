import React, { useEffect, useState } from "react";
import paymentApi from "../../../api/baseApi";

import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import {
  DialogButton,
  LogoContainer,
  LogoDiv,
} from "../../../styles/CheckoutDialogStyle";

const CheckoutDialogs = (props) => {
  const [checkoutOp, setCheckoutOp] = useState([]);
  const { onClose, selectedOp, checkoutDialogState } = props;
  const [optionState, setOptionState] = useState([]);
  const [options, setOptions] = useState(null);
  const { auth } = useAuth();
  const token = auth?.token;

  useEffect(() => {
    const fetchApiPayment = async () => {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const response = await paymentApi.get(`/Payment`, config);
        // console.log(response.data);
        setCheckoutOp(response.data);
        setOptionState(response.data.map(() => false));
      } catch (err) {
        // !err.response
        //   ? console.log(`Error: ${err.message}`)
        //   : console.log(err.response.data);
        // if (err.response.data === "Not Found") console.log(err.response.status);
        // console.log(err.response.headers);
      }
    };

    fetchApiPayment();
  }, [setCheckoutOp, token]);

  const handleClose = () => {
    onClose({ paymentOption: selectedOp, paymentState: false });
  };

  const handleListItemClick = (indexOP) => {
    setOptions(checkoutOp[indexOP].method);
    setOptionState(
      optionState.map((e, index) => {
        return indexOP === index ? true : false;
      })
    );
  };

  const handleButtonPilih = () => {
    const result = {
      paymentOption: options,
      paymentState: true,
    };
    // console.log(result);
    options === null ? console.log("Belum pilih pembayaran") : onClose(result);
  };

  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: "10px" },
      }}
      onClose={handleClose}
      open={checkoutDialogState}
    >
      <DialogTitle
        sx={{
          paddingTop: "24px",
          paddingLeft: "55px",
          paddingRight: "55px",
          fontFamily: "Poppins",
          fontSize: "20px",
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        Pilih Metode Pembayaran
      </DialogTitle>
      <Box
        sx={{
          paddingBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "11px",
        }}
      >
        {checkoutOp.map((options, index) => {
          return (
            <Box
              key={index}
              sx={{
                paddingLeft: "20px",
                paddingRight: "20px",
                alignItems: "center",
              }}
            >
              <Box
                onClick={() => handleListItemClick(index)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: optionState[index] ? "5px" : "4px",
                  paddingBottom: optionState[index] ? "5px" : "4px",
                  paddingLeft: "4px",
                  gap: optionState[index] ? "27%" : "7px",
                  borderRadius: "12px",
                  backgroundColor: optionState[index] ? "#5D5FEF" : "white",
                }}
              >
                <LogoContainer>
                  <LogoDiv>
                    <img
                      style={{ alignSelf: "center" }}
                      src={`data:image/jpeg;base64,${options.icon}`}
                      alt={options.method}
                      loading="lazy"
                      width={optionState[index] ? "40px" : "37px"}
                      height={optionState[index] ? "40px" : "37px"}
                    />
                  </LogoDiv>
                </LogoContainer>
                <Typography
                  style={{
                    fontSize: "18px",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    color: optionState[index] ? "white" : "black",
                  }}
                >
                  {options.method}
                </Typography>
              </Box>
            </Box>
          );
        })}
        <Box
          sx={{
            marginTop: "23px",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-around",
            marginLeft: "2%",
            marginRight: "2%",
          }}
        >
          <DialogButton
            variant="outlined"
            sx={{ color: "#5D5FEF" }}
            onClick={() => handleClose()}
          >
            Batal
          </DialogButton>
          <DialogButton
            variant="contained"
            sx={{ backgroundColor: "#5D5FEF" }}
            onClick={() => handleButtonPilih()}
          >
            Pilih
          </DialogButton>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CheckoutDialogs;

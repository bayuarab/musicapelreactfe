import React, { useState } from "react";
import BCA from "../../../assets/brand/bca.png";
import BNI from "../../../assets/brand/bni.png";
import Dana from "../../../assets/brand/dana.png";
import Gopay from "../../../assets/brand/gopay.png";
import Mandiri from "../../../assets/brand/mandiri.png";
import Ovo from "../../../assets/brand/ovo.png";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  styled,
  Typography,
} from "@mui/material";

const checkoutOp = [
  {
    logo: Gopay,
    name: "Gopay",
  },
  {
    logo: Ovo,
    name: "OVO",
  },
  {
    logo: Dana,
    name: "Dana",
  },
  {
    logo: Mandiri,
    name: "Mandiri",
  },
  {
    logo: BCA,
    name: "BCA",
  },
  {
    logo: BNI,
    name: "BNI",
  },
];

const DialogButton = styled(Button)(({ theme }) => ({
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: "600",
  width: "44%",
  borderRadius: "8px",
  textTransform: "Capitalize",
  paddingTop: "10px",
  paddingBottom: "10px",
}));

const LogoContainer = styled(Box)({
  backgroundColor: "white",
  alignContent: "center",
  alignSelf: "center",
  marginTop: "-2px",
  marginBottom: "-2px",
  marginLeft: "-2px",
  paddingLeft: "7px",
  borderRadius: "11px",
  width: "48px",
});

const LogoDiv = styled(Box)({
  display: "flex",
  alignItems: "center",
  paddingTop: "5px",
  paddingBottom: "5px",
});

const CheckoutDialogs = (props) => {
  const { onClose, selectedOp, checkoutDialogState } = props;
  const [optionState, setOptionState] = useState(checkoutOp.map(() => false));
  const [options, setOptions] = useState(null);

  const handleClose = () => {
    onClose({ paymentOption: selectedOp, paymentState: false });
  };

  const handleListItemClick = (indexOP) => {
    setOptions(checkoutOp[indexOP].name);
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
    console.log(result);
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
              key={options.name}
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
                      src={options.logo}
                      alt={options.logo}
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
                  {options.name}
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

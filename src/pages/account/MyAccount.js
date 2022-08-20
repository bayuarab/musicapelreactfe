import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Box,
  Button,
  Snackbar,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { useComponentBarState } from "../../context/ComponentStateProvider";
import useAuth from "../../hooks/useAuth";
import UserChangeDataDialog from "./components/UserChangeDataDialog";

const Alerts = forwardRef(function Alerts(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledButton = styled(Button)(({ theme }) => ({
  borderColor: "#F2C94C",
  color: "black",
  fontFamily: "Poppins",
  textTransform: "capitalize",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    fontSize: "14px",
  },
}));

const MyAccount = () => {
  const [expanded, setExpanded] = useState(false);
  const { auth } = useAuth();
  const [snackbarState, setSnackbarState] = useState(false);
  const [dialogOption, setDialogOption] = useState("password");
  const [severityType, setSeverityType] = useState("error");
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { setComponentState } = useComponentBarState();

  useEffect(() => {
    setComponentState({ paymentPageState: false, footerState: true });
  }, [setComponentState]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarState(false);
  };

  const handleCloseDialog = (state, dialogState = null) => {
    const { severity, msg } = dialogState;
    if (severity === "out" && state) return setOpenDialog(false);
    setSeverityType(severity);
    setMessage(msg);
    setSnackbarState(true);
    if (!state) return setOpenDialog(true);
    setOpenDialog(false);
  };

  const handleClickOpenDialog = (dialogOps) => {
    setDialogOption(dialogOps);
    setOpenDialog(true);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <center>
        <Box
          sx={{
            padding: "4%",
            paddingTop: { md: "5%", xs: "25%" },
            paddingBottom: "7%",
          }}
        >
          <Avatar
            alt={auth.nama.split(" ")[0]}
            src="/static/images/avatar/1.jpg"
            sx={{ width: { md: 125, xs: 80 }, height: { md: 125, xs: 80 } }}
          />
          <Box mt={"30px"} sx={{ width: { md: "380px", xs: "230px" } }}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  variant="h5"
                  sx={{
                    width: "100%",
                    flexShrink: 0,
                    fontWeight: "400",
                    fontFamily: "Poppins",
                    fontSize: { md: "24px", xs: "20px" },
                  }}
                >
                  {auth.nama.split(" ")[0]}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ paddingLeft: "5%", paddingRight: "5%" }}>
                <Typography
                  textAlign={"left"}
                  sx={{
                    fontSize: { md: "23px", xs: "17px" },
                    fontFamily: "Poppins",
                    fontWeight: { md: "600", xs: "500" },
                    // display: { xs: "none", md: "block" },
                    marginTop: { xs: "-8px", md: "6px" },
                  }}
                >
                  {auth.nama}
                </Typography>
                <Typography
                  textAlign={"left"}
                  sx={{
                    fontSize: "18px",
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    display: { xs: "none", md: "block" },
                    marginTop: "12px",
                  }}
                >
                  {auth.email}
                </Typography>
                {/* <Typography
                  textAlign={"left"}
                  sx={{
                    fontSize: "17px",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    display: { xs: "block", md: "none" },
                    marginTop: "-8px",
                  }}
                >
                  {auth.nama}
                </Typography> */}
                {/* <Typography
                  textAlign={"left"}
                  sx={{
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    display: { xs: "block", md: "none" },
                    marginTop: "8px",
                  }}
                >
                  Email :
                </Typography> */}
                <Typography
                  textAlign={"left"}
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {auth.email}
                </Typography>
                <Box
                  sx={{
                    mt: { md: "45px", xs: "30px" },
                    paddingBottom: { md: "7px", xs: "3px" },
                    display: "flex",
                    justifyContent: "center",
                    gap: { md: "20px", xs: "10px" },
                  }}
                >
                  <StyledButton
                    variant="outlined"
                    onClick={() => handleClickOpenDialog("name")}
                  >
                    Ubah Nama
                  </StyledButton>
                  <StyledButton
                    variant="outlined"
                    onClick={() => handleClickOpenDialog("password")}
                  >
                    Ubah Password
                  </StyledButton>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </center>
      <UserChangeDataDialog
        dialogOption={dialogOption}
        logState={openDialog}
        onClose={handleCloseDialog}
      />
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={snackbarState}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alerts
            onClose={handleCloseSnackbar}
            severity={severityType}
            sx={{ width: "100%" }}
          >
            {message}
          </Alerts>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default MyAccount;

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
  Typography,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import UserChangeDataDialog from "./components/UserChangeDataDialog";

const Alerts = forwardRef(function Alerts(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyAccount = () => {
  const [expanded, setExpanded] = useState(false);
  const { auth } = useAuth();
  const [snackbarState, setSnackbarState] = useState(false);
  const [dialogOption, setDialogOption] = useState("password");
  const [severityType, setSeverityType] = useState("error");
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

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
            paddingTop: "5%",
            paddingBottom: "7%",
          }}
        >
          <Avatar
            alt={auth.nama}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 125, height: 125 }}
          />
          <Box mt={"30px"} sx={{ width: "380px" }}>
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
                  }}
                >
                  {auth.nama}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ paddingLeft: "5%", paddingRight: "5%" }}>
                <Typography
                  textAlign={"left"}
                  sx={{
                    fontSize: "18px",
                    fontFamily: "Poppins",
                    fontWeight: "400",
                  }}
                >
                  Email : {auth.email}
                </Typography>
                <Box mt={"45px"} paddingBottom={"7px"}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#F2C94C",
                      color: "black",
                      fontFamily: "Poppins",
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleClickOpenDialog("password")}
                  >
                    Change Password
                  </Button>
                </Box>

                {/* <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h7">Email:</Typography>
                </Box> */}
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

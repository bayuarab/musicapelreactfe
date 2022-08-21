import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  styled,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#F2C94C",
    },
    secondary: {
      main: "#4F4F4F",
    },
    remove: {
      main: "#9F290F",
    },
    white: {
      main: "#ffffff",
    },
  },
});

const DialogButton = styled(Button)({
  fontFamily: "Poppins",
  width: "16%",
  fontSize: "16px",
  fontWeight: "500",
  borderRadius: "8px",
  textTransform: "Capitalize",
  paddingTop: "4px",
  paddingBottom: "4px",
  height: "40px",
});

const LogoutDialog = (props) => {
  const { onClose, logState } = props;
  const handleClose = (state) => {
    onClose(state);
  };

  return (
    <Dialog
      open={logState}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <ThemeProvider theme={theme}>
        <DialogTitle sx={{ fontFamily: "Poppins" }}>
          {"Apakah kamu yakin ingin Log Out ?"}
        </DialogTitle>
        <DialogActions>
          <DialogButton
            variant="contained"
            color="primary"
            sx={{ color: "secondary" }}
            onClick={() => handleClose(false)}
          >
            Tidak
          </DialogButton>
          <DialogButton
            variant="outlined"
            color="remove"
            onClick={() => handleClose(true)}
          >
            Ya
          </DialogButton>
        </DialogActions>
      </ThemeProvider>
    </Dialog>
  );
};

export default LogoutDialog;

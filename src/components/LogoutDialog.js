import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
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
      <DialogTitle>{"Are you sure to Log Out?"}</DialogTitle>
      {/* <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
      You hav.
      </DialogContentText>
    </DialogContent> */}
      <DialogActions>
        <Button onClick={() => handleClose(false)}>No</Button>
        <Button onClick={() => handleClose(true)}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;

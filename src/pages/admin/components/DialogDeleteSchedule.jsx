import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  styled,
  Typography,
} from "@mui/material";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogButton = styled(Button)(({ theme }) => ({
  fontFamily: "Poppins",
  width: "15%",
  fontSize: "16px",
  fontWeight: "500",
  borderRadius: "8px",
  textTransform: "Capitalize",
  paddingTop: "4px",
  paddingBottom: "4px",
}));

const DeleteDialog = (props) => {
  const { onClose, logState, selectedSchedule } = props;
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
      <Box sx={{ padding: "10px" }}>
        <DialogTitle mb={1} sx={{ fontFamily: "Poppins" }}>
          {"Apakah anda yakin untuk menghapus akun ini?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography
              mb={0.3}
              sx={{
                fontSize: "17px",
                fontWeight: "400",
                fontFamily: "Poppins",
              }}
            >
              Jadwal: {selectedSchedule?.jadwal}
            </Typography>
            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: "400",
                fontFamily: "Poppins",
              }}
            >
              Kelas: {selectedSchedule?.courseTitle}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ paddingRight: "24px", paddingBottom: "15px" }}>
          <DialogButton variant="contained" onClick={() => handleClose(false)}>
            Tidak
          </DialogButton>
          <DialogButton variant="outlined" onClick={() => handleClose(true)}>
            Ya
          </DialogButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DeleteDialog;

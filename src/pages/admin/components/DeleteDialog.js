import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { SlideUpTransition } from "../../../styles/Transition";

const DialogButton = styled(Button)(({ theme }) => ({
  fontFamily: "Poppins",
  width: "15%",
  fontSize: "16px",
  fontWeight: "500",
  borderRadius: "8px",
  textTransform: "Capitalize",
  paddingTop: "4px",
  paddingBottom: "4px",
  color: "black",
}));

const DeleteDialog = (props) => {
  const { onClose, logState, selectedUser } = props;
  const handleClose = (state) => {
    onClose(state);
  };

  return (
    <Dialog
      open={logState}
      TransitionComponent={SlideUpTransition}
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
              Nama: {selectedUser?.nama}
            </Typography>
            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: "400",
                fontFamily: "Poppins",
              }}
            >
              Email: {selectedUser?.email}
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

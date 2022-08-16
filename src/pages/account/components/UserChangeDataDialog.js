import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { forwardRef, useState } from "react";
import styled from "styled-components";
import api from "../../../api/userAPI";
import useAuth from "../../../hooks/useAuth";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogButton = styled(Button)(({ theme }) => ({
  fontFamily: "Poppins",
  width: "100%",
  fontSize: "16px",
  fontWeight: "500",
  borderRadius: "8px",
  textTransform: "Capitalize",
  paddingTop: "7px",
  paddingBottom: "7px",
  color: "white",
  backgroundColor: "#5D5FEF",
}));

const UserChangeDataDialog = (props) => {
  const { onClose, logState, dialogOption } = props;
  const { auth } = useAuth();
  const [postData, setPostData] = useState({ ...auth });
  const [dialogState, setDialogState] = useState({ oldPass: false });
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

  const handleClose = (state, data = null) => {
    onClose(state, data);
  };

  const fetchPasswordValidation = async () => {
    try {
      console.table(postData);
      const response = await api.post("/PasswordValidation", {
        ...postData,
        id: auth.userId,
      });
      console.log(response.data);
      setDialogState({
        ...dialogState,
        oldPass: true,
        newPassword: "",
        rePassword: "",
      });
      const feedback = {
        severity: "success",
        msg: "Password lama tervalidasi",
      };
      handleClose(false, feedback);
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      const feedback = {
        severity: "error",
        msg: "Error: Password lama tidak valid",
      };
      handleClose(false, feedback);
    }
  };

  const fetchApiPut = async (url, data) => {
    try {
      const response = await api.put(`/${url}`, data);
      console.log(response.data);
      const feedback = {
        severity: "success",
        msg: `Berhasil, ${dialogOption} telah dirubah`,
      };
      setPostData({ ...postData, password: "" });
      setDialogState({ oldPass: false, newPassword: "", rePassword: "" });
      handleClose(true, feedback);
    } catch (err) {
      !err.response
        ? console.log(`Error: ${err.message}`)
        : console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      const feedback = {
        severity: "error",
        msg: `Error: Gagal merubah ${dialogOption}, data tidak valid`,
      };
      handleClose(true, feedback);
    }
  };

  const changPassword = () => {
    return (
      <Box sx={{ padding: "10px" }}>
        <DialogTitle mb={1}>{"Ubah Password"}</DialogTitle>
        <DialogContent>
          {!dialogState?.oldPass ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchPasswordValidation();
              }}
            >
              <Box noValidate>
                <TextField
                  disabled={dialogState?.oldPass}
                  value={postData.password}
                  label="Validasi Password Lama"
                  type="password"
                  onChange={(e) => {
                    setPostData({ ...postData, password: e.target.value });
                  }}
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />

                <DialogButton
                  disabled={!postData.password || dialogState?.oldPass}
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  Konfirmasi Password Lama
                </DialogButton>
              </Box>
            </form>
          ) : (
            <form
              // style={{ marginTop: "60px" }}
              onSubmit={(e) => {
                e.preventDefault();
                fetchApiPut("ChangePassword", {
                  ...postData,
                  id: auth?.userId,
                  password: dialogState.newPassword,
                });
              }}
            >
              <Box noValidate>
                <TextField
                  disabled={!dialogState?.oldPass}
                  value={dialogState?.newPassword}
                  label="Masukan Password Baru"
                  type="password"
                  onChange={(e) => {
                    setDialogState({
                      ...dialogState,
                      newPassword: e.target.value,
                    });
                  }}
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />
                <TextField
                  disabled={!dialogState?.oldPass}
                  value={dialogState?.rePassword}
                  label="Validasi Password Baru"
                  type="password"
                  onChange={(e) => {
                    setDialogState({
                      ...dialogState,
                      rePassword: e.target.value,
                    });
                  }}
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />

                <DialogButton
                  disabled={
                    !PWD_REGEX.test(dialogState?.newPassword) ||
                    dialogState?.newPassword !== dialogState.rePassword
                  }
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  Ubah Password
                </DialogButton>
              </Box>
            </form>
          )}
        </DialogContent>
      </Box>
    );
  };

  return (
    <Dialog
      open={logState}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        setDialogState({ oldPass: false, newPassword: "", rePassword: "" });
        setPostData({ ...postData, password: "" });
        handleClose(true, { severity: "out" });
      }}
      aria-describedby="alert-dialog-slide-description"
      // sx={{ padding: "30px" }}
    >
      {dialogOption === "password" ? changPassword() : <></>}
    </Dialog>
  );
};

export default UserChangeDataDialog;

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { forwardRef, useState } from "react";
import api from "../../../api/baseApi";
import useAuth from "../../../hooks/useAuth";
import { DialogButton } from "../../../styles/MyAccountStyle";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserChangeDataDialog = (props) => {
  const { onClose, logState, dialogOption } = props;
  const { auth, setAuth } = useAuth();
  const token = auth?.token;
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const [postData, setPostData] = useState({ ...auth, nama: "" });
  const [dialogState, setDialogState] = useState({ oldPass: false });
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

  const handleClose = (state, data = null) => {
    onClose(state, data);
  };

  const fetchPasswordValidation = async () => {
    try {
      const response = await api.post(
        "/UserAuth/PasswordValidation",
        {
          ...postData,
          id: auth.userId,
        },
        config
      );

      if (response?.data) {
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
      }
    } catch (err) {
      const feedback = {
        severity: "error",
        msg: "Error: Password lama tidak valid",
      };
      handleClose(false, feedback);
    }
  };

  const fetchApiPut = async (url, data) => {
    try {
      const response = await api.post(`/${url}`, data, config);
      const feedback = {
        severity: "success",
        msg: `Berhasil, ${dialogOption} telah dirubah`,
      };
      if (url === "UserAuth/ChangeName") {
        localStorage.clear();
        const newAuth = { ...auth, nama: postData.nama, token: response.data };
        setAuth({ ...newAuth });
        localStorage.setItem("userAuth", JSON.stringify(newAuth));
      }
      setPostData({ ...postData, password: "", nama: "" });
      setDialogState({ oldPass: false, newPassword: "", rePassword: "" });
      handleClose(true, feedback);
    } catch (err) {
      const feedback = {
        severity: "error",
        msg: `Error: Gagal merubah ${dialogOption}, data tidak valid`,
      };
      handleClose(true, feedback);
    }
  };

  const changPassword = () => {
    return (
      <Box sx={{ padding: { md: "10px", xs: "5px" } }}>
        <DialogTitle
          sx={{
            mb: { md: 1, xs: "0px" },
            fontSize: { md: "24px", xs: "18px" },
          }}
        >
          {"Ubah Password"}
        </DialogTitle>
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
                  InputProps={{ style: { fontFamily: "Poppins" } }}
                  InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                  sx={{
                    display: "flex",
                    fontSize: "10px",
                    flexGrow: 1,
                    marginTop: { md: "20px", xs: "6px" },
                    marginBottom: { md: "20px", xs: "10px" },
                  }}
                />

                <DialogButton
                  disabled={!postData.password || dialogState?.oldPass}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    marginTop: { md: "20px", xs: "6px" },
                    marginBottom: { md: "20px", xs: "6px" },
                  }}
                >
                  Konfirmasi Password Lama
                </DialogButton>
              </Box>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchApiPut("UserAuth/ChangePassword", {
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
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    marginTop: { md: "20px", xs: "6px" },
                    marginBottom: { md: "20px", xs: "10px" },
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
                  InputProps={{ style: { fontFamily: "Poppins" } }}
                  InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    marginTop: { md: "20px", xs: "20px" },
                    marginBottom: { md: "20px", xs: "16px" },
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
                    marginTop: { md: "20px", xs: "16px" },
                    marginBottom: { md: "20px", xs: "6px" },
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

  const changeName = () => {
    return (
      <Box sx={{ padding: { md: "10px", xs: "5px" } }}>
        <DialogTitle
          sx={{
            mb: { md: 1, xs: "0px" },
            fontSize: { md: "24px", xs: "18px" },
          }}
        >
          {"Ubah Nama"}
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchApiPut("UserAuth/ChangeName", {
                ...postData,
                id: auth?.userId,
              });
            }}
          >
            <Box noValidate>
              <TextField
                value={postData.nama}
                label="Nama Lengkap Pengguna"
                onChange={(e) => {
                  setPostData({ ...postData, nama: e.target.value });
                }}
                sx={{
                  display: "flex",
                  fontSize: "10px",
                  flexGrow: 1,
                  marginTop: { md: "20px", xs: "6px" },
                  marginBottom: { md: "20px", xs: "10px" },
                }}
                InputProps={{ style: { fontFamily: "Poppins" } }}
                InputLabelProps={{ style: { fontFamily: "Poppins" } }}
              />
              <DialogButton
                disabled={!postData.nama}
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  marginTop: { md: "20px", xs: "6px" },
                  marginBottom: { md: "20px", xs: "6px" },
                }}
              >
                Ubah Nama Pengguna
              </DialogButton>
            </Box>
          </form>
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
        setPostData({ ...postData, password: "", nama: "" });
        handleClose(true, { severity: "out" });
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      {dialogOption === "password" ? changPassword() : changeName()}
    </Dialog>
  );
};

export default UserChangeDataDialog;

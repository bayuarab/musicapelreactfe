import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import api from "../../../api/baseApi";
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

const PaymentMethodDialog = (props) => {
  const { onClose, logState, selectedOption, dialogOption, config } = props;
  const [imagePreview, setImagePreview] = useState("");
  const [postData, setPostData] = useState(selectedOption);

  const handleClose = (state, data = null) => {
    onClose(state, data);
  };

  const fetchApiPost = async (data) => {
    try {
      const response = await api.post(`/Payment`, data, config);
      if (response?.data) {
        const feedback = {
          severity: "success",
          msg: "Opsi pembayaran berhasil ditambahkan",
        };
        handleClose(true, feedback);
      }
    } catch (err) {
      const feedback = {
        severity: "error",
        msg: "Error: Gagal menambahkan opsi pembayaran, data tidak valid",
      };
      handleClose(true, feedback);
    }
  };

  const fetchApiPut = async (data) => {
    data = { ...postData, id: selectedOption.id };
    try {
      const response = await api.put(`/Payment`, data, config);
      if (response?.data) {
        const feedback = {
          severity: "success",
          msg: "Opsi pembayaran berhasil diubah",
        };
        handleClose(true, feedback);
      }
    } catch (err) {
      const feedback = {
        severity: "error",
        msg: "Error: Gagal merubah opsi pembayaran, data tidak valid",
      };
      handleClose(true, feedback);
    }
  };

  const onUpdatePost = () => {
    if (dialogOption === "edit") fetchApiPut(postData);
    else fetchApiPost({ method: postData.method, icon: postData.icon });
  };

  const onFileSubmit = (e) => {
    e.preventDefault();
    setPostData({ id: selectedOption.id, ...postData });
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setPostData({
      ...postData,
      icon: btoa(binaryString),
    });
  };

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const dialogDelete = () => {
    return (
      <Box sx={{ padding: "10px" }}>
        <DialogTitle mb={1} sx={{ fontFamily: "Poppins" }}>
          {"Apakah anda yakin untuk menghapus opsi pembayaran ini?"}
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
              Opsi Pembayaran : {selectedOption?.method}
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
    );
  };

  const dialogAdd = () => {
    return (
      <Box sx={{ padding: "10px" }}>
        <DialogTitle mb={1} sx={{ fontFamily: "Poppins" }}>
          {"Form penambahan opsi pembayaran"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)}>
            {imagePreview === "" ? (
              ""
            ) : (
              <img
                style={{ width: "57px", height: "57px" }}
                src={imagePreview}
                alt="upload"
              />
            )}
            <Input
              type="file"
              name="avatar"
              id="file"
              accept=".jpef, .png, .jpg"
              onChange={photoUpload}
              src={imagePreview}
            />
          </form>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onUpdatePost();
            }}
          >
            <Grid
              columnGap="10px"
              justifyContent="center"
              style={{ paddingBottom: "10px" }}
            >
              <Grid>
                <Box noValidate>
                  <TextField
                    id="Opsi Pembayaran"
                    value={postData.method}
                    label="Opsi Pembayaran"
                    onChange={(e) =>
                      setPostData({ ...postData, method: e.target.value })
                    }
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                    InputProps={{ style: { fontFamily: "Poppins" } }}
                    InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                  />

                  <Button
                    disabled={!(postData.method && postData.icon)}
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
                    Tambahkan Opsi Pembayaran
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Box>
    );
  };

  const dialogEdit = () => {
    return (
      <Box sx={{ padding: "10px" }}>
        <DialogTitle mb={1} sx={{ fontFamily: "Poppins" }}>
          {"Form ubah opsi pembayaran"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)}>
            {imagePreview === "" ? (
              ""
            ) : (
              <img
                style={{ width: "57px", height: "57px" }}
                src={imagePreview}
                alt="upload"
              />
            )}
            <Input
              type="file"
              name="avatar"
              id="file"
              accept=".jpef, .png, .jpg"
              onChange={photoUpload}
              src={imagePreview}
            />
          </form>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onUpdatePost();
            }}
          >
            <Grid
              columnGap="10px"
              justifyContent="center"
              style={{ paddingBottom: "10px" }}
            >
              <Grid>
                <Box noValidate>
                  <TextField
                    id="Opsi Pembayaran"
                    value={postData.method}
                    label="Opsi Pembayaran"
                    onChange={(e) =>
                      setPostData({ ...postData, method: e.target.value })
                    }
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                    InputProps={{ style: { fontFamily: "Poppins" } }}
                    InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                  />

                  <Button
                    disabled={!(postData.method && postData.icon)}
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
                    Simpan Perubahan
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Box>
    );
  };

  return (
    <Dialog
      open={logState}
      TransitionComponent={SlideUpTransition}
      keepMounted
      onClose={() => handleClose(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      {dialogOption === "delete"
        ? dialogDelete()
        : dialogOption === "add"
        ? dialogAdd()
        : dialogEdit()}
    </Dialog>
  );
};

export default PaymentMethodDialog;

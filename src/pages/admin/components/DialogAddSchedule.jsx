import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function DialogAddKelas(
  props = {
    open: false,
    id: 0,
    onClose: () => {},
    onAdd: () => {},
  }
) {
  /* useStates untuk keperluan POST merk baru */
  const [categoryName, setcategoryName] = useState("");
  const [categoryDescription, setcategoryDescription] = useState("");
  const [err, setErr] = useState("");
  const [open, setOpen] = React.useState(false);
  const [severityType, setSeverityType] = useState("error");
  /* useStates untuk keperluan POST merk baru */

  const Alerts = React.forwardRef(function Alerts(props, ref) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  /* Method to POST new Brand Item */
  const postKelas = () => {
    const postDataa = {
      jadwal: categoryName,
      courseId: categoryDescription,
    };
    console.log(postDataa);
    axios
      .post("https://localhost:7132/api/Schedule", postDataa)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.status);
          console.log(res.data);
          setSeverityType("success");
          setErr(`Berhasil menambahkan jadwal pada kelas ${res.data.course}`);
          setOpen(true);
          props.onClose();
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setSeverityType("error");
        setErr("Error : Schedule tidak valid");
        setOpen(true);
      });
  };
  /* Method to POST new Brand Item */

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <div style={{ padding: "20px", width: "100%" }}>
          {/* TITLE */}
          <DialogTitle>Tambahkan Kelas Baru</DialogTitle>
          <DialogContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                postKelas();
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
                      id="name"
                      value={categoryName}
                      label="Jadwal"
                      onChange={(e) => setcategoryName(e.target.value)}
                      style={{
                        display: "flex",
                        flexGrow: 1,
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    />
                    <TextField
                      id="description"
                      value={categoryDescription}
                      label="Id Kelas"
                      onChange={(e) => setcategoryDescription(e.target.value)}
                      style={{
                        display: "flex",
                        flexGrow: 1,
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    />

                    <Button
                      disabled={
                        categoryName === "" || categoryDescription === ""
                          ? true
                          : false
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
                      Tambahkan Jadwal Baru
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </div>
      </Dialog>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alerts
            onClose={handleClose}
            severity={severityType}
            sx={{ width: "100%" }}
          >
            {err}
          </Alerts>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default DialogAddKelas;

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../api/baseApi";
import useAuth from "../../../hooks/useAuth";

function DialogAddJadwal(
  props = {
    open: false,
    id: 0,
    onClose: () => {},
    onAdd: () => {},
  }
) {
  const [jadwal, setJadwal] = useState("");
  const [courseId, setCourseId] = useState("");
  const [err, setErr] = useState("");
  const [open, setOpen] = React.useState(false);
  const [listCourse, setListCourse] = useState([]);
  const [severityType, setSeverityType] = useState("error");
  const { auth } = useAuth();
  const token = auth?.token;
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const Alerts = React.forwardRef(function Alerts(props, ref) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const postJadwal = async () => {
    const postDataa = {
      jadwal: jadwal,
      courseId: courseId,
    };
    try {
      const res = await api.post("/Schedule", postDataa, config);
      if (res.status === 200) {
        setSeverityType("success");
        setErr("Berhasil menambahkan jadwal kelas");
        setOpen(true);
        props.onClose();
      }
    } catch (err) {
      console.log(err.response.data);
      setSeverityType("error");
      setErr("Error : Jadwal Tidak Valid");
      setOpen(true);
    }
  };

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await api.get("Course/AdminDialog");
        setListCourse(response.data);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        if (err.response.data === "Not Found") console.log(err.response.status);
        console.log(err.response.headers);
      }
    };
    getCourse();
  }, [setListCourse]);

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <div style={{ padding: "20px", width: "100%" }}>
          <DialogTitle sx={{ fontFamily: "Poppins" }}>
            Tambahkan Jadwal Kelas Baru
          </DialogTitle>
          <DialogContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                postJadwal();
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
                      value={jadwal}
                      label="Jadwal"
                      onChange={(e) => setJadwal(e.target.value)}
                      style={{
                        display: "flex",
                        flexGrow: 1,
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                      InputProps={{ style: { fontFamily: "Poppins" } }}
                      InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                    />

                    <FormControl fullWidth>
                      <InputLabel sx={{ fontFamily: "Poppins" }}>
                        Pilih Kelas
                      </InputLabel>
                      <Select
                        label="Pilih Kelas"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        size="medium"
                      >
                        {listCourse.map((course, i) => (
                          <MenuItem
                            value={course.id}
                            sx={{ fontFamily: "Poppins" }}
                          >
                            {course.courseTitle}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Button
                      disabled={jadwal === "" || courseId === "" ? true : false}
                      type="submit"
                      fullWidth
                      variant="contained"
                      style={{
                        display: "flex",
                        flexGrow: 1,
                        marginTop: "20px",
                        marginBottom: "20px",
                        fontFamily: "Poppins",
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

export default DialogAddJadwal;

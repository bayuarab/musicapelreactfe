import { Alert, Snackbar, Stack } from "@mui/material";
import React, { forwardRef } from "react";

const Alerts = forwardRef(function Alerts(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({
  message,
  snackbarState,
  handleCloseSnackbar,
  severityType,
}) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={snackbarState}
        autoHideDuration={4000}
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
  );
};

export default SnackBar;

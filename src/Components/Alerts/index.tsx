import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppSliceState, removeAlert } from "../../Redux/AppSlice";

enum AlertType {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success",
}

const Alerts: React.FC = () => {
  const alerts = useSelector(
    (state: { app: AppSliceState }) => state.app.alerts
  );
  const dispatch = useDispatch();

  const handleClose = (): void => {
    dispatch(removeAlert());
  };

  return (
    <Stack spacing={2} sx={{ width: "100%", zIndex: 99 }}>
      {alerts.map((alert) => (
        <Snackbar
          key={alert.title}
          open
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={alert.severity as AlertType}
          >
            <strong>{alert.message}</strong>
          </MuiAlert>
        </Snackbar>
      ))}
    </Stack>
  );
};

export default Alerts;

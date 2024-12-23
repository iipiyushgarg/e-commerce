import { PaletteMode } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

interface Alert {
  message: string;
  severity: string;
  title: string;
}

export interface AppSliceState {
  alerts: Alert[];
  isLoading: boolean;
  mode: PaletteMode;
}

const initialState: AppSliceState = {
  alerts: [],
  isLoading: false,
  mode: "dark",
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    successAlert: (state, { payload }) => {
      state.alerts.push({
        message: payload.message,
        severity: "success",
        title: "Success",
      });
    },
    errorAlert: (state, { payload }) => {
      state.alerts.push({
        message: payload.message,
        severity: "error",
        title: "Error",
      });
    },
    removeAlert: (state) => {
      state.alerts.splice(0, 1);
    },
    loadingStarted: (state) => {
      state.isLoading = true;
    },
    loadingComplete: (state) => {
      state.isLoading = false;
    },
    changeTheme: (state, { payload }) => {
      state.mode = payload;
    },
  },
});

export const {
  successAlert,
  errorAlert,
  removeAlert,
  loadingStarted,
  loadingComplete,
  changeTheme,
} = AppSlice.actions;

export default AppSlice;

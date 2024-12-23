import { Box, Typography } from "@mui/material";
import React from "react";
import { AppSliceState, changeTheme } from "../../Redux/AppSlice";
import { useDispatch, useSelector } from "react-redux";

const Appearance: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: { app: AppSliceState }) => state.app.mode);

  return (
    <Box
      sx={{
        position: "fixed",
        right: 20,
        bottom: 20,
        borderRadius: 12,
        border: "1px solid",
        p: 1,
        py: 0.6,
        bgcolor: "text.primary",
        color: "background.paper",
        cursor: "pointer",
      }}
      onClick={() => {
        dispatch(changeTheme(mode === "dark" ? "light" : "dark"));
      }}
    >
      <Typography>Click Me :)</Typography>
    </Box>
  );
};

export default Appearance;

import { createTheme } from "@mui/material/styles";

const colors = {
  primary: {
    main: "#0366FF",
    main100: "#DFEBFF",
  },
};

// Create a theme instance.
import { PaletteMode } from "@mui/material";

const defaultTheme = (theme: PaletteMode = "dark") =>
  createTheme({
    palette: {
      ...colors,
      mode: theme,
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
          },
        },
      },
    },
  });

export default defaultTheme;

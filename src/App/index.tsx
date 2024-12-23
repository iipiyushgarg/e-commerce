import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import ErrorBoundary from "../Components/Error-boundary";
import Alerts from "../Components/Alerts";
import Appearance from "../Components/Appearance";
import defaultTheme from "../Themes/default";
import Routes from "../Routes";
import { AppSliceState } from "../Redux/AppSlice";

const App = () => {
  const mode = useSelector((state: { app: AppSliceState }) => state.app.mode);

  return (
    <ThemeProvider theme={defaultTheme(mode)}>
      <CssBaseline />
      <ErrorBoundary>
        <Routes />
        <Alerts />
        <Appearance />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;

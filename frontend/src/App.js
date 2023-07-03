import { QueryClient, QueryClientProvider } from "react-query";
import { useMemo } from "react";
// import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Home from "./screens/Home/index.jsx";

const queryClient = new QueryClient();

const App = () => {
  // const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <div>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Home />
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;

import { QueryClient, QueryClientProvider } from "react-query";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/index.jsx";
import Auth from "./screens/Home/Auth";

const queryClient = new QueryClient();

const App = () => {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  const isAuth = true;

  return (
    <div>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route
                path="/auth"
                element={isAuth ? <Auth /> : <Navigate to="/" />}
              />
              <Route
                path={"/" || "/home"}
                element={isAuth ? <Home /> : <Navigate to="/" />}
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;

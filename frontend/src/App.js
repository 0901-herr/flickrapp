import { QueryClient, QueryClientProvider } from "react-query";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/Home";
import AuthScreen from "./screens/Auth";

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
                path={"/"}
                element={isAuth ? <AuthScreen /> : <Navigate to="/" />}
              />
              <Route
                path={"/auth"}
                element={isAuth ? <AuthScreen /> : <Navigate to="/" />}
              />
              <Route
                path="/home"
                element={isAuth ? <HomeScreen /> : <Navigate to="/" />}
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { WavingHand, AppRegistration } from "@mui/icons-material";
import { setLogin } from "../../../state/index.js";
import { useDispatch } from "react-redux";

export default function Auth() {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [pageType, setPageType] = useState("login");

  const primaryBlue = theme.palette.primary.light;
  const primaryRed = theme.palette.primary.main;

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (onSubmitProps) => {
    const requestData = {
      email: email,
      password: password,
    };

    try {
      const savedUserResponse = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      const savedUser = await savedUserResponse.json();
      if (savedUser) {
        setPageType("login");
      }
      // Handle the response
    } catch (error) {
      // Handle any errors
    }
  };

  const login = async (onSubmitProps) => {
    const requestData = {
      email: email,
      password: password,
    };

    try {
      const loggedInResponse = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      const loggedIn = await loggedInResponse.json();

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(onSubmitProps);
    if (isRegister) await register(onSubmitProps);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box m="6rem 0" display="flex" flexDirection="column" alignItems="center">
        {isRegister && (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              fontSize="26px"
              variant="h5"
              fontWeight="bold"
              pr="0.5rem"
            >
              Register
            </Typography>
            <AppRegistration sx={{ fontSize: "26px" }} />
          </Box>
        )}

        {isLogin && (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              fontSize="26px"
              variant="h5"
              fontWeight="bold"
              pr="0.5rem"
            >
              Login
            </Typography>
            <WavingHand sx={{ fontSize: "26px" }} />
          </Box>
        )}

        <Box noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            label="Email"
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            name="email"
            autoComplete="email"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: primaryRed,
                },
              },
              "& label.Mui-focused": {
                color: primaryRed,
              },
            }}
          />
          <TextField
            margin="normal"
            label="Password"
            type="password"
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            name="password"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: primaryRed,
                },
              },
              "& label.Mui-focused": {
                color: primaryRed,
              },
            }}
          />

          <Button
            fullWidth
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              background: primaryRed,
              color: "white",
              "&:hover": { color: primaryRed },
            }}
            onClick={handleFormSubmit}
          >
            Continue
          </Button>

          <Divider
            sx={{
              marginTop: "3rem",
              marginBottom: "1.5rem",
            }}
          />

          <Grid container pt="1rem">
            <Grid item xs>
              <Typography
                href="#"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    color: primaryRed,
                    cursor: "pointer",
                  },
                }}
              >
                Forgot password?
              </Typography>
            </Grid>
            <Grid item>
              {isLogin && (
                <Typography
                  href="#"
                  variant="body2"
                  sx={{
                    textDecoration: "none",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    // resetForm();
                    setPageType("register");
                  }}
                >
                  Don't have an account?{" "}
                  <span style={{ color: primaryRed }}>Register</span>
                </Typography>
              )}
              {isRegister && (
                <Typography
                  href="#"
                  variant="body2"
                  sx={{
                    textDecoration: "none",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    // resetForm();
                    setPageType("login");
                  }}
                >
                  Already have an account?{" "}
                  <span style={{ color: primaryRed }}>Login</span>
                </Typography>
              )}{" "}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

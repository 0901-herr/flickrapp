import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { WavingHand, AppRegistration, ErrorOutline } from "@mui/icons-material";
import { setLogin } from "../../../state/index.js";
import { useDispatch } from "react-redux";

const FlyInDialog = ({ message, onClose }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { position: "absolute", top: 16, right: 16 } }}
    >
      <Box width="340px" p="1.5rem">
        <ErrorOutline sx={{ fontSize: "26px" }} />
        <Typography fontSize="18px" fontWeight="bold">
          {message}
        </Typography>
        <Typography fontSize="14px">
          Please try again with another email or password
        </Typography>
      </Box>
    </Dialog>
  );
};

export default function Auth() {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [pageType, setPageType] = useState("login");

  const themeBlue = theme.palette.primary.light;
  const themeRed = theme.palette.primary.main;

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = async () => {
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

  const login = async () => {
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

      if (loggedInResponse.ok) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/");
      } else {
        console.log(loggedIn.msg);
        setErrorMessage(loggedIn.msg);
        handleInvalidCredentials();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFormSubmit = async (values) => {
    if (isLogin) await login();
    if (isRegister) await register();
  };

  const handleInvalidCredentials = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      {showDialog && (
        <FlyInDialog message={errorMessage} onClose={handleCloseDialog} />
      )}

      <Box m="6rem 0" display="flex" flexDirection="column" alignItems="center">
        {isRegister && (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <AppRegistration sx={{ fontSize: "26px" }} />
            <Typography
              fontSize="26px"
              variant="h5"
              fontWeight="bold"
              pl="0.75rem"
            >
              Register
            </Typography>
          </Box>
        )}

        {isLogin && (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <WavingHand sx={{ fontSize: "26px" }} />
            <Typography
              fontSize="26px"
              variant="h5"
              fontWeight="bold"
              pl="0.75rem"
            >
              Login
            </Typography>
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
                  borderColor: themeRed,
                },
              },
              "& label.Mui-focused": {
                color: themeRed,
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
                  borderColor: themeRed,
                },
              },
              "& label.Mui-focused": {
                color: themeRed,
              },
            }}
          />

          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="5px"
            m="2rem 0"
            p="1rem"
            sx={{
              background: `linear-gradient(to bottom right, ${themeRed}, ${themeBlue})`,
              "&:hover": {
                cursor: "pointer",
                background: `linear-gradient(to bottom right, ${themeBlue}, ${themeRed})`,
              },
            }}
            onClick={handleFormSubmit}
          >
            <Typography color="white" fontSize="14px">
              CONTINUE
            </Typography>
          </Box>

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
                    color: themeRed,
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
                    setPageType("register");
                  }}
                >
                  Don't have an account?{" "}
                  <span style={{ color: themeRed }}>Register</span>
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
                  <span style={{ color: themeRed }}>Login</span>
                </Typography>
              )}{" "}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

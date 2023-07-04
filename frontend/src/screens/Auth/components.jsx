import * as React from "react";
import { useState } from "react";
import { Box, TextField, Typography, Divider, useTheme } from "@mui/material";
import { WavingHand, AppRegistration } from "@mui/icons-material";

import ErrorMessageView from "../../components/ErrorMessageView.jsx";
import GradientButton from "../../components/GradientButton.jsx";

const Auth = (props) => {
  // -------------------- HOOKS, STATES & VARIABLES
  const theme = useTheme();

  const themeRed = theme.palette.primary.main;

  const {
    email,
    password,
    errorMessage,
    showDialog,
    pageType,
    setEmail,
    setPassword,
    setPageType,
    handleFormSubmit,
    handleCloseDialog,
  } = props;

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // -------------------- RENDER
  return (
    <Box>
      {/* Error message view */}
      {showDialog && (
        <ErrorMessageView message={errorMessage} onClose={handleCloseDialog} />
      )}

      {/* Login/Register form */}
      <Box m="6rem 0" display="flex" flexDirection="column" alignItems="center">
        {/* Title for register */}
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

        {/* Title for login */}
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

        {/* Form for login/register */}
        <Box sx={{ mt: 1 }}>
          {/* Email textfield */}
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

          {/* Password textfield */}
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

          {/* Submit button */}
          <GradientButton text="continue" onClickAction={handleFormSubmit} />

          <Divider
            sx={{
              marginTop: "3rem",
              marginBottom: "1.5rem",
            }}
          />

          {/* Register account */}
          <Box
            display="flxe"
            flexDirection="row"
            justifyContent="space-between"
            pt="1rem"
          >
            <Box>
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;

import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index.js";
import Auth from "./components.jsx";

const AuthScreen = () => {
  // -------------------- HOOKS, STATES & VARIABLES
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pageType, setPageType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // -------------------- FUNCTIONS
  const register = async () => {
    const requestData = {
      email: email,
      password: password,
    };

    try {
      // Create the user
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

      // Go to login page if user created successful
      if (savedUserResponse.ok) {
        setPageType("login");
      } else {
        setErrorMessage(savedUser.msg);
        handleInvalidCredentials();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const login = async () => {
    const requestData = {
      email: email,
      password: password,
    };

    try {
      // Fetch the user
      const loggedInResponse = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      const loggedIn = await loggedInResponse.json();

      // If user exist, set app state
      if (loggedInResponse.ok) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      } else {
        setErrorMessage(loggedIn.msg);
        handleInvalidCredentials();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFormSubmit = async () => {
    if (isLogin) await login();
    if (isRegister) await register();
  };

  const handleInvalidCredentials = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  // -------------------- PROPS
  const props = {
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
  };

  // -------------------- RENDER
  return <Auth {...props} />;
};

export default AuthScreen;

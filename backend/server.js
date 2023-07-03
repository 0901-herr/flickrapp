import express from "express";
import cors from "cors";
import home from "./routes/home.js";
import AuthController from "./controllers/auth.js";

const app = express();

app.use(cors());
app.use(express.json()); // Enable parsing of JSON data
app.use(express.urlencoded({ extended: true })); // Enable parsing of URL-encoded data

// Define routes
app.use("/api/home", home);
app.post("/api/auth/register", AuthController.register);
app.post("/api/auth/login", AuthController.login);

export default app;

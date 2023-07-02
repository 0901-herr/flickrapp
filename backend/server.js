import express from "express";
import cors from "cors";
import home from "./routes/home.js";

const app = express();

app.use(cors());
app.use(express.json()); // Enable parsing of JSON data
app.use(express.urlencoded({ extended: true })); // Enable parsing of URL-encoded data

// Define routes
app.use("/api/home", home);

export default app;

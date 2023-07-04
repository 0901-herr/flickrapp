import express from "express";
import HomeController from "../controllers/home.js";

const router = express.Router();

// Define routes for search
router.route("/search").get(HomeController.apiGetImages);

export default router;

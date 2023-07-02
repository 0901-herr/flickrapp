import express from "express";
import HomeController from "../controllers/home.js";

const router = express.Router();

router.route("/search").get(HomeController.apiGetImages);

export default router;

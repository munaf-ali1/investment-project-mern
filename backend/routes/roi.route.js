import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getROIHistory, getROIChartData } from "../controllers/roi.controller.js";

const router = express.Router();

router.get("/history", authMiddleware, getROIHistory);

router.get("/chart", authMiddleware, getROIChartData);
export default router;

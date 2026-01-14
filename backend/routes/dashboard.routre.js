import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", authMiddleware, getDashboardData);

export default dashboardRouter;

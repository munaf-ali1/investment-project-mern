import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { addMoneyToWallet } from "../controllers/wallet.controller.js";

const router = express.Router();

router.post("/add", authMiddleware, addMoneyToWallet);

export default router;

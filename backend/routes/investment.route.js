import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js';

import { createInvestment } from '../controllers/investment.controller.js'
import { getMyInvestments } from '../controllers/investment.controller.js';

const investmentRouter = express.Router();

investmentRouter.post('/create', authMiddleware, createInvestment);
investmentRouter.get('/my', authMiddleware, getMyInvestments);


export default investmentRouter;
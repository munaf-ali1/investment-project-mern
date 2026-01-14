
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRouter from './routes/auth.route.js';
import investmentRouter from './routes/investment.route.js';
import startDailyROICron from './cron/dailyROI.cron.js';
import dashboardRouter from './routes/dashboard.routre.js';
import roiRouter from './routes/roi.route.js';
import refferalRouter from './routes/refferal.route.js';
import walletRoutes from './routes/wallet.route.js';

console.log('Starting server...');

const port = process.env.PORT || 8000;

app.use(cors({
    origin:"https://investment-project.onrender.com",
    credentials:true
}))

app.use(express.json());
app.use(cookieParser())


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRouter);
app.use('/api/investment', investmentRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/roi', roiRouter);
app.use('/api/referral', refferalRouter);
app.use('/api/wallet', walletRoutes);


const startServer = async () => {
  await connectDB();
  startDailyROICron();   // cron start
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();

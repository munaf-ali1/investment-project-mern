
import cron from "node-cron";
import { calculateDailyROI } from "../services/roi.service.js";

const startDailyROICron = () => {
  //  Runs once every day at 12:00 AM (midnight)
  cron.schedule("0 0 * * *", async () => {
    console.log(" DAILY ROI CRON RUNNING (MIDNIGHT):", new Date());
    await calculateDailyROI();
  });
};

export default startDailyROICron;



import User from "../models/User.js";
import Investment from "../models/Investment.js";
import ROIHistory from "../models/roiHistory.js";

export const calculateDailyROI = async () => {
  const today = new Date().toISOString().split("T")[0];

  const activeInvestments = await Investment.find({ status: "ACTIVE" });

  console.log(`Found ${activeInvestments.length} active investments`);

  for (let investment of activeInvestments) {
    const alreadyCredited = await ROIHistory.findOne({
      investment: investment._id,
      date: today
    });

    if (alreadyCredited) continue;

    const roiAmount = investment.amount * 0.01; // 1% daily

    const user = await User.findById(investment.user);
    if (!user) continue;

    user.walletBalance += roiAmount;
    await user.save();

    await ROIHistory.create({
      user: user._id,
      investment: investment._id,
      date: today,
      roiAmount
    });
  }

  console.log("Daily ROI calculation completed");
};
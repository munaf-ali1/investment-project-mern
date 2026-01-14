import Investment from "../models/Investment.js";
import ROIHistory from "../models/roiHistory.js";
import ReferralIncome from "../models/ReferralIncome.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ User wallet
    const user = await User.findById(userId);

    // 2️⃣ Total investments count
    const investments = await Investment.find({ user: userId });

    // 3️⃣ Daily ROI (today)
    const today = new Date().toISOString().split("T")[0];

    const todayROIAgg = await ROIHistory.aggregate([
  {
    $match: {
      user: new mongoose.Types.ObjectId(userId),
      date: today
    }
  },
  {
    $group: {
      _id: null,
      total: { $sum: "$roiAmount" }
    }
  }
]);

const todayROI = todayROIAgg[0]?.total || 0;
  console.log("TodayROI:", todayROI);

    // 4️ Referral income (LEVEL-WISE)
    const referralIncomeAgg = await ReferralIncome.aggregate([
  {
    $match: {
      toUser: new mongoose.Types.ObjectId(userId)
    }
  },
  {
    $group: {
      _id: "$level",
      total: { $sum: "$amount" }
    }
  }
]);

console.log("ReferralIncomeAgg:", referralIncomeAgg);

    



    // convert aggregation to object
    const referralIncome = {};
    let totalReferralIncome = 0;

    referralIncomeAgg.forEach((item) => {
      referralIncome[`level${item._id}`] = item.total;
      totalReferralIncome += item.total;
    });

     console.log("ReferralIncomeAgg:", referralIncomeAgg);
console.log("ReferralIncome:", referralIncome);
console.log("TotalReferralIncome:", totalReferralIncome);
 

    res.status(200).json({
      wallet: user.walletBalance,
      dailyROI: todayROI,
      totalInvestments: investments.length,

      //  referral data
      referralIncome,
      totalReferralIncome,
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};


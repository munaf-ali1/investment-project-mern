import Investment from "../models/Investment.js";
import User from "../models/User.js";
import { distributeReferralIncome } from "../services/referral.service.js";

// ✅ CREATE INVESTMENT
export const createInvestment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, plan } = req.body;

    // validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid investment amount" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.walletBalance < amount) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    // 💰 deduct investment amount
    user.walletBalance -= amount;
    await user.save();

    // 📈 create investment
    const investment = await Investment.create({
      user: userId,
      amount,
      plan,
    });

    // 🔁 distribute referral income (LEVEL-WISE)
    await distributeReferralIncome(user, amount);

    return res.status(201).json({
      message: "Investment created successfully",
      investment,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ GET MY INVESTMENTS
export const getMyInvestments = async (req, res) => {
  try {
    const userId = req.user.id;

    const investments = await Investment.find({ user: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(investments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

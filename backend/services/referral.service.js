import User from "../models/User.js";
import ReferralIncome from "../models/ReferralIncome.js";

const COMMISSION_CONFIG = [
  { level: 1, percent: 0.05 },
  { level: 2, percent: 0.02 },
];

export const distributeReferralIncome = async (investor, investmentAmount) => {
  let currentUser = investor;
  let level = 1;

  for (const config of COMMISSION_CONFIG) {
    if (!currentUser.referredBy) break;

    const referrer = await User.findById(currentUser.referredBy);
    if (!referrer) break;

    const commission = investmentAmount * config.percent;

    // 💰 wallet update
    referrer.walletBalance += commission;
    await referrer.save();

    // 🧾 history save
    await ReferralIncome.create({
      fromUser: investor._id,
      toUser: referrer._id,
      level: config.level,
      amount: commission,
    });

    currentUser = referrer;
    level++;
  }
};

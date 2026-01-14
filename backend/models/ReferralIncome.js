import mongoose from "mongoose";

const referralIncomeSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    level: {
      type: Number,
      required: true
    },

    amount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("ReferralIncome", referralIncomeSchema);

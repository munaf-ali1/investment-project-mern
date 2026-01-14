import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    plan: {
      type: String,
      enum: ["BASIC", "PREMIUM"],
      default: "BASIC"
    },

    startDate: {
      type: Date,
      default: Date.now
    },

    endDate: {
      type: Date
    },

    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Investment", investmentSchema);

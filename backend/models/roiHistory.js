import mongoose from "mongoose";

const roiHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    investment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investment",
      required: true
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true
    },

    roiAmount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("ROIHistory", roiHistorySchema);

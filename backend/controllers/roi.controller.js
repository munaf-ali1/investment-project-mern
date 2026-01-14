import ROIHistory from "../models/roiHistory.js";
import mongoose from "mongoose";

export const getROIHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const roiHistory = await ROIHistory.find({
      user: new mongoose.Types.ObjectId(userId)
    }).sort({ date: -1 });

    res.status(200).json(roiHistory);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch ROI history" });
  }
};





export const getROIChartData = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await ROIHistory.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: "$date",          // date is STRING
          roi: { $sum: "$roiAmount" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    console.log("ROI Chart Data:", data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



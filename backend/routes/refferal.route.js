import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import User from "../models/User.js";

const router = express.Router();

// Recursive function
const buildReferralTree = async (userId, level = 0) => {
  const children = await User.find({ referredBy: userId }).select("name _id");

  const user = await User.findById(userId).select("name");
  return {
    name: level === 0 ? "You" : user?.name || "Unknown",
    level,
    children: await Promise.all(
      children.map(async (child) => ({
        name: child.name,
        level: level + 1,
        children: await buildReferralTree(child._id, level + 1)
          .then(res => res.children),
      }))
    ),
  };
};

//  Get referral tree
router.get("/tree", authMiddleware, async (req, res) => {
  try {
    const tree = await buildReferralTree(req.user.id);
    res.status(200).json(tree);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch referral tree" });
  }
});

export default router;

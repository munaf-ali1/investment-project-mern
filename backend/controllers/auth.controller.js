import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, referralId } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists){
        return res.status(400).json({ message: "User already exists" });

    }
    if( !name || !email || !password ){
        return res.status(400).json({ message: "All fields are required" });
    }
    if( password.length < 6 ){
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const referralCode = Math.random().toString(36).substring(2, 8);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      referralCode,
      referredBy: referralId || null
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

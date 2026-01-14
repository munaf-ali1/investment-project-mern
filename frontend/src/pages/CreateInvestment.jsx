import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CreateInvestment = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState("BASIC");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount < 1000) {
      alert("Minimum investment is ₹1000");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found, please login');
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${serverUrl}/api/investment/create`,
        { amount, plan },
        { 
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true 
        }
      );

      alert("Investment created successfully 🚀");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Investment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center px-4 mt-10"
      >
        <motion.form
          whileHover={{ y: -4 }}
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Create Investment
          </h2>
          <p className="text-center text-gray-500 mt-1 mb-6">
            Start growing your money 💰
          </p>

          {/* AMOUNT */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">
              Investment Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* PLAN */}
          <div className="mb-6">
            <label className="text-sm text-gray-600">
              Select Plan
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="BASIC">Basic Plan (1% Daily)</option>
              <option value="PREMIUM">Premium Plan (1.5% Daily)</option>
            </select>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Processing..." : "Invest Now"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default CreateInvestment;

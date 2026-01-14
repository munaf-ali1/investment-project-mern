import AuthLayout from "../components/AuthLayout";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";

/* 🔥 Framer Motion Variants */
const container = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirectTo = location.state?.from || "/dashboard";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        form,
        { withCredentials: true }
      );

      dispatch(setUserData(res.data.user));
      localStorage.setItem('token', res.data.token);
      navigate(redirectTo);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to InvestPro">
      <motion.form
        variants={container}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* EMAIL */}
        <motion.input
          variants={item}
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        {/* PASSWORD */}
        <motion.div variants={item} className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none pr-12"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </motion.div>

        {/* BUTTON */}
        <motion.button
          variants={item}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition cursor-pointer disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>
      </motion.form>

      <p className="text-center text-gray-500 mt-6">
        Don’t have an account?{" "}
        <Link to="/register" className="text-indigo-500 hover:underline">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;

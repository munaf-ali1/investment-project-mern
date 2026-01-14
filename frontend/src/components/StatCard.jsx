
import { motion } from "framer-motion";

const StatCard = ({ title, value, gradient }) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
        boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
      }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`relative overflow-hidden p-6 rounded-2xl text-white bg-gradient-to-r ${gradient}`}
    >
      {/* Glow layer */}
      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition cursor-pointer" />

      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </motion.div>
  );
};

export default StatCard;

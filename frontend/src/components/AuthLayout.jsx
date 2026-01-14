import { motion } from "framer-motion";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {title}
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-6">
          {subtitle}
        </p>

        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;

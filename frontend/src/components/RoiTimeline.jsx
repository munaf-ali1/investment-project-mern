import { motion } from "framer-motion";

const ROITimeline = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg p-6 mt-10"
    >
      <h3 className="font-semibold mb-6 text-gray-700">
        ROI Growth Timeline
      </h3>

      <div className="space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
          >
            <div>
              <p className="font-medium text-gray-700">
                {item.date}
              </p>
              <p className="text-xs text-gray-400">
                Daily ROI Credit
              </p>
            </div>

            <div className="text-green-600 font-semibold">
              +₹{item.amount}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ROITimeline;

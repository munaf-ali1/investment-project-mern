import { motion } from "framer-motion";

const Node = ({ node }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center"
    >
      {/* USER CIRCLE */}
      <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold shadow-lg">
        {node.name.charAt(0)}
      </div>

      <p className="text-sm mt-2 text-gray-700">{node.name}</p>
      {node.level !== 0 && (
        <span className="text-xs text-gray-400">
          Level {node.level}
        </span>
      )}

      {/* CHILDREN */}
      {node.children.length > 0 && (
        <div className="flex gap-8 mt-6">
          {node.children.map((child, idx) => (
            <Node key={idx} node={child} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const ReferralTree = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 mt-10"
    >
      <h3 className="font-semibold mb-6 text-gray-700 ">
        Referral Network
      </h3>

      <div className="flex justify-center overflow-x-auto cursor-pointer">
        <Node node={data} />
      </div>
    </motion.div>
  );
};

export default ReferralTree;

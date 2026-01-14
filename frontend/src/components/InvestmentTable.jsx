import { motion } from "framer-motion";

const InvestmentTable = ({ investments }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow p-6 mt-8"
    >
      <h3 className="font-semibold mb-4">My Investments</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 text-left cursor-pointer">
            <th>Amount</th>
            <th>Plan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((inv) => (
            <tr key={inv._id} className="border-t">
              <td>₹{inv.amount}</td>
              <td>{inv.plan}</td>
              <td className="text-green-600">{inv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default InvestmentTable;

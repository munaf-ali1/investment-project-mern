import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";

const AddMoneyModal = ({ onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");

  const handleAddMoney = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/wallet/add`,
        { amount },
        { withCredentials: true }
      );

      alert("Money added successfully 💰");
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add money");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Add Money to Wallet</h2>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleAddMoney}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMoneyModal;

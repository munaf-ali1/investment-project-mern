import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShowWalletModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow">
      
      {/*  LEFT: LOGO */}
      <h1 className="text-xl font-bold text-indigo-600">
        InvestPro
      </h1>

      {/*  RIGHT: ACTION BUTTONS */}
      <div className="flex items-center gap-4">
        
        {/*  ADD MONEY */}
        <button
          onClick={() => setShowWalletModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 cursor-pointer transition"
        >
          + Add Money
        </button>

        {/* NEW INVESTMENT */}
        <button
          onClick={() => navigate("/investment/create")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
        >
          New Investment
        </button>

        {/*  LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;



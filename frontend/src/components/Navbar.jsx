import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow">
      
      {/* LEFT: LOGO */}
      <h1 className="text-xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/dashboard")}
      >
        InvestPro
      </h1>

      {/* RIGHT: ACTION BUTTONS */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/investment/create")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition cursor-pointer"
        >
          New Investment
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition cursor-pointer"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Navbar;


import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CreateInvestment from "./pages/CreateInvestment.jsx";



export const serverUrl = "http://localhost:8000";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
        <PrivateRoute>
          <Dashboard />
       </PrivateRoute>
        }
      />
      <Route
        path="/investment/create"
        element={
        <PrivateRoute>
          <CreateInvestment />
        </PrivateRoute>
        }
      />



    </Routes>
  )
}

export default App

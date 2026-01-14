import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { motion } from "framer-motion";
import InvestmentChart from "../components/InvestmentChat";
import ReferralTree from "../components/ReferralTree";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import InvestmentTable from "../components/InvestmentTable";
import ROITimeline from "../components/RoiTimeline";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roiTimeline, setRoiTimeline] = useState([]);
  const [ roiChartData, setRoiChartData ] = useState([]);
  const [referralTree, setReferralTree] = useState(null);
  const user = useSelector((state) => state.user.userData);

 

const referralLink = `${window.location.origin}/register?ref=${user._id}`;











  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found, please login');
        return;
      }

      try {
        const dashRes = await axios.get(
          `${serverUrl}/api/dashboard`,
          { 
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true 
          }
        );

  const roiRes = await axios.get(
  `${serverUrl}/api/roi/history`,
  { 
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true 
  }
);

setRoiTimeline(
  roiRes.data.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    amount: item.roiAmount,
  }))
);

  const chartRes = await axios.get(
    `${serverUrl}/api/roi/chart`,
    { 
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true 
    }
  )
  console.log("CHART API:", chartRes.data);


 setRoiChartData(
  chartRes.data.map(item => ({
    date: item._id,
    roi: item.roi,
    
  }))
);

const refRes = await axios.get(
  `${serverUrl}/api/referral/tree`,
  { 
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true 
  }
);

setReferralTree(refRes.data);






        const invRes = await axios.get(
          `${serverUrl}/api/investment/my`,
          { 
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true 
          }
        );

        setDashboard(dashRes.data);
        setInvestments(invRes.data);
      } catch (err) {
        alert("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="p-8">Loading dashboard...</p>;
  }

  if (!dashboard) {
    return <p className="p-8">Failed to load dashboard. Please try logging in again.</p>;
  }
  {/*  Animated Background */}
<div className="fixed inset-0 -z-10 overflow-hidden">
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
</div>


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-500 to-indigo-300">

    
      <Navbar />
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="p-8"
>
  <div className="mb-8">
  <h1 className="text-3xl font-bold text-gray-800">
    Investment Dashboard
  </h1>
  <p className="text-gray-500 mt-1">
    Track your investments, ROI & referral earnings
  </p>
</div>


     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          <StatCard
            title="Wallet Balance"
            value={`₹${dashboard.wallet}`}
            gradient="from-indigo-500 to-purple-600"
          />
          <StatCard
            title="Daily ROI"
            value={`₹${dashboard.dailyROI}`}
            gradient="from-green-500 to-emerald-600"
          />
          <StatCard
            title="Referral Income"
            value={`₹${dashboard.totalReferralIncome}`}
            gradient="from-orange-500 to-pink-500"
          />
        </div>


        {/*  Referral Link Section */}
<div className="bg-white rounded-xl shadow p-4 mt-6">
  <p className="text-sm text-gray-600 font-semibold">
    Your Referral Link
  </p>

  <div className="flex items-center gap-2 mt-2">
    <input
      type="text"
      value={referralLink}
      readOnly
      className="flex-1 p-2 border rounded text-sm"
    />
    <button
      onClick={() => navigator.clipboard.writeText(referralLink)}
      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
    >
      Copy
    </button>
  </div>
</div>




        
      {referralTree && <ReferralTree data={referralTree} />}


      {roiChartData.length > 0 ? (
  <InvestmentChart data={roiChartData} />
) : (
  <p className="text-gray-600 mt-6">ROI chart will be available soon</p>
)}




      {roiTimeline.length > 0 ? (
  <ROITimeline data={roiTimeline} />
) : (
  <p className="text-gray-600 mt-6">ROI data will appear after daily calculation</p>
)}



      
  
        


        <InvestmentTable investments={investments} />
      </motion.div>
    </div>
  );
};

export default Dashboard;

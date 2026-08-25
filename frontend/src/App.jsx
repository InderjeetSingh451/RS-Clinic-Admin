import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddPatient from "./pages/AddPatient";
import OtpVerification from "./pages/OtpVerification";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchPatient from "./pages/SearchPatient";
import PatientHistory from "./pages/PatientHistory";
import { useEffect, useState } from "react";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(false);
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
    if (token) {
      navigate("/dashboard");
    } else navigate("/login");
  }, [token]);
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/search-patient" element={<SearchPatient />} />
        <Route path="/patient/:id" element={<PatientHistory />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Stethoscope,
  Activity,
  CheckCircle2,
  ArrowRight,
  Timer,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import Logo from "../assets/Logo.png";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const username = location.state?.username || "";
  const type = location.state?.type || "signup";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 Minutes

  useEffect(() => {
    if (!username) {
      navigate(type === "signup" ? "/signup" : "/forgot-password");
    }
  }, [username, type, navigate]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      return toast.error("Please enter OTP.");
    }

    if (otp.length !== 6) {
      return toast.error("OTP must be 6 digits.");
    }

    try {
      setLoading(true);

      const api =
        type === "signup"
          ? "/api/auth/signup/verify"
          : "/api/auth/forgot-password/verify";

      const { data } = await axios.post(`${backendUrl}${api}`, {
        username,
        otp,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 grid grid-cols-1 lg:grid-cols-12 font-sans antialiased text-slate-800">
      {/* Left Side: Healthcare Branding Panel */}
      <div className="lg:col-span-6 xl:col-span-5 bg-slate-900 text-white p-6 sm:p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden border-r border-slate-800/80">
        {/* Subtle Ambient Glow Effect */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Branding Bar */}
        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-8 sm:mb-10">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 p-2.5 flex items-center justify-center shadow-lg shadow-emerald-900/20">
              <img
                src={Logo}
                alt="R.S Clinic Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                R.S Clinic
              </h2>
              <p className="text-emerald-400 text-xs font-semibold tracking-wide">
                Security & Authentication
              </p>
            </div>
          </div>

          {/* Hero Pitch */}
          <div className="space-y-4 sm:space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider shadow-2xs">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Two-Factor Authentication</span>
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {type === "signup"
                ? "Verify Admin Account"
                : "Password Security Code"}
            </h1>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md font-medium">
              {type === "signup"
                ? "Confirm your security credentials with the OTP sent to Super Admin to activate your staff access."
                : "Enter the verification pin sent to Super Admin to reset your password and unlock your account."}
            </p>
          </div>

          {/* Security Features List */}
          <div className="mt-8 sm:mt-10 space-y-3.5 pt-6 sm:pt-8 border-t border-slate-800/80">
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Time-based One-Time Passcode</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Encrypted Session Verification</span>
            </div>
          </div>
        </div>

        {/* Footer Meta Badge */}
        <div className="relative z-10 pt-8 mt-6 sm:mt-8 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <p className="flex items-center gap-2 text-slate-400 font-semibold text-[11px] sm:text-xs">
            <Stethoscope size={16} className="text-emerald-400" />
            R.S. Clinic Practice Suite
          </p>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-emerald-400 text-[10px] sm:text-[11px] font-bold">
            <Activity size={12} /> MFA Active
          </span>
        </div>
      </div>

      {/* Right Side: Verification Form */}
      <div className="lg:col-span-6 xl:col-span-7 bg-white p-6 sm:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto">
        <div className="max-w-md mx-auto w-full space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Enter Verification Code
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
              Sent for username:{" "}
              <strong className="text-emerald-700 font-bold">{username}</strong>
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-5">
            {/* OTP Input Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                6-Digit Security PIN <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <KeyRound
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="------"
                  className="w-full h-14 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/80 text-center tracking-[10px] sm:tracking-[12px] text-2xl font-black text-slate-800 placeholder:text-slate-300 placeholder:tracking-normal outline-none focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                />
              </div>
            </div>

            {/* Expiry Clock Timer Badge */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 text-center flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Timer size={16} className="text-slate-400" />
                <span>Passcode Expires In</span>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-sm sm:text-base font-extrabold text-rose-600 bg-rose-50 px-3 py-1 rounded-xl border border-rose-100">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                {minutes}:{seconds}
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 mt-2 rounded-xl text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-emerald-600 active:scale-[0.99] shadow-sm hover:shadow-md"
              }`}
            >
              <span>
                {loading ? "Verifying OTP Code..." : "Complete Verification"}
              </span>
              {!loading && <ArrowRight size={16} />}
            </button>

            {/* Back Navigation Link */}
            <div className="text-center pt-4 border-t border-slate-100">
              <Link
                to={type === "signup" ? "/signup" : "/forgot-password"}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
              >
                <ArrowLeft size={14} />
                <span>
                  Return to{" "}
                  {type === "signup" ? "Signup Page" : "Password Reset"}
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;

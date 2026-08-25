import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AtSign,
  ShieldCheck,
  Stethoscope,
  Activity,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Logo from "../assets/Logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !username || !mobile || !password) {
      return toast.error("Please fill all fields.");
    }

    if (mobile.length !== 10) {
      return toast.error("Please enter a valid 10-digit mobile number.");
    }

    if (!/^\d+$/.test(mobile)) {
      return toast.error("Mobile number must contain only digits.");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(`${backendUrl}/api/auth/signup`, {
        name,
        username,
        mobile,
        password,
      });

      if (data.success) {
        toast.success(data.message);

        navigate("/otp-verification", {
          state: {
            username,
            type: "signup",
          },
        });
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
      {/* Left Side: Premium Healthcare Brand Panel */}
      <div className="lg:col-span-6 xl:col-span-5 bg-slate-900 text-white p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden border-r border-slate-800/80">
        {/* Subtle Ambient Glow Effect */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Branding Bar */}
        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 p-2.5 flex items-center justify-center shadow-lg shadow-emerald-900/20">
              <img
                src={Logo}
                alt="R.S Clinic Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                R.S Clinic
              </h2>
              <p className="text-emerald-400 text-xs font-semibold tracking-wide">
                Clinical Practice Suite
              </p>
            </div>
          </div>

          {/* Hero Pitch */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider shadow-2xs">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Admin Onboarding</span>
            </span>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Manage Patients, Prescriptions & Consultations Seamlessly.
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md font-medium">
              Register an administrator account to access the healthcare portal,
              track daily OPD visits, and maintain patient health records
              securely.
            </p>
          </div>

          {/* Platform Feature Checklist */}
          <div className="mt-10 space-y-3.5 pt-8 border-t border-slate-800/80">
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Real-time OPD Consultation Tracker</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Prescription & Pharmacy Inventory Search</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Encrypted & HIPAA Compliant Data Access</span>
            </div>
          </div>
        </div>

        {/* Footer Meta Badge */}
        <div className="relative z-10 pt-8 mt-8 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <p className="flex items-center gap-2 text-slate-400 font-semibold">
            <Stethoscope size={16} className="text-emerald-400" />
            R.S. Clinic Management Network
          </p>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-emerald-400 text-[11px] font-bold">
            <Activity size={12} /> System Operational
          </span>
        </div>
      </div>

      {/* Right Side: Clean White Signup Form Container */}
      <div className="lg:col-span-6 xl:col-span-7 bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto">
        <div className="max-w-md mx-auto w-full space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Create Administrator Account
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
              Enter staff details to set up your clinical dashboard credentials.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="e.g. Dr. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/80 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Username <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <AtSign
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="e.g. sjenkins"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/80 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/80 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-10 pr-10 rounded-xl border border-slate-200 bg-slate-50/80 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
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
                {loading
                  ? "Registering Staff Account..."
                  : "Create Admin Account"}
              </span>
              {!loading && <ArrowRight size={16} />}
            </button>

            {/* Footer Sign-in Link */}
            <div className="text-center pt-4 border-t border-slate-100 mt-5">
              <p className="text-xs text-slate-500 font-medium">
                Already registered?{" "}
                <Link
                  to="/login"
                  className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  Sign in to workspace
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

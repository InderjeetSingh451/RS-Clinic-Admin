import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  AtSign,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Stethoscope,
  Activity,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Logo from "../assets/Logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!username || !newPassword) {
      return toast.error("Please fill all fields.");
    }

    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${backendUrl}/api/auth/forgot-password`,
        {
          username,
          newPassword,
        },
      );

      if (data.success) {
        toast.success(data.message);

        navigate("/otp-verification", {
          state: {
            username,
            type: "forgot-password",
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
      {/* Left Panel */}
      <div className="lg:col-span-6 xl:col-span-5 bg-slate-900 text-white p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden border-r border-slate-800/80">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 p-2.5 shadow-xs">
              <img
                src={Logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                R.S Clinic
              </h2>
              <p className="text-emerald-400 text-xs font-semibold tracking-wide">
                Clinical Practice Suite
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider shadow-2xs">
            <ShieldCheck size={14} />
            Password Recovery
          </span>

          <h1 className="text-3xl lg:text-4xl font-extrabold mt-6 leading-tight tracking-tight">
            Reset Your Administrator Password Securely
          </h1>

          <p className="text-slate-400 mt-4 leading-relaxed text-sm font-medium">
            Enter your username and choose a new password. An OTP will be sent
            to the Super Admin email for verification.
          </p>

          <div className="mt-10 space-y-3.5 border-t border-slate-800/80 pt-8">
            <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              OTP Protected Password Reset
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              Secure Administrator Authentication
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              Encrypted Password Storage
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-slate-800/80 flex justify-between items-center text-xs">
          <p className="flex items-center gap-2 text-slate-400 font-medium">
            <Stethoscope size={16} className="text-emerald-400" />
            R.S. Clinic Management
          </p>

          <span className="flex items-center gap-1 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
            <Activity size={14} />
            Secure
          </span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:col-span-6 xl:col-span-7 bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Forgot Password
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Verify your identity to reset your password.
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Username
              </label>

              <div className="relative">
                <AtSign
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/80 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                New Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full h-12 pl-10 pr-10 rounded-xl border border-slate-200 bg-slate-50/80 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 mt-2 rounded-xl text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-emerald-600 active:scale-[0.99] shadow-sm hover:shadow-md"
              }`}
            >
              <span>{loading ? "Sending OTP..." : "Send OTP"}</span>
              {!loading && <ArrowRight size={16} />}
            </button>

            <div className="text-center pt-4 border-t border-slate-100 mt-5">
              <p className="text-xs text-slate-500 font-medium">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

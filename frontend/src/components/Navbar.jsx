import React from "react";
import {
  CalendarDays,
  UserCircle2,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";

const Navbar = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-lg shadow-black/20 rounded-2xl transition-all duration-300">
      <div className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
        {/* Left Section: Branding & Welcome Message */}
        <div className="flex items-center gap-3.5 sm:gap-4 w-full lg:w-auto">
          {/* Logo Badge with Subtle Glow */}
          <div className="relative group shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-all duration-300">
              <Stethoscope size={22} className="text-white sm:hidden" />
              <Stethoscope size={26} className="text-white hidden sm:block" />
            </div>
            {/* Live Status Indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full ring-2 ring-emerald-500/20 animate-pulse" />
          </div>

          {/* Title & User Greeting */}
          <div className="overflow-hidden min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white truncate">
                R.S Clinic
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full shrink-0 shadow-2xs">
                <ShieldCheck size={12} className="text-emerald-400" />
                Portal
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              <span className="truncate text-slate-400">
                Healthcare Management
              </span>
            </p>
          </div>
        </div>

        {/* Right Section: Quick Info Cards */}
        <div className="w-full lg:w-auto grid grid-cols-2 sm:flex sm:flex-nowrap items-center gap-2.5 sm:gap-3.5 pt-2.5 lg:pt-0 border-t border-slate-800 lg:border-none">
          {/* Date Card */}
          <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-200 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
              <CalendarDays size={16} className="sm:hidden" />
              <CalendarDays size={18} className="hidden sm:block" />
            </div>

            <div className="overflow-hidden">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                Today's Date
              </p>
              <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-200 truncate">
                {today}
              </p>
            </div>
          </div>

          {/* Admin Profile Card */}
          <div className="flex items-center gap-2.5 sm:gap-3 bg-gradient-to-r from-teal-950/40 to-cyan-950/40 border border-teal-800/40 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-200 hover:border-teal-700/60 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0 group-hover:bg-teal-500/20 transition-colors">
              <UserCircle2 size={18} className="sm:hidden" />
              <UserCircle2 size={22} className="hidden sm:block" />
            </div>

            <div className="overflow-hidden">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-teal-400/80">
                Logged in as
              </p>
              <h3 className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-200 tracking-tight capitalize truncate max-w-[100px] sm:max-w-[130px]">
                {admin?.name || "Admin"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

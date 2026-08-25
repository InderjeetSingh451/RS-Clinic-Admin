import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Logo from "../assets/Logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const activeClass =
    "group relative flex items-center gap-3.5 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium text-sm shadow-md shadow-emerald-900/30 transition-all duration-200";

  const normalClass =
    "group flex items-center gap-3.5 px-4 py-3 rounded-xl text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400 font-medium text-sm transition-all duration-200";

  return (
    <>
      {/* Mobile Top Header Toggle Bar */}
      <div className="md:hidden flex items-center justify-between bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 p-1.5 flex items-center justify-center border border-slate-700/60 shrink-0 shadow-2xs">
            <img
              src={Logo}
              alt="R.S Clinic"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <h2 className="text-base font-bold text-white leading-tight">
              R.S Clinic
            </h2>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
              Healthcare
            </p>
          </div>
        </div>

        <button
          onClick={toggleSidebar}
          aria-label="Toggle Menu"
          className="p-2 rounded-xl bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-emerald-400 active:scale-95 transition-all"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-30 w-72 h-screen bg-slate-900 border-r border-slate-800/80 flex flex-col shadow-lg select-none transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 flex items-center justify-between gap-3.5">
          <div className="flex items-center gap-3.5">
            {/* Enlarged Logo Container */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-800/80 p-1.5 flex items-center justify-center border border-slate-700/60 shrink-0 shadow-2xs">
              <img
                src={Logo}
                alt="R.S Clinic"
                className="w-full h-full object-cover rounded-xl drop-shadow-2xs"
              />
            </div>

            <div className="overflow-hidden">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white truncate">
                R.S Clinic
              </h2>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-400 truncate">
                Healthcare Platform
              </p>
            </div>
          </div>

          {/* Close button inside mobile menu header */}
          <button
            onClick={closeSidebar}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Menu Container */}
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            Main Navigation
          </p>

          <nav className="space-y-1.5">
            <NavLink
              to="/dashboard"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              {({ isActive }) => (
                <>
                  <LayoutDashboard
                    size={19}
                    className={
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-emerald-400 transition-colors"
                    }
                  />
                  <span>Dashboard</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/add-patient"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              {({ isActive }) => (
                <>
                  <UserPlus
                    size={19}
                    className={
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-emerald-400 transition-colors"
                    }
                  />
                  <span>Add Patient</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/search-patient"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              {({ isActive }) => (
                <>
                  <Search
                    size={19}
                    className={
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-emerald-400 transition-colors"
                    }
                  />
                  <span>Search Patient</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </>
              )}
            </NavLink>

            {/* Spacer & Divider before Logout */}
            <div className="pt-6 pb-2">
              <div className="border-t border-slate-800/80" />
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                closeSidebar();
                handleLogout();
              }}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 font-medium text-sm transition-all duration-200 group active:scale-[0.98]"
            >
              <LogOut
                size={19}
                className="text-rose-400 group-hover:text-rose-300 transition-colors"
              />
              <span>Logout Session</span>
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

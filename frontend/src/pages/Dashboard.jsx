import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Users,
  UserCheck,
  Activity,
  Calendar,
  Phone,
  Clock,
  Sparkles,
  TrendingUp,
  Stethoscope,
  VenusAndMars,
} from "lucide-react";

const Dashboard = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [todayPatients, setTodayPatients] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [weeklyGraph, setWeeklyGraph] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);

  const getDashboard = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        console.log(data);
        setTodayPatients(data.dashboard.todayPatients);
        setTotalPatients(data.dashboard.totalPatients);
        setTotalAdmins(data.dashboard.totalAdmins);
        setWeeklyGraph(data.dashboard.weeklyGraph);
        setRecentPatients(data.dashboard.recentPatients);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 font-sans antialiased text-slate-100">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Workspace */}
      <div className="flex-1 min-h-screen flex flex-col overflow-y-auto w-full">
        <div className="p-3 sm:p-5 md:p-8 space-y-5 sm:space-y-8 max-w-[1500px] w-full mx-auto">
          {/* Top Header Component */}
          <Navbar />

          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[55vh]">
              <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-slate-800 border-t-emerald-500 rounded-full animate-spin"></div>
                <Stethoscope
                  size={20}
                  className="text-emerald-400 absolute animate-pulse sm:hidden"
                />
                <Stethoscope
                  size={24}
                  className="text-emerald-400 absolute animate-pulse hidden sm:block"
                />
              </div>
              <p className="mt-4 text-[11px] sm:text-xs font-bold tracking-widest text-emerald-400 uppercase">
                Loading Patient Metrics...
              </p>
            </div>
          ) : (
            <>
              {/* Statistics Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Today Patients */}
                <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-md hover:border-slate-700 transition-all duration-300 relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                        Today's Patients
                      </p>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1.5 sm:mt-2 tracking-tight">
                        {todayPatients}
                      </h2>
                    </div>
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                      <Activity size={22} className="sm:hidden" />
                      <Activity size={26} className="hidden sm:block" />
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-5 pt-3 border-t border-slate-800 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-emerald-400">
                    <TrendingUp size={14} />
                    <span>Live Outpatient Registrations</span>
                  </div>
                </div>

                {/* Total Patients */}
                <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-md hover:border-slate-700 transition-all duration-300 relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                        Total Patient Base
                      </p>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1.5 sm:mt-2 tracking-tight">
                        {totalPatients}
                      </h2>
                    </div>
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20 group-hover:scale-105 transition-transform shrink-0">
                      <Users size={22} className="sm:hidden" />
                      <Users size={26} className="hidden sm:block" />
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-5 pt-3 border-t border-slate-800 text-[11px] sm:text-xs font-medium text-slate-400">
                    Registered in medical records database
                  </div>
                </div>

                {/* Total Admins */}
                <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-md hover:border-slate-700 transition-all duration-300 relative overflow-hidden group sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                        Active Staff/Admins
                      </p>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1.5 sm:mt-2 tracking-tight">
                        {totalAdmins}
                      </h2>
                    </div>
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">
                      <UserCheck size={22} className="sm:hidden" />
                      <UserCheck size={26} className="hidden sm:block" />
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-5 pt-3 border-t border-slate-800 text-[11px] sm:text-xs font-medium text-slate-400">
                    Authorized portal managers
                  </div>
                </div>
              </div>

              {/* Weekly Analytics Chart Section */}
              <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-800 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-800">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Weekly Patient Volume
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">
                      Consultation stats recorded over the past 7 days
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/20 w-fit self-start sm:self-auto">
                    <Calendar size={14} className="text-emerald-400" />
                    <span>7-Day Patient Trend</span>
                  </div>
                </div>

                <div className="pt-2 w-full h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyGraph}
                      margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                    >
                      <CartesianGrid
                        stroke="#1e293b"
                        strokeDasharray="4 4"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#94a3b8",
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#94a3b8",
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(16, 185, 129, 0.05)" }}
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderRadius: "12px",
                          border: "1px solid #334155",
                          color: "#f8fafc",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
                          padding: "8px 12px",
                        }}
                        itemStyle={{
                          color: "#34d399",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                        labelStyle={{
                          color: "#94a3b8",
                          fontSize: "11px",
                          fontWeight: "600",
                        }}
                      />
                      <Bar
                        dataKey="count"
                        fill="#10b981"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={36}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Patient Registrations */}
              <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-800 shadow-md">
                <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-800">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Recent Patients
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">
                      Patients recently registered or updated in the clinic
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-950/60 border-b border-slate-800 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-3 px-2 sm:px-4 w-10 sm:w-12 text-center rounded-l-xl">
                            #
                          </th>
                          <th className="py-3 px-3 sm:px-4">Patient Profile</th>
                          <th className="py-3 px-3 sm:px-4">Contact Number</th>
                          <th className="py-3 px-3 sm:px-4">Gender</th>
                          <th className="py-3 px-3 sm:px-4 rounded-r-xl">
                            Last Visit Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-xs sm:text-sm">
                        {recentPatients.length > 0 ? (
                          recentPatients.map((patient, index) => (
                            <tr
                              key={patient._id}
                              className="hover:bg-slate-800/50 transition-colors group"
                            >
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-center font-semibold text-slate-500 text-[11px] sm:text-xs">
                                {index + 1}
                              </td>
                              <td className="py-3 sm:py-4 px-3 sm:px-4">
                                <div className="flex items-center gap-2.5 sm:gap-3">
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs sm:text-sm uppercase shrink-0 border border-emerald-500/20">
                                    {patient.name
                                      ? patient.name.charAt(0)
                                      : "P"}
                                  </div>
                                  <div className="overflow-hidden">
                                    <p className="font-bold text-slate-200 capitalize group-hover:text-emerald-400 transition-colors truncate max-w-[120px] sm:max-w-none">
                                      {patient.name}
                                    </p>
                                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block truncate">
                                      ID: #{patient._id?.slice(-6) || "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 sm:py-4 px-3 sm:px-4 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] sm:text-xs font-semibold text-slate-300">
                                  <Phone
                                    size={12}
                                    className="text-slate-500 shrink-0"
                                  />
                                  {patient.mobile}
                                </span>
                              </td>
                              <td className="py-3 sm:py-4 px-3 sm:px-4 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] sm:text-xs font-semibold text-slate-300">
                                  <VenusAndMars
                                    size={12}
                                    className="text-slate-500 shrink-0"
                                  />
                                  {patient.gender}
                                </span>
                              </td>
                              <td className="py-3 sm:py-4 px-3 sm:px-4 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-medium text-slate-400">
                                  <Clock
                                    size={13}
                                    className="text-slate-500 shrink-0"
                                  />
                                  {new Date(patient.updatedAt).toLocaleString(
                                    "en-IN",
                                    {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="5"
                              className="py-10 sm:py-14 text-center"
                            >
                              <div className="flex flex-col items-center justify-center">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2.5 sm:mb-3 border border-emerald-500/20">
                                  <Users size={24} className="sm:hidden" />
                                  <Users
                                    size={28}
                                    className="hidden sm:block"
                                  />
                                </div>
                                <p className="text-sm sm:text-base font-bold text-slate-200">
                                  No Recent Patient Log
                                </p>
                                <p className="text-xs text-slate-400 mt-1 max-w-sm px-4">
                                  Registered patients will automatically
                                  populate here as they check in.
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

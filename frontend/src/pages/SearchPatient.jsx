import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Search,
  Phone,
  ArrowRight,
  UserX,
  X,
  History,
  UserCheck,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const SearchPatient = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPatient = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${backendUrl}/api/patient/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setPatients(data.patients);
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

  useEffect(() => {
    searchPatient();
  }, [query]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 font-sans antialiased text-slate-100">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Workspace */}
      <main className="flex-1 min-h-screen flex flex-col overflow-y-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] w-full mx-auto">
          <Navbar />

          {/* Search Toolbar */}
          <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl shadow-black/20">
            <div className="relative flex items-center">
              <Search
                size={20}
                className="absolute left-4 text-emerald-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search patient by full name or 10-digit mobile number..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-12 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder:text-slate-500 text-sm font-medium focus:bg-slate-950 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all shadow-inner"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3.5 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Content Body */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 bg-slate-900/60 rounded-2xl border border-slate-800 shadow-md backdrop-blur-sm">
              <div className="w-10 h-10 border-3 border-slate-800 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Searching records...
              </p>
            </div>
          ) : patients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-slate-900/60 rounded-2xl border border-slate-800 shadow-md text-center px-4 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mb-4 border border-slate-700/60 shadow-inner">
                <UserX size={30} />
              </div>
              <h3 className="text-lg font-bold text-white">
                No patients found
              </h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm">
                {query
                  ? `No results matched "${query}". Please verify the spelling or phone number.`
                  : "Start typing in the search bar above to look up patient profiles."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck size={15} className="text-emerald-400" />
                  Matching Results ({patients.length})
                </p>
              </div>

              {/* Patient Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {patients.map((patient) => {
                  const visitCount = patient.history?.length || 1;
                  return (
                    <div
                      key={patient._id}
                      className="group relative bg-gradient-to-b from-slate-900 to-slate-900/90 rounded-2xl border border-slate-800/80 p-5 shadow-lg hover:shadow-emerald-950/20 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                    >
                      {/* Ambient corner glow on hover */}
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />

                      <div className="space-y-4 relative z-10">
                        {/* Avatar & Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3.5 overflow-hidden">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-emerald-400 font-bold text-base flex items-center justify-center uppercase shrink-0 border border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-105 transition-all shadow-inner">
                                {patient.name ? patient.name.charAt(0) : "P"}
                              </div>
                              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                            </div>
                            <div className="overflow-hidden">
                              <h2 className="font-bold text-slate-100 text-sm sm:text-base capitalize truncate tracking-tight group-hover:text-emerald-300 transition-colors">
                                {patient.name}
                              </h2>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[11px] text-slate-500 font-mono">
                                  ID: #{patient._id?.slice(-6) || "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Visit badge */}
                          <div className="flex flex-col items-end shrink-0">
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                              <History size={11} />
                              {visitCount}{" "}
                              {visitCount === 1 ? "Visit" : "Visits"}
                            </span>
                          </div>
                        </div>

                        {/* Contact Info Box */}
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 text-xs shadow-inner flex items-center justify-between">
                          <span className="text-slate-500 font-medium text-[11px] uppercase tracking-wider">
                            Contact
                          </span>
                          <span className="font-semibold text-slate-200 flex items-center gap-1.5 truncate">
                            <Phone
                              size={12}
                              className="text-emerald-400 shrink-0"
                            />
                            <span className="truncate">{patient.mobile}</span>
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => navigate(`/patient/${patient._id}`)}
                        className="mt-5 relative z-10 w-full h-11 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 group/btn border border-slate-700/60 hover:border-emerald-500 shadow-sm"
                      >
                        <Sparkles
                          size={13}
                          className="text-emerald-400 group-hover/btn:text-white transition-colors"
                        />
                        <span>View Medical History</span>
                        <ArrowRight
                          size={14}
                          className="text-slate-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchPatient;

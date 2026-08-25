import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  User,
  Phone,
  CalendarDays,
  Pill,
  Stethoscope,
  FileText,
  ClipboardList,
  VenusAndMars,
  Hourglass,
  Clock,
  Sparkles,
} from "lucide-react";

const PatientHistory = () => {
  const { id } = useParams();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPatient = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setPatient(data.patient);
        console.log(patient);
        console.log(data);
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
    getPatient();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-950 font-sans">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-slate-800 border-t-emerald-500 rounded-full animate-spin"></div>
          <Stethoscope
            size={24}
            className="text-emerald-400 absolute animate-pulse"
          />
        </div>
        <p className="mt-4 text-xs font-bold tracking-widest text-emerald-400 uppercase">
          Loading Patient Medical Profile...
        </p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-950 font-sans p-6 text-center text-slate-100">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3 border border-rose-500/20">
          <User size={28} />
        </div>
        <h2 className="text-xl font-bold text-white">Patient Not Found</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-sm">
          The requested patient record could not be located in the database.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 font-sans antialiased text-slate-100">
      <Sidebar />

      <div className="flex-1 min-h-screen flex flex-col overflow-y-auto w-full">
        <div className="p-3 sm:p-5 md:p-8 space-y-5 sm:space-y-8 max-w-[1500px] w-full mx-auto">
          <Navbar />

          {/* Patient Overview Card */}
          <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-slate-800 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
                  <Sparkles size={13} />
                  Medical Record File
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white capitalize">
                  {patient.name}
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-semibold text-slate-300 w-fit">
                <ClipboardList size={15} className="text-emerald-400" />
                <span>Total Consultations: {patient.history.length}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Phone */}
              <div className="flex items-center gap-3 bg-slate-950/50 border border-slate-800 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <Phone size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    Mobile Number
                  </p>
                  <p className="font-semibold text-slate-200 text-sm truncate">
                    {patient.mobile}
                  </p>
                </div>
              </div>

              {/* Gender */}
              <div className="flex items-center gap-3 bg-slate-950/50 border border-slate-800 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20">
                  <VenusAndMars size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    Gender
                  </p>
                  <p className="font-semibold text-slate-200 text-sm truncate">
                    {patient.gender}
                  </p>
                </div>
              </div>

              {/* Age */}
              <div className="flex items-center gap-3 bg-slate-950/50 border border-slate-800 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <Hourglass size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    Age / Years
                  </p>
                  <p className="font-semibold text-slate-200 text-sm truncate">
                    {patient.age} Yrs
                  </p>
                </div>
              </div>

              {/* Patient ID */}
              <div className="flex items-center gap-3 bg-slate-950/50 border border-slate-800 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                  <User size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    Patient Reference ID
                  </p>
                  <p className="font-semibold text-slate-200 text-xs truncate">
                    #{patient._id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visit History Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                Consultation Visit History
              </h2>
            </div>

            {patient.history.length === 0 ? (
              <div className="bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-800 p-12 text-center shadow-md">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/20">
                  <ClipboardList size={24} />
                </div>
                <p className="text-base font-bold text-slate-200">
                  No Visit History Found
                </p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  This patient has not logged any past clinical consultations or
                  prescriptions yet.
                </p>
              </div>
            ) : (
              patient.history.map((visit, index) => (
                <div
                  key={visit._id}
                  className="bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-800 shadow-md transition-all duration-200 hover:border-slate-700"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 font-extrabold text-xs flex items-center justify-center border border-emerald-500/20">
                        #{patient.history.length - index}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Consultation Record
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-semibold text-slate-300">
                      <Clock size={14} className="text-slate-400" />
                      {new Date(visit.visitedAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  {/* Disease / Diagnosis */}
                  <div className="mb-5 bg-slate-950/50 border border-slate-800 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Stethoscope className="text-emerald-400" size={18} />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Diagnosis / Disease
                      </h4>
                    </div>
                    <p className="text-slate-200 font-semibold text-sm pl-6">
                      {visit.disease}
                    </p>
                  </div>

                  {/* Medicines Prescribed */}
                  <div className="mb-5 bg-slate-950/50 border border-slate-800 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Pill className="text-teal-400" size={18} />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Prescribed Medicines
                      </h4>
                    </div>
                    <ul className="pl-6 space-y-1.5">
                      {visit.medicine.map((med, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm font-medium text-slate-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                          {med}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Other Notes */}
                  {visit.otherInfo && (
                    <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <FileText className="text-cyan-400" size={18} />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Clinical Notes & Instructions
                        </h4>
                      </div>
                      <p className="text-slate-300 text-sm pl-6 whitespace-pre-wrap leading-relaxed">
                        {visit.otherInfo}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;

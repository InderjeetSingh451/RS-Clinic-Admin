import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  User,
  Phone,
  Stethoscope,
  Pill,
  FileText,
  X,
  PlusCircle,
  Sparkles,
  Search,
  VenusAndMars,
} from "lucide-react";

const AddPatient = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  // ===========================
  // Patient Details
  // ===========================

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [disease, setDisease] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  // Medicines

  const [medicine, setMedicine] = useState([]);
  const [medicineInput, setMedicineInput] = useState("");

  // Suggestions

  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchLoading, setSearchLoading] = useState(false);

  // UI

  const [loading, setLoading] = useState(false);

  const medicineRef = useRef(null);

  // ======================================
  // Close Suggestions on Outside Click
  // ======================================

  useEffect(() => {
    const handler = (e) => {
      if (medicineRef.current && !medicineRef.current.contains(e.target)) {
        setSuggestions([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ======================================
  // Search Medicine API
  // ======================================

  const searchMedicine = async (value) => {
    value = value.trim();

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      setSearchLoading(true);

      const { data } = await axios.get(
        `${backendUrl}/api/medicine/search?q=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setSuggestions(data.medicines);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  };

  const debouncedSearch = useMemo(() => debounce(searchMedicine, 300), []);

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  // ======================================
  // Add Medicine Tag
  // ======================================

  const addMedicine = (value) => {
    value = value.trim();

    if (!value) return;

    const exists = medicine.some(
      (item) => item.toLowerCase() === value.toLowerCase(),
    );

    if (exists) {
      setMedicineInput("");
      setSuggestions([]);
      return;
    }

    setMedicine((prev) => [...prev, value]);
    setMedicineInput("");
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  // ======================================
  // Delete Medicine
  // ======================================

  const removeMedicine = (index) => {
    setMedicine((prev) => prev.filter((_, i) => i !== index));
  };

  // ======================================
  // Keyboard Navigation
  // ======================================

  const handleMedicineKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        addMedicine(suggestions[selectedIndex].name);
      } else {
        addMedicine(medicineInput);
      }

      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );

      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));

      return;
    }

    if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    if (e.key === "Backspace" && medicineInput === "" && medicine.length > 0) {
      removeMedicine(medicine.length - 1);
    }
  };

  // ======================================
  // Submit
  // ======================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !mobile || !disease || !age || !gender) {
      return toast.error("Please fill all required fields.");
    }

    if (mobile.length !== 10) {
      return toast.error("Enter valid mobile number.");
    }

    if (medicine.length === 0) {
      return toast.error("Please add at least one medicine.");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${backendUrl}/api/patient/add`,
        {
          name,
          mobile,
          age,
          gender,
          disease,
          medicine,
          otherInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);

        setName("");
        setMobile("");
        setDisease("");
        setMedicine([]);
        setMedicineInput("");
        setOtherInfo("");
        setSuggestions([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 font-sans antialiased text-slate-100">
      <Sidebar />

      <main className="flex-1 min-h-screen flex flex-col overflow-y-auto w-full">
        <div className="p-3 sm:p-5 md:p-8 space-y-5 sm:space-y-8 max-w-[1500px] w-full mx-auto">
          <Navbar />

          <div className="w-full bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
            {/* Form Container */}
            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8"
            >
              {/* Section 1: Patient Details */}
              <div className="space-y-4 sm:space-y-6">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
                    1. Patient Personal Info
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
                      Patient Name <span className="text-rose-400">*</span>
                    </label>

                    <div className="relative group">
                      <User
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors"
                      />

                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full h-12 rounded-xl border border-slate-700 bg-slate-950/50 pl-10 pr-4 text-sm font-semibold text-slate-100 placeholder:text-slate-500 placeholder:font-normal outline-none focus:bg-slate-950 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Mobile Input */}
                  <div>
                    <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
                      Mobile Number <span className="text-rose-400">*</span>
                    </label>

                    <div className="relative group">
                      <Phone
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors"
                      />

                      <input
                        type="text"
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="10-digit phone number"
                        className="w-full h-12 rounded-xl border border-slate-700 bg-slate-950/50 pl-10 pr-4 text-sm font-semibold text-slate-100 placeholder:text-slate-500 placeholder:font-normal outline-none focus:bg-slate-950 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                  </div>
                  {/* Gender */}
                  <div>
                    <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
                      Gender <span className="text-rose-400">*</span>
                    </label>

                    <div className="relative group">
                      <VenusAndMars
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors"
                      />

                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full h-12 rounded-xl border border-slate-700 bg-slate-950/50 pl-10 pr-10 text-sm font-semibold text-slate-100 outline-none focus:bg-slate-950 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer"
                      >
                        <option
                          value=""
                          className="bg-slate-900 text-slate-400"
                        >
                          Select Gender
                        </option>
                        <option
                          value="Male"
                          className="bg-slate-900 text-slate-100"
                        >
                          Male
                        </option>
                        <option
                          value="Female"
                          className="bg-slate-900 text-slate-100"
                        >
                          Female
                        </option>
                        <option
                          value="Other"
                          className="bg-slate-900 text-slate-100"
                        >
                          Other
                        </option>
                      </select>

                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                  {/* Age */}
                  <div>
                    <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
                      Age <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative group">
                      <User
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors"
                      />
                      <input
                        type="number"
                        min={0}
                        max={120}
                        value={age}
                        onChange={(e) => {
                          const value = e.target.value;

                          if (value === "" || Number(value) <= 150) {
                            setAge(value);
                          }
                        }}
                        placeholder="Enter Age"
                        className="w-full h-12 rounded-xl border border-slate-700 bg-slate-950/50 pl-10 pr-4 text-sm font-semibold text-slate-100 placeholder:text-slate-500 outline-none focus:bg-slate-950 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Diagnosis & Prescription */}
              <div className="space-y-4 sm:space-y-6 pt-1">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
                    2. Clinical Diagnosis & Prescription
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Disease Input */}
                  <div>
                    <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
                      Disease / Symptoms{" "}
                      <span className="text-rose-400">*</span>
                    </label>

                    <div className="relative group">
                      <Stethoscope
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors"
                      />

                      <input
                        type="text"
                        value={disease}
                        onChange={(e) => setDisease(e.target.value)}
                        placeholder="e.g. Viral Fever, Hypertension"
                        className="w-full h-12 rounded-xl border border-slate-700 bg-slate-950/50 pl-10 pr-4 text-sm font-semibold text-slate-100 placeholder:text-slate-500 placeholder:font-normal outline-none focus:bg-slate-950 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Medicine Given Tag Box */}
                  <div>
                    <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
                      Prescribed Medicines{" "}
                      <span className="text-rose-400">*</span>
                    </label>

                    <div
                      ref={medicineRef}
                      className="relative rounded-xl border border-slate-700 bg-slate-950/50 min-h-[48px] p-2 focus-within:bg-slate-950 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/20 transition-all"
                    >
                      <div className="flex flex-wrap items-center gap-1.5">
                        {medicine.map((med, index) => (
                          <div
                            key={index}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-emerald-300"
                          >
                            <Pill
                              size={13}
                              className="text-emerald-400 shrink-0"
                            />

                            <span className="capitalize text-xs font-bold">
                              {med}
                            </span>

                            <button
                              type="button"
                              onClick={() => removeMedicine(index)}
                              className="text-emerald-400 hover:text-rose-400 hover:bg-rose-500/20 p-0.5 rounded-md transition-colors"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ))}

                        <input
                          type="text"
                          value={medicineInput}
                          onChange={(e) => {
                            setMedicineInput(e.target.value);
                            debouncedSearch(e.target.value);
                          }}
                          onKeyDown={handleMedicineKeyDown}
                          placeholder={
                            medicine.length === 0
                              ? "Type medicine & press Enter..."
                              : "Add another..."
                          }
                          className="flex-1 min-w-[140px] bg-transparent text-xs sm:text-sm font-medium text-slate-100 placeholder:text-slate-500 px-2 py-1 outline-none"
                        />
                      </div>

                      {/* Suggestions Search Dropdown */}
                      {(searchLoading ||
                        suggestions.length > 0 ||
                        medicineInput.trim().length >= 2) && (
                        <div className="absolute left-0 right-0 top-full mt-2 z-30 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl max-h-52 overflow-y-auto">
                          {searchLoading ? (
                            <div className="flex items-center gap-2 px-4 py-3 text-xs font-semibold text-emerald-400 bg-emerald-950/30">
                              <Search size={14} className="animate-spin" />
                              <span>Searching pharmacy database...</span>
                            </div>
                          ) : suggestions.length > 0 ? (
                            suggestions.map((item, index) => (
                              <div
                                key={item._id}
                                onClick={() => addMedicine(item.name)}
                                className={`flex items-center justify-between px-4 py-2.5 cursor-pointer capitalize transition-colors text-xs ${
                                  selectedIndex === index
                                    ? "bg-emerald-500/20 text-emerald-300 font-bold"
                                    : "hover:bg-slate-800 text-slate-300 font-medium"
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                                    <Pill size={13} />
                                  </div>
                                  <span>{item.name}</span>
                                </div>
                                <span className="text-[10px] text-slate-500 font-semibold uppercase">
                                  Select
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-3 bg-slate-900">
                              <p className="text-xs font-semibold text-slate-300">
                                Medicine not found in catalog.
                              </p>

                              <p className="text-xs text-slate-400 mt-1">
                                Press{" "}
                                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 shadow-xs">
                                  Enter
                                </kbd>{" "}
                                to add custom item:{" "}
                                <strong className="font-bold text-emerald-400 capitalize">
                                  "{medicineInput}"
                                </strong>
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Additional Notes */}
              <div className="space-y-4 sm:space-y-6 pt-1">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
                    3. Additional Clinical Notes
                  </h3>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
                    Other Remarks / History
                  </label>

                  <div className="relative group">
                    <FileText
                      size={18}
                      className="absolute left-3.5 top-3.5 text-slate-500 group-focus-within:text-emerald-400 transition-colors"
                    />

                    <textarea
                      rows={4}
                      value={otherInfo}
                      onChange={(e) => setOtherInfo(e.target.value)}
                      placeholder="Write additional clinical notes, dosage instructions, or patient observations..."
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/50 pl-10 pr-4 pt-3 text-xs sm:text-sm font-medium text-slate-100 placeholder:text-slate-500 placeholder:font-normal resize-none outline-none focus:bg-slate-950 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full h-12 rounded-xl text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 ${
                    loading
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed shadow-none"
                      : "bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/30"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Saving Patient Record...</span>
                    </div>
                  ) : (
                    <span>Save Patient Record</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddPatient;

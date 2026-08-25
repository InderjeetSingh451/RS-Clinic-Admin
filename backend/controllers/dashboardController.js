import Patient from "../models/patientModel.js";
import Admin from "../models/adminModel.js";

const getDashboard = async (req, res) => {
  try {
    // ================= Today's Patients =================

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    let todayPatients = 0;

    const allPatients = await Patient.find();

    allPatients.forEach((patient) => {
      patient.history.forEach((visit) => {
        if (visit.visitedAt >= today && visit.visitedAt < tomorrow) {
          todayPatients++;
        }
      });
    });

    // ================= Total Patients =================

    const totalPatients = await Patient.countDocuments();

    // ================= Total Admins =================

    const totalAdmins = await Admin.countDocuments();

    // ================= Last 7 Days Graph =================

    const weeklyGraph = [];

    for (let i = 6; i >= 0; i--) {
      const start = new Date();

      start.setHours(0, 0, 0, 0);

      start.setDate(start.getDate() - i);

      const end = new Date(start);

      end.setDate(start.getDate() + 1);

      let count = 0;

      allPatients.forEach((patient) => {
        patient.history.forEach((visit) => {
          if (visit.visitedAt >= start && visit.visitedAt < end) {
            count++;
          }
        });
      });

      weeklyGraph.push({
        day: start.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        count,
      });
    }

    // ================= Recent Patients =================

    const recentPatients = await Patient.find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .select("name mobile gender updatedAt");

    res.json({
      success: true,

      dashboard: {
        todayPatients,
        totalPatients,
        totalAdmins,
        weeklyGraph,
        recentPatients,
      },
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { getDashboard };

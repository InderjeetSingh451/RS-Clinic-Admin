import Patient from "../models/patientModel.js";
import Medicine from "../models/medicineModel.js";
const addPatient = async (req, res) => {
  try {
    let { name, mobile, disease, medicine, age, gender, otherInfo } = req.body;
    if (!name || !mobile || !disease || !age || !gender) {
      return res.json({
        success: false,
        message: "Please fill all required fields.",
      });
    }
    name = name.trim().toLowerCase();
    mobile = mobile.trim();

    // Convert medicine to array if string is received
    if (typeof medicine === "string") {
      medicine = medicine
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }

    const history = {
      disease,
      medicine,
      otherInfo,
      visitedAt: new Date(),
    };

    let patient = await Patient.findOne({
      name,
      mobile,
    });
    for (const med of medicine) {
      if (!med.trim()) continue;

      await Medicine.updateOne(
        {
          name: med.toLowerCase().trim(),
        },
        {
          $setOnInsert: {
            name: med.toLowerCase().trim(),
          },
        },
        {
          upsert: true,
        },
      );
    }
    if (patient) {
      patient.history.unshift(history);

      await patient.save();
      return res.json({
        success: true,
        message: "Patient history added successfully.",
      });
    }

    patient = await Patient.create({
      name,
      mobile,
      age,
      gender,
      history: [history],
      createdBy: req.adminId,
    });

    res.json({
      success: true,
      message: "Patient added successfully.",
      patient,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== Search Patient ====================

const searchPatient = async (req, res) => {
  try {
    const query = req.query.query?.trim() || "";

    const patients = await Patient.find({
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          mobile: {
            $regex: query,
          },
        },
      ],
    })
      .select("name mobile")
      .sort({ name: 1 });

    res.json({
      success: true,
      patients,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== Get Patient History ====================

const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.json({
        success: false,
        message: "Patient not found.",
      });
    }

    patient.history.sort(
      (a, b) => new Date(b.visitedAt) - new Date(a.visitedAt),
    );

    res.json({
      success: true,
      patient,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
// ==================== Add New Visit ====================

const addVisit = async (req, res) => {
  try {
    const { id } = req.params;

    let { disease, medicine, otherInfo } = req.body;

    if (!disease) {
      return res.json({
        success: false,
        message: "Disease is required.",
      });
    }

    // Convert medicine string to array if needed
    if (typeof medicine === "string") {
      medicine = medicine
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.json({
        success: false,
        message: "Patient not found.",
      });
    }

    patient.history.unshift({
      disease,
      medicine,
      otherInfo,
      visitedAt: new Date(),
    });

    await patient.save();

    res.json({
      success: true,
      message: "New visit added successfully.",
      patient,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
export { addPatient, searchPatient, getPatient, addVisit };

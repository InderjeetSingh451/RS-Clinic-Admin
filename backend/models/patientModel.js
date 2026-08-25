import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    disease: {
      type: String,
      required: true,
      trim: true,
    },

    medicine: [
      {
        type: String,
        trim: true,
      },
    ],

    otherInfo: {
      type: String,
      default: "",
      trim: true,
    },

    visitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: true,
  },
);

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 10,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    history: [historySchema],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;

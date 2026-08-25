import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

const Medicine =
  mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);

export default Medicine;

import express from "express";
import "dotenv/config";
import cors from "cors";

import dbConnect from "./config/dbConnect.js";

import authRouter from "./routes/authRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import patientRouter from "./routes/patientRoutes.js";
import medicineRouter from "./routes/medicineRoute.js";
const app = express();

// Database
dbConnect();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
  res.send("<h1>Doctor Shop Backend Running...</h1>");
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/patient", patientRouter);
app.use("/api/medicine", medicineRouter);
// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});

// Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

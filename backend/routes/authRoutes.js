import express from "express";

import {
  login,
  signup,
  verifyOTP,
  forgotPassword,
  verifyOTPForForgotPassword,
} from "../controllers/authController.js";

const authRouter = express.Router();

// Authentication
authRouter.post("/login", login);

// Register New Admin
authRouter.post("/signup", signup);
authRouter.post("/signup/verify", verifyOTP);

// Forgot Password
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/forgot-password/verify", verifyOTPForForgotPassword);

export default authRouter;

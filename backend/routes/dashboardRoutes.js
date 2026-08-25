import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const dashboardRouter = express.Router();

// All Dashboard Routes are Protected
dashboardRouter.use(authMiddleware);

// Dashboard
dashboardRouter.get("/", getDashboard);

export default dashboardRouter;

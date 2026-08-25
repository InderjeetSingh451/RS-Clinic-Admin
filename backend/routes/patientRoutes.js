import express from "express";
import {
  addPatient,
  searchPatient,
  getPatient,
  addVisit,
} from "../controllers/patientController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const patientRouter = express.Router();
patientRouter.use(authMiddleware);
patientRouter.post("/add", addPatient);
patientRouter.get("/search", searchPatient);
patientRouter.get("/:id", getPatient);
patientRouter.post("/:id/history", addVisit);
export default patientRouter;

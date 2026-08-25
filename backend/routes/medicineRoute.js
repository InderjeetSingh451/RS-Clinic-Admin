import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { searchMedicine } from "../controllers/medicineController.js";

const medicineRouter = express.Router();

medicineRouter.use(authMiddleware);

medicineRouter.get("/search", searchMedicine);

export default medicineRouter;

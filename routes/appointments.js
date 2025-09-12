import express from "express";
import { bookAppointment, getMyAppointments, updateAppointment } from "../controllers/appointmentController.js";
import { protect } from "../middlewares/auth.js";
const router = express.Router()

router.post("/", protect, bookAppointment)
router.get("/me", protect, getMyAppointments)
router.post("/:id", protect, updateAppointment)


export default router;
import express from "express";
import {submitFeedback, getFeedback} from "../controllers/feedbackController.js";
import { protect } from "../middlewares/auth.js";
const router = express.Router()


router.post("/", protect, submitFeedback);
router.get('/:model/:id', protect, getFeedback);

export default router;
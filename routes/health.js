import express from "express";
import multer from "multer";
import {createHealth, getHealthRecordsByPet} from "../controllers/healthController.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

// Multer config for file uploads
// const upload = multer({ dest: 'uploads/' });

router.use(protect);

router.post("/heath-record", authorize('vet'), protect, createHealth);
router.get('/pet/:petId', protect, getHealthRecordsByPet);
// router.post('/:id/upload', protect, authorize('vet'), upload.single('document'), uploadDocuments);

export default router;
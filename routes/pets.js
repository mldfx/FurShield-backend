import express from "express";
import {
  getPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
} from '../controllers/petController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getPets).post(authorize('owner'), createPet);
router
  .route('/:id')
  .get(getPet)
  .put(authorize('owner'), updatePet)
  .delete(authorize('owner'), deletePet);
export default router; 
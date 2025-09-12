import express from "express";
import  {
  createAdoptionListing,
  getAdoptables,
  logCareActivity,
} from '../controllers/shelterController.js';
import  { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/adoptables', getAdoptables);

router.use(protect, authorize('shelter'));

router.post('/create-adoptables', createAdoptionListing);
router.post('/adoptables/:id/log', logCareActivity);

export default router; 
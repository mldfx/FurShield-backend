import express from "express"
import  { updateVetProfile, getVetProfile } from '../controllers/vetController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect, authorize('vet'));

router.route('/profile').get(getVetProfile).put(updateVetProfile);

export default router; 
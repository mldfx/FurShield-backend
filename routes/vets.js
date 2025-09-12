const express = require('express');
const { updateVetProfile, getVetProfile } = require('../controllers/vetController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.use(protect, authorize('vet'));

router.route('/profile').get(getVetProfile).put(updateVetProfile);

module.exports = router; // ✅ Correct export
const express = require('express');
const {
  createAdoptionListing,
  getAdoptables,
  logCareActivity,
} = require('../controllers/shelterController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.route('/adoptables').get(getAdoptables);

router.use(protect, authorize('shelter'));

router.route('/adoptables').post(createAdoptionListing);
router.route('/adoptables/:id/log').post(logCareActivity);

module.exports = router; // ✅ Correct export
const express = require('express');
const {
  bookAppointment,
  getMyAppointments,
  updateAppointment,
} = require('../controllers/appointmentController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.route('/').post(bookAppointment);
router.route('/me').get(getMyAppointments);
router.route('/:id').put(updateAppointment);

module.exports = router; // ✅ Correct export
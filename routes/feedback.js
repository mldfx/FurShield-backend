const express = require('express');
const { submitFeedback, getFeedback } = require('../controllers/feedbackController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.route('/').post(submitFeedback);
router.route('/:model/:id').get(getFeedback);

module.exports = router; // ✅ Correct export
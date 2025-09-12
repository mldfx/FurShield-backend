const express = require('express');
const {
  getPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
} = require('../controllers/petController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.route('/').get(getPets).post(authorize('owner'), createPet);
router
  .route('/:id')
  .get(getPet)
  .put(authorize('owner'), updatePet)
  .delete(authorize('owner'), deletePet);

module.exports = router; // ✅ Correct export
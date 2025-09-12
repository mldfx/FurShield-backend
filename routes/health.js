const express = require('express');
const multer = require('multer');
const {
  createHealthRecord,
  getHealthRecordsByPet,
  uploadDocuments,
} = require('../controllers/healthController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// Multer config for file uploads
const upload = multer({ dest: 'uploads/' });

router.use(protect);

router.route('/').post(authorize('vet'), createHealthRecord);
router.route('/pet/:petId').get(getHealthRecordsByPet);
router.route('/:id/upload').post(authorize('vet'), upload.single('document'), uploadDocuments);

module.exports = router; // ✅ Correct export
import Pet from '../models/Pet.js';
import HealthRecord from '../models/HealthRecord.js';

// @desc    Create health record
// @route   POST /api/v1/health
// @access  Private (vet)
export const createHealth = async (req, res, next) => {
  const { pet, visitDate, diagnosis, treatment, insuranceDetails } = req.body;

  const record = await HealthRecord.create({
    pet,
    vet: req.user.id,
    visitDate,
    diagnosis,
    treatment,
    insuranceDetails,
  });

  // Link to pet
  await Pet.findByIdAndUpdate(pet, {
    $push: { medicalHistory: record._id },
  });

  res.status(201).json({
    success: true,
    data: record,
  });
};

// @desc    Get health records for pet
// @route   GET /api/v1/health/pet/:petId
// @access  Private (owner or vet)
export const getHealthRecordsByPet = async (req, res, next) => {
  const records = await HealthRecord.find({ pet: req.params.petId }).populate('vet', 'name');

  res.status(200).json({
    success: true,
    count: records.length,
    data: records,
  });
};

// @desc    Upload documents to health record
// @route   POST /api/v1/health/:id/upload
// @access  Private (vet)
export const uploadDocuments = async (req, res, next) => {
  // Multer will handle file upload → req.file
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }

  const record = await HealthRecord.findById(req.params.id);

  if (!record) {
    return res.status(404).json({ message: 'Record not found' });
  }

  record.documents.push({
    fileName: req.file.originalname,
    fileUrl: req.file.path,
    publicId: req.file.filename,
  });

  await record.save();

  res.status(200).json({
    success: true,
    data: record,
  });
};
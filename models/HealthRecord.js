import mongoose from "mongoose";

const HealthRecordSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Pet',
    required: true,
  },
  vet: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  documents: [
    {
      fileName: String,
      fileUrl: String,
      publicId: String,
    },
  ],
  insuranceDetails: {
    policyNumber: String,
    provider: String,
    expiryDate: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HealthRecord= mongoose.model('HealthRecord', HealthRecordSchema);
export default HealthRecord;
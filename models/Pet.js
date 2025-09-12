import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  species: {
    type: String,
    required: true,
    enum: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'],
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  imageGallery: [
    {
      url: String,
      publicId: String,
    },
  ],
  medicalHistory: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'HealthRecord',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pet = mongoose.model('Pet', PetSchema);
export default Pet;
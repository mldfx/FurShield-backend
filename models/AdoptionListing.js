const mongoose = require('mongoose');

const AdoptionListingSchema = new mongoose.Schema({
  shelter: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  petName: {
    type: String,
    required: true,
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
  healthStatus: {
    type: String,
    required: true,
  },
  careLogs: [
    {
      date: Date,
      activity: String, // e.g., "Fed", "Groomed", "Vaccinated"
      notes: String,
    },
  ],
  status: {
    type: String,
    enum: ['Available', 'Reserved', 'Adopted'],
    default: 'Available',
  },
  images: [
    {
      url: String,
      publicId: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AdoptionListing', AdoptionListingSchema);
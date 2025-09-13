const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdoptionListingSchema = new mongoose.Schema({
  shelter: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  petName: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
    enum: ["Dog", "Cat", "Bird", "Rabbit", "Other"],
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
      activity: String,
      notes: String,
    },
  ],
  status: {
    type: String,
    enum: ["Available", "Reserved", "Adopted"],
    default: "Available",
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

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ["Food", "Grooming", "Toys", "Health", "Accessories"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HealthRecordSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.ObjectId,
    ref: "Pet",
    required: true,
  },
  vet: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
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
const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  species: {
    type: String,
    required: true,
    enum: ["Dog", "Cat", "Bird", "Rabbit", "Other"],
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
    enum: ["Male", "Female"],
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
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
      ref: "HealthRecord",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FeedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  targetId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    refPath: "onModel",
  },
  onModel: {
    type: String,
    required: true,
    enum: ["User", "Product", "AdoptionListing"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const AppointmentSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.ObjectId,
    ref: "Pet",
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  vet: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
  appointmentTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },
  notes: {
    type: [String],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
const Feedback = mongoose.model("Feedback", FeedbackSchema);
const Pet = mongoose.model("Pet", PetSchema);
const HealthRecord = mongoose.model("HealthRecord", HealthRecordSchema);
const Product = mongoose.model("Product", ProductSchema);
const AdoptionListing = mongoose.model(
  "AdoptionListing",
  AdoptionListingSchema
);

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    select: false,
  },
  role: {
    type: String,
    enum: ["owner", "vet", "shelter"],
    default: "owner",
  },
  phone: {
    type: String,
    required: [true, "Please add a phone number"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  specialization: String, 
  experience: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.index({ email: 1, role: 1 }, { unique: true });

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};

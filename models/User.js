import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    select: false,
  },
  role: {
    type: String,
    enum: ['owner', 'vet', 'shelter'],
    default: 'owner',
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  specialization: {
    type: String,
    // Only for vets
  },
  experience: {
    type: Number,
    // Only for vets
  },
  availableSlots: [
    {
      day: String,
      startTime: String,
      endTime: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model('User', UserSchema);
export default User
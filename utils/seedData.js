import mongoose from 'mongoose';
import dotenv from "dotenv";
import User from "../models/User.js"
import Pet from "../models/Pet.js";
import Product from '../models/Product.js';
import AdoptionListing from '../models/AdoptionListing.js';


dotenv.config({ path: '../.env' });

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  {
    name: 'Alice Petowner',
    email: 'alice@example.com',
    password: 'password123',
    role: 'owner',
    phone: '1234567890',
    address: '123 Pet Lane, City',
  },
  {
    name: 'Dr. Bob Vet',
    email: 'bobvet@example.com',
    password: 'password123',
    role: 'vet',
    phone: '0987654321',
    address: '456 Vet Ave, City',
    specialization: 'Small Animals',
    experience: 5,
    availableSlots: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
    ],
  },
  {
    name: 'Happy Paws Shelter',
    email: 'shelter@example.com',
    password: 'password123',
    role: 'shelter',
    phone: '1122334455',
    address: '789 Shelter St, City',
  },
];

const products = [
  {
    name: 'Premium Dog Food',
    category: 'Food',
    price: 29.99,
    description: 'High-quality nutrition for adult dogs',
    stockQuantity: 100,
  },
  {
    name: 'Cat Grooming Brush',
    category: 'Grooming',
    price: 12.5,
    description: 'Soft bristles for gentle grooming',
    stockQuantity: 50,
  },
];

const run = async () => {
  try {
    await User.deleteMany();
    await Pet.deleteMany();
    await Product.deleteMany();
    await AdoptionListing.deleteMany();

    const createdUsers = await User.insertMany(users);
    const ownerId = createdUsers[0]._id;
    const vetId = createdUsers[1]._id;
    const shelterId = createdUsers[2]._id;

    // Create sample pet
    await Pet.create({
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      gender: 'Male',
      owner: ownerId,
    });

    // Insert products
    await Product.insertMany(products);

    // Create adoption listing
    await AdoptionListing.create({
      shelter: shelterId,
      petName: 'Luna',
      species: 'Cat',
      breed: 'Siamese',
      age: 2,
      healthStatus: 'Vaccinated, Spayed',
      status: 'Available',
    });

    console.log('✅ Database seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
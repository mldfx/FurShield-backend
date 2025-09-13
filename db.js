import { configDotenv } from "dotenv";
import mongoose from "mongoose";
const MONGO_URI =
  "mongodb+srv://webflux:JRwS792qyf9IIZmf@webclasscluster.snitlp7.mongodb.net/malik";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;

import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import petRoutes from "./routes/pets.js";
import healthRoute from "./routes/health.js";
import appointmentRoute from "./routes/appointments.js"
import vetRoutes from "./routes/vets.js"
import shelterRoutes from "./routes/shelters.js"
import productRoutes from "./routes/products.js"
import feedbackRoutes from "./routes/feedback.js"
import {errorHandler} from "./middlewares/error.js"
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// All routes 
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/pets', petRoutes);
app.use('/api/v1/health', healthRoute);
app.use('/api/v1/appointments', appointmentRoute);
app.use('/api/v1/vets',vetRoutes);
app.use('/api/v1/shelters', shelterRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/feedback', feedbackRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 FurShield Backend running on port ${PORT}`);
});
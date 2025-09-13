const express = require("express");
const dotenv = require("dotenv");
const { default: connectDB } = require("./db");
const cors = require("cors");
const authRoutes = require("./auth/route");
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// All routes
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 FurShield Backend Running on port ${PORT}`);
});

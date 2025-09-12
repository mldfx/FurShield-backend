// 📄 server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ✅ All routes now guaranteed to export Router instances
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/pets', require('./routes/pets'));
app.use('/api/v1/health', require('./routes/health'));
app.use('/api/v1/appointments', require('./routes/appointments'));
app.use('/api/v1/vets', require('./routes/vets'));
app.use('/api/v1/shelters', require('./routes/shelters'));
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/feedback', require('./routes/feedback'));

const errorHandler = require('./middlewares/error');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 FurShield Backend running on port ${PORT}`);
});
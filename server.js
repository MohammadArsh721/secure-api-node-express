const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const rateLimiter = require('./middleware/rateLimiter');

require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(rateLimiter);
app.use(express.json());

// Routes
app.use('/api', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/events.routes');
const inscriptionRoutes = require('./routes/inscriptions.routes');
const seedRoutes = require('./routes/seed.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/inscriptions', inscriptionRoutes);
app.use('/api/seed', seedRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'RunTogether API is running 🚀' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

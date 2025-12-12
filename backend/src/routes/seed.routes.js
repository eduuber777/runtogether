const express = require('express');
const router = express.Router();
const { seedDatabase } = require('../controllers/seed.controller');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/seed - Poblar base de datos (solo admin)
router.post('/', protect, adminOnly, seedDatabase);

module.exports = router;

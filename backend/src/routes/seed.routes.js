const express = require('express');
const router = express.Router();
const { seedDatabase, fixEventImages } = require('../controllers/seed.controller');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/seed - Poblar base de datos (solo admin)
router.post('/', protect, adminOnly, seedDatabase);

// POST /api/seed/fix-images - Arreglar imágenes de eventos (solo admin)
router.post('/fix-images', protect, adminOnly, fixEventImages);

module.exports = router;

const express = require('express');
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/events.controller');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Protected routes (Admin only)
router.post('/', authenticateToken, authorizeAdmin, createEvent);
router.put('/:id', authenticateToken, authorizeAdmin, updateEvent);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteEvent);

module.exports = router;

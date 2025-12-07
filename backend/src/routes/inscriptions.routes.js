const express = require('express');
const { createInscription, getMyInscriptions, getEventParticipants } = require('../controllers/inscriptions.controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, createInscription);
router.get('/me', authenticateToken, getMyInscriptions);
router.get('/event/:eventId', getEventParticipants); // Public route to see participants

module.exports = router;

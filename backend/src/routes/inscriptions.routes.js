const express = require('express');
const { createInscription, getMyInscriptions } = require('../controllers/inscriptions.controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, createInscription);
router.get('/me', authenticateToken, getMyInscriptions);

module.exports = router;

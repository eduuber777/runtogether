const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/auth');
const { body } = require('express-validator');

const router = express.Router();

// Validations could be added here as middleware
router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);

module.exports = router;

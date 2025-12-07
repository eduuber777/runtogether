const express = require('express');
const { register, login, getMe, forgotPassword, resetPassword, changePassword } = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/auth');
const { body } = require('express-validator');

const router = express.Router();

// Validations could be added here as middleware
router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', authenticateToken, changePassword);

module.exports = router;

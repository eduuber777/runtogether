const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getUserStats } = require('../controllers/users.controller');
const { authenticateToken } = require('../middleware/auth');

// Get user profile
router.get('/:id', authenticateToken, getUserProfile);

// Update user profile
router.put('/:id', authenticateToken, updateUserProfile);

// Get user statistics
router.get('/:id/stats', authenticateToken, getUserStats);

module.exports = router;

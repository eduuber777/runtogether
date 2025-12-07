const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserRole, deleteUser, getPlatformStats } = require('../controllers/admin.controller');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// All routes require authentication and admin role
router.use(authenticateToken, isAdmin);

// Get all users
router.get('/users', getAllUsers);

// Update user role
router.put('/users/:id/role', updateUserRole);

// Delete user
router.delete('/users/:id', deleteUser);

// Get platform statistics
router.get('/stats', getPlatformStats);

module.exports = router;

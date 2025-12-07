const express = require('express');
const router = express.Router();
const { getUserNotifications, markAsRead, markAllAsRead, getUnreadCount } = require('../controllers/notifications.controller');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Get user notifications
router.get('/', getUserNotifications);

// Get unread count
router.get('/unread-count', getUnreadCount);

// Mark notification as read
router.put('/:id/read', markAsRead);

// Mark all as read
router.put('/mark-all-read', markAllAsRead);

module.exports = router;

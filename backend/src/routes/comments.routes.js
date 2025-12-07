const express = require('express');
const router = express.Router();
const { getEventComments, createEventComment, deleteComment } = require('../controllers/comments.controller');
const { authenticateToken } = require('../middleware/auth');

// Get comments for an event
router.get('/event/:eventId', getEventComments);

// Create comment on event (requires auth)
router.post('/event/:eventId', authenticateToken, createEventComment);

// Delete comment (requires auth)
router.delete('/:id', authenticateToken, deleteComment);

module.exports = router;

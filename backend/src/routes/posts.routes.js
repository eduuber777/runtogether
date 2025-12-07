const express = require('express');
const router = express.Router();
const { getAllPosts, createPost, likePost, deletePost, createPostComment } = require('../controllers/posts.controller');
const { authenticateToken } = require('../middleware/auth');

// Get all posts
router.get('/', getAllPosts);

// Create post (requires auth)
router.post('/', authenticateToken, createPost);

// Like post (requires auth)
router.post('/:id/like', authenticateToken, likePost);

// Delete post (requires auth)
router.delete('/:id', authenticateToken, deletePost);

// Create comment on post (requires auth)
router.post('/:id/comments', authenticateToken, createPostComment);

module.exports = router;

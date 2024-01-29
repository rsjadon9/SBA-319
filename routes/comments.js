// routes/comments.js
const express = require('express');
const { ObjectId } = require('mongodb');
const Comment = require('../models/comment.js');
const { getDatabase } = require('../utils/db');

const router = express.Router();

// Get all comments
router.get('/', async (req, res) => {
    const db = getDatabase();
    const comments = await Comment.findAll(db);
    res.json(comments);
});

// Get a single comment by ID
router.get('/:id', async (req, res) => {
    const db = getDatabase();
    const comment = await Comment.findById(req.params.id, db);
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
});

// Create a new comment
router.post('/', async (req, res) => {
    const db = getDatabase();
    const { text, userId, postId } = req.body;
    const newComment = new Comment(text, userId, postId);
    await Comment.create(newComment, db);
    res.json(newComment);
});

// Update a comment by ID
router.put('/:id', async (req, res) => {
    const db = getDatabase();
    const { text, userId, postId } = req.body;
    const updatedComment = { text, userId, postId };
    const result = await Comment.update(req.params.id, updatedComment, db);
    if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(updatedComment);
});

// Delete a comment by ID
router.delete('/:id', async (req, res) => {
    const db = getDatabase();
    const result = await Comment.delete(req.params.id, db);
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
});

module.exports = router;

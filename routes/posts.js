// routes/posts.js
const express = require('express');
const { ObjectId } = require('mongodb');
const Post = require('../models/post.js');
const { getDatabase } = require('../utils/db');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    const db = getDatabase();
    const posts = await Post.findAll(db);
    res.json(posts);
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
    const db = getDatabase();
    const post = await Post.findById(req.params.id, db);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
});

// Create a new post
router.post('/', async (req, res) => {
    const db = getDatabase();
    const { title, content } = req.body;
    const newPost = new Post(title, content);
    await Post.create(newPost, db);
    res.json(newPost);
});

// Update a post by ID
router.put('/:id', async (req, res) => {
    const db = getDatabase();
    const { title, content } = req.body;
    const updatedPost = { title, content };
    const result = await Post.update(req.params.id, updatedPost, db);
    if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
    const db = getDatabase();
    const result = await Post.delete(req.params.id, db);
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
});

module.exports = router;

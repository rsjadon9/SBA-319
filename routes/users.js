// routes/users.js
const express = require('express');
const { ObjectId } = require('mongodb');
const User = require('../models/user.js');
const { getDatabase } = require('../utils/db');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    const db = getDatabase();
    const users = await User.findAll(db);
    res.json(users);
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    const db = getDatabase();
    const user = await User.findById(req.params.id, db);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// Create a new user
router.post('/', async (req, res) => {
    const db = getDatabase();
    const { username, email, age } = req.body;
    const newUser = new User(username, email, age);
    await User.create(newUser, db);
    res.json(newUser);
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    const db = getDatabase();
    const { username, email, age } = req.body;
    const updatedUser = { username, email, age };
    const result = await User.update(req.params.id, updatedUser, db);
    if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    const db = getDatabase();
    const result = await User.delete(req.params.id, db);
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
});

module.exports = router;

// utils/db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db();
        await seedDatabase(db); // Seed the database with sample data
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

function getDatabase() {
    return db;
}

// Function to seed the database with sample data
async function seedDatabase(db) {
    try {
        // Sample data for users
        await db.collection('users').insertMany([
            { username: 'user1', email: 'user1@example.com', age: 25 },
            { username: 'user2', email: 'user2@example.com', age: 30 },
            { username: 'user3', email: 'user3@example.com', age: 28 },
        ]);

        // Sample data for posts
        await db.collection('posts').insertMany([
            { title: 'Post 1', content: 'Content for post 1' },
            { title: 'Post 2', content: 'Content for post 2' },
            { title: 'Post 3', content: 'Content for post 3' },
        ]);

        // Sample data for comments
        await db.collection('comments').insertMany([
            { text: 'Comment 1', userId: 'user1_id', postId: 'post1_id' },
            { text: 'Comment 2', userId: 'user2_id', postId: 'post1_id' },
            { text: 'Comment 3', userId: 'user3_id', postId: 'post2_id' },
        ]);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

module.exports = { connectToDatabase, getDatabase };

// utils/db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

let db;

async function connectToDatabase() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db();
        await setupDatabase(db);

        await seedDatabase(db); // Seed the database with sample data
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

function getDatabase() {
    return db;
}

async function setupDatabase(db) {
    try {
        // Create index on the 'username' field with unique constraint for the 'users' collection
        // COMMENT: Creating a unique index on 'username' for efficient lookups and to enforce uniqueness.
        await db.collection('users').createIndex({ username: 1 }, { unique: true });

        await db.collection('users').deleteMany();

        console.log('after deleteMany');

        // Define validation rule for the 'users' collection
        const usersValidationRule = {
            $jsonSchema: {
                bsonType: 'object',
                required: ['username', 'email', 'age'],
                properties: {
                    username: {
                        bsonType: 'string',
                        description: 'Username must be a string and is required',
                    },
                    email: {
                        bsonType: 'string',
                        description: 'Email must be a string and is required',
                    },
                    age: {
                        bsonType: 'int',
                        minimum: 0,
                        description: 'Age must be a non-negative integer',
                    },
                    // Add more properties and validation rules as needed
                },
            },
        };

        // Apply validation rule to the 'users' collection
        await db.command({
            collMod: 'users',
            validator: usersValidationRule,
            validationLevel: 'strict',
        });

        // Create index on the 'title' field for the 'posts' collection
        // COMMENT: Creating a text index on 'title' for efficient searches on post titles.
        await db.collection('posts').createIndex({ title: 'text' });

        // Define validation rule for the 'posts' collection
        const postsValidationRule = {
            $jsonSchema: {
                bsonType: 'object',
                required: ['title', 'content'],
                properties: {
                    title: {
                        bsonType: 'string',
                        description: 'Title must be a string and is required',
                    },
                    content: {
                        bsonType: 'string',
                        description: 'Content must be a string and is required',
                    },
                    // Add more properties and validation rules as needed
                },
            },
        };

        // Apply validation rule to the 'posts' collection
        await db.command({
            collMod: 'posts',
            validator: postsValidationRule,
            validationLevel: 'strict',
        });

        // Create index on the 'text' field for the 'comments' collection
        // COMMENT: Creating a text index on 'text' for efficient searches on comment text.
        await db.collection('comments').createIndex({ text: 'text' });

        // Define validation rule for the 'comments' collection
        const commentsValidationRule = {
            $jsonSchema: {
                bsonType: 'object',
                required: ['text', 'userId', 'postId'],
                properties: {
                    text: {
                        bsonType: 'string',
                        description: 'Text must be a string and is required',
                    },
                    userId: {
                        bsonType: 'string',
                        description: 'User ID must be a string and is required',
                    },
                    postId: {
                        bsonType: 'string',
                        description: 'Post ID must be a string and is required',
                    },

                },
            },
        };

        // Apply validation rule to the 'comments' collection
        await db.command({
            collMod: 'comments',
            validator: commentsValidationRule,
            validationLevel: 'strict',
        });

        console.log('Indexes and validation rules created successfully');
    } catch (error) {
        console.error('Error setting up database:', error);
    }
}

// Function to seed the database with sample data
async function seedDatabase(db) {
    try {
        // Sample data for users
        await db.collection('users').insertMany([
            { username: 'user1', email: 'user1@example.com', age: 25 },
            { username: 'user2', email: 'user2@example.com', age: 30 },
            { username: 'user3', email: 'user3@example.com', age: 28 },
            { username: 'user4', email: 'user4@example.com', age: 35 },
            { username: 'user5', email: 'user5@example.com', age: 22 },
            { username: 'user6', email: 'user6@example.com', age: 27 },
            { username: 'user7', email: 'user7@example.com', age: 31 },
            { username: 'user8', email: 'user8@example.com', age: 29 },
            { username: 'user9', email: 'user9@example.com', age: 26 },
            { username: 'user10', email: 'user10@example.com', age: 33 },
        ]);

        // Sample data for posts
        await db.collection('posts').insertMany([
            { title: 'Post 1', content: 'Content for post 1' },
            { title: 'Post 2', content: 'Content for post 2' },
            { title: 'Post 3', content: 'Content for post 3' },
            { title: 'Post 4', content: 'Content for post 4' },
            { title: 'Post 5', content: 'Content for post 5' },
            { title: 'Post 6', content: 'Content for post 6' },
            { title: 'Post 7', content: 'Content for post 7' },
            { title: 'Post 8', content: 'Content for post 8' },
            { title: 'Post 9', content: 'Content for post 9' },
            { title: 'Post 10', content: 'Content for post 10' },
        ]);

        // Sample data for comments
        await db.collection('comments').insertMany([
            { text: 'Comment 1', userId: 'user1_id', postId: 'post1_id' },
            { text: 'Comment 2', userId: 'user2_id', postId: 'post1_id' },
            { text: 'Comment 3', userId: 'user3_id', postId: 'post2_id' },
            { text: 'Comment 4', userId: 'user4_id', postId: 'post2_id' },
            { text: 'Comment 5', userId: 'user5_id', postId: 'post3_id' },
            { text: 'Comment 6', userId: 'user6_id', postId: 'post3_id' },
            { text: 'Comment 7', userId: 'user7_id', postId: 'post4_id' },
            { text: 'Comment 8', userId: 'user8_id', postId: 'post4_id' },
            { text: 'Comment 9', userId: 'user9_id', postId: 'post5_id' },
            { text: 'Comment 10', userId: 'user10_id', postId: 'post5_id' },
        ]);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}




module.exports = { connectToDatabase, getDatabase };

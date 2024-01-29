// app.js
const express = require('express');
const { connectToDatabase } = require('./utils/db');

const app = express();
const port = process.env.PORT || 5050;

// Connect to MongoDB
connectToDatabase();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

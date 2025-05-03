const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {user, admin, courses, purchase} = require('./db.js');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for JWT token generation and verification
const {userRouter} = require('./routes/user.js');

app.use(express.json()); // Middleware to parse JSON request bodies


// connecting to the database
mongoose.connect("mongodb+srv://admin:root@main.cqd4hyx.mongodb.net/courses").then(() => {
  console.log("Connected to MongoDB successfully");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Course Selling application!');
});

app.use(userRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
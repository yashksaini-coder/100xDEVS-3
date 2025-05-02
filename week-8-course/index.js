const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {user, admin, courses, purchase} = require('./db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for JWT token generation and verification


const JWT_SECRET = "c2VjcmV0Cg=="; // Base64 encoded string of secret
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


app.post('/signup', async (req, res) => {
    const {username, password, email} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password with bcrypt
    await user.create({
        username: username,
        password: hashedPassword,
        email: email
    });
    res.json({
        message: "User created successfully",
        user: {
            username: username,
            password: password,
            email: email
        }
    });
});

// app.post('login', async(req,res) =>{
//     const {email, password} = req.body;

//     await user.
// })





app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
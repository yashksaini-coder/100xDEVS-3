const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { userRouter } = require('./routes/user.js');
const { courseRouter } = require('./routes/course.js');
const { adminRouter } = require('./routes/admin.js');
const { auth } = require('./middleware.js');

app.use(express.json()); // Middleware to parse JSON request bodies
app.use( auth );

// connecting to the database
mongoose.connect("mongodb+srv://admin:root@main.cqd4hyx.mongodb.net/courses").then(() => {
  console.log("Connected to MongoDB successfully");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.get('/api/v1', (req, res) => {
  res.send('Welcome to the Course Selling application!');
});

app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/admin', adminRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
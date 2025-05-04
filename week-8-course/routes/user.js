const { Router } = require('express');
const {user, purchase} = require('../db.js');
const {JWT_SECRET} = require('../config.js');
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing
const jwt = require('jsonwebtoken');

const userRouter = Router()

userRouter.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password with bcrypt

  try {
    // Check if the username and email are provided
    if (!username || !password || !email) {
      return res.status(400).json({ message: "Please provide username, password, and email" });
    }

    // You can also add email validation and other checks here
    // For example, check if the email already exists in the database
    if (await user.findOne({ email: email })) {
      return res.status(403).json({ message: "Email already exists" });
    }
    if (await user.findOne({ username: username })) {
      return res.status(403).json({ message: "Username already exists" });
    }

    // If the email and username are unique, create the user
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
  } catch (error) {
    res.status(500).json({ message: "An error occured" + error })
  }
});


userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide username, password, and email" });
    }

    const foundUser = await user.findOne({
      email: email
    })

    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log(foundUser);

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (passwordMatch) {
      const token = jwt.sign({
        id: foundUser._id.toString()
      }, JWT_SECRET);

      res.json({
        token
      })
    } else {
      res.status(400).json({ message: "Incorret credentials" })
    }
  } catch (error) {
    res.status(500).json({ message: "An error occured" + error })
  }
});


module.exports = {
  userRouter: userRouter
}
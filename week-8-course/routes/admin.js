const { Router } = require('express');
const { admin, courseModel } = require('../db.js');
const { JWT_ADMIN } = require('../config.js');
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing
const jwt = require('jsonwebtoken');
const { adminMiddleware } = require('../middleware/admin.js');

const adminRouter = Router();

adminRouter.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password with bcrypt

  try {
    // Check if the username and email are provided
    if (!username || !password || !email) {
      return res.status(400).json({ message: "Please provide name, password, and email" });
    }

    // You can also add email validation and other checks here
    // For example, check if the email already exists in the database
    if (await adminUser.findOne({ email: email })) {
      return res.status(403).json({ message: "Email already exists" });
    }
    if (await adminUser.findOne({ username: username })) {
      return res.status(403).json({ message: "Username already exists" });
    }

    // If the email and username are unique, create the adminUser
    await admin.create({
      username: username,
      password: hashedPassword,
      email: email
    });

    res.json({
      message: "adminUser created successfully",
      adminUser: {
        username: username,
        password: password,
        email: email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured" + error })
  }
});


adminRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide username, password, and email" });
    }

    const adminUser = await admin.findOne({
      email: email
    })

    if (!adminUser) {
      return res.status(400).json({ message: "adminUser not found" });
    }

    console.log(adminUser);

    const passwordMatch = await bcrypt.compare(password, adminUser.password);

    if (passwordMatch) {
      const token = jwt.sign({
        id: adminUser._id.toString()
      }, JWT_ADMIN);

      res.json({
        token
      })
    } else {
      res.status(400).json({ message: "Incorret credentials" })
    }
  } catch (error) {
    res.status(500).json({ message: "An error occured " + error })
  }
});

//creating a course
adminRouter.post('/create-course', adminMiddleware, async (req, res) => {

  try {
    // TODO: to create and publish a course
    const adminId = req.userId;
    const { title, description, price, image } = req.body;

    const course = await courseModel.create({
      title: title,
      description: description,
      image: image,
      price: price,
      creatorId: adminId
    })

    res.status(200).json({ message: "Course created successfully", data: course });
  } catch (error) {
    res.status(500).json({ message: " An error occured " + error })
  }
})


//to update a course
adminRouter.put("/update-course", adminMiddleware, async function(req, res) {
  const adminId = req.userId;

  const { title, description, imageUrl, price, courseId } = req.body;

  // creating a web3 saas in 6 hours
  const course = await courseModel.findOneAndUpdate({
      _id: courseId, 
      creatorId: adminId 
  }, {
      title: title, 
      description: description, 
      imageUrl: imageUrl, 
      price: price
  })

  res.json({
      message: "Course updated",
      courseId: course._id.toString()
  })
})

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const courses = await courseModel.find({
    creatorId: adminId
  });

  res.json({
    message: "Course updated",
    courses
  })
})

module.exports = {
  adminRouter: adminRouter
}
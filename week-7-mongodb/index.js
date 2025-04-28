const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("./auth.js").auth; // Importing the auth middleware
const mongoose = require("mongoose");
const {user, todo} = require("./db.js");
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing
const app = express();

// connecting to the database
mongoose.connect("mongodb+srv://admin:root@main.cqd4hyx.mongodb.net/test")
const JWT_SECRET = "c2VjcmV0Cg=="; // Base64 encoded string of "secret"


app.use(express.json());

app.post("/signup", async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const hashed = await bcrypt.hash(password, 10); // Hashing the password with bcrypt

    await user.create({
        username: username,
        password: hashed,
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

app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;


    const foundUser = await user.findOne({
        email: email
    });


    // Basically we are checking if the user exists in the database or not, and if they do, we are taking the  password and checking if it matches the password in the database or not,
    // by using bcrypt.compare, which compares the hashed password in the database with the password entered by the user.
    if (!foundUser) {
        return res.status(403).json({
            message: "User not found"
        });
    }

    console.log(foundUser);
    // If the user is found, create a JWT token and send it back to the client

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (passwordMatch) {
        const token = jwt.sign({
            id: foundUser._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});

app.post("/todo", auth, async function(req, res) {
    const userId = req.userId; // Extracted from the JWT token
    const title = req.body.title;
    const description = req.body.description;

    await todo.create({
        title: title,
        description: description,
        userId: userId
    });

    res.json({
        message: "Todo created successfully",
        userId: userId,
        todo: {
            title: title,
            description: description
        }
    });
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId; // Extracted from the JWT token
    
    const todos = await todo.find({ 
        userId: userId
    });

    res.json({
        todos: todos
    });
}); 




app.listen(3000);
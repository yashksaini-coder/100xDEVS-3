const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("./auth.js").auth; // Importing the auth middleware
const mongoose = require("mongoose");
const {user, todo} = require("./db.js");

const app = express();

// connecting to the database
mongoose.connect("mongodb+srv://admin:root@main.cqd4hyx.mongodb.net/test")
const JWT_SECRET = "c2VjcmV0Cg=="; // Base64 encoded string of "secret"


app.use(express.json());

app.post("/signup", async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    await user.create({
        username: username,
        password: password,
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
        email: email,
        password: password
    });

    console.log(foundUser);
    // If the user is found, create a JWT token and send it back to the client

    if(foundUser) {
        const token = jwt.sign({
            id: foundUser._id.toString(),
        }, JWT_SECRET);
        res.json({
            message: "User signed in successfully",
            token: token
        });
    } else {
        res.status(401).json({
            message: "Invalid username or password"
        });
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
const express = require("express");
const app = express();

// connecting to the database
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:root@cluster0.7kmvq.mongodb.net")

// importing the models from db.js
const { user, todo } = require("./db.js");
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

app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
});

app.post("/todo", function(req, res) { 

});

app.get("/todos", function(req, res) { 
}); app.listen(3000);
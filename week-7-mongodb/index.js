const express = require("express");
const app = express();
app.use(express.json());


let users = [];
let todos = [];


app.post("/signup", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    users.push({ 
        username: username,
        password: password
    });

    res.json({
        message: "User created successfully",
        user: {
            username: username,
            password: password
        }
    });

    if (!res.status(200)) {
        // Here you would typically save the user to a database
        res.json({ message: "Username and password are required" });
    } else {
        res.json({ message: "User created successfully" });
    }

});

app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    for(let i=0; i<users.length; i++){
        if(users[i].username === username && users[i].password === password){
            foundUser = users[i];
            break;
        }
    }
    
        if(foundUser) { // Store the token in the user object
            res.json({
                message: "User signed in successfully",
                user: {
                    username: foundUser.username,
                    password: foundUser.password
                }
            });
        } 
        else {
            res.status(401).json({
                message: "Invalid username or password"
            });
            console.log("Invalid username or password");
        }
});

app.post("/todo", function(req, res) { 

});

app.get("/todos", function(req, res) { 
}); app.listen(3000);
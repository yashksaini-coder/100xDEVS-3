const express= require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());

const users = [];
const JWT_SECRET = "USER_APP";

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');

});

// function to generate a random token
// This function generates a random token of length 32 using characters from a specified set.
// function generateToken() {
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     let token = "";
//     for (let i = 0; i < 32; i++) {
//         token += options[Math.floor(Math.random() * options.length)];
//     }
//     return token;
// }

// Signup route, where users can create an account
// This route handles user signup by accepting a username and password, storing them in an array, and returning a success message.
app.post("/signup", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;  
    users.push({ 
        username:username,
        password:password
    });
    
    res.json({
        message: "User signed up successfully",
        user: {
            username: username,
            password: password
        }
    });
    if(res.status(200)){
        console.log("User signed up successfully");
        console.log(users);
    }
    else{
        console.log("User sign up failed");
    }
});

// Signin route, where users can log in to their account
// This route handles user login by checking the provided username and password against the stored users, generating a token if successful, and returning it in the response.
// It also includes a check to ensure that the user is not already logged in by checking for an existing token.
app.post("/signin", (req, res) => {
    let foundUser = null;

    const username = req.body.username;
    const password = req.body.password;

    for(let i = 0; i < users.length; i++){
        if(users[i].username === username && users[i].password === password){
            foundUser = users[i];
            break;
        }
    }

    if(foundUser) {
        const token = jwt.sign({    // using jwt to create token 
            username: foundUser.username
        }, JWT_SECRET);


        foundUser.token = token; // Store the token in the user object
        res.json({
            message: "User signed in successfully",
            token: token
        });
        console.log("User signed in successfully");
        console.log(users);
    }
    else {
        res.status(401).json({
            message: "Invalid username or password"
        });
        console.log("Invalid username or password");
    }
});


function auth(req, res, next) {
    const token = req.headers.token;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Unauthorized"
                })
            } else {
                req.user = decoded;
                next();
            }
        })
        // res.headers.token = token; // Store the token in the response headers
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}

app.get("/me", auth, (req, res) => {
    const user = req.user;

    res.send({
        username: user.username
    })
})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
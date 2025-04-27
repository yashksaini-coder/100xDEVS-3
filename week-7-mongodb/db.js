const mongoose = require('mongoose');
const schema = mongoose.Schema;
const object = mongoose.ObjectId;


const user = new schema({
    username: String,
    email: {type: String, unique: true}, // Ensure email is unique, so that no two users can have the same email address
    password: String,
});

const todo = new schema({
    title: String,
    description: String,
    userId: object,    
});

module.exports = {
    user: mongoose.model('user', user),
    todo: mongoose.model('todo', todo)
};
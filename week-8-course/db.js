const mongoose = require('mongoose');
const schema = mongoose.Schema;
const object = mongoose.ObjectId;


const user = new schema({
    username: String,
    email: {type: String, unique: true}, // Ensure email is unique, so that no two users can have the same email address
    password: String,
});

const courses = new schema({
    title: String,
    description: String,
    creatorId: object,
    price: Number,
    image: String,
});

const admin = new Schema({
    username: String,
    email: {type: String, unique: true}, // Ensure email is unique, so that no two users can have the same email address
    password: String,
})

const purchase = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

module.exports = {
    user: mongoose.model('user', user),
    todo: mongoose.model('courses', courses),
    purchase: mongoose.model('purchase', purchase),
    admin: mongoose.model('admin', admin)
};
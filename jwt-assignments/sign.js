const jwt = require('jsonwebtoken');
const z = require('zod');
const secret = 'yash';


const content = {
    name: 'yash',
    age: 20
}

const token = jwt.sign(content, secret);
console.log(token);
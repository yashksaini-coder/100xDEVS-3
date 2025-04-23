const jwt = require('jsonwebtoken');
const z = require('zod');
const secret = 'yash';


const content = {
    name: 'yash',
    age: 20
}


// `sign()` method is used to create a new JWT token. It takes the payload (content), secret key, and options as arguments.
// The payload is the data that you want to include in the token. The secret key is used to sign the token and verify its authenticity.
// The options can include the algorithm used for signing, expiration time, etc.
const token = jwt.sign(content, secret);

// `verify()` method is used to verify the token. It takes the token and secret key as arguments.
// If the token is valid, it returns the decoded payload. If not, it throws an error.
const verified = jwt.verify(token, secret);

// `decode()` method is used to decode the token without verifying it. It takes the token as an argument.
// It returns the decoded payload without verifying the signature. This is useful if you want to read the payload without verifying it.
// However, it is not recommended to use this method for security reasons.
// It is better to use the `verify()` method to ensure the token is valid and has not been tampered with.
const decoded = jwt.decode(token);
console.log('------------------');
console.log(token);
console.log(verified);
console.log(decoded);
console.log('------------------');
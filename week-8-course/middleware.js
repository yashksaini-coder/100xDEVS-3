const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const auth = (req,res,next) => {
    const token = req.headers.token;

    if(!token){
        res.status(401).json({messsage:"Authorization token missing"})
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        req.userId = decoded;
        next(); 
    } catch (error) {
        res.status(401).json({message:"Invalid token"})
    }
}

module.exports = {auth}
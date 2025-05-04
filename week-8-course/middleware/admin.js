const jwt = require('jsonwebtoken');
const { JWT_ADMIN } = require('../config');

function adminMiddleware(req,res,next){
    const token = req.headers.token;

    if(!token){
        res.status(401).json({messsage:"Authorization token missing"})
    }

    try {
        const decoded = jwt.verify(token,JWT_ADMIN);
        if (decoded) {
            req.userId = decoded.id;
            next()
        } else {
            res.status(403).json({
                message: "You are not signed in"
            })
        }
    } catch (error) {
        res.status(401).json({message:"Invalid token"})
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}
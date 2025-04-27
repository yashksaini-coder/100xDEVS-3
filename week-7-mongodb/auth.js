const jwt = require("jsonwebtoken");
const JWT_SECRET = "c2VjcmV0Cg=="; // Base64 encoded string of "secret"

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; //Improved token extraction

    if (!token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); //Use JWT_SECRET for verification
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { auth };
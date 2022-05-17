const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const token = req.header("x-access-token");

    if (!token) return res.status(401).send("Access Denied! No token provided");

    try {
        jwt.verify(token, "privatekey");
        next();
    } catch (ex) {
        res.status(401).send("Invalid Token");
    }
}
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    !token && res.status(401).json("Your are not authenticated");

    jwt.verify(token, process.env.JWT, (err, user) => {
        err && res.status(403).json("Token is not valid");
        req.user = user;
        next()
    });
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not authorized");
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not authorized");
        }
    })
}

module.exports = {verifyToken,verifyUser,verifyAdmin};
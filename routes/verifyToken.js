const jwt = require('jsonwebtoken')

//Can add this middleware function to any route that needs to be protected
module.exports = function auth(req, res, next){
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send("Access Denied!")
    }

    try {
        const verified = jwt.verify(token, process.env.TOKENSECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token")
    }
}


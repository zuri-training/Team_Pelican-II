const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = user.UserInfo.username;
            next();
        }
    );
}

module.exxports = verifyJWT

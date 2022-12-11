const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sensStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = User.find(person => person.username === user);
    if(!foundUser) return res.sensStatus(403);

    //EVALUATE JWT
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
            if (err) {
                const accessToken = jwt.sign (
                    {
                        "UserInfo": {
                            "username": user.username
                        }
                    },
                   process.env.ACCESS_TOKEN_SECRE,
                   { expiresIn: '30s'}
                );
                res.json({accessToken})
            }
        }
    );
}

module.exports = {handleRefreshToken}
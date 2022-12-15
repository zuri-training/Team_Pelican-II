const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({ email: email });

    if(!foundUser) return res.status(400).json({ success: false, 'message': 'Username not found' });
   
    //ceck passowrd
    const same = await bcrypt.compare(password, foundUser.password);

    if (same) {
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d'}
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        const currentUser = { ...foundUser.toJSON(), accessToken };

        res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

        res.json({ 
            success: true, 
            data: currentUser
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = {handleLogin}
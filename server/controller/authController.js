const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleNewUser = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({'message': 'email and password are required.' });

    try {
        const hashedPwd = await bcrypt.hash(
            password, 10);

        const result = await User.create({
            "email": email,
            "password": hashedPwd
        });

        const { password: pass, ...rest} = result.toObject()

        return res.status(201).json({
            success: true,
            message: "User regsitered successfully",
            data: rest
        });
        // res.redirect('/login')
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({ email: email });

    if(!foundUser) return res.status(400).json({ success: false, 'message': 'email not found' });
   
    //check passowrd
    const same = await bcrypt.compare(password, foundUser.password);

    if (same) {
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email
                }
            },
            process.env.JWT_TOKEN,
            { expiresIn: '1d'}
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN,
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

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sensStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = User.find(person => person.email === user);
    if(!foundUser) return res.sensStatus(403);

    //EVALUATE JWT
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err, user) => {
            if (err) {
                const accessToken = jwt.sign (
                    {
                        "UserInfo": {
                            "email": user.email
                        }
                    },
                   process.env.JWT_TOKEN,
                   { expiresIn: '30s'}
                );
                res.json({accessToken})
            }
        }
    );
}

module.exports = 
{
    handleLogin,
    handleNewUser,
    handleRefreshToken
}
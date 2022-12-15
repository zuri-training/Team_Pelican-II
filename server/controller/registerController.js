const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    if(!first_name || !last_name || !email || !password) return res.status(400).json({'message': 'Username and password are required.' });

    try {
        const hashedPwd = await bcrypt.hash(
            password, 10);

        const result = await User.create({
            "first_name": first_name,
            "last_name": last_name,
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
        res.redirect('/register')
    }
}

// const updateNewUser = async(req, res) => {
//     const user = User.find(person => person.id === parseInt(req.body.id));
//     if (req.body.first_name) user.first_name = req.body.first_name;
// }

module.exports = { handleNewUser };
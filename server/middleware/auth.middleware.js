const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const { APIError } = require('./customAPIError');

const protect = async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startswith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.header = await userModel.findById(decoded.id).select('password');
            next();
        } catch (error) {
            next(error)
        }  
    }

    if (!token) {
        return next(APIError.unAuthorized('Not authorised, no token'))
    }
    
}

module.exports = protect;
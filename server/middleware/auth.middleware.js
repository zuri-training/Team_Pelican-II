const userModel = require('../model/User');
const jwt = require('jsonwebtoken');
const { APIError } = require('./customAPIError');

const protect = async(req, res, next) => {
    let token;
    const {authorization} = req.headers
    if(!authorization){
        return next(CustomAPIError.unauthenticated("Bearer token missing"))
      }
        try {
            token = authorization.split(' ')[1];
            if (!token) {
                return next(APIError.unAuthorized('Invalid or expired token'))
            }
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            req.header = await userModel.findById(decoded.id).select('password');
            next();
        } catch (error) {
            next(error)
        }  
    
}

module.exports = protect;
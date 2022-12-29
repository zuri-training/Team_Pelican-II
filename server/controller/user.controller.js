const {APIError} = require("../middleware/customAPIError"); 
const userModel = require('../model/User');
const bcrypt = require('bcrypt');

const createAccount = async(req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password)
        return next(APIError.badRequest("Please Supply all the missing field!"));
        console.log(email)
    
    try {
        const userExist = await userModel.findOne({email});
        if (userExist)
            return next(APIError.badRequest("Supplied email already exist, login to continue"));
        if(!userExist){
            const hashedPwd = await bcrypt.hash(password, 10);
            const user = await userModel.create({email, password: hashedPwd})
        if (user)
            res.status(201).json({
                success: true,
                message: "User account created successfully!",
                userData: user
            }) 
        }
       
    } catch (error) {
        next(error)
    }
}

const updateAccount = async(req, res, next) => {
const {id} = req.body;
if (!id)
    return next(APIError.badRequest("Please supply your User ID"));
try {
    const findUser = await userModel.findById(id);
if (!findUser)
    return next(APIError.notFound("User with supplied ID does not exists"));
const newUser = await userModel.findByIdAndUpdate(id, req.body);
res.status(200).json({
    success: true,
    message: "User updated successfully",
    updatedUser: newUser
})
} catch (error) {
    next(error)
}

}

const getUserAccount = async(req, res, next) =>{
    const {id} = req.params;
    if (!id)
        return next(APIError.badRequest("Please supply your User ID"));
        try {
            const findUser = await userModel.findById(id);
        if (!findUser)
            return next(APIError.notFound("User with supplied ID does not exists"));
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            updatedUser: findUser
        })
        } catch (error) {
            next(error)
        }
}

const deleteAccount = async(req, res, next) =>{
    const {id} = req.params;
    if (!id)
        return next(APIError.badRequest("Please supply your User ID"));
        try {
            const findUser = await userModel.findById(id);
        if (!findUser)
            return next(APIError.notFound("User with supplied ID does not exists"));
        deletedUser = await userModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: `User with Id ${id} has been deleted successfully!`,
            deletedData: deletedUser
        })
        } catch (error) {
            next(error)
        }
}

module.exports = {
    createAccount,
    updateAccount,
    deleteAccount,
    getUserAccount
}
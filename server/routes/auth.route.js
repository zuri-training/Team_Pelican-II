const express = require('express');
const authRouter = express.Router();
const {handleLogin, handleNewUser, handleRefreshToken} = require('../controller/authController');

authRouter
.post('/login', handleLogin).post('/register', handleNewUser)
.post('/token', handleRefreshToken)
module.exports = authRouter
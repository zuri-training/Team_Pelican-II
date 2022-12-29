const express = require('express');
const { updateAccount, createAccount, getUserAccount, deleteAccount } = require('../controller/user.controller');
const userRouter = express.Router();


userRouter
.get('/:id', getUserAccount)
.post('/create', createAccount)
.put('/update', updateAccount)
.delete('delete/:id', deleteAccount)

module.exports = userRouter
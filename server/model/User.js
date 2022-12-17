const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passwordResetToken: {
        type: String
    },
    resetTokenExpiryty: {
        type: Date
    },
    createdDate: {
       type: Date, default: Date.now
    },
    updateDate: {
        type: Date, default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const templateSchema = new Schema ({
    name: {
        type: String
    },
    image_url: {
        type: String
    },
    type: {
        type: String
    },
    createdDate: {
        type: Date, default: Date.now
    },
    updatedDate: {
        type: Date, default: Date.now
    } 
})

module.exports = mongoose.model('Template', templateSchema)
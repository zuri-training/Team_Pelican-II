const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const templateSchema = new Schema ({
    name: {
        type: String
    },
    imageUrl: {
        type: String
    },
    type: {
        type: String,
        default: "DEFAULT"
    },
    templateBody: {
        type: Object
    },
    createdDate: {
        type: Date, default: Date.now
    },
    updatedDate: {
        type: Date, default: Date.now
    } 
})

module.exports = mongoose.model('Template', templateSchema)
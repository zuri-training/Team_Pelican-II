const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackResponseSchema = new Schema ({
    email: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    responseBody: {
        type: object
    },
    feedbackFormId: {
        type: Schema.Types.ObjectId
    },
    createdDate: {
        type: Date, default: Date.now
    },
    updatedDate: {
        type: Date, default: Date.now
    }
})

module.exports = mongoose.model('FeedbackResponse', feedbackResponseSchema)
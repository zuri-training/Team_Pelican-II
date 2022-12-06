const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackFormSchema = new Schema ({
    name: {
        type: String
    },
    logo: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    templateId: {
        type: Schema.Types.ObjectId
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

module.exports = mongoose.model('FeedbackForm', feedbackFormSchema)
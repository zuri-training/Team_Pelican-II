const FeedbackForm = require('../model/FeedbackForm');
const FeedbackResponse = require('../model/FeedbackResponse');


const feedbackResponse = async (req, res) => {
    const {email, name, responseBody, feedbackFormId} = req.body;
    if(!email || !name || !responseBody, !feedbackFormId) {
        return res.status(400).json({
            success: false,
            message: "email,name and body is required"
        })
    }

    try {
        if(feedbackFormId){
            const feedbackForm = await FeedbackForm.findById(feedbackFormId)
            if(!feedbackForm) return res.status(400).json({
                success: false,
                message: 'Feedback Form id does not exist'
            })
        }
        const createFeedbackResponse = await FeedbackResponse.create({
            email: email,
            name: name,
            responseBody: responseBody
        })
        return res.status(201).json({
            success: true,
            message: 'Response has been taken down',
            data: createFeedbackResponse
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const getAllFeedbackResponse = async(req, res) => {
    const response = await FeedbackResponse.find();
    return res.status(200).json({
        success: true,
        message: "here is all responses recorded",
        data: response
    })
}
module.exports = { 
    feedbackResponse,
    getAllFeedbackResponse
}
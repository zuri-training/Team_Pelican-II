const FeedbackForm = require('../model/FeedbackForm');
const Template = require('../model/Template');
const User = require('../model/User')

const createFeedbackForm = async (req, res) => {
    const {name, logo, title, description, templateId, userId} = req.body
    if(!name || !logo || !title || !description || !userId) {
        return res.status(400).json({
            success: false,
            nessage: 'name, logo, title, description are required'
        })
    }

    try {
        if(userId){
            const user = await User.findById(userId)
            if(!user) return res.status(400).json({
                success: false,
                message: 'User id does not exist'
            })
        }
        if(templateId){
            const template = await Template.findById(templateId)
            if(!template) return res.status(400).json({
                success: false,
                message: 'Template id does not exist'
            })
        }
        let createFeedbackForm = await FeedbackForm.create({
            name: name,
            logo: logo,
            title: title,
            description: description,
            userId,
            templateId
        })

        createFeedbackForm = await createFeedbackForm.populate([
            { path: "templateId", model: Template },
            { path: "userId", model: User }
        ])

        return res.status(201).json({
            success: true,
            message: 'feedback form created',
            data: createFeedbackForm
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getFeedbackForm = async(req, res) => {
    const form = await FeedbackForm.find();
    return res.status(200).json({
        success: true,
        message: 'form created',
        data: form
    })
}

module.exports = { 
    createFeedbackForm, 
    getFeedbackForm 
}
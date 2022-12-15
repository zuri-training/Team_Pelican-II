const Template = require('../model/Template');

const handleTemplate = async (req, res) => {
    const {name, imageUrl, templateBody} = req.body;
    if (!name || !imageUrl || !templateBody) {
        return res.status(400).json({
            'success': 'false',
            'message': "Name and image is required"
        })
    }
    try {
       const createTemplate = await Template.create ({
            "name": name,
            "imageUrl": imageUrl,
            "templateBody": templateBody
        })
        
        return res.status(201).json({
            success: true,
            message: 'Template created succefully',
           data: createTemplate
        })
     
    } catch (err) {
        res.status(500).json({
            'success': 'false',
            'message': err.message
        });
    }
}
const getDefaultTemplate = async(req, res) => {
    const templates = await Template.find({ type: "DEFAULT"})
    return res.status(200).json({
        success: true,
        message: 'created template',
        data: templates
    })
    
}
module.exports = {
  handleTemplate,
  getDefaultTemplate,
};
const express = require('express');
const templateRouter = express.Router();
const {getDefaultTemplate, handleTemplate} = require('../controller/templateController')

templateRouter.get('/', getDefaultTemplate)
templateRouter.post('/', handleTemplate);

module.exports = templateRouter;
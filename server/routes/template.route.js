const express = require('express');
const templateRouter = express.Router();
const {getDefaultTemplate, handleTemplate} = require('../controller/templateController');
const protect = require('../middleware/auth.middleware');

templateRouter.get('/fetch', protect, getDefaultTemplate)
templateRouter.post('/create', protect, handleTemplate);

module.exports = templateRouter;
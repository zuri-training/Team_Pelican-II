const express = require('express');
const { getFeedbackForm, createFeedbackForm } = require('../controller/feedbackController');
const { getAllFeedbackResponse, getFeedbackResponse } = require('../controller/feedbackResponseController');
const feedBackRouter = express.Router();

feedBackRouter
.get('/get', getFeedbackForm).get('/response', getAllFeedbackResponse).get('/response/:id', getFeedbackResponse)
.post('/create', createFeedbackForm)

module.exports = feedBackRouter
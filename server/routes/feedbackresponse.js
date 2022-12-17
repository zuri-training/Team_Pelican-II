const express = require('express');
const router = express.Router();
const feedbackResponseController = require('../controller/feedbackResponseController');

router.get('/', feedbackResponseController.getAllFeedbackResponse)
router.post('/', feedbackResponseController.feedbackResponse);

module.exports = router
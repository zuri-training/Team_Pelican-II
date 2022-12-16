const express = require('express');
const router = express.Router();
const feedbackController = require('../controller/feedbackController')

router.get('/', feedbackController.getFeedbackForm);
router.post('/', feedbackController.handleFeedbackForm);

module.exports = router
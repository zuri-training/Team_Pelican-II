const express = require('express');
const router = express.Router();
const templateController = require('../controller/templateController');

router.get('/', templateController.getDefaultTemplate)
router.post('/', templateController.handleTemplate);

module.exports = router;
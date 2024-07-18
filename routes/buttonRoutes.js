const express = require('express');
const router = express.Router();
const buttonController = require('../controllers/buttonController');

router.post('/requestButton', buttonController.requestButton);
router.post('/activateButton', buttonController.activateButton);

module.exports = router;

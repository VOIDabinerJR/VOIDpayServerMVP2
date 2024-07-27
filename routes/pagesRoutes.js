const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');

router.post('/profile', pagesController.registerUpdate);





module.exports = router;

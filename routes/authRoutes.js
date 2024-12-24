const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../config/uploadConfig');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/recoveraccount', authController.recoveraccount);
router.post('/resetpassword', authController.resetpassword);
router.post('/loaddata', authController.loaddata);


 

module.exports = router;
 
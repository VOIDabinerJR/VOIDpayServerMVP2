const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/checkToken', userController.checkToken);
router.post('/checkUser', userController.checkUser);

 

router.post('/createapp', userController.createApp);
router.post('/shopifyCredentials', userController.shopifyCredentials);


module.exports = router;   

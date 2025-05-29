const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');
const upload = require('../config/uploadConfig');


router.post('/profile',upload.single('photo'), pagesController.registerUpdate);



//METER NOVO CONTROLADOR DE PRODUTOS

module.exports = router;

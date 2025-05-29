const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/createOrder', orderController.createOrder);
router.post('/createOrderSh', orderController.createShopifyOrder);
router.put('/updateOrder', orderController.updateOrder);
 




//a ser atualizado a logica
router.get('/createOrderbyLink', orderController.createOrderbyLink);
module.exports = router; 

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/createOrder', orderController.createOrder);
router.post('/createOrderSh', orderController.createShopifyOrder);
router.put('/updateOrder', orderController.updateOrder);
 
module.exports = router; 

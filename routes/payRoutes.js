const express = require('express');
const router = express.Router();
const payController = require('../controllers/payController');

router.get('/:orderid', payController.getPaymentPage);
router.post('/:orderid', payController.processPayment);
router.post('/withdraw', payController.processWithdraw);
router.post('/qeryTransactionStatus', payController.processQueryTransactionStatus);
router.post('/refund', payController.processRefund);


module.exports = router; 

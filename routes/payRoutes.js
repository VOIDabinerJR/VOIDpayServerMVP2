const express = require('express');
const router = express.Router();
const payController = require('../controllers/payController');

router.get('/pay', payController.getPaymentPage);
router.get('/payqrcode', payController.getQrCode);
router.post('/pay', payController.processPayment);
router.post('/aprove', payController.decodeToken);


router.post('/withdraw', payController.processWithdraw);
router.post('/qeryTransactionStatus', payController.processQueryTransactionStatus);
router.post('/refund', payController.processRefund);


module.exports = router; 

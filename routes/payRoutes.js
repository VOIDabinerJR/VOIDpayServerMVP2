const express = require('express');
const router = express.Router();
const payController = require('../controllers/payController');

router.get('/:orderid', payController.getPaymentPage);
router.post('/:orderid', payController.processPayment);

module.exports = router;

const Order = require('../models/order');
const Button = require('../models/button');

module.exports.getPaymentPage = async (req, res) => {
    const { orderid } = req.params;

    try {
        const orderResult = await Order.findById(orderid);

        if (orderResult.length > 0) {
            const order = orderResult[0];
            const buttonResult = await Button.findByToken(order.botontoken);

            if (buttonResult.length > 0) {
                const button = buttonResult[0];
                res.render('pay', { order, button });
            } else {
                res.status(404).json({ error: 'Button not found' });
            }
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports.processPayment = async (req, res) => {
    const { orderid } = req.params;
    const { paymentDetails } = req.body;

    try {
        const orderResult = await Order.findById(orderid);

        if (orderResult.length > 0) {
            const order = orderResult[0];

            // Process payment using paymentDetails
            // For simplicity, we'll assume the payment is successful

            const updateResult = await Order.update(orderid, { status: 'paid' });

            if (updateResult.affectedRows === 1) {
                res.json({ message: 'Payment processed successfully' });
            } else {
                res.status(500).json({ error: 'Failed to update order status' });
            }
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

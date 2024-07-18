const Order = require('../models/orderModel');
const Button = require('../models/buttonModel');

module.exports.createOrder = async (req, res) => {
    const { bottontoken, amount, productId, quantity, description } = req.body;

    const order = {
        clientid,
        bottontoken,
        amount,
        status: 'pending'
    };

    const buttonInfo = await Button.findByToken(bottontoken)
    console.log(buttonInfo)

    if (buttonInfo.status != true) {
        return res.json({ err: "botton not valid" })

    };

    try {
        const insertResult = await Order.create(order);

        if (insertResult.affectedRows === 1) {
            return res.status(201).json({ message: 'Order created' });
            //   return res.render('pay', { productId, quantity, description, nomeLoja });
        } else {
            return res.status(500).json({ error: 'Order creation failed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports.updateOrder = async (req, res) => {
    const { orderid, status } = req.body;
    
    const buttonInfo = await Button.findByToken(bottontoken)
    console.log(buttonInfo)

    if (buttonInfo.status != true) {
        return res.json({ err: "botton not valid" })

    };

    try {
        const updateResult = await Order.update(orderid, { status });

        if (updateResult.affectedRows === 1) {
            return res.status(200).json({ message: 'Order updated' });
        } else {
            return res.status(500).json({ error: 'Order update failed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

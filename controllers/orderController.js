const Order = require('../models/orderModel');
const Button = require('../models/buttonModel');


module.exports.createOrder = async (req, res) => {
    const { buttonToken, amount, productId, quantity, description } = req.body;
   
    const totalAmount=100;
    
console.log("a");
    const order = {
        buttonToken,
        productId,
        description,
        quantity,
        totalAmount,
        orderStatus: 'pending'
    };
    console.log(order)
 
    const buttonInfo = await Button.findByToken(buttonToken)
    
   

    if (buttonInfo.status != true) {
        return res.json({ err: "botton not valid" })

    }else{
        console.log(buttonInfo)
    };

    try {
        const [insertResult] = await Order.create(order);
        console.log(insertResult[0])

        if (insertResult.affectedRows === 1) {
            console.log("saved")
            //return res.status(201).json({ message: 'Order created' });
             // return res.render('pay', { productId, quantity, description, totalAmount});
             const url =``
             const maxAge = 3 * 24 * 60 * 60 * 1000;     
             res.cookie('orderid', '13', { httpOnly: true, maxAge });
             return res.redirect(`/sdk/pay`) 
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
        const [updateResult] = await Order.update(orderid, { status });

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

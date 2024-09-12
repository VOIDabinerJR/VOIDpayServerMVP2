const Order = require('../models/orderModel');
const Button = require('../models/buttonModel');
const Notification = require('../models/notificationModel');


module.exports.createOrder = async (req, res) => {
    const { buttonToken, amount, quantity, description } = req.body;
    const data = req.body;
    console.log(data);


    const validateProducts = (products) => {
        let errors = [];

        products.forEach((product, index) => {

            if (!product.name || product.name.trim() === '') {
                errors.push({ index: index, field: 'name', message: 'Nome do produto não pode estar vazio.' });
            }


            if (!Number.isInteger(parseInt(product.quantity)) || product.quantity <= 0) {

                errors.push({ index: index, field: 'quantity', message: 'Quantidade deve ser um número inteiro positivo.' });
            }


            if (isNaN(product.price) || product.price <= 0) {
                console.log(product.price)
                errors.push({ index: index, field: 'price', message: 'Preço deve ser um número positivo.' });
            }
        });


        if (errors.length > 0) {
            return { errors: errors, there: true };
        } else {
            return { message: 'Todos os produtos estão corretamente formatados.', there: false };
        }
    };

    const result = validateProducts(data.orderItems);

    console.log(result.errors)
    if (result.there) {
        return res.json({ status: false, error: result.errors })
    }



    const totalAmount = data.orderItems.reduce((total, item) => {
        return total + (parseFloat(item.price) * parseFloat(item.quantity));
    }, 0);

    const totalItems = data.orderItems.reduce((total, item) => {
        return total + parseInt(item.quantity);
    }, 0);


    console.log(data);





    const buttonInfo = await Button.findByToken(buttonToken)
    const order = {
        buttonToken: data.buttonToken,
        products: totalItems,
        description: 'None desc.',
        totalAmount,
        orderStatus: 'pending',
        userId: buttonInfo.userId
    }; 

    const orderItems = data.orderItems



    if (buttonInfo.status != true) {
        return res.json({ err: "botton not valid" })

    } else {
        console.log(buttonInfo)


        try {
            const [insertResult] = await Order.create(order);

            console.log(insertResult)
            const [insertResulty] = await Order.saveOrderItems(orderItems, insertResult.insertId);
            if (insertResult.affectedRows === 1) {
                console.log("saved")

                const maxAge = 3 * 24 * 60 * 60 * 1000;
                res.cookie('orderid', '13', { httpOnly: true, maxAge });

                //const [insertResultyy] =  await Notification.create(Notification.notifications(0),insertResult.insertId)
                return res.json({ orderId: insertResult.insertId, buttonToken: buttonInfo.buttonToken , status: true})
            } else {
                return res.status(500).json({ error: 'Order creation failed' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    };
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

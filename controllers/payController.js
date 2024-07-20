const User = require('../models/userModel');
const Button = require('../models/buttonModel');
const Order = require('../models/orderModel');
const { createToken, createMobileWalletPayToken, decodeToken } = require('../utils/jwt');

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
    const orderid = req.cookies.orderid

    // { orderid } = req.params;
    const paymentDetails = req.body;



    try {
        const orderResult = await Order.findById(orderid);


        if (orderResult.length > 0) {
            console.log("A")
            const order = orderResult[0];
            async function getPaymentToken(option) {
                switch (option) {
                    case 'mobileWallet':
                        return createMobileWalletPayToken(orderid, paymentDetails);
                    case 'Card':
                        return createCardPayToken(orderid, paymentDetails);
                    case 'Paypal':
                        return createPaypalPayToken(orderid, paymentDetails);
                    case 4:
                        return createMobileWalletPayToken(orderid, paymentDetails);
                    default:
                        return "PAY OPTION INVALID";
                }
            }


            (async () => {

                const token = await getPaymentToken(paymentDetails.paymentMethod);
                console.log(token)
                const aaa = decodeToken(token)
                console.log(aaa)

                const result = await pay(token);




                if (result.status_code == 409 || result.status_code == 401|| result.status_code == 200) {
                    console.log(result.status_code) 

                    const [updateResult] = await Order.update(orderid,{ orderStatus: 'Completed' });
                    
                    console.log(updateResult)

                    if (updateResult.affectedRows === 1) {
                        console.log("sucess");
                       // return res.redirect('https://www.google.com');
                                               
                       return  res.status(200).json({ message: 'Payment processed successfully', error: null ,redirectUrl: 'https://www.google.com'});
                    } else {
                        res.status(500).json({ message: 'Payment processed successfully', error: 'Failed to update order status' });
                    }
                } else {
                    res.status(500).json({ paid: 'true', error: 'Failed to pay' });
 
                }


            })();

        } else { 
            console.log(result)
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
async function pay(token) {
    const url = 'http://127.0.0.1:5000/make_payment';
    const data = {
        token: token
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        //  } 

        const result = await response.json();
        // console.log('Success:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
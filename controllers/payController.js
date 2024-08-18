const User = require('../models/userModel');
const Button = require('../models/buttonModel');
const Order = require('../models/orderModel');
const path = require('path');
const Wallet = require('../models/walletModel');
const { createToken, createMobileWalletToken, decodeToken } = require('../utils/jwt');
const { Console } = require('console');
require('dotenv').config();

module.exports.routTester = async (req, res) => {

    const data = req.body;
    console.log(data);
    res.send("Form submitted");
};



module.exports.getQrCode = async (req, res) => {
    const data = req.body;
    console.log(data);
    const qrcode = "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"
    res.render('qrcode', { qrcode: qrcode })
};

module.exports.getPaymentPage = async (req, res) => {
    const orderid = req.query.orderid;
    const buttonToken = req.query.buttontoken;

    const queryy = 'orderid=' + orderid + '&buttontoken=' + buttonToken;





    try {
        const [orderResult] = await Order.findById(orderid);
        const [orderItem] = await Order.findByIdOrderItems(orderid);


        if (orderResult.length > 0) {
            const order = orderResult[0];


            const orderData = {
                // orderItems:orderItemss,
                orderItems: orderItem,
                subtotal: order.totalAmount,
                ivaTax: 20,
                iva: 0,
                shippingCost: "GRATUITA",
                totalAmount: order.totalAmount
            };

            if (String(order.buttonToken).trim() != String(buttonToken).trim()) {

                return res.json({ error: 'unauthorized' })
            } else {
                return res.render('index', { orderData: orderData, queryy });
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
    const transactionData = {
        transactionId: '1234567890'||a,
        amount: '100.00'||a,
        date: new Date().toLocaleDateString() 
    };

    return res.render( 'paymentConfirmation.ejs',{ transactionData, message: 'Payment processed successfully', error: null, redirectUrl: 'https://www.google.com' });

    console.log(req.url);
    console.log(req.query);
    const str = req.body.queryy;
    //const parts = str.split('&');
    //const orderid = parts[0];
   // const buttonToken = parts[1];
    const paymentDetails = req.body;
    console.log(req.body.queryy)

    try {
        const url = 'http://localhost:3000/paymentResponse'; 
        const dados = {token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjgsImRlc3RpbmF0aW9uIjoid3d3Lmdvb2dsZS5jb20iLCJidXR0b25Ub2tlbiI6IlZPSUQtMDRmY2U4OWYtMDk1Mi00NzM2LThjMzUtYzkzYzBlNTAzODA5IiwiYXBwaWQiOjIsIm5hbWUiOiJ0ZXN0ZSIsImlhdCI6MTcyNDAxMTA5MSwiZXhwIjoxNzI0MjcwMjkxfQ.Y22VBWIDu507jsz8dMgQFm0y9UmsQotMqCa1_FRGNt8'}
        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const resultado = await resposta.json();
        console.log('Dados recebidos:', resultado);
    } catch (erro) {
        console.error('Erro ao enviar dados:', erro);
    }
  

   
    try {
        const [orderResult] = await Order.findById(orderid);
        console.log(orderResult[0])

        if (orderResult.length > 0) {
            if (orderResult[0].buttonToken != buttonToken) {
                res.json({ "error": "unaitorized" })
            }
            const order = orderResult[0];
            paymentDetails.totalAmount = order.totalAmount;



            async function getPaymentToken(option) {
                switch (option) {
                    case 'mobileWallet':
                        return createMobileWalletToken(orderid, paymentDetails);
                    case 'Card':
                        return createCardPayToken(orderid, paymentDetails);
                    case 'Paypal':
                        return createPaypalPayToken(orderid, paymentDetails);
                    case 4:
                        return createMobileWalletToken(orderid, paymentDetails);
                    default:
                        return "PAY OPTION INVALID";
                }
            }

            (async () => {

                const token = await getPaymentToken(paymentDetails.paymentMethod);

                const result = await pay(token);


                if (result.status_code == 409 || result.status_code == 401 || result.status_code == 200) {

                    console.log(result.status_code)

                    const [updateResult] = await Order.update(orderid, { orderStatus: 'Completed' });

                    console.log(updateResult)

                    if (updateResult.affectedRows === 1) {
                        console.log("sucess");
                        try {
                            const { value, walletId } = req.body;
                            const wallet = await Wallet.findById(walletId);
                            if (wallet) {

                                const result = await Wallet.deposit(walletId, destinationAccount, value);

                            } else {
                                res.status(404).json({ message: 'Wallet not found' });
                            }
                        } catch (error) {
                            res.status(500).json({ error: error.message });
                        }
                        // return res.redirect('https://www.google.com');

                        return res.status(200).json({ message: 'Payment processed successfully', error: null, redirectUrl: 'https://www.google.com' });
                    } else {
                        res.status(500).json({ message: 'Payment processed successfully', error: 'Failed to update order status' });
                    }
                } else {
                    res.status(500).json({ paid: 'true', error: 'Failed to pay' });

                }


            })();

        } else {

            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports.processWithdraw = async (req, res) => {
    const { token, accountNumber, method } = req.body


    const paymentDetails = req.body;
    console.log(paymentDetails.paymentMethod)






    try {
        const decoded = decodeToken(token)
        const walletResult = await Wallet.findByUserId(decoded.token);
        const walletId = walletResult.id

        if (walletResult) {


            async function getPaymentToken(option) {
                switch (option) {
                    case 'mobileWallet':
                    case 'M-pesa':
                    case 'E-Mola':
                    case 'M-khesh':
                        return createMobileWalletToken(walletId, paymentDetails);
                    case 'Card':
                    case 'MillenimBim':
                    case 'BCI':
                    case 'EcoBank':
                    case 'StandardBank':
                        return createCardPayToken(walletId, paymentDetails);
                    case 'Paypal':
                        return createPaypalPayToken(walletId, paymentDetails);
                    case 4:
                        return createMobileWalletToken(walletId, paymentDetails);
                    default:
                        return "PAY OPTION INVALID";
                }
            }


            (async () => {
                console.log(paymentDetails.paymentMethod.toString() == 'M-pesa')
                const token = await getPaymentToken(paymentDetails.paymentMethod.toString());

                console.log(token)
                return
                //return  res.status(200).json({ message: 'Payment processed successfully', error: null ,redirectUrl: 'https://www.google.com'});

                const result = await withdraw(token);



                if (result.status_code == 409 || result.status_code == 401 || result.status_code == 200) {
                    console.log(result.status_code)

                    try {
                        const { walletId } = req.params;
                        const { originAccount, value } = req.body;
                        const depositResult = await Wallet.withdraw(accountNumber, 50, walletResult.id, decoded.token);
                        console.log('Deposit result:', depositResult);
                        res.status(200).json({ message: 'Withdraw processed successfully', error: null, redirectUrl: 'https://www.google.com' });
                    } catch (error) {
                        res.status(500).json({ error: error.message });
                    }
                } else {
                    res.status(500).json({ paid: 'true', error: 'Failed to withdraw' });

                }


            })();

        } else {
            console.log(result)
            res.status(404).json({ error: 'Wallet not found' });
        }
    } catch (error) {
        console.error('Error processing withdraw:', error);
        res.status(500).json({ error: 'Server error' });
    }


};


module.exports.processRefund = async (req, res) => {
    const walletId = req.cookies.walletId

    // { orderid } = req.params;
    const paymentDetails = req.body;



    try {
        const walletResult = await Wallet.findById(walletId);


        if (walletResult.length > 0) {
            console.log("A")
            const order = orderResult[0];
            async function getPaymentToken(option) {
                switch (option) {
                    case 'mobileWallet':
                        return createMobileWalletToken(walletId, paymentDetails);
                    case 'Card':
                        return createCardPayToken(walletId, paymentDetails);
                    case 'Paypal':
                        return createPaypalPayToken(walletId, paymentDetails);
                    case 4:
                        return createMobileWalletToken(walletId, paymentDetails);
                    default:
                        return "PAY OPTION INVALID";
                }
            }


            (async () => {
                const token = await getPaymentToken(paymentDetails.paymentMethod);
                //return  res.status(200).json({ message: 'Payment processed successfully', error: null ,redirectUrl: 'https://www.google.com'});

                const result = await refund(token);

                if (result.status_code == 409 || result.status_code == 401 || result.status_code == 200) {
                    console.log(result.status_code)
                    try {
                        const { walletId } = req.params;
                        const { originAccount, value } = req.body;
                        const result = await Wallet.refund(walletId, originAccount, value);
                        res.status(200).json({ message: 'Refund processed successfully', error: null, redirectUrl: 'https://www.google.com' });
                    } catch (error) {
                        res.status(500).json({ error: error.message });
                    }
                } else {
                    res.status(500).json({ paid: 'true', error: 'Failed to withdraw' });

                }


            })();

        } else {
            console.log(result)
            res.status(404).json({ error: 'Wallet not found' });
        }
    } catch (error) {
        console.error('Error processing withdraw:', error);
        res.status(500).json({ error: 'Server error' });
    }
};




module.exports.processQueryTransactionStatus = async (req, res) => {
    const walletId = req.cookies.walletId

    // { orderid } = req.params;
    const paymentDetails = req.body;



    try {
        const walletResult = await Wallet.findById(walletId);


        if (walletResult.length > 0) {
            console.log("A")
            const order = orderResult[0];
            async function getPaymentToken(option) {
                switch (option) {
                    case 'mobileWallet':
                        return createMobileWalletToken(walletId, paymentDetails);
                    case 'Card':
                        return createCardPayToken(walletId, paymentDetails);
                    case 'Paypal':
                        return createPaypalPayToken(walletId, paymentDetails);
                    case 4:
                        return createMobileWalletToken(walletId, paymentDetails);
                    default:
                        return "PAY OPTION INVALID";
                }
            }


            (async () => {
                const token = await getPaymentToken(paymentDetails.paymentMethod);
                //return  res.status(200).json({ message: 'Payment processed successfully', error: null ,redirectUrl: 'https://www.google.com'});

                const result = await queryTransactionStatus(token);

                if (result.status_code == 409 || result.status_code == 401 || result.status_code == 200) {
                    console.log(result.status_code)
                    //como vao ser devolvido
                    res.status(200).json({ status: 'Payment processed successfully', error: null, redirectUrl: 'https://www.google.com' });
                } else {
                    res.status(500).json({ paid: 'true', error: 'Failed to queryTransactionStatus' });

                }


            })();

        } else {
            console.log(result)
            res.status(404).json({ error: 'Wallet not found' });
        }
    } catch (error) {
        console.error('Error processing queryTransactionStatus:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports.decodeToken = async (req, res) => {
    const data = req.body;
    const info = decodeToken(data.token)
    res.json({ info })

};



async function pay(token) {
    const url = 'https://my-flask-app-1-4uel.onrender.com/make_payment';
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

async function withdraw(token) {
    const url = `${process.env.AUTHORIZATION_URL}/make_payment`;
    const data = {
        token: token
    };
    console.log(data)

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

async function refund(token) {
    const url = `${AUTHORIZATION_URL}/make_payment`;
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
async function queryTransactionStatus(token) {
    const url = 'http://127.0.0.1:5000/query_transaction_status';
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

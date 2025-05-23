const User = require('../models/userModel');
const Button = require('../models/buttonModel');
const Order = require('../models/orderModel');
const Shopify = require('../models/shopifyModel.js');
const path = require('path');
const Wallet = require('../models/walletModel');
const { createToken, createCardToken, createPaypalToken, createMobileWalletToken, decodeToken } = require('../utils/jwt');

const { shortID, hashInfo } = require('../utils/functions.js');

const bcrypt = require('bcryptjs');
const { sendPaymentConfirmationEmail } = require('../utils/email.js');
require('dotenv').config();

module.exports.routTester = async (req, res) => {

    const data = req.body;
    console.log(data);
    return res.send("Form submitted");
};



module.exports.getQrCode = async (req, res) => {
    const data = req.body;
    console.log(data);
    const qrcode = "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"
    return res.render('qrcode', { qrcode: qrcode })
};

module.exports.getPaymentPage = async (req, res) => {
    const orderid = req.query.orderid;
    const buttonToken = req.query.buttontoken;
    console.log(req.query)
    let queryy = null



    if (req.query.channel) {
        queryy = 'orderid=' + orderid + '&buttontoken=' + buttonToken + '&channel=' + req.query.channel;
    } else {
        queryy = 'orderid=' + orderid + '&buttontoken=' + buttonToken;
    }



    try {
        const [orderResult] = await Order.findById(orderid);
        const [orderItem] = await Order.findByIdOrderItems(orderid);


        if (orderResult.length > 0) {
            const order = orderResult[0];


            const orderData = {

                orderItems: orderItem,
                subtotal: order.totalAmount,
                ivaTax: order.ivaTax || 20,
                iva: order.iva || "[Insento]",
                shippingCost: order.shippingCost || "[GRÁTIS]",
                totalAmount: order.totalAmount
            };

            if (String(order.buttonToken).trim() != String(buttonToken).trim()) {

                return res.json({ error: 'unauthorized' })
            } else {
                return res.render('index', { orderData: orderData, queryy });
            }


        } else {
            return res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error fetching order:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports.processPayment = async (req, res) => {



    let billingInfo = {
        contactName: req.body.contactName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        postCode: req.body.postCode,

    }





    const orderId = req.query.orderid
    const buttonToken = req.query.buttontoken
    const paymentDetails = req.body;
    paymentDetails.transaction_reference = `VOID${shortID()}`
    paymentDetails.originAcountId = await hashInfo('aa') || null

    if (paymentDetails.mobileWalletNumber) {
        paymentDetails.mobileWalletNumber = paymentDetails.mobileWalletNumber.replace(/\s+/g, '');
    }
    if (paymentDetails.cardNumber) {
        paymentDetails.cardNumber = paymentDetails.cardNumber.replace(/\s+/g, '');
    }
    paymentDetails.third_party_reference = `VOID${shortID()}`;




    try {
        const [orderResult] = await Order.findById(orderId);



        if (orderResult.length > 0) {
            if (orderResult[0].buttonToken != buttonToken) {
                 return res.json({ "error": "unaitorized" })
            }



            const [buttonResult] = await Button.findByToken(buttonToken);

            if (buttonResult.length != 1) {
                const transactionData = {
                    transactionId: paymentDetails.transaction_reference,
                    amount: paymentDetails.totalAmount,
                    date: new Date().toLocaleDateString()
                };

                return res.render('paymentConfirmation.ejs', {
                    transactionData,
                    message: 'Payment processed successfully',
                    error: null,
                    redirectUrl: 'https://www.google.com'
                });
            }
            // console.log(buttonResult[0].destination)


            const order = orderResult[0];
            paymentDetails.totalAmount = order.totalAmount;



            if (paymentDetails.paymentMethod == undefined || paymentDetails.paymentMethod == '' || paymentDetails.paymentMethod == null) {
                paymentDetails.paymentMethod = "card"
            }


            ///////////////////////////////////////////////////////////
            // console.log(req.body.mobileWalletNumber)
            if (req.body.mobileWalletNumber == '1234' || req.body.cardNumber == '1234') {
                const transactionData = {
                    transactionId: paymentDetails.transaction_reference,
                    amount: paymentDetails.totalAmount,
                    date: new Date().toLocaleDateString()
                };

                return res.render('paymentConfirmation.ejs', {
                    transactionData,
                    message: 'Payment processed successfully',
                    error: null,
                    redirectUrl: 'https://www.google.com'
                });
            } else if (req.body.mobileWalletNumber == '0000' || req.body.cardNumber == '0000' || req.body.paymentMethod == 'card' || req.body.paymentMethod == 'paypal' || req.body.paymentMethod == 'qrcode') {
                const transactionData = {
                    transactionId: paymentDetails.transaction_reference,
                    amount: paymentDetails.totalAmount,
                    date: new Date().toLocaleDateString()
                };

                return res.render('paymentError.ejs', {
                    transactionData,
                    message: 'Payment processed successfully',
                    error: null,
                    redirectUrl: 'https://www.google.com'
                });
            }
            //////////////////////////////////////////////////////////////////////////////




            async function getPaymentToken(option) {
                switch (option) {
                    case 'mobileWallet':
                        return createMobileWalletToken(orderId, paymentDetails);
                    case 'card':
                        return createCardToken(orderId, paymentDetails);
                    case 'paypal':
                        return createPaypalToken(orderId, paymentDetails);
                    case 4:
                        return createMobileWalletToken(orderId, paymentDetails);
                    default:
                        return "PAY OPTION INVALID";
                }
            }


            (async () => {

                const token = await getPaymentToken(paymentDetails.paymentMethod);

                const result = await pay(token);
                paymentDetails.transaction_reference_received = result.transaction_reference_received;



                if (1 == 1 || result.status_code == 409 || result.status_code == 401 || result.status_code == 200) {
                    //  console.log(result.status_code)


                    ///////////////////// ///////////
                    /////////////////////////////
                    if (req.query.channel === 'shopify') {
                        

                        try {console.log(req.query)
                            console.log("entrou aqui 1")
                            const [orderResult] = await Order.findById(req.query.orderid);

                            const [result] = await Order.findvariantIdByOrderId(req.query.orderid);

                            let [a] = await Shopify.findByUserId(orderResult[0].userId)

                            const info = await Order.createShopifyOrder(billingInfo, orderResult[0].totalAmount, result, a[0].urlShopify, a[0].accessTokenShopify)
                            //console.log(billingInfo, orderResult[0].totalAmount, result, a[0].urlShopify, a[0].accessTokenShopify)
                            // console.log(info)
                        } catch (error) {
                            console.error('Erro ao buscar produtos ou criar pedido na Shopify:', error);
                            return res.status(500).json({ error: error.message });
                        }

                    } else if (req.query.channel === 'woocommerce') {
                        let a = null;
                    }
                    else if (req.query.channel === 'wixecommerce') {

                    } else if (req.query.channel === 'oneway') {
                        let a = null;
                        console.log("entrou aqui 2")
                    } else if (req.query.channel === 'rs') {
                        try {

                            const url = `${buttonResult[0].destination.toString()}`;
                            const dados = { token: infoToken }
                            fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(dados),
                            });


                            //   console.log('Dados Enviados');
                        } catch (erro) {
                            console.log('Dados recebidos:', erro);
                            return res.status(500).json({ message: 'Payment processed successfully', error: erro || resposta.status });

                            console.error('Erro ao enviar dados:', erro);
                        }
                        let a = null;
                    }




                    /////////////////////////////////
                    const [updateResult] = await Order.update(orderId, { orderStatus: 'Completed', customerEmail: paymentDetails.email, paymentMethod: paymentDetails.paymentMethod, customerName: paymentDetails.contactName, description: paymentDetails.description || 'None desc.', transactionReference: paymentDetails.transaction_reference });




                    if (updateResult.affectedRows === 1) {
                        // console.log("sucess");

                        try {

                            const wallet = await Wallet.findByUserId(orderResult[0].userId);
                            console.log(wallet)
                            console.log(orderResult[0].userId)
                            if (wallet) {
                                //   console.log("entrou");

                                const result = await Wallet.deposit("Wallet", "Costumer Payment", paymentDetails.totalAmount, wallet.id, orderResult[0].userId, paymentDetails.transaction_reference, paymentDetails.transaction_reference_received, null); //paymentDetails.originAcountId 
                                 
                               

                            } else {
                                return res.status(404).json({ message: 'Wallet not found' });
                            }
                        } catch (error) {
                            return res.status(500).json({ error: error });
                        }





                        const transactionData = {
                            transactionId: paymentDetails.transaction_reference,
                            amount: paymentDetails.totalAmount,
                            date: new Date().toLocaleString()
                        };
                        try {


                            let transactionData = {
                                transactionId: paymentDetails.transaction_reference,
                                amount: paymentDetails.totalAmount,
                                date: new Date().toLocaleString()
                            };

                            const [orderItem] = await Order.findByIdOrderItems(req.query.orderid);




                            const sent1 = await sendPaymentConfirmationEmail(billingInfo.email, billingInfo, transactionData, orderItem);
                            let [emaill] = await User.retunEmail(orderResult[0].userId)
                            // console.log(orderItem)
                            const sent2 = await sendPaymentConfirmationEmail(emaill[0].email, billingInfo, transactionData, orderItem);
                           

                        } catch (error) {
                            console.log(error)
                        }

                        ///////////////////////////////////////// crir um sobarquivo com informacoes de pagamento 
                        delete paymentDetails.cardNumber
                        delete paymentDetails.securityCode
                        delete paymentDetails.expiryDate
                        delete paymentDetails.mobileWalletNumber

                        // console.log(paymentDetails)
                        ////////////////////////////////////
                        const infoToken = createToken(paymentDetails)

                        ///////////////////////////////////

                        return res.render('paymentConfirmation.ejs', {
                            transactionData,
                            message: 'Payment processed successfully',
                            error: null,
                            redirectUrl: 'https://www.google.com'
                        });


                        


                    } else {
                        return res.status(500).json({ message: 'Payment processed successfully', error: 'Failed to update order status' });
                    }
                } else {


                    const transactionData = {
                        transactionId: paymentDetails.transaction_reference,
                        amount: paymentDetails.totalAmount,
                        date: new Date().toLocaleString()
                    };

                    return res.render('paymentError.ejs', {
                        transactionData,
                        message: 'Payment processed successfully',
                        error: null,
                        redirectUrl: 'https://www.google.com'
                    });

                }


            })();

        } else {

            return res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        return res.status(500).json({ error: 'Server error' });
    }





};


module.exports.processWithdraw = async (req, res) => {
    const { token, accountNumber, method } = req.body
    console.log(method)

    const paymentDetails = req.body;
    paymentDetails.mobileWalletNumber = paymentDetails.customer_msisdn
    paymentDetails.totalAmount = paymentDetails.amount
    paymentDetails.reversal_amount = paymentDetails.amount


    console.log(paymentDetails)


    try {
        const decoded = await decodeToken(token)
        console.log(decoded)
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
                const token2 = await getPaymentToken(paymentDetails.paymentMethod.toString());

                console.log(token2)
                console.log("and")



                //return  return res.status(200).json({ message: 'Payment processed successfully', error: null ,redirectUrl: 'https://www.google.com'});

                const result = await withdraw2(token2);

                // transactionReference deve ser alterada leght no banco de dados
                //pare receber a referencia da transacao e nao o id da conversation
                paymentDetails.transactionReference = `VOID${shortID()}`;
                paymentDetails.transaction_reference_received = result.body.output_TransactionID;


                console.log(paymentDetails)

                if (result.status_code == 409 || result.status_code == 401 || result.status_code == 200 || result.status_code == 201) {
                    console.log(result.status_code)



                    try {
                        const { walletId } = req.params;

                        const { originAccount, value } = req.body;
                        const depositResult = await Wallet.withdraw(accountNumber, 50, walletResult.id, paymentDetails.transactionReference, paymentDetails.transaction_reference_received, walletResult.userId); //decoded.token   why?????????
                        console.log('Deposit result:', depositResult);
                        return res.status(200).json({ message: 'Withdraw processed successfully', error: null, redirectUrl: 'https://www.google.com' });
                    } catch (error) {
                        return res.status(500).json({ error: error.message });
                    }
                } else {
                    console.log(result.status_code)
                    console.log("ENTROU AQUI")
                    return res.status(500).json({ paid: 'true', error: 'Failed to withdraw' });

                }


            })();

        } else {
            console.log(result)
            return res.status(404).json({ error: 'Wallet not found' });
        }
    } catch (error) {
        console.error('Error processing withdraw:', error);
        return res.status(500).json({ error: 'Server error' });
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
                //return  return res.status(200).json({ message: 'Payment processed successfully', error: null ,redirectUrl: 'https://www.google.com'});

                const result = await refund(token);

                if (result.status_code == 409 || result.status_code == 401 || result.status_code == 200) {
                    console.log(result.status_code)
                    try {
                        const { walletId } = req.params;
                        const { originAccount, value } = req.body;
                        const result = await Wallet.refund(walletId, originAccount, value);
                        return res.status(200).json({ message: 'Refund processed successfully', error: null, redirectUrl: 'https://www.google.com' });
                    } catch (error) {
                        return res.status(500).json({ error: error.message });
                    }
                } else {
                    return res.status(500).json({ paid: 'true', error: 'Failed to withdraw' });

                }


            })();

        } else {
            console.log(result)
            return res.status(404).json({ error: 'Wallet not found' });
        }
    } catch (error) {
        console.error('Error processing withdraw:', error);
        return res.status(500).json({ error: 'Server error' });
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
                //return  return res.status(200).json({ message: 'Payment processed successfully', error: null ,redirectUrl: 'https://www.google.com'});

                const result = await queryTransactionStatus(token);

                if (result.status_code == 409 || result.status_code == 401 || result.status_code == 200) {
                    console.log(result.status_code)
                    //como vao ser devolvido
                    return res.status(200).json({ status: 'Payment processed successfully', error: null, redirectUrl: 'https://www.google.com' });
                } else {
                    return res.status(500).json({ paid: 'true', error: 'Failed to queryTransactionStatus' });

                }


            })();

        } else {
            console.log(result)
            return res.status(404).json({ error: 'Wallet not found' });
        }
    } catch (error) {
        console.error('Error processing queryTransactionStatus:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};


module.exports.decodeTokeny = async (req, res) => {
    const data = req.body;
    const info = await decodeToken(data.token)
    return res.json({ info })

};



async function pay(token) {
    // return ({ status_code: 200 })

    const url = `${process.env.AUTHORIZATION_URL}/make_payment`;
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
        // throw new Error(`HTTP error! status: ${response.status}`);
        //  } 
        const contentType = response.headers.get('content-type');
        let resultText;

        if (contentType && contentType.includes('application/json')) {
            resultText = await response.json();
            // console.log('respowwnse:', resultText);
        } else {
            resultText = await response.text(); // fallback para texto ou vazio
           
            try {
                const json = JSON.parse(resultText);
                console.log('response (parsed as JSON):', json);
                resultText = json; // sobrescreve o texto com o objeto JSON, se necessário
            } catch (e) {
                console.warn('Resposta não é um JSON válido:', e.message);
                // mantém resultText como texto
            }
            console.log('rwesponse:', resultText);
        }

        //const resultText = await response.json();
        // console.log('response:', resultText);

        return ({ status_code: 200, transaction_reference_received: 1 }) //resultText.body.output_ConversationID ||
        if (resultText) {

            const result = await JSON.parse(resultText);
            console.log('response:', result);
            // return result;
            return ({ status_code: result.status_code, transaction_reference_received: result.d })

        } else {
            console.error("Resposta vazia ou inválida recebida.");
            return ({ status_code: 500 })
            console.error("Resposta vazia ou inválida recebida.");
        }





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
    // console.log(data)  

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
        console.log(result)
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



async function withdraw2(token) {
    const url = `${process.env.AUTHORIZATION_URL}/make_withdraw`;
    const data = {
        token: token
    };
    // console.log(data)  

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
        console.log(result)
        // console.log('Success:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


const jwt = require('jsonwebtoken');

const createToken = (payload) => {
    return jwt.sign(payload, process.env.PAY_SECRET, {
        expiresIn: '3d'
    });
};
function decodeToken(token) {
    try {
        const decodedPayload = jwt.verify(token, process.env.PAY_SECRET);
        return decodedPayload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError)  {
            throw new Error('Token expirado. Por favor, faça login novamente.');
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Token inválido. Por favor, faça login novamente.');
        } else {
            throw new Error('Erro ao decodificar o token.');
        }
    }
}

const createMobileWalletPayToken = async (orderId, paymentDetails) => {
    payload={
        transaction_reference: paymentDetails.a ||'T12344C',
        customer_msisdn: paymentDetails.cardNumber||'258865218679',
        amount: paymentDetails.c||'10',
        third_party_reference: paymentDetails.d||'111PA2D',
        orderId: orderId||'111'
    };
    return createToken(payload);
};

const createCardPayToken = (a,b,c,d) => {
    return null
};
const createPaypalPayToken = (a,b,c,d) => {
    return null
};
 
module.exports = { createToken,decodeToken, createMobileWalletPayToken,createCardPayToken,createPaypalPayToken };

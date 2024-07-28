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
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token expirado. Por favor, faça login novamente.');
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Token inválido. Por favor, faça login novamente.');
        } else {
            throw new Error('Erro ao decodificar o token.');
        }
    }
}

const createLoginToken = async ( token) => {
    payload = {
        token: token

    };
    
    return createToken(payload);
};

const createMobileWalletToken = async (orderId, paymentDetails) => {
    payload = {
        transaction_reference: paymentDetails.transaction_reference || 'T121344C',
        customer_msisdn: paymentDetails.mobileWallet || '258865218679',
        amount: paymentDetails.amount || '10',
        third_party_reference: paymentDetails.third_party_reference || '1131PA2D',
        orderId: orderId || '111',
        query_reference: paymentDetails.query_reference || null,
        security_credential: paymentDetails.security_credential || null,
        initiator_identifier: paymentDetails.initiator_identifier || null,
        reversal_amount: paymentDetails.reversal_amount || null,
        transaction_id: paymentDetails.transaction_id || null



    };
    return createToken(payload);
};

const createCardPayToken = (a, b, c, d) => {
    return null
};
const createPaypalPayToken = (a, b, c, d) => {
    return null
};

module.exports = { createToken, decodeToken, createMobileWalletToken, createCardPayToken, createPaypalPayToken, createLoginToken };

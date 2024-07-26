const jwt = require('jsonwebtoken');

const createToken = (payload) => {
    return jwt.sign(payload, 'oi', {
        expiresIn: '3d'
    });
};

const createMobileWalletToken = async (orderId, paymentDetails) => {
    const payload = {
        transaction_reference: paymentDetails.transaction_reference || 'T123s44C',
        customer_msisdn: paymentDetails.customer_msisdn || '258865218679',
        amount: paymentDetails.amount || '10',
        third_party_reference: paymentDetails.third_party_reference || '11d1PA2D',
        orderId: orderId || '111',
        query_reference: paymentDetails.query_reference || null,
        security_credential: paymentDetails.security_credential || null,
        initiator_identifier: paymentDetails.initiator_identifier || null,
        reversal_amount: paymentDetails.reversal_amount || null,
        transaction_id: paymentDetails.transaction_id || null
    };
    return createToken(payload);
};

const run = async () => {
    const token = await createMobileWalletToken('oi', {});
    console.log(token);
};

run();
function decodeToken(token) {
    try {
        const decodedPayload = jwt.verify(token, 'oi');
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

const a ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjIwMzY5MzYsImV4cCI6MTcyMjI5NjEzNn0.ULPempPgwqoUF49hL2rNqHPJOHz6k_hBBHhf1b7fc2k'
const b = decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cmFuc2FjdGlvbl9yZWZlcmVuY2UiOiJUMTIzczQ0QyIsImN1c3RvbWVyX21zaXNkbiI6IjI1ODg2NTIxODY3OSIsImFtb3VudCI6IjEwIiwidGhpcmRfcGFydHlfcmVmZXJlbmNlIjoiMTFkMVBBMkQiLCJvcmRlcklkIjoib2kiLCJxdWVyeV9yZWZlcmVuY2UiOm51bGwsInNlY3VyaXR5X2NyZWRlbnRpYWwiOm51bGwsImluaXRpYXRvcl9pZGVudGlmaWVyIjpudWxsLCJyZXZlcnNhbF9hbW91bnQiOm51bGwsInRyYW5zYWN0aW9uX2lkIjpudWxsLCJpYXQiOjE3MjIwMzcwNTIsImV4cCI6MTcyMjI5NjI1Mn0.HfCqFBxxZjGq9eS6icDcTgZkA6HrDbleccU2BixYZmI');
console.log(b)

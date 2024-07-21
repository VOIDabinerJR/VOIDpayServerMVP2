const jwt = require('jsonwebtoken');

const createToken = (payload) => {
    return jwt.sign(payload, 'oi', {
        expiresIn: '3d'
    });
};

const createMobileWalletToken = async (orderId, paymentDetails) => {
    const payload = {
        transaction_reference: paymentDetails.transaction_reference || 'T12344C',
        customer_msisdn: paymentDetails.customer_msisdn || '258865218679',
        amount: paymentDetails.amount || '10',
        third_party_reference: paymentDetails.third_party_reference || '111PA2D',
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

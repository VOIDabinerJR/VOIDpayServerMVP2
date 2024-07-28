const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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




async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

// Exemplo de uso da função
(async () => {
    const password = 'mySecurePassword';
    const hashed = await hashPassword(password);
    console.log('Hashed Password:', hashed);
})();
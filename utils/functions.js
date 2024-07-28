
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');



function populateUpdatedFields(source, target) {
    for (const key in source) {
        if (source.hasOwnProperty(key) && source[key] !== '') {
            target[key] = source[key];
        }
    }
}


function generateClientId() {
    return uuidv4(); // Gera um UUID único
}

function generateClientSecret() {
    return crypto.randomBytes(32).toString('hex'); // Gera uma string hexadecimal aleatória
}

module.exports = { populateUpdatedFields,generateClientId, generateClientSecret };
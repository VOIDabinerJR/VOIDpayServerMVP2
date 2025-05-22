
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');



function populateUpdatedFields(source, target) {
    for (const key in source) {
        if (source.hasOwnProperty(key) && source[key] !== '') {
            target[key] = source[key];
        }
    }
}
function shortID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
function shortID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
function shortID2(id) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = id+'VOID';
    for (let i = 0; i < 40; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}



function generateClientId() {
    return uuidv4();
}


function generateClientSecret() {
    return crypto.randomBytes(32).toString('hex'); // Gera uma string hexadecimal aleatória
}

function generateTransictionReference() {
    return uuidv4(); 
}
async function hashInfo(info) {
    try {
        const hashedInfo = await bcrypt.hash(info, 8);
        return hashedInfo;
    } catch (error) {
       
        return ('Error hashing info');
    }
}

module.exports = { populateUpdatedFields,generateClientId, generateClientSecret, shortID,hashInfo,shortID2 }; 
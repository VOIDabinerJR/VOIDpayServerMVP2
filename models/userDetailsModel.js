const db = require('../config/db');

const UserDetails = {
    async findByDocumentId(documentId) {
        const result = await db.query('SELECT * FROM userDetails WHERE documentId = ?', [documentId]);
        return result;
    },
    async findById(id) { 
        const result = await db.query('SELECT * FROM userDetails WHERE id = ?', [id]);
        return result;
    },
    async findByUserId(id) { 
        const result = await db.query('SELECT * FROM userDetails WHERE userid = ?', [id]);
        return result;
    },
    async create(userDetails) {
        const result = await db.query('INSERT INTO userDetails SET ?', userDetails);
        return result;
    },
    async update(userDetails,id) {
        const result = await db.query('UPDATE userDetails SET ? WHERE id = ?', [userDetails, id]);
        return result;
    }
};

module.exports = UserDetails;

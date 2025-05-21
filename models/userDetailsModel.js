const db = require('../config/db');

const UserDetails = {
    async findByDocumentId(documentId) {
        const result = await db.query('SELECT * FROM userdetails WHERE documentId = ?', [documentId]);
        return result;
    },
    async findById(id) { 
        const result = await db.query('SELECT * FROM userdetails WHERE id = ?', [id]);
        return result;
    },
    async findByUserId(id) { 
        const result = await db.query('SELECT * FROM userdetails WHERE userid = ?', [id]);
        return result;
    },
    async create(userDetails) {
        const result = await db.query('INSERT INTO userdetails SET ?', userDetails);
        return result;
    },
    async update(userDetails,id) {
        const result = await db.query('UPDATE userdetails SET ? WHERE id = ?', [userDetails, id]);
        return result;
    }
};

module.exports = UserDetails;

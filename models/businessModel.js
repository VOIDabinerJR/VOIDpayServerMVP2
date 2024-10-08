const db = require('../config/db');

const BusinessDetails = {
    async findByDocumentId(documentId) {
        const result = await db.query('SELECT * FROM businessDetails WHERE legaldocument = ?', [documentId]);
        return result;
    },
    async findById(id) { 
        const result = await db.query('SELECT * FROM businessDetails WHERE id = ?', [id]);
        return result;
    },
    async findByUserId(id) { 
        const result = await db.query('SELECT * FROM businessDetails WHERE userid = ?', [id]);
        return result;
    },
    async create(businessDetails) {
        const result = await db.query('INSERT INTO businessDetails SET ?', businessDetails);
        return result;
    },
    async update(businessDetails,id) {
        const result = await db.query('UPDATE businessDetails SET ? WHERE id = ?', [businessDetails, id]);
        return result;
    }
};

module.exports = BusinessDetails;

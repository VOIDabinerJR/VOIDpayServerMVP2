const db = require('../config/db');

const BusinessDetails = {
    async findByDocumentId(documentId) {
        const result = await db.query('SELECT * FROM BusinessDetails WHERE legaldocument = ?', [documentId]);
        return result;
    },
    async findById(id) { 
        const result = await db.query('SELECT * FROM BusinessDetails WHERE id = ?', [id]);
        return result;
    },
    async create(businessDetails) {
        const result = await db.query('INSERT INTO BusinessDetails SET ?', businessDetails);
        return result;
    },
    async update(businessDetails,id) {
        const result = await db.query('UPDATE BusinessDetails SET ? WHERE id = ?', [businessDetails, id]);
        return result;
    }
};

module.exports = BusinessDetails;

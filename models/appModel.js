const db = require('../config/db');

const BusinessDetails = {
    async findByDocumentId(documentId) {
        const result = await db.query('SELECT * FROM app WHERE legaldocument = ?', [documentId]);
        return result;
    },
    async findById(id) { 
        const result = await db.query('SELECT * FROM app WHERE id = ?', [id]);
        return result;
    },
    async findByClientId(id) { 
        const result = await db.query('SELECT * FROM app WHERE clientid = ?', [id]);
        
        return result;
    },
    async create(app) {
        const result = await db.query('INSERT INTO app SET ?', app);
        return result;
    },
    async update(app,id) {
        const result = await db.query('UPDATE app SET ? WHERE id = ?', [app, id]);
        return result;
    }
};

module.exports = BusinessDetails;

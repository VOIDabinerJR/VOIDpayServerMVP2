const db = require('../config/db');

const Button = {
    async findByToken(token) {
        const result = await db.query('SELECT * FROM button WHERE buttonToken = ?', token);
        return result;
    },
    async create(button) {
        const result = await db.query('INSERT INTO button SET ?', button);
        return result;
    }
};

module.exports = Button;

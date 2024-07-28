const db = require('../config/db');

const Button = {
    async findByToken(token) {
        const [result] = await db.query('SELECT * FROM button WHERE botontoken = ?', [token]);
        return result[0];
    },
    async create(button) {
        const result = await db.query('INSERT INTO button SET ?', button);
        return result;
    }
};

module.exports = Button;

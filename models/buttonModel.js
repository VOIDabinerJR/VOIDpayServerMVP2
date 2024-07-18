const db = require('../config/db');

const Button = {
    async findByToken(token) {
        const [result] = await db.query('SELECT * FROM botoes WHERE botontoken = ?', [token]);
        return result;
    },
    async create(button) {
        const [result] = await db.query('INSERT INTO botoes SET ?', button);
        return result;
    }
};

module.exports = Button;

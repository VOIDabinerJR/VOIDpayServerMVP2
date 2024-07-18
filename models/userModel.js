const db = require('../config/db');

const User = {
    async findByEmail(email) {
        const [result] = await db.query('SELECT * FROM USUARIOS WHERE email = ?', [email]);
        return result;
    },
    async findById(id) {
        const [result] = await db.query('SELECT * FROM USUARIOS WHERE id = ?', [id]);
        return result;
    },
    async create(user) {
        const [result] = await db.query('INSERT INTO USUARIOS SET ?', user);
        return result;
    }
};

module.exports = User;

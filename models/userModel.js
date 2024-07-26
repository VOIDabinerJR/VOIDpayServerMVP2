const db = require('../config/db');

const User = {
    async findByEmail(email) {
        const result = await db.query('SELECT * FROM user WHERE email = ?', [email]);
        return result;
    },
    async findById(id) { 
        const result = await db.query('SELECT * FROM user WHERE id = ?', [id]);
        return result;
    },
    async create(user) {
        const result = await db.query('INSERT INTO user SET ?', user);
        return result;
    },
    async update(user,id) {
        const result = await db.query('UPDATE user SET ? WHERE id = ?', [user, id]);
        return result;
    }
};

module.exports = User;

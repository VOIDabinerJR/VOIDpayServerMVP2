const db = require('../config/db');

const User = {
    async findByEmail(email) {
        const result = await db.query('SELECT * FROM user WHERE email = ? AND userStatus = true', [email]);
        return result;
    },
    async retunEmail(id) {
        const result = await db.query('SELECT email FROM user WHERE id = ? AND userStatus = true', [id]);
        return result;
    },
    async findById(id) { 
        const result = await db.query('SELECT * FROM user WHERE id = ? AND userStatus = true', [id]);
        return result;
    },
    async create(user) {
        const result = await db.query('INSERT INTO user SET ?', user);
        return result;
    },
    async update(user,id) {
        const result = await db.query('UPDATE user SET ? WHERE id = ?', [user, id]);
        return result;
    },
    async activateUser(id) {
        const result = await db.query('UPDATE user SET userStatus = true WHERE id = ?', [id]);
        return result;
    },
    async deactivateUser(id) {
        const result = await db.query('UPDATE user SET userStatus = false WHERE id = ?', [id]);
        return result;
    }
};

module.exports = User;

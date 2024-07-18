const db = require('../config/db');

const Order = {
    async create(order) {
        const [result] = await db.query('INSERT INTO Orders SET ?', order);
        return result;
    },
    async update(id, order) {
        const [result] = await db.query('UPDATE Orders SET ? WHERE id = ?', [order, id]);
        return result;
    },
    async findById(id) {
        const [result] = await db.query('SELECT * FROM Orders WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Order;

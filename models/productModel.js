const db = require('../config/db');

const Product = {
    async findById(id) {
        const result = await db.query('SELECT * FROM product WHERE id = ?', [id]);
        return result;
    },

    async findByOrderId(orderId) {
        const result = await db.query('SELECT * FROM product WHERE orderId = ?', [orderId]);
        return result;
    },

    async findByUserId(userId) {
        const result = await db.query('SELECT * FROM product WHERE userId = ?', [userId]);
        return result;
    },

    async create(product) {
        const result = await db.query('INSERT INTO product SET ?', product);
        return result;
    },

    async update(product, id) {
        const result = await db.query('UPDATE product SET ? WHERE id = ?', [product, id]);
        return result;
    },

    async delete(id) {
        const result = await db.query('DELETE FROM product WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Product;

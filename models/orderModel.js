const db = require('../config/db');

const Order = {
    async create(order) {
        const result = await db.query('INSERT INTO Orders SET ?', order);
        return result;
    },
    async update(id, order) {
        const result = await db.query('UPDATE Orders SET ? WHERE id = ?', [order, id]);
        return result;
    },
    async updateStatus(id, status) {
        const [result] = await db.query('UPDATE Orders SET orderStatus = ? WHERE id = ?', [status, id]);
        return result;
    },
    async findById(id) {
        const result = await db.query('SELECT * FROM Orders WHERE id = ?', [id]);
        
        return result;
    },
    async findByIdOrderItems(id) {
        const result = await db.query('SELECT * FROM orderItems WHERE orderId = ?', [id]);
        
        return result;
    }, async saveOrderItems(items,orderId) {
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error('Você deve fornecer um array de itens para inserção.');
        }

      
        const result = await db.query('INSERT INTO orderItems (name, price, quantity, productId, img, imgAlt, orderId) VALUES ?', [items.map(item => [item.name, item.price, item.quantity, item.productId, item.img, item.imgAlt,orderId])]);

        return result;
    },  async deleteOrderItems(itemIds) {
        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            throw new Error('Você deve fornecer um array de IDs de itens para exclusão.');
        }

       
        const ids = itemIds.join(',');

        const result = await db.query('DELETE FROM orderItems WHERE itemId IN (?)', [itemIds]);

        return result;
    }
};

module.exports = Order;

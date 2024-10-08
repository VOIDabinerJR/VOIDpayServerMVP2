const db = require('../config/db');

const Order = {
    async create(order) {
        const result = await db.query('INSERT INTO orders SET ?', order);
        return result;
    },
    async update(id, order) {
        const result = await db.query('UPDATE orders SET ? WHERE id = ?', [order, id]);
        return result;
    },
    async updateStatus(id, status) {
        const [result] = await db.query('UPDATE orders SET orderStatus = ? WHERE id = ?', [status, id]);
        return result;
    },
    async findById(id) {
        const result = await db.query('SELECT * FROM orders WHERE id = ?', [id]);

        return result;
    },
    async findByIdOrderItems(id) {
        const result = await db.query('SELECT * FROM orderItems WHERE orderId = ?', [id]);

        return result;
    }, async saveOrderItems(items, orderId) {
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error('Você deve fornecer um array de itens para inserção.');
        }


        const result = await db.query('INSERT INTO orderItems (name, price, quantity, productId, img, imgAlt, orderId) VALUES ?', [items.map(item => [item.name, item.price, item.quantity, item.productId, item.img, item.imgAlt, orderId])]);

        return result;
    }, async deleteOrderItems(itemIds) {
        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            throw new Error('Você deve fornecer um array de IDs de itens para exclusão.');
        }


        const ids = itemIds.join(',');

        const result = await db.query('DELETE FROM orderItems WHERE itemId IN (?)', [itemIds]);

        return result;
    },
    async createShopifyOrder(order, shop, accessToken) {
        const orderData = {
            order: {
                line_items: [
                    {
                        variant_id: order.variant_id, 
                        quantity: order.quantity || 1 
                    }
                ],
                customer: {
                    email: order.email // Email do cliente dinâmico
                },
                financial_status: 'paid', // Status financeiro fixo
                transactions: [
                    {
                        kind: 'sale',
                        status: 'success',
                        amount: order.amount // Valor total do pedido dinâmico
                    }
                ],
                shipping_address: {
                    first_name: order.shipping.first_name,
                    last_name: order.shipping.last_name,
                    address1: order.shipping.address1,
                    phone: order.shipping.phone,
                    city: order.shipping.city,
                    province: order.shipping.province,
                    country: order.shipping.country,
                    zip: order.shipping.zip
                },
                billing_address: {
                    first_name: order.billing.first_name,
                    last_name: order.billing.last_name,
                    address1: order.billing.address1,
                    phone: order.billing.phone,
                    city: order.billing.city,
                    province: order.billing.province,
                    country: order.billing.country,
                    zip: order.billing.zip
                }
            }
        };

        try {
            const response = await fetch(`https://${shop}/admin/api/2023-07/orders.json`, {
                method: 'POST',
                headers: {
                    'X-Shopify-Access-Token': accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData) // Transformando os dados do pedido em JSON
            });

            if (!response.ok) {
                throw new Error(`Erro ao criar pedido: ${response.statusText}`);
            }

            const data = await response.json();
            return data.order; // Retorna o objeto do pedido
        } catch (error) {
            // Retorna mensagem de erro
            return { message: error.message };
        }
    }
};
      
    
      

module.exports = Order;

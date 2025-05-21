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
        const result = await db.query('SELECT * FROM orderitems WHERE orderId = ?', [id]);

        return result;
    }, 
    async findItemsIdByOrderId(id) {
        const result = await db.query('SELECT productId FROM orderitems WHERE orderId = ?', [id]);

        return result;
    },
    async findvariantIdByOrderId(id) {
        const result = await db.query('SELECT variantId FROM orderitems WHERE orderId = ?', [id]);

        return result;
    }, 
    async saveOrderItems(items, orderId) {
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error('Você deve fornecer um array de itens para inserção.');
        }


        const result = await db.query('INSERT INTO orderitems (name, price, quantity, productId, img, imgAlt, orderId, variantId) VALUES ?', [items.map(item => [item.name, item.price, item.quantity, item.productId, item.img, item.imgAlt, orderId, item.variantId])]);

        return result;
    }, async deleteOrderItems(itemIds) {
        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            throw new Error('Você deve fornecer um array de IDs de itens para exclusão.');
        } 


        const ids = itemIds.join(',');

        const result = await db.query('DELETE FROM orderitems WHERE itemId IN (?)', [itemIds]);

        return result;
    },
    async createShopifyOrder(order, amount,variants,shop, accessToken) {
      
        const lineItems = variants.map(item => ({
            variant_id: item.variantId,
            quantity: item.quantity || 1 // Define um padrão de 1 se não for informado
        }));

        const orderData = {
            order: {
                line_items: lineItems,
                customer: {
                    email: order.email // Email do cliente dinâmico
                },
                financial_status: 'paid', // Status financeiro fixo
                transactions: [
                    {
                        kind: 'sale',
                        status: 'success',
                        amount: amount // Valor total do pedido dinâmico
                    }
                ],
                shipping_address: {
                    first_name: order.contactName,
                    last_name: order.contactName,
                    address1: order.address,
                    phone: order.phoneNumber,
                    city: order.city,
                    province: order.city,
                    country: 'MOZAMBIQUE',
                    zip: order.postCode
                },
                billing_address: {
                    first_name: order.contactName,
                    last_name: order.contactName,
                    address1: order.address,
                    phone: order.phoneNumber,
                    city: order.city,
                    province: order.city,
                    country: 'MOZAMBIQUE',
                    zip: order.postCode
                }
            }
        };
        console.log(orderData)

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

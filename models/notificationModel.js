const db = require('../config/db');

const Notification = {
    // Cria uma nova notificação
    async create(data,userId) {
        const [result] = await db.query('INSERT INTO notification set ?', [data,userId]);
        return result;
    },

    // Deleta uma notificação pelo ID
    async delete(id) {
        const [result] = await db.query('DELETE FROM notification WHERE id = ?', [id]);
        return result;
    },

    // Atualiza o status de uma notificação
    async updateStatus(id, status) {
        const [result] = await db.query('UPDATE notification SET isRead = ? WHERE id = ?', [status, id]);
        return result;
    },

    // Lê uma notificação pelo ID
    async read(id) {
        const [rows] = await db.query('SELECT * FROM notification WHERE id = ?', [id]);
        return rows[0];
    },

    // Lê todas as notificações de um usuário
    async readAll(userId) {
        const [rows] = await db.query('SELECT * FROM notification WHERE userId = ?', [userId]);
        return rows;
    },notifications(i){
        const notifications = [
            { sender: "system", message: "Novo pedido criado." },
            { sender: "system", message: "Pedido pago com sucesso." },
            { sender: "system", message: "Pedido cancelado." },
            { sender: "system", message: "Novo login detectado." },
            { sender: "system", message: "Atualização de perfil concluída." },
            { sender: "system", message: "Novo comentário recebido." },
            { sender: "system", message: "Seu pagamento foi processado." },
            { sender: "system", message: "Novo item adicionado ao carrinho." }
        ];

        return notifications[i]
    }
};

module.exports = Notification;







const db = require('../config/db');

const DynamicData = {
    async getDataFromTable(tableName, userId) {
        const query = `
            SELECT * FROM ${tableName}
            WHERE  USUARIOID = ?
        `;
        const [rows] = await db.query(query, [userId, userId]);
        return rows; 
    },

    async getApps(userId) {
        return this.getDataFromTable('app', userId);
    },

    async getBotoes(userId) {
        return this.getDataFromTable('botoes', userId);
    },

    async getOrders(userId) {
        return this.getDataFromTable('orders', userId);
    },

    async getTransactions(userId) {
        return this.getDataFromTable('transactions', userId);
    },

    async getWallet(userId) {
        return this.getDataFromTable('wallet', userId);
    },

    async getUsuarios(userId) {
        return this.getDataFromTable('usuarios', userId);
    },

    async getUserDataById(userId) {
        try {
            const [apps, botoes, orders, transactions, wallet, usuarios] = await Promise.all([
                this.getApps(userId),
                this.getBotoes(userId),
                this.getOrders(userId),
                this.getTransactions(userId),
                this.getWallet(userId),
                this.getUsuarios(userId)
            ]);

            const data = {
                apps,
                botoes,
                orders,
                transactions,
                wallet,
                usuarios
            };

            return data;
        } catch (error) {
            console.error('Erro ao obter dados do usuário:', error);
            throw error;
        }
    }
};

module.exports = DynamicData;

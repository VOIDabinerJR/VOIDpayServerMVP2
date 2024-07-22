
const db = require('../config/db');

const DynamicData = {
    async getApps(userId) {
        const [rows] = await db.query('SELECT * FROM app WHERE USUARIOID = ?', [userId, userId]);
        return rows;
    },
    async getbotoes(userId) {
        const [rows] = await db.query('SELECT * FROM botoes WHERE  USUARIOID = ?', [userId, userId]);
        return rows;
    },
    async getOrders(userId) {
        const [rows] = await db.query('SELECT * FROM orders WHERE  USUARIOID = ?', [userId, userId]);
        return rows;
    },
    async getTransactions(userId) {
        const [rows] = await db.query('SELECT * FROM transactions WHERE  USUARIOID = ?', [userId, userId]);
        return rows;
    },
    async getwallet(userId) {
        const [rows] = await db.query('SELECT * FROM wallet WHERE  USUARIOID = ?', [userId, userId]);
        return rows;
    },
    async getUsuarios(userId) {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ? OR USUARIOID = ?', [userId, userId]);
        return rows;
    },
    async getUserDataById(userid) {
        try {
            const [d1, d2, d3, d4, d5, d6] = await Promise.all([
                this.getApps(userid),
                this.getOrders(userid),
                this.getbotoes(userid),
                this.getTransactions(userid),
                this.getwallet(userid),
                this.getUsuarios(userid)

            ]);

            const data = {
                app: d1,
                orders: d2,
                botoes: d3,
                transactions: d4,
                wallet: d5,
                usuarios: d6

            }

            return data

        } catch (error) {
            console.log(error)

        }



    }

};

module.exports = DynamicData;


const db = require('../config/db');
const BusinessDetails = require('./appModel');
const UserDetails = require('./userDetailsModel');

const DynamicData = {
    async getApps(userId) {
        const [rows] = await db.query('SELECT * FROM app WHERE userid = ?', [userId]);
        return rows;
    },
    async getbotoes(userId) {
        const [rows] = await db.query('SELECT * FROM button WHERE  userid = ?', [userId]);
        return rows;
    },
    async getOrders(userId) {
        const [rows] = await db.query('SELECT * FROM orders WHERE  userid = ?', [userId]);
        return rows;
    },
    async getTransactions(userId) {
        const [rows] = await db.query('SELECT * FROM transaction WHERE  userid = ?', [userId]);
        return rows;
    },
    async getwallet(userId) {
        const [rows] = await db.query('SELECT * FROM wallet WHERE  userid = ?', [userId]);
        return rows;
    },
    async getUsuarios(userId) {
        const [rows] = await db.query('SELECT * FROM user WHERE id = ? ', [userId]);
        return rows;
    },
    async getBusinessDetails(userId) {
        const [rows] = await db.query('SELECT * FROM businessDetails WHERE  userId = ?', [ userId]);
        return rows;
    },
    async getNotifications(userId) {
        const [rows] = await db.query('SELECT * FROM notification WHERE userid = ?', [userId]);
        return rows;
    },
    async getProducts(userId) {
        const [rows] = await db.query('SELECT * FROM product WHERE  userid = ?', [userId]);
        return rows;
    },
    async getUserDetails(userId) {
        const [rows] = await db.query('SELECT * FROM userDetails WHERE userid = ?', [userId]);
        return rows;
    },
    async getUserDataById(userid) {
        try {
            const [d1, d2, d3, d4, d5, d6,d7,d8,d9,d10] = await Promise.all([
                this.getApps(userid),
                this.getOrders(userid),
                this.getbotoes(userid),
                this.getTransactions(userid),
                this.getwallet(userid),
                this.getUsuarios(userid),
                this.getBusinessDetails(userid),
                this.getNotifications(userid),
                this.getUserDetails(userid),
                this.getProducts(userid),

            ]);

            const data = {
                app: d1,
                orders: d2,
                botoes: d3,
                transactions: d4,
                wallet: d5,
                usuarios: d6,
                businessDetails:d7,
                notification:d8,
                userDetails:d9,
                products:d10
            }

            return data

        } catch (error) {
            console.log(error)

        }



    }

};

module.exports = DynamicData;

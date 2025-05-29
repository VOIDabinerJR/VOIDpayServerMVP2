
const db = require('../config/db');
const { shopifyCredentials } = require('../controllers/userController');
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
        const [rows] = await db.query('SELECT * FROM businessdetails WHERE  userId = ?', [ userId]);
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
        const [rows] = await db.query('SELECT * FROM userdetails WHERE userid = ?', [userId]);
        return rows;
    },
    async shopifyCredentials(userId) {
        const [rows] = await db.query('SELECT * FROM shopify WHERE userid = ?', [userId]);
        return rows;
    },
    async getSubscription(userId) {
        const [rows] = await db.query('SELECT * FROM subscription WHERE userid = ?', [userId]);
        return rows;
    },
    async getUserDataById(userid) {
        try {
            const [d1, d2, d3, d4, d5, d6,d7,d8,d9,d10,d11, d12] = await Promise.all([
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
                this.shopifyCredentials(userid),
                this.getSubscription(userid),

            ]);

            const data = {
                app: d1,
                orders: d2,
                button: d3,
                transactions: d4,
                wallet: d5,
                usuarios: d6,
                businessDetails:d7,
                notification:d8,
                userDetails:d9,
                products:d10,
                shopifyCredentials:d11,
                subscription:d12,
            }

            return data

        } catch (error) {
            return (error)

        }



    }

};

module.exports = DynamicData;

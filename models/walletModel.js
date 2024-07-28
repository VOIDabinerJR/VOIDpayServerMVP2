const db = require('../config/db');

const Wallet = {
    async create(wallet) {
        const result = await db.query('INSERT INTO wallet SET ?', wallet);
        return result;
    },
    async findById(id) {
        const [result] = await db.query('SELECT * FROM wallet WHERE id = ?', [id]);
        return result[0];
    },
    async withdraw(originAccount, value, walletId) {
        // Update the wallet balance
        const updateWallet = await db.query('UPDATE wallet SET balance = balance - ? WHERE id = ?', [value, walletId]);
        
        // Record the transaction
        const recordTransaction = await db.query('INSERT INTO TRANSACTIONS SET ?', {
            walletId,
            type: 'withdraw',
            originAccount,
            value,
            date: new Date()
        });
        
        return {
            updateWallet,
            recordTransaction
        };
    },
    async deposit(destinationAccount, value, walletId) {
      
        const updateWallet = await db.query('UPDATE WALLETS SET balance = balance + ? WHERE id = ?', [value, walletId]);
        
        
        const recordTransaction = await db.query('INSERT INTO TRANSACTIONS SET ?', {
            walletId,
            type: 'deposit',
            destinationAccount,
            value,
            date: new Date()
        });
        
        return {
            updateWallet,
            recordTransaction
        };
    },
    async refund(originAccount, value, walletId) {
       

        const updateWallet = await db.query('UPDATE WALLETS SET balance = balance - ? WHERE id = ?', [value, walletId]);
        
        // Registra a transação como reembolso
        const recordTransaction = await db.query('INSERT INTO TRANSACTION SET ?', {
            walletId,
            type: 'refund',
            originAccount,
            value,
            date: new Date()
        });
        
        return {
            updateWallet,
            recordTransaction
        };
    }
};

module.exports = Wallet;

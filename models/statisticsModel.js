const db = require('../config/db');

const Statistics = {

    async findSalesByMonthYear(userId, month, year) {
        const result = await db.query(
            'SELECT * FROM orders WHERE userId = ? AND MONTH(createdAt) = ? AND YEAR(createdAt) = ?',
            [userId, month || 1 , year|| 2024]
        );
        return result;
    },
   
    
    async findPendingPayments(userId) {
        const result = await db.query(
            'SELECT * FROM orders WHERE userId = ? AND orderStatus = ?',
            [userId, 'Pending']
        );
        return result;
    },


    async findCompletedPayments(userId) {
        const result = await db.query(
            'SELECT * FROM orders WHERE userId = ? AND orderStatus = ?',
            [userId, 'Completed']
        );
        return result;
    },

    
    async findCancelledPayments(userId) {
        const result = await db.query(
            'SELECT * FROM orders WHERE userId = ? AND orderStatus = ?',
            [userId, 'Cancelled']
        );
        return result;
    },

    
    async findRefundedPayments(userId) {
        const result = await db.query(
            'SELECT * FROM orders WHERE userId = ? AND orderStatus = ?',
            [userId, 'refunded']
        );
        return result;
    },

  
    async calculateCancellationRate(userId) {
        const totalOrders = await db.query('SELECT COUNT(*) AS total FROM orders WHERE userId = ?', [userId]);
        const cancelledOrders = await db.query('SELECT COUNT(*) AS total FROM orders WHERE userId = ? AND orderStatus = ?', [userId, 'Cancelled']);
        
        const total = totalOrders[0].total;
        const cancelled = cancelledOrders[0].total;

        return total > 0 ? (cancelled / total) * 100 : 0;
    },

   
    async calculateRefundRate(userId) {
        const totalOrders = await db.query('SELECT COUNT(*) AS total FROM orders WHERE userId = ?', [userId]);
        const refundedOrders = await db.query('SELECT COUNT(*) AS total FROM orders WHERE userId = ? AND orderStatus = ?', [userId, 'refunded']);
        
        const total = totalOrders[0].total;
        const refunded = refundedOrders[0].total;

        return total > 0 ? (refunded / total) * 100 : 0;
    },
    // Executa todas as funções e retorna os dados consolidados
    async getStatistics(userId, month, year) {
        try {
            const sales = await this.findSalesByMonthYear(userId, month, year);
            const pendingPayments = await this.findPendingPayments(userId);
            const completedPayments = await this.findCompletedPayments(userId);
            const cancelledPayments = await this.findCancelledPayments(userId);
            const refundedPayments = await this.findRefundedPayments(userId);
            const cancellationRate = await this.calculateCancellationRate(userId);
            const refundRate = await this.calculateRefundRate(userId);

            return {
                sales,
                pendingPayments,
                completedPayments,
                cancelledPayments,
                refundedPayments,
                cancellationRate,
                refundRate
            };
        } catch (error) {
            console.error('Error fetching statistics:', error);
            throw error;
        }
    }
};

module.exports = Statistics;

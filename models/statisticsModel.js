const db = require('../config/db');

const Statistics = {

    async findSalesByMonthYear(userId, month, year) {
        const [rows] = await db.query(
            'SELECT * FROM orders WHERE userId = ? AND MONTH(createdAt) = ? AND YEAR(createdAt) = ?',
            [userId, month || 1, year || 2024]
        );
        return rows;
    },

    async findPendingPayments(userId) {
        const [rows] = await db.query(
            'SELECT * FROM orders WHERE userId = ? AND orderStatus = ?',
            [userId, 'Pending']
        );
        return rows;
    },

    async findCompletedPayments(userId) {
        const [rows] = await db.query(
            'SELECT * FROM orders WHERE userId = ? AND orderStatus = ?',
            [userId, 'Completed']
        );
        return rows;
    },

    async findCancelledPayments(userId) {
        const [rows] = await db.query(
            'SELECT * FROM orders WHERE userId = ? AND orderStatus = ?',
            [userId, 'Cancelled']
        );
        return rows;
    },

    async findRefundedPayments(userId) {
        const [rows] = await db.query(
            'SELECT * FROM orders WHERE userId = ? AND orderStatus = ?',
            [userId, 'refunded']
        );
        return rows;
    },

    async calculateCancellationRate(userId) {
        const [totalOrders] = await db.query('SELECT COUNT(*) AS total FROM orders WHERE userId = ?', [userId]);
        const [cancelledOrders] = await db.query('SELECT COUNT(*) AS total FROM orders WHERE userId = ? AND orderStatus = ?', [userId, 'Cancelled']);

        const total = totalOrders[0].total;
        const cancelled = cancelledOrders[0].total;

        return total > 0 ? (cancelled / total) * 100 : 0;
    },

    async calculateRefundRate(userId) {
        const [totalOrders] = await db.query('SELECT COUNT(*) AS total FROM orders WHERE userId = ?', [userId]);
        const [refundedOrders] = await db.query('SELECT COUNT(*) AS total FROM orders WHERE userId = ? AND orderStatus = ?', [userId, 'refunded']);

        const total = totalOrders[0].total;
        const refunded = refundedOrders[0].total;

        return total > 0 ? (refunded / total) * 100 : 0;
    },
    async calculateCheckoutRate(userId) {
        const [totalOrders] = await db.query('SELECT COUNT(*) AS total FROM orders WHERE userId = ?', [userId]);
        const [checkoutedOrders] = await db.query('SELECT COUNT(*) AS total FROM orders WHERE userId = ? AND orderStatus = ?', [userId, 'completed']);

        const total = totalOrders[0].total;
        const checkouted = checkoutedOrders[0].total;

        return total > 0 ? (checkouted / total) * 100 : 0;
    },
    async calculatePendingRate(userId) {
        const [totalOrders] = await db.query('SELECT COUNT(*) AS total FROM orders WHERE userId = ?', [userId]);
        const [pendingOrders] = await db.query('SELECT COUNT(*) AS total FROM orders WHERE userId = ? AND orderStatus = ?', [userId, 'pending']);

        const total = totalOrders[0].total;
        const pending = pendingOrders[0].total;

        return total > 0 ? (pending / total) * 100 : 0;
    },
    async calculateTicketM(userId) {
        const [totalOrders] = await db.query('SELECT SUM(totalAmount) AS total FROM orders WHERE userId = ?', [userId]);
        const [pendingOrders] = await db.query('SELECT COUNT(*) AS total FROM orders WHERE userId = ?', [userId]);

        const totalam = totalOrders[0].total;
        const total = pendingOrders[0].total;

        return total > 0 ? (totalam / total) : 0;
    },
     async salesRevenue(userId) {
        const result = await db.query(
            'SELECT SUM(totalAmount) AS totalSales FROM orders WHERE userId = ? AND orderStatus=?',
            [userId,'completed']
        );
        return result[0][0].totalSales || 0;
    },


    async findSalesLast30Days(userId) {
        const result = await db.query(
            'SELECT SUM(totalAmount) AS totalSales FROM orders WHERE userId = ? AND createdAt >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)',
            [userId]
        );
        return result[0][0].totalSales || 0;
    },


    async findSalesLastYear(userId) {
        const result = await db.query(
            'SELECT SUM(totalAmount) AS totalSales FROM orders WHERE userId = ? AND createdAt >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)',
            [userId]
        );
        return result[0][0].totalSales || 0;
    },
    async findMonthlySales(userId) {
        const result = await db.query(
            `SELECT 
                YEAR(createdAt) AS year,
                MONTH(createdAt) AS month,
                COALESCE(SUM(totalAmount), 0) AS totalSales
            FROM 
                orders
            WHERE 
                userId = ?
                AND createdAt >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
            GROUP BY 
                YEAR(createdAt), MONTH(createdAt)
            ORDER BY 
                YEAR(createdAt) DESC, MONTH(createdAt) DESC`,
            [userId]
        );

        
        const monthlySales = Array(12).fill(0);
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        result[0].forEach(row => {
            const { year, month, totalSales } = row;
            if (year === currentYear) {
              
                monthlySales[currentMonth - month] = totalSales;
            } else if (year === currentYear - 1) {
              
                
                monthlySales[12 - (currentMonth - month)] = totalSales;
            }
        });

        return monthlySales;
    },
    async getStatistics(userId, month, year) {
        try {
            const sales = await this.findSalesByMonthYear(userId, month, year);
            const pendingPayments = await this.findPendingPayments(userId);
            const completedPayments = await this.findCompletedPayments(userId);
            const cancelledPayments = await this.findCancelledPayments(userId);
            const refundedPayments = await this.findRefundedPayments(userId);
            const cancellationRate = await this.calculateCancellationRate(userId);
            const refundRate = await this.calculateRefundRate(userId);
            const checkoutRate = await this.calculateCheckoutRate(userId);
            const pendingRate = await this.calculatePendingRate(userId);
            const salesLast30Days = await this.findSalesLast30Days(userId);
            const salesLastYear = await this.findSalesLastYear(userId);
            const monthlySales = await this.findMonthlySales(userId); 
            const revenue = await this.salesRevenue(userId); 
            const ticketM = await this.calculateTicketM(userId);
            return {
                sales,
                pendingPayments,
                completedPayments,
                cancelledPayments,
                refundedPayments,
                cancellationRate,
                refundRate,
                checkoutRate,
                pendingRate,
                salesLast30Days,
                salesLastYear,
                monthlySales,
                revenue,
                ticketM
            };
        } catch (error) {
            console.error('Error fetching statistics:', error);
            throw error;
        }
    }
};

module.exports = Statistics;

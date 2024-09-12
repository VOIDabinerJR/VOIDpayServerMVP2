const User = require('../models/userModel');
const App = require('../models/appModel');
const jwt = require('jsonwebtoken');
const Notifcations = require('../models/notificationModel')



module.exports.sendNotification = async (req, res) => {
   

    try {
        const [userResult] = await User.findById(id);

        if (userResult.length > 0) {
            const user = userResult[0];
            return res.status(200).json({ user });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

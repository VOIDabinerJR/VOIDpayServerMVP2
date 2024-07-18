const User = require('../models/userModel');

module.exports.checkToken = (req, res) => {
    const token = req.body.token;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: 'Token is invalid or expired' });
            } else {
                return res.status(200).json({ id: decodedToken.id });
            }
        });
    } else {
        return res.status(400).json({ error: 'Token not provided' });
    }
};

module.exports.checkUser = async (req, res) => {
    const { id } = req.body;

    try {
        const userResult = await User.findById(id);

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

const User = require('../models/userModel');
const App = require('../models/appModel');
const jwt = require('jsonwebtoken');
const { createLoginToken, createToken, decodeToken } = require('../utils/jwt')
const { generateClientId, generateClientSecret } = require('../utils/functions')

module.exports.checkToken = (req, res) => {
    const token = req.body.token;

    if (token) {
        jwt.verify(token, 'oi', (err, decodedToken) => {
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


module.exports.createApp = async (req, res) => {
    const { type, name, token } = req.body;

    try {
        const decoded = decodeToken(token)
        const [userResult] = await User.findById(decoded.token);


        if (userResult.length > 0) {

            const clientid = generateClientId();
            const clientsecret = generateClientSecret();

            const app = {
                userid: decoded.token,
                type: type,
                name: name,
                clientid: clientid,
                clientsecret: clientsecret

            }
            const [insertResult] = await App.create(app);
            if(insertResult.affectedRows === 1){

                return res.status(200).json({ app });

            } else {
                return res.json({ err:"erro durring cration" });

            }

            
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

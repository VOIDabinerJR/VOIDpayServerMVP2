const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { createToken } = require('../utils/jwt');
const { sendEmail } = require('../utils/email');

const authController = {
    register: async (req, res) => {
        const { firstName, lastName, email, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            return res.status(400).json({ err: 'Passwords do not match' });
        }

        try {
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).send('Email is already in use');
            }

            const hashedPassword = await bcrypt.hash(password, 8);
            const user = { firstName, lastName, email, password: hashedPassword };
            const insertResult = await User.create(user);

            if (insertResult.affectedRows === 1) {
                const newUser = await User.findByEmail(email);
                const token = createToken(newUser.id);
                return res.status(201).json({ token });
            // return res.redirect(/login)
            } else {
                return res.status(500).json({ err: 'User registration failed' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ err: 'Server error' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findByEmail(email);

            if (!user) {
                return res.status(404).json({ err: 'Email incorrect' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ err: 'Password incorrect' });
            }

            const token = createToken(user.id);
            return res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ err: 'Server error' });
        }
    }
};

module.exports = authController;

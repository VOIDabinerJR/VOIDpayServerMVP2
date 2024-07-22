const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { createLoginToken } = require('../utils/jwt');
const { sendEmail } = require('../utils/email');
const DynamicData = require('../models/dynamicDataModell');

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
                const token = createLoginToken(newUser.id);


                const insertResult = await App.create(user);

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
        console.log("Aa")
        const { email, password } = req.body;
        try {
            const user = await User.findByEmail(email);
            console.log(user.id)

            if (!user) {
                return res.status(404).json({ err: 'Email incorrect' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ err: 'Password incorrect' });
            }

            const token = await createLoginToken(user.id);
             
            //const data =await DynamicData.getUserDataById(user.id)
            const userData = await DynamicData.getUserDataById('28');

            const data = {
                token:token,
                userData:userData
            }
          

            return res.status(200).json({ data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ err: 'Server error' });
        }
    }
};

module.exports = authController;

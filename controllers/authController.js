const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { createLoginToken, createToken, decodeToken } = require('../utils/jwt');
const { sendEmail, sendRecoverEmail, sendPaymentConfirmationEmail } = require('../utils/email');
const DynamicData = require('../models/dynamicDataModell');
const Wallet = require('../models/walletModel');
const Statistics = require('../models/statisticsModel');
const { shortID } = require('../utils/functions.js');
const fs = require('fs');

const authController = {
    register: async (req, res) => {
        const { firstName, lastName, username, email, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        try {
            const [existingUser] = await User.findByEmail(email);
            if (existingUser.length > 0) {
                return res.status(400).json({ error: 'Email is already in use' });
            }
            const username1 = username.replace(/\s+/g, '') + shortID()
            console.log(username1)
            const hashedPassword = await bcrypt.hash(password, 8);
            const user = { firstName, lastName, username: username1, email, password: hashedPassword };

            const insertResult = await User.create(user);


            if (insertResult[0].affectedRows === 1) {
                const [newUser] = await User.findByEmail(email);
                const token = createLoginToken(newUser[0].id);
                console.log(newUser[0].id)

                const walletData = {
                    userid: newUser[0].id

                }
                const wallet = await Wallet.create(walletData);



                //const insertResult = await App.create(user);

                return res.status(201).json({ token: token, wallet: wallet });
                // return res.redirect(/login)
            } else {
                return res.status(500).json({ err: 'User registration failed' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ err: 'Server error', error: error });
        }
    },

    login: async (req, res) => {
       
        const { email, password } = req.body;
        console.log(req.body);
        try {
            const [user] = await User.findByEmail(email);

            if (user.length <= 0) {
                return res.status(404).json({ err: 'Email incorrect' });
            }


            const passwordMatch = await bcrypt.compare(password, user[0].password);
            if (!passwordMatch) {
                return res.status(401).json({ err: 'Password incorrect' });
            }

            const token = await createLoginToken(user[0].id);




            return res.status(200).json({ token });
        } catch (error) {

            console.error(error);
            return res.status(500).json({ err: 'Server error' });
        }
    }
    ,

    recoveraccount: async (req, res) => {

        const { email } = req.body;
        console.log("aaaa")
 

        try {
            console.log("aaaa")
            const [user] = await User.findByEmail(email);
console.log(user)

            if (!user) {
                return res.status(404).json({ err: 'Email incorrect' });
            }

            const token = createToken(user[0]);

            const sent = await sendRecoverEmail(email, token);
            if (!sent.status) {
                return res.status(404).json({ error: "verification email not sent" })
            }
            return res.status(200).json({ sucess: true });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ err: 'Server error' }); 
        }
    }
    ,

    resetpassword: async (req, res) => {
        const { password, repeatPassword, token } = req.body;

        console.log(token)

        if (password !== repeatPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }


        try {
            const decoded = await decodeToken(token)


            const [existingUser] = await User.findByEmail(decoded.email);

            const hashedPassword = await bcrypt.hash(password, 8);

            const user = { password: hashedPassword };
            const [insertResult] = await User.update(user, existingUser[0].id);


            if (insertResult.affectedRows === 1) {

                return res.status(200).json({ msg: 'sucess' });

            } else {
                return res.status(500).json({ err: 'Pass NOT updated' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ err: 'Server error', error: error });
        }
    },
    loaddata: async (req, res) => {
        const { token } = req.body;

        try {
            const decoded = await decodeToken(token)



            const [user, userStatistics] = await Promise.all([
                DynamicData.getUserDataById(decoded.token),
                Statistics.getStatistics(decoded.token)
            ]);

            if (!user) {
                return res.status(404).json({ err: 'Erro data load' });
            } else {


                //  const data = {
                //     time:Date(),
                //      userStatistics: userStatistics,
                //      user: user

                //  };
                // fs.writeFileSync('userData.json', JSON.stringify(data, null, 2));

                return res.status(200).json({
                    user,
                    userStatistics
                });

            }



        } catch (error) {
            console.error(error);
            return res.status(500).json({ err: 'Server error', error: error });
        }
    }
};

module.exports = authController;

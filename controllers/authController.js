const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { createLoginToken } = require('../utils/jwt');
const { sendEmail,sendRecoverEmail } = require('../utils/email');
const DynamicData = require('../models/dynamicDataModell');



const authController = {
    register: async (req, res) => {
        const { firstName, lastName, username, email, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        try {
            const [existingUser] = await User.findByEmail(email);
            if (existingUser.length>0) {
                return res.status(400).json({ error: 'Email is already in use' });
            }

            console.log(firstName)
            const hashedPassword = await bcrypt.hash(password, 8);
            const user = { firstName, lastName, username, email, password: hashedPassword };
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
            return res.status(500).json({ err: 'Server error', error: error });
        }
    },

    login: async (req, res) => {
        console.log("Aa")
        const { email, password } = req.body;
        try {
            const [user] = await User.findByEmail(email);

            if (user.length<=0) {
                return res.status(404).json({ err: 'Email incorrect' });
            }
            console.log(password)
            console.log(user[0].password)

            const passwordMatch = await bcrypt.compare(password, user[0].password);
            if (!passwordMatch) {
                return res.status(401).json({ err: 'Password incorrect' });
            }

            const token = await createLoginToken(user.id);

            //const data =await DynamicData.getUserDataById(user.id)
            //const userData = await DynamicData.getUserDataById('28');


            return res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ err: 'Server error' });
        }
    }
    ,

    recoveraccount: async (req, res) => {
       
        const { email} = req.body;
        try {
            const user = await User.findByEmail(email);

            if (!user) {
                return res.status(404).json({ err: 'Email incorrect' });
            }

            const token = await createToken(user);
            const sent = await sendRecoverEmail(email, token);
            if(!sent.status){
                return res.status(404).json({error:"verification email not sent"})
            }
            return res.status(200);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ err: 'Server error' });
        }
    }
    ,

    resetpassword: async (req, res) => {
        const {  password, repeatPassword } = req.body;
        const  token =req.query.token

        if (password !== repeatPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        try {
            const decoded = await decodeToken(token)

            const [existingUser] = await User.findByEmail(decoded.email);
       
            const hashedPassword = await bcrypt.hash(password, 8);

            const user = {  password: hashedPassword };
            const insertResult = await User.update(user,existingUser[0].id);


            if (insertResult.affectedRows === 1) {
               
                return res.status(200).json({ msg:'sucess' });
               
            } else {
                return res.status(500).json({ err: 'Pass NOT updated' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ err: 'Server error', error: error });
        }
    }
};

module.exports = authController;

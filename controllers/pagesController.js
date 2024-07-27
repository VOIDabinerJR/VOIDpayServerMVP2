const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { createLoginToken, createToken, decodeToken } = require('../utils/jwt');
const { sendEmail, sendRecoverEmail } = require('../utils/email');
const DynamicData = require('../models/dynamicDataModell');



const pagesController = { 
    registerUpdate: async (req, res) => {
        const { token, firstName, lastName, username, email, password, repeatPassword, dateOfBirth, address, postalCode, documentId, documentIdImg, phone, alternativeEmail, businessName, legalDocument,website, form } = req.body;
        const data = req.body
        const userData = {
            firstName:firstName, lastName:lastName, username:username,  password:password

        }
        
        const userDetails = {
            dateOfBirth:dateOfBirth, address:address, postalCode:postalCode, documentId:documentId, phone:phone,alternativeEmail:alternativeEmail

        }
        
        const businessDetails = {
            businessName:businessName, legalDocument:legalDocument,website:website,address:address,email:email

        }

        const mysql = require('mysql2/promise');
        const decoded = decodeToken(token);
        const userId = decoded.token
        const db = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });


        if(form=='user'){
            let query = 'UPDATE user SET ';
            const updates = [];
            const values = [];
    
            for (const key in data) {
                if (key !== 'id' && data.hasOwnProperty(key) && data[key] !== '') {
                    updates.push(`${key} = ?`);
                    values.push(data[key]);
                }
            }
    
            if (updates.length > 0) {
                query += updates.join(', ') + ' WHERE id = ?';
                values.push(userId);
    
                // Log da query para o console
                console.log('Query:', query);
                console.log('Values:', values);
    
                db.query(query, values, (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }
                    res.json({ message: 'Usuário atualizado com sucesso!' });
                });
            } else {
                res.json({ message: 'Nenhum dado para atualizar.' });
            }

            let query = 'UPDATE user SET ';
            const updates = [];
            const values = [];
    
            for (const key in data) {
                if (key !== 'id' && data.hasOwnProperty(key) && data[key] !== '') {
                    updates.push(`${key} = ?`);
                    values.push(data[key]);
                }
            }
    
            if (updates.length > 0) {
                query += updates.join(', ') + ' WHERE id = ?';
                values.push(userId);
    
                // Log da query para o console
                console.log('Query:', query);
                console.log('Values:', values);
    
                db.query(query, values, (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }
                    res.json({ message: 'Usuário atualizado com sucesso!' });
                });
            } else {
                res.json({ message: 'Nenhum dado para atualizar.' });
            }

        }else if (form=='business'){
            let query = 'UPDATE bussiness SET ';
            const updates = [];
            const values = [];
    
            for (const key in businessDetails) {
                if (key !== 'iserId' && businessDetails.hasOwnProperty(key) && businessDetails[key] !== '') {
                    updates.push(`${key} = ?`);
                    values.push(businessDetails[key]);
                }
            }
    
            if (updates.length > 0) {
                query += updates.join(', ') + ' WHERE id = ?';
                values.push(userId);
    
                // Log da query para o console
                console.log('Query:', query);
                console.log('Values:', values);
    
                db.query(query, values, (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }
                    res.json({ message: 'Usuário atualizado com sucesso!' });
                });
            } else {
                res.json({ message: 'Nenhum dado para atualizar.' });
            }

        }else {
            return res.json({err: "atualizar nada"})
        }
       

        return

        if (password == '') {
            console.log('oi')
        }




        try {
            const [existingUser] = await User.findById(userId);
            if (existingUser.length <= 0) {
                return res.status(400).json({ error: 'user not found' });
            }

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

        const { email, password } = req.body;
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
};

module.exports = pagesController;

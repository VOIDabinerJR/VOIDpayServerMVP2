const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { createLoginToken, createToken, decodeToken } = require('../utils/jwt');
const { sendEmail, sendRecoverEmail } = require('../utils/email');
const DynamicData = require('../models/dynamicDataModell');
const UserDetails = require('../models/userDetailsModel');
const business = require('../models/businessModel');
const App = require('../models/appModel');
const Wallet = require('../models/walletModel');

const { populateUpdatedFields } = require('../utils/functions.js');
const BusinessDetails = require('../models/businessModel');



const pagesController = {
    registerUpdate: async (req, res) => {
        const { token, firstName, lastName, username, email, password, repeatPassword, dateOfBirth, address, postalCode, documentId, documentIdImg, phone, alternativeEmail, businessName, legalDocument, website, form } = req.body;
        const data = req.body

        const decoded = decodeToken(token)

        try {
            if (req.file) {
                console.log('File uploaded:', req.file.filename);
            } else{
                console.log(req.file)
            }
            const [existingUser] = await User.findById(decoded.token);
            if (existingUser.length <= 0) {
                return res.status(400).json({ error: 'user not found' });
            }


            if (form == 'user') {
                let userData = {};
                let userDetails = {};

                populateUpdatedFields({ firstName, lastName, username, password }, userData);
                populateUpdatedFields({ dateOfBirth, address, postalCode, documentId, phone, alternativeEmail }, userDetails);
                userData.userId = decoded.token;
                userDetails.userId = decoded.token;

                if (password && password.trim() !== '') {
                    const hashedPassword = await bcrypt.hash(password, 8);
                    userData.password = hashedPassword

                }

                const [existingUserDetails] = await UserDetails.findByUserId(decoded.token);
                if (existingUserDetails.length <= 0) {

                    const [creationUserDetails] = await UserDetails.create(userDetails);
                    if (creationUserDetails.affectedRows == 1) {

                        return res.json({ status: 'sucess' });
                    }

                    return res.json({ status: 'faild' });

                } else {
                    const [updateUserDetails] = await UserDetails.update(userDetails, existingUserDetails[0].id);
                    if (updateUserDetails.affectedRows == 1) {

                        return res.json({ status: 'sucess' });
                    }


                }

                const [existingUser] = await User.findById(decoded.token);
                if (existingUser.length <= 0) {

                    const [creationUser] = await UserDetails.create(userData);
                    if (creationUser.affectedRows == 1) {

                        return res.json({ status: 'sucess' });
                    }

                    return res.json({ status: 'faild' });

                } else {
                    const [updateUser] = await UserDetails.update(userData, existingUser[0].id);
                    if (updateUser.affectedRows == 1) {

                        return res.json({ status: 'sucess' });
                    }


                }


                console.log('userData:', userData);
                console.log('userDetails:', userDetails);



                return res.json({ error: "" })

            } else if (form == 'business') {
                let businessDetails = {};

                populateUpdatedFields({ businessName, legalDocument, website, address, email }, businessDetails);
                businessDetails.userId = decoded.token;

                const [existingBusinessDetails] = await BusinessDetails.findByUserId(decoded.token);
                if (existingBusinessDetails.length <= 0) {

                    const [creationBusinessDetails] = await BusinessDetails.create(businessDetails);
                    if (creationBusinessDetails.affectedRows == 1) {


                        return res.json({ status: 'sucess' });
                    }

                    return res.json({ status: 'faild' });

                } else {

                    const [updateBusinessDetails] = await BusinessDetails.update(businessDetails, existingBusinessDetails[0].id);
                    if (updateBusinessDetails.affectedRows == 1) {

                        return res.json({ status: 'sucess' });
                    }


                }


                console.log('businessDetails:', businessDetails);

                return res.json({ error: "" })

            }


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

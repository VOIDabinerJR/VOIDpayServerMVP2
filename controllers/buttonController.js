const jwt = require('jsonwebtoken');
const Button = require('../models/buttonModel');
const User = require('../models/userModel');
const App = require('../models/appModel');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../utils/email');
const { createToken, decodeToken } = require('../utils/jwt');
const nodemailer = require('nodemailer');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.requestButton = async (req, res) => {
    console.log("Aa")
    const { clientId, destination, name, token } = req.body;

    try {
        const decoded = await decodeToken(token)
        const decodedClientId = clientId  //decodeToken(token) 

        const [userResult] = await User.findById(decoded.token);

        if (userResult.length > 0) {


            const [appResult] = await App.findByClientId(decodedClientId);

            console.log("Aa")
            if (appResult.length > 0) {
                const user = userResult[0]; 
                const email = user.email;
                const buttonToken = `VOID-${uuidv4()}`;

                const payload = {
                    userid: user.id,
                    destination: destination,
                    buttonToken: buttonToken,
                    appid: appResult[0].id,
                    name: name

                };
                console.log(payload)

                const tokenData = createToken(payload)

                const sent = await sendEmail(email, tokenData, destination, buttonToken);
                console.log(sent)

                if (sent.status) {

                    return res.status(200).json({ msg: "sucess" })

                } else {
                    return res.status(209).json({ msg: "email not sent" })
                }


            }

        } else {
            return res.status(404).json({ err: 'user not foud' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ err: 'Server error' });
    }
};

module.exports.activateButton = async (req, res) => {
    const { tokeny } = req.body;


    const decoded = decodeToken(tokeny)
    console.log(decoded)
  

    const button = {
        name: decoded.name,
        userid: decoded.userid,
        destination: decoded.destination,
        buttonToken:decoded.buttonToken,
        appid: decoded.appid
    
    };

    try {
        const [insertResult] = await Button.create(button);

        if (insertResult.affectedRows === 1) {
            return res.status(200).json({ buttonToken: decoded.buttonToken });
        } else {
            return res.status(500).json({ err: 'Button activation failed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ err: 'Server error' });
    }
};




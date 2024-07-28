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
    const { clientid, destination, name, token } = req.body;

    try {
        const decoded = decodeToken(token)
        const decodedClientId =  clientid  //decodeToken(token) 
        
        const [userResult] = await User.findById(decoded.token);

        if (userResult.length > 0) {


            const [appResult] = await App.findByClientId(decodedClientId);

            console.log("Aa")
            if (appResult.length > 0) {
                const user = userResult[0];
                const email = 'void.contacte@gmail.com';
                const buttonToken = `VOID-${uuidv4()}`;

                const payload = {
                    userid: user.id,
                    destination: destination,
                    buttonToken: buttonToken,
                    appid: appResult[0].id,
                    name:name

                };
                console.log(payload)
                
                const tokenData = createToken(payload)

                const sent = await sendEmail(email, tokenData, destination, buttonToken);
                console.log(sent)

                if (sent.status) {

                    return res.status(200).json({msg:"sucess"})
                    
                } else {
                    return res.status(209).json({msg:"email not sent"}) 
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
    const { token } = req.body;

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao decodificar o token' });
        } else {
            
            const button = {
                nome: 'Botão',
                destino: decoded.destinationSite,
                clientid: decoded.userid,
                botontoken: buttonId,
                id_usuario: decoded.userid,
                status: true
            };

            try {
                const insertResult = await Button.create(button);

                if (insertResult.affectedRows === 1) {
                    return res.json({ buttonID: buttonId });
                } else {
                    return res.status(500).json({ err: 'Button activation failed' });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ err: 'Server error' });
            }
        }
    });
};


async function sendEmailTest(email, token, destinationSite, activation) {
    const data = { email: email, token: token, destinationSite: destinationSite, status: true };
    console.log({ data })
    console.log(data.status)
    return { data };
};
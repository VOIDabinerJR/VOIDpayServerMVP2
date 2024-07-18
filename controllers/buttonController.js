const jwt = require('jsonwebtoken');
const Button = require('../models/buttonModel');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../utils/email');
const { createToken } = require('../utils/jwt');
const nodemailer = require('nodemailer');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.requestButton = async (req, res) => {
    const { clientid, destinationSite } = req.body;

    try {
        const userResult = await User.findById(clientid);

        if (userResult.length > 0) {
            const user = userResult[0];
            const email = user.email;
            const payload = { userid: user.id, destinationSite: destinationSite };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

            const sent = await sendEmail(email, token, destinationSite, true);
            if (!sent.status) {
                return res.status(500).json({ err: "erro tente novamente" });
            }
            return res.json(sent);
        } else {
            return res.status(404).json({ err: 'clientId incorrect' });
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
            const buttonId = `VOID-${uuidv4()}`;
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

async function sendEmail(email, token, destinationSite, activation) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const subject = activation ? "Ative seu botão" : "Link de pagamento";
    const message = activation
        ? `<h1>Ative seu botão</h1><p>Clique no link para ativar o botão: <a href="http://localhost:3000/button/activate/${token}">Ativar botão</a></p>`
        : `<h1>Link de pagamento</h1><p>Clique no link para efetuar o pagamento: <a href="${destinationSite}">Pagar</a></p>`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: message
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { status: true, response: 'Email sent' };
    } catch (error) {
        console.log('Error sending email: ' + error);
        return { status: false, response: 'Email not sent' };
    }
}


async function sendEmailTest(email, token, destinationSite, activation) {
    const data = { email: email, token: token, destinationSite: destinationSite, status: true };
    console.log({ data })
    console.log(data.status)
    return { data };
}

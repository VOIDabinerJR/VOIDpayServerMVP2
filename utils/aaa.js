const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const createToken = (payload) => {
    return jwt.sign(payload, 'oi', {
        expiresIn: '3d'
    });
};

const createMobileWalletToken = async (orderId, paymentDetails) => {
    const payload = {
        transaction_reference: paymentDetails.transaction_reference || 'T123s44C',
        customer_msisdn: paymentDetails.customer_msisdn || '258865218679',
        amount: paymentDetails.amount || '10',
        third_party_reference: paymentDetails.third_party_reference || '11d1PA2D',
        orderId: orderId || '111',
        query_reference: paymentDetails.query_reference || null,
        security_credential: paymentDetails.security_credential || null,
        initiator_identifier: paymentDetails.initiator_identifier || null,
        reversal_amount: paymentDetails.reversal_amount || null,
        transaction_id: paymentDetails.transaction_id || null
    };
    return createToken(payload);
};

const run = async () => {
    const token = await createMobileWalletToken('oi', {});
    console.log(token);
}; 
 

function decodeToken(token) { 
    try {
        const decodedPayload = jwt.verify(token, 'oi');
        return decodedPayload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token expirado. Por favor, faça login novamente.');
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Token inválido. Por favor, faça login novamente.');
        } else {
            throw new Error('Erro ao decodificar o token.');
        }
    }
}




async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}
async function hashInfo(info) {
    try {
        const hashedInfo = await bcrypt.hash(info, 8);
        return hashedInfo;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

// Exemplo de uso da função



//sendRecoverEmail('macelinovitorinomangele@gmail.com', 'fghjojodsuigiofhusbkjvbsfjs')

async function sendRecoverEmail(email, token) {


    let transporter = nodemailer.createTransport({

        host: 'smtp.zoho.com',
        port: 587,
        secure: false, // true para 465, false para outras portas
        auth: {
            user: 'abinerjr@voidpay.online',
            pass: 'Junior.@1',
        },
        tls: {
            rejectUnauthorized: false,
        }
    });
    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
           display: flex;
            justify-content: center;
            align-items: center; 
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #ffffff;
        }
        .black-button {
            width: 80px;
            display: flex;
            justify-content: center;
            align-items: center; 
             background-color: black;
            color: white; 
            border: none; 
            padding: 10px; 
            border-radius: 4px; 
            cursor: pointer; 
            text-align: center; 
        }

        .token {
            font-weight: bold;
            color: #3366cc;
        }
        h2 {
            color: #333;
        }
        p {
            color: #555;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
    <img src="https://voidabinerjr.github.io/VOIDpayWebMVP2/img/voidblacklogo.png">
        <h2><strong>Saudações!</strong></h2>
        <p>Você solicitou uma recuperação de senha para sua conta</p>
       
        
       <a class="black-button" <a href="${"https://voidpaywebmvp2.onrender.com"}/resetpassword?token=${token}" >Click</a>
        
        <div class="footer">
         <p>Este é um aviso automatizado, não responda.</p>
            <p>Se você tiver alguma dúvida ou precisar de suporte adicional, entre em contato conosco pelo site <a href="www.voidpay.online" target="_blank">www.voidpay.online</a></p>
            <p>Atenciosamente,<br>Equipe de Suporte VOIDpay</p>
        </div>
    </div>
</body>
</html>
`;



    let mailOptions = {
        from: '"VOIDPay ResetPassWord" <abinerjr@voidpay.online>',
        to: email,
        subject: 'Recuperrar Senha',
        text: 'Olá',
        html: htmlTemplate,
    };

    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Erro ao enviar e-mail: ', error);
            }
            console.log('E-mail enviado: ', info.response);
        });

        return { status: true };
    } catch (error) {
        return { status: true, error: error };
    }



};



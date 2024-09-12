const nodemailer = require('nodemailer');
require('dotenv').config();
async function sendEmail(email, token, destinationSite,buttonToken) {

    
        let transporter = nodemailer.createTransport({

            host: 'smtp.zoho.com',
            port: 587,
            secure: false, // true para 465, false para outras portas
            auth: {
                user: 'abinerjr@voidpay.online', // Seu e-mail
                pass: 'Junior.@1', // Sua senha
            },
            tls: {
                rejectUnauthorized: false, // Desativa a verificação do certificado
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
             align-content: center;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            align-content: center;
            justify-content: center;
            align-items: center;
            text-align: center;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #ffffff;
        }

        .black-button {
            width: 80px;
           
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
        <img src="https://voidabinerjr.github.io/VOIDpayWebMVP2/img/voidblacklogo.png" alt="VOIDPay Logo">
        <h2><strong>Saudações!</strong></h2>
        <p>Você solicitou ativação de botão.</p>
        <p>Autorização [Copie]: <span class="token">${token}</span></p>
        <p>Verifique o site de destino: <a href="${destinationSite}" target="_blank">${destinationSite}</a></p>
        <p>Token do botão [salve esta informação]: <span class="token">${buttonToken}</span></p>
        <div class="footer">
            <p>Este é um aviso automatizado, não responda.</p>
            <p>Se você tiver alguma dúvida ou precisar de suporte adicional, entre em contato conosco pelo site <a href="https://www.voidpay.online" target="_blank">www.voidpay.online</a>.</p>
            <p>Atenciosamente,<br>Equipe de Suporte VOIDpay</p>
        </div>
    </div>
</body>
</html>
`;



        let mailOptions = {
            from: '"VOIDPay Button" <abinerjr@voidpay.online>',
            to: email,
            subject: 'Token Validacao Botao',
            text: 'Validacao',
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
            return { status: false, error: error };
        }

    

};


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
             align-content: center;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            align-content: center;
            justify-content: center;
            align-items: center;
            text-align: center;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #ffffff;
        }

        .black-button {
            width: 80px;
           
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


        <a class="black-button"  style="color: #ffffff;" href="${process.env.WEB_URL}/resetpassword?token=${token}">Click Aqui</a>

        <div class="footer">
            <p>Este é um aviso automatizado, não responda.</p>
            <p>Se você tiver alguma dúvida ou precisar de suporte adicional, entre em contato conosco pelo site <a
                    href="www.voidpay.online" target="_blank">www.voidpay.online</a></p>
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

module.exports = { sendEmail, sendRecoverEmail };

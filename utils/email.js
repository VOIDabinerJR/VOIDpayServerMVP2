const nodemailer = require('nodemailer');

async function sendEmail(email, token, destinationSite, real) {

    if (real) {
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
            font-family: Arial, sans-serif;
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
        a {
            color: #3366cc;
            text-decoration: none;
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
        <h2>Notificação de Token para Ativar Bottao</h2>
        <p>Prezado usuário,</p>
        <p>Este é um aviso automatizado, não responda.</p>
        <p> token botao: <span class="token">${token}</span></p>
        <p>PVerifique o Site destino: <a href="" target="_blank">${destinationSite}</a> </p>
        
        <div class="footer">
            <p>Se você tiver alguma dúvida ou precisar de suporte adicional, entre em contato conosco pelo site <a href="www.voidpay.online" target="_blank">www.voidpay.online</a></p>
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
            text: 'Corpo do e-mail em texto simples',
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

    } else if (!real) {

        const data = { email: email, token: token, destinationSite: destinationSite, status: true };
        console.log({ data })
        console.log(data.status)
        return { data };
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

module.exports = { sendEmail, sendRecoverEmail };

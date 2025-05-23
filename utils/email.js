const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');
async function sendEmail(email, token, destinationSite, buttonToken) {


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
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado: ', info.response);
    return { status: true };
  } catch (error) {
    console.error('Erro ao enviar e-mail: ', error);
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
        return ('Erro ao enviar e-mail: ', error);
      }
      return ('E-mail enviado: ', info.response);
    });

    return { status: true };
  } catch (error) {
    return { status: true, error: error };
  }



};


async function sendPaymentConfirmationEmail(email, billingInfo, transactionData, produtos) {


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

  produtos.forEach(produto => {
    produto.price = parseFloat(produto.price);

  });
  let tableRows = ''; // Collect rows as a string

  produtos.forEach(produto => {
    const tr = `
          <tr>
              <td style="width: 100%;">
                  <span >${produto.name}</span>
                  <span>${produto.price.toFixed(2)} Mt × ${produto.quantity}</span><br>
              </td>
              <td style="white-space: nowrap;">
                  <p style="color: #202223; line-height: 20px; font-weight: 400; margin: 0; padding: 0;" align="right">
                      ${(produto.price * produto.quantity).toFixed(2)} Mt
                  </p>
              </td>
          </tr>`;

    tableRows += tr; // Append the row to the string
  });



  const htmlTemplates = `
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

    

    .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 0.9em;
        color: #777;
    }
       span{
       font - size: 14px; line - height: 1.42; color: #202223; }

       td{
       white - space: nowrap; }
       p{
       color: #202223; line - height: 20px; font - weight: 400; margin: 0; padding: 0; " align="right}
</style>
</head>

<body>
<div class="container">
   
  <center>
  
    <table style="width:100%;border-collapse:initial;border-spacing:0;max-width:470px;text-align:left;border-radius:8px;margin:32px auto 0;padding:0 20px;border:1px solid #c9cccf" cellpadding="0" cellspacing="0">
      <tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0">
          
        <table style="width:100%;border-collapse:initial!important;border-spacing:0;margin-top:0;margin-bottom:0;padding:20px 4px" cellpadding="0" cellspacing="0">
<tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
<td style="margin-top:0;margin-bottom:0;padding:0;border-width:0">
  <center>
    <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0" cellpadding="0" cellspacing="0">
      <tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0">
          
          <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0" cellpadding="0" cellspacing="0">
            <tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
            
              <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0">
                
                
                
                  ${billingInfo.contactName} efetuou uma compra.
                
                <table style="width:auto;border-collapse:collapse;border-spacing:0;margin-top:20px;margin-bottom:0;padding:0" cellpadding="0" cellspacing="0">
<tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
<td style="line-height:0;margin-top:0;margin-bottom:0;padding:0;border-width:0">&nbsp;</td>
</tr>
<tr style="margin-top:0;margin-bottom:0;padding:0">
  <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0">
    <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;float:left;margin-right:16px;padding:0" cellpadding="0" cellspacing="0">
      <tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
      </tr>
    </tbody></table>
  </td>
</tr>
</tbody></table>

              </td>
            </tr>
          </tbody></table>

        </td>
      </tr>
    </tbody></table>
  </center>
</td>
</tr> 
</tbody></table>
        <table style="width:100%;border-collapse:initial!important;border-spacing:0;margin-top:0;margin-bottom:0;border-top-width:1px;border-top-color:#c9cccf;border-top-style:solid;padding:20px 4px" cellpadding="0" cellspacing="0">
<tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
<td style="margin-top:0;margin-bottom:0;padding:0;border-width:0">
  <center>
    <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0" cellpadding="0" cellspacing="0">
      <tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0">
          
          <strong style="color:#202223;font-weight:600;font-size:16px">Resumo do Pedido</strong>
          <br>
          <br>
          
<table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0" cellpadding="0" cellspacing="0">


<tbody> <tr style="margin-top:0;margin-bottom:0;width:100%;padding:0">
<td style="margin-top:0;margin-bottom:0;padding:0 0 20px;border-width:0">
<table id="tabela-produtos" style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0" cellpadding="0" cellspacing="0">
  <tbody>
    <script>
    
       
    
        //const tabelaBody = document.querySelector("#tabela-produtos tbody");
    //  let produtos = ${JSON.stringify(produtos)}


    //    produtos.forEach(produto => {
    //        const tr = document.createElement("tr");
    //;
 // let a = "           tr.innerHTML = " + " < td > 
 // let b = "       <span >produto.name</span><br>"
 // let c = "   <span>{produto.price.toFixed(2)} Mt × {produto.quantity}</span><br>"
//  let d = "   </td>"
//  let e = "  <td >"
 // let f = "     <p  >.       MZN  "
 // let g = "        {(produto.price * produto.quantity).toFixed(2)} Mt "
 // let h = "   </p>"
 // let i = "   </td>;"
//  let j =  
//          tabelaBody.appendChild(tr);
 //       });

 //tabelaBody.appendChild({tr});
    </script ></tbody ></table >
</td >
</tr >

 ${tableRows}
</tbody ></table >



    <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0" cellpadding="0" cellspacing="0">
      <tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0">
          <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0" cellpadding="0" cellspacing="0">










            <tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
              <td style="margin-top:0;margin-bottom:0;padding:2px 0;border-width:0">
                <p style="color:#202223;line-height:1.42em;margin:0;padding:0">

                  <span>Subtotal</span>

                </p>
              </td>
              <td style="margin-top:0;margin-bottom:0;padding:2px 0;border-width:0" align="right">

                ${transactionData.amount}.00 Mt

              </td>
            </tr>







              <tr style="margin-top:0;margin-bottom:0;padding:0">
                <td style="margin-top:0;margin-bottom:0;padding:2px 0;border-width:0">
                  <p style="color:#202223;line-height:1.42em;margin:0;padding:0">

                    <span>Shipping</span>

                    <span>
                      <span style="line-height:1.42em;color:#6d7175"></span>
                    </span>
                  </p>
                </td>
                <td style="margin-top:0;margin-bottom:0;padding:2px 0;border-width:0" align="right">

                  0.00 Mt

                </td>
              </tr>








            </tbody></table>
          <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0" cellpadding="0" cellspacing="0">

            <tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
              <td style="margin-top:0;margin-bottom:0;font-weight:bold;padding:20px 0 0;border-width:0">
                <p style="color:#202223;line-height:1.42em;margin:0;padding:0">

                  <span>Total</span>

                </p>
              </td>
              <td style="margin-top:0;margin-bottom:0;font-weight:bold;padding:20px 0 0;border-width:0" align="right">

                ${transactionData.amount}.00 Mt

              </td>
            </tr>

            </tbody></table>
        </td>
      </tr>
      </tbody></table>


        </td >
      </tr >
    </tbody ></table >
  </center >
</td >
</tr >
</tbody ></table >
    <table style="width:100%;border-collapse:initial!important;border-spacing:0;margin-top:0;margin-bottom:0;border-top-width:1px;border-top-color:#c9cccf;border-top-style:solid;padding:20px 4px" cellpadding="0" cellspacing="0">
      <tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0">
          <center>
            <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0" cellpadding="0" cellspacing="0">
              <tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
                <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0">


                  <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0" cellpadding="0" cellspacing="0">
                    <tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
                      <td style="margin-top:0;margin-bottom:0;width:50%;padding:0;border-width:0">
                        <strong style="color:#202223">Método de Processamento do Pagamento</strong>
                        <br>
                          <p style="color:#202223;line-height:20px;margin:0;padding:0">VOIDpay Payment Gateway</p>
                          ID da Transação:  ${transactionData.transactionId} <br>
                            Data:  ${transactionData.date}
                            <br>

                            </td>
                          </tr>
                        </tbody></table>



                      <br>
                        <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0" cellpadding="0" cellspacing="0">
                          <tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
                            <td style="margin-top:0;margin-bottom:0;width:50%;padding:0;border-width:0">
                              <strong style="color:#202223">Shipping address</strong>
                              <br>
                                <p style="color:#202223;line-height:20px;margin:0;padding:0">

                                  ${billingInfo.contactName} <br>


                                    ${billingInfo.address} <br>

                                      ${billingInfo.city} ,

                                      ${billingInfo.city}

                                      ${billingInfo.postCode} <br>
                                        Mozambique<br>

                                          ${billingInfo.phoneNumber} <br>
                                          </p>
                                        </td>
                                      </tr>

                                    </tbody></table>


                                </td>
                              </tr>
                            </tbody></table>
                          </center>
                        </td>
                    </tr>
                    </tbody></table>

                </td>
              </tr>
              </tbody></table>
          </center>



          <div class="footer">
            <p><a>  <img style="width:10%;" src="https://voidabinerjr.github.io/VOIDpayWebMVP2/img/voidblacklogo.png"></a></p>

            <p>  <a href="www.voidpay.online" target="_blank">www.voidpay.online</a></p>
            <p>Atenciosamente,<br>Equipe de Suporte VOIDpay</p>
          </div>
        </div>
      </body>

      </html>
      `;


  let htmlTemplate = htmlTemplates; // + a + b + c + d + e + f + g + h + i + j;




  let mailOptions = {
    from: '"VOIDPay Pagamento Efetuado" <abinerjr@voidpay.online>',
    to: email,
    subject: 'Pagamento Efetuado',
    text: 'Olá',
    html: htmlTemplate,
  };

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return ('Erro ao enviar e-mail: ', error);
      }
      return ('E-mail enviado: ', info.response);
    });

    return { status: true };
  } catch (error) {
    return { status: true, error: error };
  }


};


module.exports = { sendEmail, sendRecoverEmail, sendPaymentConfirmationEmail };
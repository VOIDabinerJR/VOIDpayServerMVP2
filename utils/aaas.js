const fs = require('fs'); // Importa o módulo fs para manipulação de arquivos

// Define a string a ser escrita no arquivo

const billingInfo = {
    "contactName": "Abiner Junior",
    "phoneNumber": "258 86 521 8679",
    "email": "abinermaleianejr@gmail.com",
    "address": "Matola, Maputo,Mozambique",
    "city": "Matola",
    "postCode": "1114",
}
const transactionData = {
    transactionId: "VOID6234",
    amount: "1000",
    date: new Date().toLocaleDateString()
};
let produtos = [
    { nome: "Camisa Verde", preco: 100.00, quantidade: 1 },
    { nome: "Calça Jeans", preco: 150.00, quantidade: 2 },
    { nome: "Tênis Esportivo", preco: 200.00, quantidade: 1 },

];

const htmlTemplates0 = `
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
    
       
    
        const tabelaBody = document.querySelector("#tabela-produtos tbody");
      let produtos = [
    { nome: "Camisa Verde", preco: 100.00, quantidade: 1 },
    { nome: "Calça Jeans", preco: 150.00, quantidade: 2 },
    { nome: "Tênis Esportivo", preco: 200.00, quantidade: 1 },
    
];   

      
        produtos.forEach(produto => {
            const tr = document.createElement("tr");
    ;
              tr.innerHTML =`
                <td style="width: 100%;">
                    <span style="font-size: 14px; line-height: 1.42; color: #202223;">produto.nome</span><br>
                   <span>${produto.preco.toFixed(2)} Mt × ${produto.quantidade}</span><br>
                </td>
                <td style="white-space: nowrap;">
                    <p style="color: #202223; line-height: 20px; font-weight: 400; margin: 0; padding: 0;" align="right">
                        ${(produto.preco * produto.quantidade).toFixed(2)} Mt
                    </p>
                </td>`
    


` ;
            tabelaBody.appendChild(tr);
        });
    
    </script></tbody></table>
</td>
</tr>


</tbody></table>



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
          
          
            <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0" cellpadding="0" cellspacing="0">
              <tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
                <td style="margin-top:0;margin-bottom:0;width:50%;padding:0;border-width:0">
                  <strong style="color:#202223">Método de Processamento do Pagamento</strong>
                  <br>
                   <p style="color:#202223;line-height:20px;margin:0;padding:0">VOIDpay Payment Gateway</p>
                 ID da Transação:  ${transactionData.transactionId} <br>
                 Data: transactionData.date
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
    <p><a>  <img  style="width:10%;" src="https://voidabinerjr.github.io/VOIDpayWebMVP2/img/voidblacklogo.png"></a></p>
       
               <p>  <a href="www.voidpay.online" target="_blank">www.voidpay.online</a></p>
        <p>Atenciosamente,<br>Equipe de Suporte VOIDpay</p>
    </div>
</div>
</body>

</html>
`;

console.log(htmlTemplates0 +crase+htmlTemplates1+crase+htmlTemplates2)
// Cria o arquivo HTML com o conteúdo especificado
fs.writeFile('emailTemplate.ejs', htmlTemplates0 +crase+htmlTemplates1+crase+htmlTemplates2, (err) => {
    if (err) {
        console.error('Erro ao criar o arquivo:', err);
    } else {
        console.log('Arquivo HTML criado com sucesso: emailTemplate.html');
    }
});
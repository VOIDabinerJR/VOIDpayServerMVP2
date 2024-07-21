document.addEventListener('DOMContentLoaded', function () {
   
    

    const buttonpay = document.getElementById('pay')
    console.log("ooi")
    console.log("ooi")
    console.log("ooi")

   



buttonpay.addEventListener('click', async function (event) {
        event.preventDefault(); // Previne o comportamento padrão do botão
        async function sendOrder() {
         
            const dd = document.getElementById('cardNumber').value
            const data = {
               
                buttonToken: cc,
                productId: aa,
                quantity: bb,
                description: "1234567890",
                cardNumber:cardNumber,
                paymentMethod: 'mobileWallet'
            };
            try {
                const response = await fetch('https://voidpayservermvp2.onrender.com/pay/processPayment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                
                // Exibir a resposta como texto
                const result = await response.text();
                document.body.innerHTML = result;
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }
        sendOrder()

    
    });

    // Adicionando o botão ao container
    container.appendChild(button);
});
function starts() {
    const numStars = 30;
    const container = document.body;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's'; // Duração aleatória
        container.appendChild(star);
    }
}
async function sendOrder() {
         
    const cardNumber = document.getElementById('cardNumber').value
    const paymentDetails = {
        buttonToken: null,
        productId: null,
        quantity: null,
        description: "1234567890",
        cardNumber:cardNumber,
        paymentMethod: 'mobileWallet'
    };
    try {
        const response = await fetch('https://voidpayservermvp2.onrender.com/pay/processPayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentDetails)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log(response)
        // Exibir a resposta como texto
        const result = await response.json();
        
       // document.body.innerHTML = 
      window.location.href = result.redirectUrl;
   
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
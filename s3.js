document.addEventListener('DOMContentLoaded', function () {



    const buttonpay = document.getElementById('payButton')
    console.log("ooi")


    buttonpay.addEventListener('click', async function (event) {
        event.preventDefault(); // Previne o comportamento padrão do botão
        async function sendOrder() {

            const buttonToken = document.getElementById('buttonToken').value
            const contactName = document.getElementById('contactName').value
            const phoneNumber = document.getElementById('phoneNumber').value
            const email = document.getElementById('email').value
            const address = document.getElementById('address').value
            const city = document.getElementById('city').value
            const postCode = document.getElementById('postCode').value
            const cardNumber = document.getElementById('card-number').value
            const expiryDate = document.getElementById('expiry-date').value
            const securityCode = document.getElementById('security-code').value
            const mobileWallet = document.getElementById(' mobileWallet-number').value
            const paymentMethod = document.getElementById(' paymentMethod').value;



            const data = {
                buttonToken: buttonToken,
                contactName: contactName,
                phoneNumber: phoneNumber,
                email: email,
                address: address,
                city: city,
                postCode: postCode,
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                securityCode: securityCode,
                mobileWallet: mobileWallet,
                paymentMethod: paymentMethod
            };
            console.log(data)
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
    const buttonToken = document.getElementById('buttonToken').value
    const contactName = document.getElementById('contactName').value
    const phoneNumber = document.getElementById('phoneNumber').value
    const email = document.getElementById('email').value
    const address = document.getElementById('address').value
    const city = document.getElementById('city').value
    const postCode = document.getElementById('postCode').value
    const cardNumber = document.getElementById('card-number').value
    const expiryDate = document.getElementById('expiry-date').value
    const securityCode = document.getElementById('security-code').value
    const mobileWallet = document.getElementById(' mobileWallet-number').value
    const paymentMethod = document.getElementById(' paymentMethod').value;



    const paymentDetails = {
        buttonToken: buttonToken,
        contactName: contactName,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        city: city,
        postCode: postCode,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        securityCode: securityCode,
        mobileWallet: mobileWallet,
        paymentMethod: paymentMethod
    };
    console.log(paymentDetails)

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
// paypal-sdk-simulado.js
(function (global) {
    function simulatePayPalButtons(config) {
        const { createOrder, onApprove, onError } = config;

        // Simula a renderização do botão
        const render = function (containerSelector) {
            const container = document.querySelector(containerSelector);
            if (!container) {
                console.error('Container não encontrado');
                return;
            }

            // Criando o botão
            const button = document.createElement('button');
            button.id = 'void-pay-button';
            button.type = 'submit';

            // Criando a imagem do ícone
            const icon = document.createElement('img');
            icon.src = 'https://raw.githubusercontent.com/VOIDabinerJR/sdk/main/void.jpg'; // Substitua pelo caminho do seu ícone
            icon.alt = 'Ícone do Void Pay';
            icon.style.verticalAlign = 'middle'; // Ajustando o alinhamento vertical do ícone
 
            // Texto do botão
            const buttonText = document.createTextNode('Pagar');

            // Adicionando o ícone e o texto ao botão
            button.appendChild(buttonText);
            button.appendChild(icon);

            // Estilos básicos do botão
            button.style.display = 'inline-block';
            button.style.backgroundColor = '#0a0a0a';
            button.style.color = 'white';
            button.style.fontSize = '18px';
            button.style.padding = '10px 20px';
            button.style.border = 'none';
            button.style.borderRadius = '5px';
            button.style.cursor = 'pointer';
            button.style.textAlign = 'center';
            button.style.textDecoration = 'none';
            button.style.transition = 'background-color 0.3s, box-shadow 0.3s, transform 0.1s';

            // Estilos ao focar o botão pelo cursor
            button.addEventListener('mouseenter', function () {
                button.style.backgroundColor = '#0a0a0a';
                button.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.4)';
            });

            // Removendo estilos ao desfocar o botão pelo cursor
            button.addEventListener('mouseleave', function () {
                button.style.backgroundColor = '#0a0a0a';
                button.style.boxShadow = 'none';
            });

            // Estilos ao clicar no botão
            button.addEventListener('mousedown', function () {
                button.style.backgroundColor = '#0a0a0a';
                button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
                button.style.transform = 'translateY(2px)';
            });

            // Estilos ao soltar o clique no botão
            button.addEventListener('mouseup', function () {
                button.style.backgroundColor = '#0a0a0a';
                button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                button.style.transform = 'translateY(0)';
            });


            button.addEventListener('click', async function () {
                event.preventDefault(); // Previne o comportamento padrão do botão
                async function sendOrder() {
                    const aa = document.getElementById('product-id').value
                    const bb = document.getElementById('quantity').value
                    const cc = document.getElementById('void-button-container').getAttribute('name')
                    const data = {
                        buttonToken: cc,
                        productId: aa,
                        quantity: bb,
                        description: "1234567890"
                    };
                    try {
                        const response = await fetch('http://localhost:3000/order/createOrder', {
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

            container.appendChild(button);
        };

        // Expõe a função de renderização globalmente
        global.simulatePayPalButtons = {
            render
        };
    }

    // Define a SDK simulada globalmente
    global.simulatePayPalButtons = simulatePayPalButtons;
})(window);

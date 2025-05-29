import cardValidator from 'https://cdn.jsdelivr.net/npm/card-validator@latest/dist/card-validator.esm.js';

document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#expiry-date", {
        dateFormat: "m/y",
        altFormat: "F Y",
        altInput: true,
        maxDate: "today"
    });

    const cityInput = document.getElementById('city');
    const autocomplete = new google.maps.places.Autocomplete(cityInput, {
        types: ['(cities)'],
        componentRestrictions: { country: 'br' } // Restringir para o Brasil (opcional)
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        const place = autocomplete.getPlace();
       
        // Você pode fazer algo com os dados do lugar aqui
    }); 
    document.getElementById('payButton').addEventListener('click', () => {
        const rocket = document.getElementById('rocket');
        rocket.style.display = 'block';

        // Remove a classe se já estiver animando para reiniciar a animação
        rocket.classList.remove('flying');

        // Força a reflow para reiniciar a animação
        void rocket.offsetWidth;

        // Adiciona a classe para iniciar a animação
        rocket.classList.add('flying');

        // Desativa o botão
        const button = document.getElementById('payButton');
        button.style.background = 'rgb(0,0,0,0.8)';
        button.style.cursor = 'not-allowed';
        button.innerText = 'Processando...';
    });

    document.getElementById('mobileWallet-number').addEventListener('input', () => {
        const inputValue = document.getElementById('mobileWallet-number').value;
        const image = document.getElementById('mobileWalletImg');
        const firstTwoChars = inputValue.substring(0, 2).toLowerCase();

        if (firstTwoChars === '86' || firstTwoChars === '87') {
            image.src = 'https://voidabinerjr.github.io/VOIDpayServerMVP2/views/formulario/assets/movitel.png';
        } else if (firstTwoChars === '84' || firstTwoChars === '85') {
            image.src = 'https://voidabinerjr.github.io/VOIDpayServerMVP2/views/formulario/assets/vodacom.png';
        } else if (firstTwoChars === '83' || firstTwoChars === '82') {
            image.src = 'https://voidabinerjr.github.io/VOIDpayServerMVP2/views/formulario/assets/tmcel.png';
        } else {
            image.src = 'https://voidabinerjr.github.io/VOIDpayServerMVP2/views/formulario/default-image.jpg';
        }
    });

    function stars() {
        const numStars = 100; // Aumentar o número de estrelas para uma cobertura mais completa
        const container = document.body;

        // Limpa as estrelas existentes
        const existingStars = document.querySelectorAll('.star');
        existingStars.forEach(star => star.remove());

        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            // Distribuir as estrelas por toda a área visível da tela
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.animationDuration = (Math.random() * 2 + 2) + 's'; // Duração aleatória

            // Adicionar a estrela ao contêiner
            container.appendChild(star);
        }
    }

    

    function cardspace(){
        var carddigit = document.getElementById('cardnumber').value;
        if(carddigit.length == 4 || carddigit.length == 9 || carddigit.length ==14){
            document.getElementById('cardnumber').value = carddigit+" ";
            document.getElementById('cardnumber').max = 1;
         }
         
    
    }

    function togglePaymentForm(method) {
        const label = document.createElement('label');
        label.id = 'paymentMethod';
        label.textContent = method;
        label.className =method;
        label.setAttribute('method',method);
        label.style.display = 'none';
        document.body.appendChild(label);

        const cardForm = document.getElementById('card-form');
        const mobileWalletForm = document.getElementById('mobileWallet-form');
        const paypalForm = document.getElementById('paypal-form');

        if (method === 'card') {
            cardForm.style.display = 'block';
            mobileWalletForm.style.display = 'none';
            paypalForm.style.display = 'none';
        } else if (method === 'mobileWallet') {
            cardForm.style.display = 'none';
            mobileWalletForm.style.display = 'block';
            paypalForm.style.display = 'none';
        } else if (method === 'paypal') {
            cardForm.style.display = 'none';
            mobileWalletForm.style.display = 'none';
            paypalForm.style.display = 'block';
        } else {
            cardForm.style.display = 'block';
            mobileWalletForm.style.display = 'none';
            paypalForm.style.display = 'none';
        }
    }

    const addressInput = document.getElementById('contactName');
    const header = document.querySelector('.header');
    const logo = document.querySelector('.logo');

    addressInput.addEventListener('input', function () {
        if (this.value.length > 0) {
            header.classList.add('active');
            logo.classList.add('active');
        } else {
            header.classList.remove('active');
            logo.classList.remove('active');
        }
    });
});

function cardspace(){
    var carddigit = document.getElementById('cardnumber').value;
    if(carddigit.length == 4 || carddigit.length == 9 || carddigit.length ==14){
        document.getElementById('cardnumber').value = carddigit+" ";
        document.getElementById('cardnumber').max = 1;
     }
     

}
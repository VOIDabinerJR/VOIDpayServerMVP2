const cardValidator = require('card-validator');

document.getElementById('payButton').addEventListener('click', () => {
    const button = document.getElementById('payButton');
    button.style.cursor = 'not-allowed';
    button.innerText = 'Não permitido';
});
 
document.getElementById('card-number').addEventListener('input', () => {
    const number = document.getElementById('card-number').value;
    const numberValidation = cardValidator.number(number);
    const numberInput = document.getElementById('card-number');
  
    if (numberValidation.isValid) {
        numberInput.classList.remove('input-error');
    } else {
        numberInput.classList.add('input-error');
    }
 
});  
 
document.getElementById('expiry-date').addEventListener('input', () => {
    const expirationDate = document.getElementById('expiry-date').value;
    const expirationDateValidation = cardValidator.expirationDate(expirationDate);
    const expirationInput = document.getElementById('expiry-date');
    
    if (expirationDateValidation.isValid) {
        expirationInput.classList.remove('input-error');
    } else {
        expirationInput.classList.add('input-error');
    }
});

document.getElementById('security-code').addEventListener('input', () => {
    const cvv = document.getElementById('security-code').value;
    const cvvValidation = cardValidator.cvv(cvv);
    const cvvInput = document.getElementById('security-code');
    
    if (cvvValidation.isValid) {
        cvvInput.classList.remove('input-error');
    } else {
        cvvInput.classList.add('input-error');
    }
});


















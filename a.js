function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function printRandomStrings(duration, interval, length) {
    const endTime = Date.now() + duration;
    const intervalId = setInterval(() => {
        if (Date.now() >= endTime) {
            clearInterval(intervalId);
            console.log('Finished generating random strings.');
        } else {
            console.log(generateRandomString(length));
        }
    }, interval);
}

// Chama a função para imprimir linhas de 50 caracteres aleatórios por 20 segundos
printRandomStrings(20000, 1, 150);

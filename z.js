const readline = require('readline');

// Criar interface para capturar a entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function simulaLancamentos(n) {
    let caras = 0;
    let coroas = 0;
    let longos = 0;
    
    // Simula os lançamentos
    for (let i = 0; i < n; i++) {
        const lancamento = Math.random();
        
        // Escolhe aleatoriamente entre 'cara', 'coroa' ou 'longo'
        if (lancamento < 0.33) {
            caras++;
        } else if (lancamento < 0.66) {
            coroas++;
        } else {
            longos++;
        }
    }
    
    // Calcula as percentagens
    const percentualCaras = (caras / n) * 100;
    const percentualCoroas = (coroas / n) * 100;
    const percentualLongos = (longos / n) * 100;
    
    // Exibe os resultados
    console.log(`Total de lançamentos: ${n}`);
    console.log(`Percentual de caras: ${percentualCaras.toFixed(2)}%`);
    console.log(`Percentual de coroas: ${percentualCoroas.toFixed(2)}%`);
    console.log(`Percentual de longos: ${percentualLongos.toFixed(2)}%`);
}

// Solicita o número de lançamentos
rl.question("Digite o número de lançamentos: ", (input) => {
    const n = parseInt(input);
    simulaLancamentos(n);
    rl.close();
});
    
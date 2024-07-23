document.getElementById('launch-button').addEventListener('click', () => {
    
    const rocket = document.getElementById('rocket');
    
    // Remove a classe se já estiver animando para reiniciar a animação
    rocket.classList.remove('flying');
    
    // Força a reflow para reiniciar a animação
    void rocket.offsetWidth;
    
    // Adiciona a classe para iniciar a animação
    rocket.classList.add('flying');
});

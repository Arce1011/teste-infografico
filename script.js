document.addEventListener('DOMContentLoaded', function() {
    // Pega o botão pelo ID
    const botao = document.getElementById('meuBotao');
    // Pega a área onde a mensagem será exibida
    const areaMensagem = document.getElementById('mensagemArea');

    // Adiciona um ouvinte de evento para o clique no botão
    botao.addEventListener('click', function() {
        areaMensagem.textContent = 'O JavaScript funcionou e você clicou no botão!';
    });
});
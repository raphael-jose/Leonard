// Função para adicionar uma nova mensagem ao chat
function addMessage(message, isUser = false) {
    const chatDisplay = document.getElementById('chat-display');
    const messageContainer = document.createElement('div');
    messageContainer.className = `message-container ${isUser ? 'user-message' : 'leonard-message'}`;

    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble';
    messageBubble.textContent = message;

    messageContainer.appendChild(messageBubble);
    chatDisplay.appendChild(messageContainer);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Função para enviar mensagem
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();

    if (message) {
        // Adiciona a mensagem do usuário
        addMessage(message, true);
        input.value = '';

        // Simula a resposta do Leonard (você pode substituir isso pela sua lógica de IA)
        setTimeout(() => {
            addMessage('Olá! Sou o Leonard, como posso ajudar?');
        }, 1000);
    }
}

// Event listener para enviar mensagem com Enter
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Função para criar nova conversa
document.querySelector('.new-chat')?.addEventListener('click', function() {
    document.getElementById('chat-display').innerHTML = '';
    addMessage('Olá! Como posso ajudar você hoje?');
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Mensagem inicial
    addMessage('Olá! Como posso ajudar você hoje?');
});

// Função para enviar mensagem do usuário
function sendMessage() {
    // Obtém o elemento de entrada de texto do usuário
    var userInput = document.getElementById("user-input");

    // Obtém o texto digitado pelo usuário
    var messageText = userInput.value;

    // Verifica se o texto não está vazio
    if (messageText.trim() === "") {
        return; // Não faz nada se o texto estiver vazio
    }

    // Cria um novo elemento de balão de mensagem para o usuário
    var userMessage = document.createElement("div");
    userMessage.classList.add("message-container", "user-message");

    // Cria o balão de mensagem para o usuário
    var messageBubble = document.createElement("div");
    messageBubble.classList.add("message-bubble");
    messageBubble.textContent = messageText;

    // Adiciona o balão de mensagem ao elemento de mensagem do usuário
    userMessage.appendChild(messageBubble);

    // Adiciona o elemento de mensagem do usuário à área de exibição do chat
    var chatDisplay = document.getElementById("chat-display");
    chatDisplay.appendChild(userMessage);

    // Limpa o campo de entrada de texto do usuário
    userInput.value = "";

    // Simula uma resposta do assistente de IA
    var iaResponse = "Olá! Eu sou o Leonard, seu assistente virtual. Como posso ajudar você?";
    // Chama a função para exibir a resposta do assistente de IA
    displayIAResponse(iaResponse);
}

// Função para exibir a resposta do assistente de IA
function displayIAResponse(responseText) {
    // Cria um novo elemento de balão de mensagem para o assistente de IA
    var iaMessage = document.createElement("div");
    iaMessage.classList.add("message-container", "leonard-message");

    // Cria o balão de mensagem para o assistente de IA
    var messageBubble = document.createElement("div");
    messageBubble.classList.add("message-bubble");
    messageBubble.textContent = responseText;

    // Adiciona o balão de mensagem ao elemento de mensagem do assistente de IA
    iaMessage.appendChild(messageBubble);

    // Adiciona o elemento de mensagem do assistente de IA à área de exibição do chat
    var chatDisplay = document.getElementById("chat-display");
    chatDisplay.appendChild(iaMessage);
}

// Captura o evento de pressionar a tecla Enter no campo de entrada de texto do usuário
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // Chama a função para enviar a mensagem do usuário
        sendMessage();
    }
});

function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    var chatDisplay = document.getElementById("chat-display");

    // Exibe a mensagem do usuário
    var userMessage = document.createElement("div");
    userMessage.innerHTML = "<strong>Você:</strong> " + userInput;
    chatDisplay.appendChild(userMessage);

    // Resposta do assistente
    var assistantResponse = document.createElement("div");
    assistantResponse.innerHTML = "<strong>Leonard:</strong> Olá! Como posso ajudar?";
    chatDisplay.appendChild(assistantResponse);

    // Limpa o campo de entrada do usuário
    document.getElementById("user-input").value = "";

    // Rola para o final do chat
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

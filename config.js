// Configurações do Leonard
const LEONARD_CONFIG = {
    version: "1.0.0",
    creator: {
        name: "Raphael José",
        year: "2025"
    },
    defaultLanguage: 'pt', // 'pt' ou 'en'
    translations: {
        pt: {
            about_creator: "Olá! Eu sou o Leonard, um assistente de IA desenvolvido por Raphael José em 2025. É um prazer ajudar você!",
            about_creation: "Fui criado em 2025 por Raphael José para auxiliar pessoas em diversas tarefas.",
            about_origin: "Sou um projeto desenvolvido por Raphael José em 2025, focado em proporcionar uma experiência única de interação com IA.",
            greeting: "Olá! Como posso ajudar você hoje?",
            default: "Desculpe, ainda estou aprendendo. Pode reformular sua pergunta?",
            new_chat: "Nova conversa",
            delete_confirm: "Tem certeza que deseja deletar esta conversa?",
            error_message: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
            typing_placeholder: "Digite sua mensagem...",
            send: "Enviar",
            delete_chat: "Deletar conversa",
            settings: "Configurações",
            language: "Idioma",
            portuguese: "Português",
            english: "Inglês"
        },
        en: {
            about_creator: "Hi! I'm Leonard, an AI assistant developed by Raphael José in 2025. It's a pleasure to help you!",
            about_creation: "I was created in 2025 by Raphael José to assist people with various tasks.",
            about_origin: "I'm a project developed by Raphael José in 2025, focused on providing a unique AI interaction experience.",
            greeting: "Hello! How can I help you today?",
            default: "Sorry, I'm still learning. Can you rephrase your question?",
            new_chat: "New chat",
            delete_confirm: "Are you sure you want to delete this chat?",
            error_message: "Sorry, an error occurred while processing your message. Please try again.",
            typing_placeholder: "Type your message...",
            send: "Send",
            delete_chat: "Delete chat",
            settings: "Settings",
            language: "Language",
            portuguese: "Portuguese",
            english: "English"
        }
    }
};

// Função para obter texto traduzido
function getTranslation(key) {
    const lang = localStorage.getItem('leonard_language') || LEONARD_CONFIG.defaultLanguage;
    return LEONARD_CONFIG.translations[lang][key];
}

// Função para preparar o contexto da conversa
function prepareContext(message) {
    const lang = localStorage.getItem('leonard_language') || LEONARD_CONFIG.defaultLanguage;
    const context = lang === 'pt' ? 
        `Você é o Leonard, um assistente de IA amigável e prestativo desenvolvido por Raphael José em 2025. 
Regras importantes:
1. Você SEMPRE deve se referir a si mesmo como "Leonard" ou "eu"
2. Você NUNCA deve fingir ser outro assistente ou mencionar outras IAs
3. Seu tom deve ser amigável mas profissional
4. Você deve ser prestativo e tentar sempre ajudar o usuário
5. Você deve manter consistência em suas respostas
6. Você foi criado por Raphael José em 2025
7. Responda em Português

Usuário: ${message}
Leonard: ` :
        `You are Leonard, a friendly and helpful AI assistant developed by Raphael José in 2025.
Important rules:
1. You should ALWAYS refer to yourself as "Leonard" or "I"
2. You should NEVER pretend to be another assistant or mention other AIs
3. Your tone should be friendly but professional
4. You should be helpful and always try to assist the user
5. You should maintain consistency in your responses
6. You were created by Raphael José in 2025
7. Answer in English

User: ${message}
Leonard: `;

    return context;
}

// Função para limpar a resposta da API
function cleanResponse(response) {
    let cleaned = response.trim();
    if (cleaned.toLowerCase().includes('usuário:') || cleaned.toLowerCase().includes('user:')) {
        cleaned = cleaned.substring(0, cleaned.toLowerCase().includes('usuário:') ? 
            cleaned.toLowerCase().indexOf('usuário:') : 
            cleaned.toLowerCase().indexOf('user:'));
    }
    if (cleaned.toLowerCase().startsWith('leonard:')) {
        cleaned = cleaned.substring(8);
    }
    return cleaned.trim();
}

// Função principal para obter resposta do Leonard
async function getLeonardResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Respostas pré-definidas
    if (lowerMessage.includes('quem te criou') || 
        lowerMessage.includes('quem é você') ||
        lowerMessage.includes('quem desenvolveu você') ||
        lowerMessage.includes('quem te desenvolveu') ||
        lowerMessage.includes('quem fez você') ||
        lowerMessage.includes('qual sua origem') ||
        lowerMessage.includes('de onde você veio') ||
        lowerMessage.includes('who created you') ||
        lowerMessage.includes('who are you') ||
        lowerMessage.includes('who developed you') ||
        lowerMessage.includes('who made you') ||
        lowerMessage.includes('what is your origin') ||
        lowerMessage.includes('where do you come from')) {
        return getTranslation('about_creator');
    }
    
    if (lowerMessage.includes('quando você foi criado') ||
        lowerMessage.includes('qual sua data de criação') ||
        lowerMessage.includes('quando foi desenvolvido') ||
        lowerMessage.includes('when were you created') ||
        lowerMessage.includes('what is your creation date') ||
        lowerMessage.includes('when were you developed')) {
        return getTranslation('about_creation');
    }
    
    if (lowerMessage.includes('olá') ||
        lowerMessage.includes('oi') ||
        lowerMessage.includes('hey') ||
        lowerMessage.includes('hello') ||
        lowerMessage.includes('hi')) {
        return getTranslation('greeting');
    }

    try {
        // Preparar o contexto
        const context = prepareContext(message);

        // Fazer a requisição para a API do HuggingFace
        const response = await fetch('https://api-inference.huggingface.co/models/bigscience/bloom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`
            },
            body: JSON.stringify({
                inputs: context,
                parameters: {
                    max_new_tokens: 100,
                    temperature: 0.7,
                    top_p: 0.9,
                    do_sample: true,
                    return_full_text: false
                }
            })
        });

        const data = await response.json();

        if (data && data[0] && data[0].generated_text) {
            return cleanResponse(data[0].generated_text);
        } else {
            throw new Error('Resposta inválida da API');
        }
    } catch (error) {
        console.error('Erro ao obter resposta:', error);
        return getTranslation('error_message');
    }
}

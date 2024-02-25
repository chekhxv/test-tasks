function createChatUI() {
    var chatContainer = document.createElement('div');
    chatContainer.id = 'chat';
    chatContainer.style.display = 'none'; // Скрыть по умолчанию
    chatContainer.innerHTML = `
        <div id="chat-messages" style="overflow-y: auto; max-height: 200px;"></div>
        <form id="chat-form" style="display: flex; padding: 5px;">
            <input type="text" id="chat-input" placeholder="Введите сообщение" style="flex-grow: 1;"/>
            <button type="submit">Отправить</button>
        </form>
    `;
    document.body.appendChild(chatContainer);
}

videojs.registerPlugin('chatPlugin', function(options) {
    var player = this;
    createChatUI();

    var chatUI = document.getElementById('chat');
    var chatMessages = document.getElementById('chat-messages');

    function loadMessages() {
        chatMessages.innerHTML = ''; 
        var messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.forEach(function(message) {
            var messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
        });
    }

    player.on('play', function() {
        chatUI.style.display = 'block';
        loadMessages();
    });

    function saveMessage(message) {
        var messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.push(message);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

    document.getElementById('chat-form').addEventListener('submit', function(event) {
        event.preventDefault();
        var message = document.getElementById('chat-input').value;
        if (message) {
            saveMessage(message);
            var messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
            document.getElementById('chat-input').value = '';
        }
    });
});

videojs('my-video').chatPlugin();


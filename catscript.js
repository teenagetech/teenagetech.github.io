//catscript.js
function generateMeows(userMessage) {
  const meows = Math.floor(Math.random() * 10) + 1;
  let meowSentence = '';
  const punctuation = ['.', '!', '?', ',', ''];

  let capitalizeNext = true;

  for (let i = 0; i < meows; i++) {
    if (capitalizeNext) {
      meowSentence += 'Meow';
      capitalizeNext = false;
    } else {
      meowSentence += 'meow';
    }

    if (i < meows - 1) {
      const randomPunctuation = punctuation[Math.floor(Math.random() * punctuation.length)];
      meowSentence += randomPunctuation + ' ';
      if (['.', '!', '?'].includes(randomPunctuation)) {
        capitalizeNext = true;
      }
    } else {
      const lastChar = userMessage.slice(-1);
      if (lastChar === '?') {
        meowSentence += punctuation[Math.floor(Math.random() * 2)];
      } else {
        meowSentence += punctuation[Math.floor(Math.random() * 3)];
      }
    }
  }

  return meowSentence.trim();
}


function sendMessage() {
  const input = document.getElementById('user-input');
  const messageText = input.value.trim();

  if (messageText) {
      addMessage(messageText, 'user-message');
      saveChatHistory(messageText, 'user-message');
      const catResponse = generateMeows(messageText);
      addMessage(catResponse, 'cat-message');
      saveChatHistory(catResponse, 'cat-message');

      input.value = '';
  }
}

function addMessage(text, className) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${className} ${className === 'cat-message' ? 'fade-in' : ''}`;
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function saveColorMode() {
  const isGreenMode = document.body.classList.contains('green-mode');
  localStorage.setItem('colorMode', isGreenMode ? 'green-mode' : 'light-mode');
}

function applySavedColorMode() {
  const savedMode = localStorage.getItem('colorMode');
  if (savedMode === 'green-mode') {
    document.body.classList.add('green-mode');
  } else {
    document.body.classList.remove('green-mode');
  }
}
document.getElementById('toggle-mode').addEventListener('click', () => {
  document.body.classList.toggle('green-mode');
  saveColorMode();
});
applySavedColorMode();


function resetChat() {
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML = '';
  localStorage.removeItem('chatHistory');
}

function saveChatHistory(message, type) {
  let history = JSON.parse(localStorage.getItem('chatHistory')) || [];
  history.push({ text: message, type });
  localStorage.setItem('chatHistory', JSON.stringify(history));
}

function loadChatHistory() {
  const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
  history.forEach(message => {
      addMessage(message.text, message.type);
  });
}

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
      sendMessage();
  }
});
document.getElementById('reset').addEventListener('click', resetChat);

loadChatHistory();


function setFaviconAndLogo() {
  const favicon = document.getElementById('favicon');
  const appleTouchIcon = document.getElementById('apple-touch-icon');
  const chatLogo = document.getElementById('chat-logo');

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    favicon.href = 'LightModeFavicon.ico';
    appleTouchIcon.href = 'LightModeFavicon.ico';
    chatLogo.src = 'LightModeHeader.png';
  } else {
      favicon.href = 'DarkModeFavicon.ico';
      appleTouchIcon.href = 'DarkModeFavicon.ico';
      chatLogo.src = 'DarkModeHeader.png';
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFaviconAndLogo);

setFaviconAndLogo();

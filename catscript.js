function generateMeows(userMessage) {
  const meows = Math.floor(Math.random() * 10) + 1;
  let meowSentence = '';
  const punctuation = ['.', '!', '?', ',', ''];
  const emojis = ['😸', '🐟', '🐾', '🐕', '🧶']; // Random emojis
  const sounds = ['Purr', 'Hiss', 'Mrow', 'Chirp']; // Random cat sounds
  let capitalizeNext = true;

  // Trigger word reactions
  const triggers = {
    "tuna": "Tuna! I love tuna!",
    "fish": "Fish? Yum!",
    "dog": "Dog? Hiss! I'm a cat, remember?",
    "yarn": "Yarn! Let me pounce on it!"
  };

  // Check for trigger words
  const lowerMessage = userMessage.toLowerCase();
  for (const word in triggers) {
    if (lowerMessage.includes(word)) {
      return triggers[word];
    }
  }

  for (let i = 0; i < meows; i++) {
    if (capitalizeNext) {
      meowSentence += 'Meow';
      capitalizeNext = false;
    } else {
      meowSentence += ' meow';
    }

    // Randomly add punctuation mid-sentence
    if (i < meows - 1) {
      const randomPunctuation = punctuation[Math.floor(Math.random() * punctuation.length)];
      meowSentence += randomPunctuation ? randomPunctuation + ' ' : ' ';
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

    // Randomly add emoji or sound, ensuring proper spacing
    if (Math.random() < 0.8) {
      if (Math.random() < 0.5) {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        meowSentence += ' ' + randomEmoji;
      } else {
        let randomSound = sounds[Math.floor(Math.random() * sounds.length)];
        if (capitalizeNext) randomSound = randomSound.charAt(0).toUpperCase() + randomSound.slice(1);
        meowSentence += ' ' + randomSound;
        if (i === meows - 1 && !meowSentence.endsWith('.')) {
          meowSentence += '.';
        }
        capitalizeNext = false;
      }
    }
  }

  // Ensure proper spacing, capitalization, and remove unnecessary spaces
  meowSentence = meowSentence.replace(/\s{2,}/g, ' ').trim().replace(/(\s*([.!?]))/g, '$2 ');

  // Remove extra spaces before ending punctuation
  meowSentence = meowSentence.replace(/\s([.!?])/g, '$1');

  // Remove any double spaces in the final sentence
  meowSentence = meowSentence.replace(/\s{2,}/g, ' ');

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
    toggleSendButton();
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

function toggleSendButton() {
  const input = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  if (input.value.trim() === '') {
    sendButton.disabled = true;
  } else {
    sendButton.disabled = false;
  }
}
document.getElementById('user-input').addEventListener('input', toggleSendButton);
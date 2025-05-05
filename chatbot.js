function toggleChatbot() {
  const chatbot = document.getElementById('chatbot');
  chatbot.style.display = chatbot.style.display === 'none' || !chatbot.style.display ? 'flex' : 'none';
}

function sendMessage() {
  const input = document.getElementById('chatbotInput');
  const messages = document.getElementById('chatbotMessages');
  const message = input.value.trim();
  const isEnglish = window.location.pathname.includes('index-en.html');

  if (!message) return;

  const userMessage = document.createElement('div');
  userMessage.className = 'message user-message';
  userMessage.textContent = message;
  messages.appendChild(userMessage);

  const botMessage = document.createElement('div');
  botMessage.className = 'message bot-message';

  if (message.toLowerCase().includes('курс') || message.toLowerCase().includes('course')) {
    botMessage.innerHTML = isEnglish
      ? 'We offer courses on geothermal energy! Check the "Education" section for more details.'
      : 'Мы предлагаем курсы по геотермальной энергии! Ознакомьтесь с разделом "Обучение" для получения подробностей.';
  } else if (message.toLowerCase().includes('инвест') || message.toLowerCase().includes('invest')) {
    botMessage.innerHTML = isEnglish
      ? 'Interested in investing? Visit the "Investors" section to learn more!'
      : 'Интересуетесь инвестициями? Посетите раздел "Инвесторам" для получения информации!';
  } else if (message.toLowerCase().includes('источник') || message.toLowerCase().includes('source')) {
    botMessage.innerHTML = isEnglish
      ? 'You can find geothermal sources on our interactive map in the "Map" section.'
      : 'Вы можете найти геотермальные источники на нашей интерактивной карте в разделе "Карта".';
  } else {
    botMessage.textContent = isEnglish
      ? 'I’m here to help! Try asking about courses, investments, or geothermal sources.'
      : 'Я здесь, чтобы помочь! Попробуйте спросить о курсах, инвестициях или геотермальных источниках.';
  }

  messages.appendChild(botMessage);
  messages.scrollTop = messages.scrollHeight;
  input.value = '';
}

export { toggleChatbot, sendMessage };
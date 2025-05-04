function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
  }
  
  function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const messages = document.getElementById('chatbotMessages');
    const userMessage = input.value.trim().toLowerCase();
  
    if (userMessage === '') return;
  
    // Добавляем сообщение пользователя
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-message';
    userDiv.textContent = input.value;
    messages.appendChild(userDiv);
  
    // Определяем язык страницы
    const isEnglish = window.location.pathname.includes('index-en.html') || window.location.pathname.includes('founders-en.html');
    let botResponse = '';
    const messageCount = messages.children.length;
  
    if (messageCount === 1) {
      botResponse = isEnglish ? 'Thanks! What type of building do you have? (e.g., house, apartment, office)' : 'Спасибо! Какой тип здания у вас? (например, дом, квартира, офис)';
    } else if (messageCount === 3) {
      const region = messages.children[0].textContent.toLowerCase();
      const buildingType = userMessage;
  
      if (isEnglish) {
        if ((region.includes('bishkek') || region.includes('alai')) && buildingType.includes('house')) {
          botResponse = 'Great! Geothermal energy is available. Savings: ~$500/year. Emissions reduced: ~2 tons CO2/year. Want more details?';
        } else if (region.includes('bishkek') || region.includes('alai')) {
          botResponse = 'Geothermal energy is available but limited for your building type. Savings: ~$200/year. Emissions reduced: ~0.8 tons CO2/year. Want more?';
        } else {
          botResponse = 'Geothermal energy may not be available in your region. Consider other renewables. Want advice?';
        }
      } else {
        if ((region.includes('бишкек') || region.includes('алай')) && buildingType.includes('дом')) {
          botResponse = 'Отлично! Геотермальная энергия доступна. Экономия: ~500$ в год. Снижение выбросов: ~2 тонны CO2 в год. Хотите подробнее?';
        } else if (region.includes('бишкек') || region.includes('алай')) {
          botResponse = 'Геотермальная энергия доступна, но ограничена для вашего типа здания. Экономия: ~200$ в год. Снижение выбросов: ~0.8 тонны CO2 в год. Хотите больше?';
        } else {
          botResponse = 'Геотермальная энергия может быть недоступна в вашем регионе. Рассмотрите другие возобновляемые источники. Нужен совет?';
        }
      }
    } else if (messageCount === 5) {
      botResponse = isEnglish ? 'Awesome! Check our calculator or map for more details. Need help with installers?' : 'Отлично! Посмотрите наш калькулятор или карту для деталей. Нужна помощь с установщиками?';
    }
  
    if (botResponse) {
      const botDiv = document.createElement('div');
      botDiv.className = 'message bot-message';
      botDiv.textContent = botResponse;
      messages.appendChild(botDiv);
    }
  
    if (messages.children.length > 10) {
      messages.removeChild(messages.children[0]);
    }
  
    messages.scrollTop = messages.scrollHeight;
    input.value = '';
  
    if (messageCount === 1) {
      setTimeout(() => {
        const nextQuestion = isEnglish
          ? 'Please enter your region (e.g., Bishkek, Alai):'
          : 'Пожалуйста, введите ваш регион (например, Бишкек, Алай):';
        const questionDiv = document.createElement('div');
        questionDiv.className = 'message bot-message';
        questionDiv.textContent = nextQuestion;
        messages.appendChild(questionDiv);
        messages.scrollTop = messages.scrollHeight;
      }, 500);
    } else if (messageCount === 2) {
      setTimeout(() => {
        const nextQuestion = isEnglish
          ? 'What type of building do you have? (e.g., house, apartment, office)'
          : 'Какой тип здания у вас? (например, дом, квартира, офис)';
        const questionDiv = document.createElement('div');
        questionDiv.className = 'message bot-message';
        questionDiv.textContent = nextQuestion;
        messages.appendChild(questionDiv);
        messages.scrollTop = messages.scrollHeight;
      }, 500);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const isEnglish = window.location.pathname.includes('index-en.html') || window.location.pathname.includes('founders-en.html');
    if (isEnglish) {
      document.querySelector('.chatbot-header h3').textContent = 'ZherBulagy Chatbot';
      document.querySelector('.bot-message').textContent = 'Hi! I\'ll guide you through geothermal options. Please enter your region (e.g., Bishkek, Alai):';
      document.getElementById('chatbotInput').placeholder = 'Enter your response...';
    } else {
      document.querySelector('.chatbot-header h3').textContent = 'ЖерБулагы Чат-бот';
      document.querySelector('.bot-message').textContent = 'Привет! Я проведу вас по геотермальным вариантам. Пожалуйста, введите ваш регион (например, Бишкек, Алай):';
      document.getElementById('chatbotInput').placeholder = 'Введите ответ...';
    }
  });
  
  export { toggleChatbot, sendMessage };
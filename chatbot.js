import { escapeHTML } from './utils.js';

const responses = {
  ru: {
    'алтын-арашан': 'Алтын-Арашан — радоновые источники на высоте 2600 м, температура ~34°C. Полезны для дыхательных и кожных заболеваний.',
    'джууку': 'Джууку — радоновые ванны в Иссык-Кульской области, температура ~34°C. Подходят для оздоровления.',
    'орукту': 'Орукту — минеральный источник в Чон-Орукту. Лечит желудок, печень, почки, диабет.',
    'таш-суу': 'Таш-суу — минеральный источник в Чон-Орукту, температура 43–48°C. Используется для SPA.',
    'чон-кызыл-суу': 'Чон-кызыл-суу — сероводородные источники, температура +43°C. Полезны для кожи и дыхания.',
    'привет': 'Здравствуйте! Задайте вопрос о геотермальных источниках Кыргызстана.',
    default: 'Извините, я не понял вопроса. Попробуйте спросить о конкретном источнике, например, "Алтын-Арашан".'
  },
  en: {
    'altyn-arashan': 'Altyn-Arashan — radon springs at 2600m, ~34°C. Good for respiratory and skin conditions.',
    'juuku': 'Juuku — radon baths in Issyk-Kul, ~34°C. Great for general health.',
    'oruktu': 'Oruktu — mineral spring in Chon-Oruktu. Treats stomach, liver, kidneys, diabetes.',
    'tash-suu': 'Tash-suu — mineral spring in Chon-Oruktu, 43–48°C. Used for SPA.',
    'chon-kyzyl-suu': 'Chon-kyzyl-suu — sulfur springs, +43°C. Good for skin and respiratory issues.',
    'hello': 'Hello! Ask about Kyrgyzstan’s geothermal springs.',
    default: 'Sorry, I didn’t understand. Try asking about a specific spring, e.g., "Altyn-Arashan".'
  }
};

function initChatbot() {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatWindow = document.getElementById('chatWindow');

  if (!chatForm || !chatInput || !chatWindow) {
    console.error('Элементы чат-бота не найдены');
    return;
  }

  const isEnglish = window.location.pathname.includes('index-en.html');
  const lang = isEnglish ? 'en' : 'ru';

  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = escapeHTML(chatInput.value.trim().toLowerCase());
    if (!input) return;

    const response = responses[lang][input] || responses[lang].default;
    const userMessage = `<p><strong>${isEnglish ? 'You' : 'Вы'}:</strong> ${escapeHTML(chatInput.value)}</p>`;
    const botMessage = `<p><strong>Bot:</strong> ${escapeHTML(response)}</p>`;

    chatWindow.innerHTML += userMessage + botMessage;
    chatWindow.scrollTop = chatWindow.scrollHeight;
    chatInput.value = '';
    chatInput.focus();
  });
}

export { initChatbot };
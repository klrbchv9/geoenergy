import { escapeHTML } from './utils.js';

const responses = {
  ru: {
    'ак-суу': 'Ак-Суу — горячие источники с температурой 70°C. Используются для коммерческих целей.',
    'джети-огуз': 'Джети-Огуз — источники с температурой 55°C. Подходят для жилого отопления.',
    'барбулак': 'Барбулак — источники с температурой 45°C. Используются экспериментально.',
    'джыргалан': 'Джыргалан — горячие источники с температурой 65°C. Подходят для коммерческого использования.',
    'чолпон-ата': 'Чолпон-Ата — источники с температурой 50°C. Используются для жилого отопления.',
    'кош-кол': 'Кош-Кол — источники с температурой 48°C. Используются экспериментально.',
    'аламедин': 'Аламедин — источники с температурой 53°C. Используются для лечебных процедур и отопления.',
    'алтын-арашан': 'Алтын-Арашан — радоновые источники на высоте 2600 м, температура 50°C. Полезны для дыхательных и кожных заболеваний.',
    'жыргалан': 'Жыргалан — источники с температурой 43°C. Используются для лечебных процедур и туризма.',
    'ак-бермет': 'Ак-Бермет — источники с температурой 44°C. Используются для лечебных процедур и туризма.',
    'керемет-суу': 'Керемет-Суу — источники с температурой 48°C. Используются для лечебных процедур и горячего водоснабжения.',
    'джууку': 'Джууку — источники с температурой 45°C. Используются для лечебных процедур и туризма.',
    'иныльчек': 'Иныльчек — геотермальная зона с высоким потенциалом для производства электроэнергии (до 1000 МВт).',
    'привет': 'Здравствуйте! Задайте вопрос о геотермальных источниках Кыргызстана.',
    default: 'Извините, я не понял вопроса. Попробуйте спросить о конкретном источнике, например, "Алтын-Арашан".'
  },
  en: {
    'ak-suu': 'Ak-Suu — hot springs with a temperature of 70°C. Used for commercial purposes.',
    'jeti-oguz': 'Jeti-Oguz — springs with a temperature of 55°C. Suitable for residential heating.',
    'barbulak': 'Barbulak — springs with a temperature of 45°C. Used experimentally.',
    'jyrgalang': 'Jyrgalang — hot springs with a temperature of 65°C. Suitable for commercial use.',
    'cholpon-ata': 'Cholpon-Ata — springs with a temperature of 50°C. Used for residential heating.',
    'kosh-kol': 'Kosh-Kol — springs with a temperature of 48°C. Used experimentally.',
    'alamedin': 'Alamedin — springs with a temperature of 53°C. Used for therapeutic procedures and heating.',
    'altyn-arashan': 'Altyn-Arashan — radon springs at 2600m, temperature 50°C. Good for respiratory and skin conditions.',
    'jyrgalan': 'Jyrgalan — springs with a temperature of 43°C. Used for therapeutic procedures and tourism.',
    'ak-bermet': 'Ak-Bermet — springs with a temperature of 44°C. Used for therapeutic procedures and tourism.',
    'keremet-suu': 'Keremet-Suu — springs with a temperature of 48°C. Used for therapeutic procedures and hot water supply.',
    'djuuku': 'Djuuku — springs with a temperature of 45°C. Used for therapeutic procedures and tourism.',
    'inylchek': 'Inylchek — geothermal zone with high potential for electricity generation (up to 1000 MW).',
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
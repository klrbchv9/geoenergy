import { handleRegister, handleLogin, logout } from './auth.js';
import { initChatbot } from './chatbot.js';
import { initMap } from './map.js';
import { initNavigation } from './navigation.js';
import { escapeHTML } from './utils.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Инициализация форм авторизации
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
    } else {
      console.warn('Форма входа не найдена');
    }

    if (registerForm) {
      registerForm.addEventListener('submit', handleRegister);
    } else {
      console.warn('Форма регистрации не найдена');
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', logout);
    } else {
      console.warn('Кнопка выхода не найдена');
    }

    // Инициализация чат-бота
    initChatbot();

    // Инициализация карты
    initMap();

    // Инициализация навигации
    initNavigation();

    // Проверка загрузки всех ресурсов
    window.addEventListener('load', () => {
      console.log('Все ресурсы загружены');
    });
  } catch (error) {
    console.error('Ошибка инициализации приложения:', error);
  }
});

// Обработка ошибок загрузки ресурсов
window.addEventListener('error', (event) => {
  console.error('Ошибка загрузки ресурса:', event.message, event.filename, event.lineno);
});
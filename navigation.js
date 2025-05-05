import { throttle } from './utils.js';

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  if (!navLinks.length || !navbar) {
    console.error('Элементы навигации не найдены');
    return;
  }

  // Плавная прокрутка
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.warn(`Элемент с id "${targetId}" не найден`);
      }
    });
  });

  // Активные ссылки и липкая навигация
  const checkScroll = throttle(() => {
    const scrollPosition = window.scrollY + 100;
    navLinks.forEach(link => {
      const sectionId = link.getAttribute('href').substring(1);
      const section = document.getElementById(sectionId);
      if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, 100);

  window.addEventListener('scroll', checkScroll);
}

export { initNavigation };
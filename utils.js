// Экранирование HTML для защиты от XSS
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, match => ({
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '''
  }[match]));
}

// Троттлинг
function throttle(func, wait) {
  let timeout;
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, args);
      }, wait);
    }
  };
}

export { escapeHTML, throttle };
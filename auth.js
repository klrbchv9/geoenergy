async function hashPassword(password) {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, match => ({
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '''
  }[match]));
}

const isEnglish = () => window.location.pathname.includes('index-en.html');

function handleRegister(event) {
  event.preventDefault();
  const form = event.target;
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPass').value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert(isEnglish() ? 'Invalid email format!' : 'Неверный формат email!');
    return false;
  }
  if (password.length < 6) {
    alert(isEnglish() ? 'Password must be at least 6 characters!' : 'Пароль должен быть не менее 6 символов!');
    return false;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.some(user => user.email === email)) {
    alert(isEnglish() ? 'This email is already registered!' : 'Этот email уже зарегистрирован!');
    return false;
  }

  hashPassword(password).then(hashedPassword => {
    users.push({ name: escapeHTML(name), email: escapeHTML(email), password: hashedPassword });
    localStorage.setItem('users', JSON.stringify(users));
    alert(isEnglish() ? 'Registration successful! Please login.' : 'Регистрация успешна! Пожалуйста, войдите.');
    form.reset();
  });

  return false;
}

function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const loginName = document.getElementById('loginName').value;
  const password = document.getElementById('loginPass').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  hashPassword(password).then(hashedPassword => {
    const user = users.find(user => (user.name === loginName || user.email === loginName) && user.password === hashedPassword);
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      updateProfile(user.name, user.email);
      alert(isEnglish() ? 'Login successful!' : 'Вход успешен!');
      form.reset();
    } else {
      alert(isEnglish() ? 'Invalid name/email or password!' : 'Неверное имя/email или пароль!');
    }
  });

  return false;
}

function updateProfile(name, email) {
  const profileSection = document.getElementById('profile');
  const profileLink = document.getElementById('profileLink');
  const logoutBtn = document.getElementById('logoutBtn');
  const registerSection = document.getElementById('register');
  const accountSection = document.getElementById('account');
  const welcomeText = document.getElementById('welcomeText');
  const profileUsername = document.getElementById('profileUsername');
  const profileEmail = document.getElementById('profileEmail');

  profileSection.classList.remove('hidden');
  profileLink.classList.remove('hidden');
  logoutBtn.classList.remove('hidden');
  registerSection.classList.add('hidden');
  accountSection.classList.add('hidden');

  welcomeText.textContent = isEnglish() ? `Welcome, ${escapeHTML(name)}!` : `Добро пожаловать, ${escapeHTML(name)}!`;
  profileUsername.textContent = escapeHTML(name);
  profileEmail.textContent = escapeHTML(email);
}

function logout() {
  sessionStorage.removeItem('currentUser');
  document.getElementById('profile').classList.add('hidden');
  document.getElementById('profileLink').classList.add('hidden');
  document.getElementById('logoutBtn').classList.add('hidden');
  document.getElementById('register').classList.remove('hidden');
  document.getElementById('account').classList.remove('hidden');
  alert(isEnglish() ? 'You have been logged out.' : 'Вы вышли из системы.');
}

// Проверка текущего пользователя при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  if (currentUser) {
    updateProfile(currentUser.name, currentUser.email);
  }
});

export { handleRegister, handleLogin, logout, updateProfile };
function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPass').value;
  const isEnglish = window.location.pathname.includes('index-en.html');

  if (localStorage.getItem(email)) {
    alert(isEnglish
      ? 'This email is already registered!'
      : 'Этот email уже зарегистрирован!');
    return false;
  }

  localStorage.setItem(email, JSON.stringify({ name, password }));
  alert(isEnglish
    ? 'Registration successful! Please login.'
    : 'Регистрация успешна! Пожалуйста, войдите.');
  document.getElementById('regName').value = '';
  document.getElementById('regEmail').value = '';
  document.getElementById('regPass').value = '';
  return false;
}

function handleLogin(event) {
  event.preventDefault();
  const loginName = document.getElementById('loginName').value;
  const password = document.getElementById('loginPass').value;
  const isEnglish = window.location.pathname.includes('index-en.html');

  const user = JSON.parse(localStorage.getItem(loginName)) || JSON.parse(localStorage.getItem(Object.keys(localStorage).find(key => {
    const user = JSON.parse(localStorage.getItem(key));
    return user.name === loginName;
  })));

  if (user && user.password === password) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateProfile(user.name, loginName);
    alert(isEnglish
      ? 'Login successful!'
      : 'Вход успешен!');
    document.getElementById('loginName').value = '';
    document.getElementById('loginPass').value = '';
  } else {
    alert(isEnglish
      ? 'Invalid name/email or password!'
      : 'Неверное имя/email или пароль!');
  }
  return false;
}

function logout() {
  const isEnglish = window.location.pathname.includes('index-en.html');
  localStorage.removeItem('currentUser');
  document.getElementById('profile').classList.add('hidden');
  document.getElementById('profileLink').classList.add('hidden');
  document.getElementById('logoutBtn').classList.add('hidden');
  document.getElementById('register').classList.remove('hidden');
  document.getElementById('account').classList.remove('hidden');
  alert(isEnglish
    ? 'You have been logged out.'
    : 'Вы вышли из системы.');
}

function updateProfile(name, email) {
  document.getElementById('profileUsername').textContent = name;
  document.getElementById('profileEmail').textContent = email;
  document.getElementById('profile').classList.remove('hidden');
  document.getElementById('profileLink').classList.remove('hidden');
  document.getElementById('logoutBtn').classList.remove('hidden');
  document.getElementById('register').classList.add('hidden');
  document.getElementById('account').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    updateProfile(currentUser.name, Object.keys(localStorage).find(key => JSON.parse(localStorage.getItem(key)).name === currentUser.name));
  }
});

export { handleRegister, handleLogin, logout };
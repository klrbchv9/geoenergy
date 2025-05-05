function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPass').value;
  const isEnglish = window.location.pathname.includes('index-en.html');

  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.some(user => user.email === email)) {
    alert(isEnglish
      ? 'This email is already registered!'
      : 'Этот email уже зарегистрирован!');
    return false;
  }

  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));
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
  console.log('handleLogin called'); // Debugging

  const loginName = document.getElementById('loginName').value;
  const password = document.getElementById('loginPass').value;
  const isEnglish = window.location.pathname.includes('index-en.html');

  console.log('Login input:', { loginName, password }); // Debugging

  const users = JSON.parse(localStorage.getItem('users')) || [];
  console.log('Stored users:', users); // Debugging

  const user = users.find(user => (user.name === loginName || user.email === loginName) && user.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateProfile(user.name, user.email);
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
    updateProfile(currentUser.name, currentUser.email);
  }
});

export { handleRegister, handleLogin, logout };
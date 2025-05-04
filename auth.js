function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById("regName").value;
    const pass = document.getElementById("regPass").value;
    const email = document.getElementById("regEmail").value;
  
    if (pass.length < 6) {
      alert("Пароль должен содержать не менее 6 символов");
      return false;
    }
  
    localStorage.setItem("username", name);
    localStorage.setItem("password", pass);
    localStorage.setItem("email", email);
  
    alert("Вы успешно зарегистрировались! Теперь вы можете войти.");
    window.location.href = "#account";
    return false;
  }
  
  function handleLogin(event) {
    event.preventDefault();
    const name = document.getElementById("loginName").value;
    const pass = document.getElementById("loginPass").value;
    const savedName = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");
    const savedEmail = localStorage.getItem("email");
  
    if ((name === savedName || name === savedEmail) && pass === savedPass) {
      document.getElementById("account").classList.add("hidden");
      document.getElementById("profile").classList.remove("hidden");
      document.getElementById("profileLink").classList.remove("hidden");
      document.getElementById("logoutBtn").classList.remove("hidden");
  
      document.getElementById("welcomeText").textContent = `Добро пожаловать, ${savedName}!`;
      document.getElementById("profileUsername").textContent = savedName;
      document.getElementById("profileEmail").textContent = savedEmail;
  
      document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === '#register' || link.getAttribute('href') === '#account') {
          link.classList.add('hidden');
        }
      });
  
      window.location.href = "#profile";
    } else {
      alert("Неверное имя пользователя или пароль");
    }
    return false;
  }
  
  function logout() {
    document.getElementById("profile").classList.add("hidden");
    document.getElementById("profileLink").classList.add("hidden");
    document.getElementById("logoutBtn").classList.add("hidden");
  
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === '#register' || link.getAttribute('href') === '#account') {
        link.classList.remove('hidden');
      }
    });
  
    window.location.href = "#about";
  }
  
  export { handleRegister, handleLogin, logout };
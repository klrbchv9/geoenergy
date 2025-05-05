function escapeHTML(str) {
  return str.replace(/[&<>"']/g, match => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[match]));
}

const isEnglish = () => window.location.pathname.includes('index-en.html');

function calculate() {
  const area = parseFloat(document.getElementById('area').value);
  const source = document.getElementById('source').value;
  const region = document.getElementById('region').value;
  const resultDiv = document.getElementById('result');

  if (isNaN(area) || area <= 0 || area > 10000) {
    resultDiv.innerHTML = isEnglish()
      ? '<p>Please enter a valid house area (1–10000 m²).</p>'
      : '<p>Пожалуйста, введите корректную площадь дома (1–10000 м²).</p>';
    resultDiv.classList.remove('hidden');
    return;
  }

  const costFactors = {
    coal: 5000,
    wood: 4000,
    electricity: 8000,
    gas: 6000
  };

  const regionFactors = {
    General: 1,
    Bishkek: 1.2,
    'Issyk-Kul': 1.1,
    Chuy: 1.15,
    Naryn: 1.3,
    Osh: 1.25
  };

  const currentCost = costFactors[source] * area * regionFactors[region];
  const geothermalCost = currentCost * 0.5;
  const savings = currentCost - geothermalCost;
  const co2Reduction = area * 0.8;

  resultDiv.innerHTML = isEnglish()
    ? `
      <div class="result-item"><span>Current Annual Cost:</span><span>$${currentCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></div>
      <div class="result-item"><span>Geothermal Annual Cost:</span><span>$${geothermalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></div>
      <div class="result-item highlight"><span>Annual Savings:</span><span>$${savings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></div>
      <div class="result-item eco"><span>CO₂ Reduction:</span><span>${co2Reduction.toLocaleString('en-US', { minimumFractionDigits: 2 })} tons/year</span></div>
    `
    : `
      <div class="result-item"><span>Текущая годовая стоимость:</span><span>$${currentCost.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}</span></div>
      <div class="result-item"><span>Геотермальная годовая стоимость:</span><span>$${geothermalCost.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}</span></div>
      <div class="result-item highlight"><span>Годовая экономия:</span><span>$${savings.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}</span></div>
      <div class="result-item eco"><span>Снижение CO₂:</span><span>${co2Reduction.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} тонн/год</span></div>
    `;
  resultDiv.classList.remove('hidden');
}

function openCourse(courseName) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = isEnglish()
    ? `
      <div class="modal-content">
        <span class="close" onclick="this.parentElement.parentElement.remove()" aria-label="Close">&times;</span>
        <h2>Enroll in "${escapeHTML(courseName)}"</h2>
        <p>Please provide your details to enroll in the course.</p>
        <form onsubmit="event.preventDefault(); alert('Enrollment successful! You will receive an email with details.'); this.closest('.modal').remove();">
          <div class="form-group">
            <label for="courseName">Name:</label>
            <input type="text" id="courseName" class="form-control" placeholder="Enter your name" required>
          </div>
          <div class="form-group">
            <label for="courseEmail">Email:</label>
            <input type="email" id="courseEmail" class="form-control" placeholder="Enter your email" required>
          </div>
          <button type="submit" class="btn btn-primary mt-2">Submit</button>
        </form>
      </div>
    `
    : `
      <div class="modal-content">
        <span class="close" onclick="this.parentElement.parentElement.remove()" aria-label="Закрыть">&times;</span>
        <h2>Запись на курс "${escapeHTML(courseName)}"</h2>
        <p>Пожалуйста, укажите ваши данные для записи на курс.</p>
        <form onsubmit="event.preventDefault(); alert('Запись успешна! Вы получите письмо с деталями.'); this.closest('.modal').remove();">
          <div class="form-group">
            <label for="courseName">Имя:</label>
            <input type="text" id="courseName" class="form-control" placeholder="Введите ваше имя" required>
          </div>
          <div class="form-group">
            <label for="courseEmail">Email:</label>
            <input type="email" id="courseEmail" class="form-control" placeholder="Введите ваш email" required>
          </div>
          <button type="submit" class="btn btn-primary mt-2">Отправить</button>
        </form>
      </div>
    `;
  document.body.appendChild(modal);
  modal.style.display = 'block';
}

function contactProject(projectName) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = isEnglish()
    ? `
      <div class="modal-content">
        <span class="close" onclick="this.parentElement.parentElement.remove()" aria-label="Close">&times;</span>
        <h2>Contact "${escapeHTML(projectName)}"</h2>
        <p>Please visit their official website for more details or contact them directly.</p>
        <button class="btn btn-primary mt-2" onclick="this.closest('.modal').remove()">Close</button>
      </div>
    `
    : `
      <div class="modal-content">
        <span class="close" onclick="this.parentElement.parentElement.remove()" aria-label="Закрыть">&times;</span>
        <h2>Связаться с "${escapeHTML(projectName)}"</h2>
        <p>Пожалуйста, посетите их официальный сайт для получения подробностей или свяжитесь напрямую.</p>
        <button class="btn btn-primary mt-2" onclick="this.closest('.modal').remove()">Закрыть</button>
      </div>
    `;
  document.body.appendChild(modal);
  modal.style.display = 'block';
}

function openTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });
  document.getElementById(tabId).classList.add('active');
  const activeButton = document.querySelector(`button[onclick="openTab('${tabId}')"]`);
  activeButton.classList.add('active');
  activeButton.setAttribute('aria-selected', 'true');
}

export { calculate, openCourse, contactProject, openTab };
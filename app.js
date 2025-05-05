import { sources, installers } from './data.js';

function calculate() {
  const area = parseFloat(document.getElementById('area').value);
  const buildingType = document.getElementById('buildingType').value;
  const source = document.getElementById('source').value;
  const region = document.getElementById('region').value;
  const resultDiv = document.getElementById('result');
  const isEnglish = window.location.pathname.includes('index-en.html');

  if (isNaN(area) || area <= 0) {
    resultDiv.innerHTML = isEnglish
      ? '<p>Please enter a valid house area.</p>'
      : '<p>Пожалуйста, введите корректную площадь дома.</p>';
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

  const buildingFactors = {
    residential: 1,
    commercial: 1.5
  };

  const selectedSource = sources.find(s => s.region.toLowerCase() === region.toLowerCase());
  const tempFactor = selectedSource && selectedSource.temp !== 'N/A'
    ? parseFloat(selectedSource.temp) / 50
    : 1;

  const currentCost = costFactors[source] * area * regionFactors[region] * buildingFactors[buildingType];
  const geothermalCost = currentCost * 0.5 * tempFactor;
  const savings = currentCost - geothermalCost;
  const co2Reduction = area * 0.8;

  const sourceAvailability = sources.some(s => s.region.toLowerCase() === region.toLowerCase() && s.activityEn === 'High')
    ? isEnglish ? 'High geothermal potential available!' : 'Высокий геотермальный потенциал!'
    : isEnglish ? 'Geothermal potential limited, but viable.' : 'Ограниченный потенциал, но возможно.';

  const materials = {
    pipes: area * 2,
    pumps: Math.ceil(area / 100),
    cost: area * 50
  };

  resultDiv.innerHTML = isEnglish
    ? `
      <div class="result-item"><span>Availability:</span><span>${sourceAvailability}</span></div>
      <div class="result-item"><span>Current Annual Cost:</span><span>$${currentCost.toFixed(2)}</span></div>
      <div class="result-item"><span>Geothermal Annual Cost:</span><span>$${geothermalCost.toFixed(2)}</span></div>
      <div class="result-item highlight"><span>Annual Savings:</span><span>$${savings.toFixed(2)}</span></div>
      <div class="result-item eco"><span>CO₂ Reduction:</span><span>${co2Reduction.toFixed(2)} tons/year</span></div>
      <div class="result-item"><span>Materials Needed:</span><span>${materials.pipes} m pipes, ${materials.pumps} pump(s)</span></div>
      <div class="result-item"><span>Material Cost:</span><span>$${materials.cost.toFixed(2)}</span></div>
      <canvas id="savingsChart" style="max-width: 100%; margin-top: 1rem;"></canvas>
    `
    : `
      <div class="result-item"><span>Доступность:</span><span>${sourceAvailability}</span></div>
      <div class="result-item"><span>Текущая годовая стоимость:</span><span>$${currentCost.toFixed(2)}</span></div>
      <div class="result-item"><span>Геотермальная годовая стоимость:</span><span>$${geothermalCost.toFixed(2)}</span></div>
      <div class="result-item highlight"><span>Годовая экономия:</span><span>$${savings.toFixed(2)}</span></div>
      <div class="result-item eco"><span>Снижение CO₂:</span><span>${co2Reduction.toFixed(2)} тонн/год</span></div>
      <div class="result-item"><span>Необходимые материалы:</span><span>${materials.pipes} м труб, ${materials.pumps} насос(ов)</span></div>
      <div class="result-item"><span>Стоимость материалов:</span><span>$${materials.cost.toFixed(2)}</span></div>
      <canvas id="savingsChart" style="max-width: 100%; margin-top: 1rem;"></canvas>
    `;
  resultDiv.classList.remove('hidden');

  new Chart(document.getElementById('savingsChart'), {
    type: 'bar',
    data: {
      labels: isEnglish ? ['Current Cost', 'Geothermal Cost', 'Savings'] : ['Текущая стоимость', 'Геотермальная стоимость', 'Экономия'],
      datasets: [{
        label: isEnglish ? 'Cost ($)' : 'Стоимость ($)',
        data: [currentCost, geothermalCost, savings],
        backgroundColor: ['#ff4d4d', '#4da8da', '#ffd700']
      }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });
}

function openCourse(courseName) {
  const isEnglish = window.location.pathname.includes('index-en.html');
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = isEnglish
    ? `
      <div class="modal-content">
        <span class="close" onclick="this.parentElement.parentElement.remove()">×</span>
        <h2>Enroll in "${courseName}"</h2>
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
        <span class="close" onclick="this.parentElement.parentElement.remove()">×</span>
        <h2>Запись на курс "${courseName}"</h2>
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
  const isEnglish = window.location.pathname.includes('index-en.html');
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = isEnglish
    ? `
      <div class="modal-content">
        <span class="close" onclick="this.parentElement.parentElement.remove()">×</span>
        <h2>Contact "${projectName}"</h2>
        <p>Please provide your details to contact the project.</p>
        <form onsubmit="event.preventDefault(); alert('Request sent! You will be contacted soon.'); this.closest('.modal').remove();">
          <div class="form-group">
            <label for="contactName">Name:</label>
            <input type="text" id="contactName" class="form-control" placeholder="Enter your name" required>
          </div>
          <div class="form-group">
            <label for="contactEmail">Email:</label>
            <input type="email" id="contactEmail" class="form-control" placeholder="Enter your email" required>
          </div>
          <button type="submit" class="btn btn-primary mt-2">Submit</button>
        </form>
      </div>
    `
    : `
      <div class="modal-content">
        <span class="close" onclick="this.parentElement.parentElement.remove()">×</span>
        <h2>Связаться с "${projectName}"</h2>
        <p>Пожалуйста, укажите ваши данные для связи с проектом.</p>
        <form onsubmit="event.preventDefault(); alert('Запрос отправлен! С вами скоро свяжутся.'); this.closest('.modal').remove();">
          <div class="form-group">
            <label for="contactName">Имя:</label>
            <input type="text" id="contactName" class="form-control" placeholder="Введите ваше имя" required>
          </div>
          <div class="form-group">
            <label for="contactEmail">Email:</label>
            <input type="email" id="contactEmail" class="form-control" placeholder="Введите ваш email" required>
          </div>
          <button type="submit" class="btn btn-primary mt-2">Отправить</button>
        </form>
      </div>
    `;
  document.body.appendChild(modal);
  modal.style.display = 'block';
}

function openTab(tabName) {
  const tabs = document.getElementsByClassName('tab-content');
  const buttons = document.getElementsByClassName('tab-btn');
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }
  document.getElementById(tabName).classList.add('active');
  document.querySelector(`button[onclick="openTab('${tabName}')"]`).classList.add('active');
}

function showWelcomeModal() {
  if (!localStorage.getItem('welcomeShown')) {
    const isEnglish = window.location.pathname.includes('index-en.html');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = isEnglish
      ? `
        <div class="modal-content">
          <span class="close" onclick="this.parentElement.parentElement.remove()">×</span>
          <h2>Welcome to ZherBulagy!</h2>
          <p>Explore geothermal energy: use our map, calculate savings, or learn with our courses!</p>
          <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Get Started</button>
        </div>
      `
      : `
        <div class="modal-content">
          <span class="close" onclick="this.parentElement.parentElement.remove()">×</span>
          <h2>Добро пожаловать в ЖерБулагы!</h2>
          <p>Исследуйте геотермальную энергию: используйте карту, рассчитайте экономию или учитесь на наших курсах!</p>
          <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Начать</button>
        </div>
      `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
    localStorage.setItem('welcomeShown', 'true');
  }
}

function loadInstallers() {
  const region = document.getElementById('installerRegion').value;
  const installersList = document.getElementById('installerList');
  const filteredInstallers = region === 'all' ? installers : installers.filter(i => i.region === region);
  const isEnglish = window.location.pathname.includes('index-en.html');
  installersList.innerHTML = filteredInstallers.length
    ? filteredInstallers.map(i => `
        <li class="project-item">
          <h3 class="project-title">${i.name}</h3>
          <p>${isEnglish ? 'Contact' : 'Контакт'}: ${i.contact}</p>
          <a href="${i.website}" target="_blank" class="btn btn-outline mt-2">${isEnglish ? 'Visit Website' : 'Посетить сайт'}</a>
        </li>
      `).join('')
    : isEnglish
      ? '<p>No installers available for this region.</p>'
      : '<p>Нет установщиков для этого региона.</p>';
}

document.getElementById('installerRegion')?.addEventListener('change', loadInstallers);
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('installerRegion')) loadInstallers();
});

export { calculate, openCourse, contactProject, openTab, showWelcomeModal, loadInstallers };
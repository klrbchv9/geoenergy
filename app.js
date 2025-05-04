function calculate() {
    const area = parseFloat(document.getElementById('area').value);
    const source = document.getElementById('source').value;
    const region = document.getElementById('region').value;
    const resultDiv = document.getElementById('result');
    const isEnglish = window.location.pathname.includes('index-en.html');
  
    if (isNaN(area) || area <= 0) {
      resultDiv.textContent = isEnglish ? 'Please enter a valid area.' : 'Пожалуйста, введите корректную площадь.';
      resultDiv.classList.remove('hidden');
      return;
    }
  
    let costPerM2;
    switch (source) {
      case 'coal':
        costPerM2 = 10;
        break;
      case 'wood':
        costPerM2 = 8;
        break;
      case 'electricity':
        costPerM2 = 15;
        break;
      case 'gas':
        costPerM2 = 12;
        break;
      default:
        costPerM2 = 10;
    }
  
    const currentCost = area * costPerM2;
    const geothermalCost = currentCost * 0.5;
    const savings = currentCost - geothermalCost;
    const co2Reduction = area * 0.02;
  
    resultDiv.innerHTML = `
      <div class="result-item">${isEnglish ? 'Current Annual Cost' : 'Текущая годовая стоимость'}: $${currentCost.toFixed(2)}</div>
      <div class="result-item">${isEnglish ? 'Geothermal Annual Cost' : 'Геотермальная годовая стоимость'}: $${geothermalCost.toFixed(2)}</div>
      <div class="result-item highlight">${isEnglish ? 'Annual Savings' : 'Годовая экономия'}: $${savings.toFixed(2)}</div>
      <div class="result-item eco">${isEnglish ? 'CO2 Reduction' : 'Снижение выбросов CO2'}: ${co2Reduction.toFixed(2)} ${isEnglish ? 'tons/year' : 'тонн/год'}</div>
    `;
    resultDiv.classList.remove('hidden');
  }
  
  function openCourse(courseName) {
    const isEnglish = window.location.pathname.includes('index-en.html');
    alert(isEnglish ? `You have enrolled in "${courseName}". We will contact you soon!` : `Вы записались на курс "${courseName}". Мы скоро с вами свяжемся!`);
  }
  
  function contactProject(projectName) {
    const isEnglish = window.location.pathname.includes('index-en.html');
    alert(isEnglish ? `Contact request for "${projectName}" has been sent. We will get back to you soon!` : `Запрос на контакт по "${projectName}" отправлен. Мы скоро с вами свяжемся!`);
  }
  
  function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[onclick="openTab('${tabId}')"]`).classList.add('active');
  }
  
  export { calculate, openCourse, contactProject, openTab };
import sources from './data.js';

// Инициализация карты с центром на Кыргызстане
const map = L.map('geoMap').setView([41.2044, 74.7661], 6);

// Добавление слоя карты OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Определение цветов для меток в зависимости от активности
const activityColors = {
  'High': '#ff4d4d',    // Красный для высокой активности
  'Medium': '#ffd700',  // Золотой для средней активности
  'Low': '#4da8da'      // Синий для низкой активности
};

// Функция для создания метки с цветом
function createMarker(coord, activityEn, popupContent) {
  const color = activityColors[activityEn] || '#4da8da'; // Значение по умолчанию — синий
  const marker = L.circleMarker(coord, {
    radius: 8,
    fillColor: color,
    color: '#fff',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }).addTo(map);

  marker.bindPopup(popupContent);
  return marker;
}

// Добавление маркеров на карту
sources.forEach(source => {
  const isEnglish = window.location.pathname.includes('index-en.html');
  const popupContent = isEnglish
    ? `<b>${source.name}</b><br>Temperature: ${source.temp}<br>Depth: ${source.depth}<br>Activity: ${source.activityEn}<br>Savings: $${source.saving}/year<br>Potential: ${source.potentialEn}<br>Region: ${source.region}`
    : `<b>${source.nameRu}</b><br>Температура: ${source.temp}<br>Глубина: ${source.depth}<br>Активность: ${source.activity}<br>Экономия: $${source.saving}/год<br>Потенциал: ${source.potential}<br>Регион: ${source.regionRu}`;

  createMarker(source.coords, source.activityEn, popupContent);
});

// Фильтрация маркеров по региону
document.getElementById('regionSelect').addEventListener('change', function() {
  const selectedRegion = this.value.toLowerCase();
  map.eachLayer(layer => {
    if (layer instanceof L.CircleMarker) {
      const source = sources.find(s => s.coords[0] === layer.getLatLng().lat && s.coords[1] === layer.getLatLng().lng);
      const isIssykKulSubregion = ['ak-suu', 'jeti-oguz', 'jyrgalang', 'barbulak', 'cholpon-ata', 'kosh-kol'].includes(source.region.toLowerCase());
      const regionMatch = selectedRegion === 'kyrgyzstan' ||
                          source.region.toLowerCase() === selectedRegion ||
                          (selectedRegion === 'issyk-kul' && isIssykKulSubregion);
      regionMatch ? map.addLayer(layer) : map.removeLayer(layer);
    }
  });
});

export { map };
import { sources, installers } from './data.js';

// Инициализация карты с центром на Кыргызстане
const map = L.map('geoMap').setView([41.2044, 74.7661], 6);

// Добавление слоя карты OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Добавление тепловой карты для зон с высоким потенциалом
const heatPoints = sources
  .filter(source => source.activityEn === 'High')
  .map(source => [...source.coords, 0.5]); // [lat, lng, intensity]
L.heatLayer(heatPoints, { radius: 25, blur: 15 }).addTo(map);

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
const markers = [];
sources.forEach(source => {
  const isEnglish = window.location.pathname.includes('index-en.html');
  const installer = installers.find(i => i.region === source.region);
  const installerInfo = installer
    ? `<br><a href="${installer.website}" target="_blank" class="btn btn-outline">Find Installers</a>`
    : '';
  const popupContent = isEnglish
    ? `<b>${source.name}</b><br>Temperature: ${source.temp}<br>Depth: ${source.depth}<br>Activity: ${source.activityEn}<br>Savings: $${source.saving}/year<br>Potential: ${source.potentialEn}<br>Region: ${source.region}${installerInfo}`
    : `<b>${source.nameRu}</b><br>Температура: ${source.temp}<br>Глубина: ${source.depth}<br>Активность: ${source.activity}<br>Экономия: $${source.saving}/год<br>Потенциал: ${source.potential}<br>Регион: ${source.regionRu}${installerInfo}`;

  const marker = createMarker(source.coords, source.activityEn, popupContent);
  markers.push({ marker, region: source.region });
});

// Фильтрация маркеров по региону
document.getElementById('regionSelect').addEventListener('change', function() {
  const selectedRegion = this.value.toLowerCase();
  markers.forEach(({ marker, region }) => {
    const isIssykKulSubregion = ['ak-suu', 'jeti-oguz', 'jyrgalang', 'barbulak', 'cholpon-ata', 'kosh-kol'].includes(region.toLowerCase());
    const regionMatch = selectedRegion === 'kyrgyzstan' ||
                        region.toLowerCase() === selectedRegion ||
                        (selectedRegion === 'issyk-kul' && isIssykKulSubregion);
    regionMatch ? map.addLayer(marker) : map.removeLayer(marker);
  });
});

// Поиск по ключевым словам
document.getElementById('sourceSearch').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  markers.forEach(({ marker, region }) => {
    const source = sources.find(s => s.region === region);
    const match = source.name.toLowerCase().includes(query) ||
                 source.nameRu.toLowerCase().includes(query) ||
                 source.potential.toLowerCase().includes(query) ||
                 source.potentialEn.toLowerCase().includes(query);
    match ? map.addLayer(marker) : map.removeLayer(marker);
  });
});

export { map };
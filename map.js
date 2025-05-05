import sources from './data.js';

// Инициализация карты с центром на Кыргызстане
const map = L.map('geoMap').setView([41.2044, 74.7661], 6);

// Добавление слоя карты OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Функция для создания кастомной иконки маркера в зависимости от активности источника
function getMarkerIcon(activity) {
  const color = activity.toLowerCase() === 'высокая' || activity.toLowerCase() === 'high' ? 'green' :
                activity.toLowerCase() === 'средняя' || activity.toLowerCase() === 'medium' ? 'orange' :
                activity.toLowerCase() === 'низкая' || activity.toLowerCase() === 'low' ? 'red' : 'gray';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid #fff;"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
}

// Добавление маркеров на карту
sources.forEach(source => {
  const isEnglish = window.location.pathname.includes('index-en.html');
  const markerIcon = getMarkerIcon(source.activity);
  const marker = L.marker(source.coords, { icon: markerIcon }).addTo(map);

  // Формирование контента попапа в зависимости от языка
  const popupContent = isEnglish
    ? `<b>${source.name}</b><br>Temperature: ${source.temp}<br>Depth: ${source.depth}<br>Activity: ${source.activityEn}<br>Savings: $${source.saving}/year<br>Potential: ${source.potentialEn}`
    : `<b>${source.nameRu}</b><br>Температура: ${source.temp}<br>Глубина: ${source.depth}<br>Активность: ${source.activity}<br>Экономия: $${source.saving}/год<br>Потенциал: ${source.potential}`;

  marker.bindPopup(popupContent);
});

// Фильтрация маркеров по региону
document.getElementById('regionSelect').addEventListener('change', function() {
  const region = this.value.toLowerCase();
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      const content = layer.getPopup().getContent().toLowerCase();
      const regionMatch = region === 'kyrgyzstan' || content.includes(region);
      regionMatch ? layer.addTo(map) : map.removeLayer(layer);
    }
  });
});

export { map };
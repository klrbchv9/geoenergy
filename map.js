import sources from './data.js';

// Инициализация карты с центром на Кыргызстане
const map = L.map('geoMap').setView([41.2044, 74.7661], 6);

// Добавление слоя карты OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Кастомная иконка для маркеров
const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3163/3163665.png', // Иконка термального источника
  iconSize: [32, 32], // Размер иконки
  iconAnchor: [16, 32], // Точка привязки (низ иконки)
  popupAnchor: [0, -32] // Смещение попапа
});

// Добавление маркеров на карту
sources.forEach(source => {
  const isEnglish = window.location.pathname.includes('index-en.html');
  const marker = L.marker(source.coords, { icon: customIcon }).addTo(map);

  const popupContent = isEnglish
    ? `<b>${source.name}</b><br>Temperature: ${source.temp}<br>Depth: ${source.depth}<br>Activity: ${source.activityEn}<br>Savings: $${source.saving}/year<br>Potential: ${source.potentialEn}<br>Region: ${source.region}`
    : `<b>${source.nameRu}</b><br>Температура: ${source.temp}<br>Глубина: ${source.depth}<br>Активность: ${source.activity}<br>Экономия: $${source.saving}/год<br>Потенциал: ${source.potential}<br>Регион: ${source.regionRu}`;

  marker.bindPopup(popupContent);
});

// Фильтрация маркеров по региону
document.getElementById('regionSelect').addEventListener('change', function() {
  const selectedRegion = this.value.toLowerCase();
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
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
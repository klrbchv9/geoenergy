import sources from './data.js';

const map = L.map('map').setView([41.2044, 74.7661], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function getMarkerIcon(activity) {
  let color;
  switch (activity.toLowerCase()) {
    case 'высокая':
    case 'high':
      color = '#28a745';
      break;
    case 'средняя':
    case 'medium':
      color = '#ffc107';
      break;
    case 'низкая':
    case 'low':
      color = '#dc3545';
      break;
    default:
      color = '#3388ff';
  }
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <svg width="24" height="36" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 9.36 12 24 12 24s12-14.64 12-24C24 5.373 18.627 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1"/>
        <circle cx="12" cy="12" r="4" fill="#fff"/>
      </svg>
    `,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36]
  });
}

sources.forEach(source => {
  const isEnglish = window.location.pathname.includes('index-en.html');
  const markerIcon = getMarkerIcon(source.activity);
  const marker = L.marker(source.coords, { icon: markerIcon }).addTo(map);
  const popupContent = isEnglish
    ? `<b>${source.name}</b><br>Temperature: ${source.temp}<br>Depth: ${source.depth}<br>Activity: ${source.activity}<br>Savings: $${source.saving}/year<br>Potential: ${source.potential}`
    : `<b>${source.nameRu}</b><br>Температура: ${source.temp}<br>Глубина: ${source.depth}<br>Активность: ${source.activity}<br>Экономия: $${source.saving}/год<br>Потенциал: ${source.potential}`;
  marker.bindPopup(popupContent);
});

document.getElementById('regionSelect').addEventListener('change', function() {
  const region = this.value.toLowerCase();
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      const content = layer.getPopup().getContent().toLowerCase();
      region === 'kyrgyzstan' || content.includes(region) ? layer.addTo(map) : map.removeLayer(layer);
    }
  });
});

export { map };
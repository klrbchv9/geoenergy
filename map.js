import * as L from 'leaflet';
import { regions, hotSprings } from './data.js';

function initMap() {
  // Проверка контейнера карты
  const mapContainer = document.getElementById('map');
  if (!mapContainer) {
    console.error('Контейнер карты с id="map" не найден');
    return;
  }

  // Инициализация карты
  const map = L.map('map').setView([41.0, 74.0], 7);

  // Тайлы OpenStreetMap
  L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
    tileSize: 256,
    zoomOffset: 0
  }).addTo(map).on('tileerror', (error) => {
    console.error('Ошибка загрузки тайлов:', error);
  });

  // Слой для регионов
  const regionLayer = L.layerGroup().addTo(map);
  try {
    regions.forEach(region => {
      if (region.lat && region.lng) {
        const marker = L.marker([region.lat, region.lng])
          .bindPopup(`<b>${region.name}</b><br>${region.description}`);
        regionLayer.addLayer(marker);
      } else {
        console.warn(`Некорректные координаты для региона: ${region.name}`);
      }
    });
  } catch (error) {
    console.error('Ошибка при добавлении регионов:', error);
  }

  // Слой для источников
  const hotSpringsLayer = L.layerGroup().addTo(map);
  const markerCluster = L.markerClusterGroup();

  function updateMarkers() {
    hotSpringsLayer.clearLayers();
    markerCluster.clearLayers();

    const radonFilter = document.getElementById('radonFilter').checked;
    const sulfurFilter = document.getElementById('sulfurFilter').checked;
    const mineralFilter = document.getElementById('mineralFilter').checked;

    hotSprings.forEach(spring => {
      if (
        (spring.type === 'radon' && radonFilter) ||
        (spring.type === 'sulfur' && sulfurFilter) ||
        (spring.type === 'mineral' && mineralFilter)
      ) {
        if (spring.lat && spring.lng) {
          const marker = L.marker([spring.lat, spring.lng], {
            icon: L.icon({
              iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41]
            })
          }).bindPopup(`
            <b>${spring.name}</b><br>
            <b>${isEnglish() ? 'Temperature' : 'Температура'}:</b> ${spring.temperature}<br>
            <b>${isEnglish() ? 'Properties' : 'Свойства'}:</b> ${spring.properties}<br>
            <b>${isEnglish() ? 'Note' : 'Примечание'}:</b> ${spring.note}
          `);
          hotSpringsLayer.addLayer(marker);
          markerCluster.addLayer(marker.clone());
        } else {
          console.warn(`Некорректные координаты для источника: ${spring.name}`);
        }
      }
    });

    map.addLayer(markerCluster);
  }

  // Фильтры
  const filterInputs = document.querySelectorAll('#filters input');
  filterInputs.forEach(input => {
    input.addEventListener('change', updateMarkers);
  });

  // Начальная загрузка маркеров
  updateMarkers();

  // Центрирование карты
  try {
    const bounds = L.latLngBounds(hotSprings.map(spring => [spring.lat, spring.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
  } catch (error) {
    console.error('Ошибка при установке границ карты:', error);
  }
}

// Проверка языка
const isEnglish = () => window.location.pathname.includes('index-en.html');

document.addEventListener('DOMContentLoaded', initMap);

export { initMap };
import * as L from 'leaflet';
import { regions } from './data.js';

// Инициализация карты с центром на Кыргызстане
const map = L.map('map').setView([41.0, 74.0], 7);

// Добавление тайлов OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Слой для существующих регионов
const regionLayer = L.layerGroup().addTo(map);
regions.forEach(region => {
  const marker = L.marker([region.lat, region.lng])
    .bindPopup(`<b>${region.name}</b><br>${region.description}`);
  regionLayer.addLayer(marker);
});

// Данные геотермальных источников
const hotSprings = [
  {
    name: 'Алтын-Арашан',
    lat: 42.373,
    lng: 78.612,
    temperature: '~34°C',
    properties: 'Радоновая вода, помогает при дыхательных и кожных заболеваниях, общее оздоровление.',
    note: 'Точные координаты'
  },
  {
    name: 'Джууку',
    lat: 42.2367,
    lng: 77.9528,
    temperature: '~34°C',
    properties: 'Радоновая вода, помогает при дыхательных и кожных заболеваниях, общее оздоровление.',
    note: 'Приближённые координаты, требуется уточнение'
  },
  {
    name: 'Орукту',
    lat: 42.655,
    lng: 77.083,
    temperature: 'Не указана',
    properties: 'Лечит желудочно-кишечные заболевания, печень, почки, диабет, нервы.',
    note: 'Координаты на основе Plus Code PRGJ+MHX, требуется уточнение'
  },
  {
    name: 'Таш-суу',
    lat: 42.655,
    lng: 77.083,
    temperature: '43–48°C',
    properties: 'Минеральная вода, общее оздоровление, SPA-процедуры.',
    note: 'Координаты на основе Plus Code PRGJ+MHX, требуется уточнение'
  },
  {
    name: 'Чон-кызыл-суу',
    lat: 42.433,
    lng: 78.000,
    temperature: '+43°C',
    properties: 'Сероводородная вода, помогает при кожных и дыхательных заболеваниях, общее оздоровление.',
    note: 'Приближённые координаты на основе описания, требуется уточнение'
  }
];

// Слой для геотермальных источников
const hotSpringsLayer = L.layerGroup().addTo(map);
hotSprings.forEach(spring => {
  const marker = L.marker([spring.lat, spring.lng], {
    icon: L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    })
  }).bindPopup(`
    <b>${spring.name}</b><br>
    <b>Температура:</b> ${spring.temperature}<br>
    <b>Свойства:</b> ${spring.properties}<br>
    <b>Примечание:</b> ${spring.note}
  `);
  hotSpringsLayer.addLayer(marker);
});

// Кластеризация маркеров
const markerCluster = L.markerClusterGroup();
hotSprings.forEach(spring => {
  const marker = L.marker([spring.lat, spring.lng], {
    icon: L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    })
  }).bindPopup(`
    <b>${spring.name}</b><br>
    <b>Температура:</b> ${spring.temperature}<br>
    <b>Свойства:</b> ${spring.properties}<br>
    <b>Примечание:</b> ${spring.note}
  `);
  markerCluster.addLayer(marker);
});
map.addLayer(markerCluster);

// Центрирование карты на геотермальных источниках
const bounds = L.latLngBounds(hotSprings.map(spring => [spring.lat, spring.lng]));
map.fitBounds(bounds, { padding: [50, 50] });

export { map, regionLayer, hotSpringsLayer };
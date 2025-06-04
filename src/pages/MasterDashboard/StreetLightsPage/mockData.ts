import { latLng } from 'leaflet';

export const streetLights = [
  {
    id: 'SL-TH-014',
    location: 'Thu Thiem Bridge 1',
    type: 'Smart LED Street Light',
    power: '220V AC',
    status: 'Active',
    statusColor: '#00e676',
    connectivity: 'LoRaWAN / 4G',
    controller: 'Zhaga Book 18 (Remote dimming + Diagnostics)',
    feature: [
      'Auto dimming by time / motion',
      'Environmental sensor (Temp, Lux)',
      'Fault detection',
      'Remote switch & energy monitoring',
    ],
    lifespan: '80,000 hours',
    latLng: latLng(10.85561, 106.631128),
  },
  {
    id: 'SL-TH-015',
    location: 'Thu Thiem Bridge 2',
    type: 'Smart LED Street Light',
    power: '220V AC',
    status: 'Error',
    statusColor: '#00e676',
    connectivity: 'LoRaWAN / 4G',
    controller: 'Zhaga Book 18 (Remote dimming + Diagnostics)',
    feature: [
      'Auto dimming by time / motion',
      'Environmental sensor (Temp, Lux)',
      'Fault detection',
      'Remote switch & energy monitoring',
    ],
    lifespan: '80,000 hours',
    latLng: latLng(10.855641, 106.631699),
  },
  {
    id: 'SL-TH-016',
    location: 'Thu Thiem Bridge 3',
    type: 'Smart LED Street Light',
    power: '220V AC',
    status: 'Active',
    statusColor: '#ff5252',
    connectivity: 'LoRaWAN / 4G',
    controller: 'Zhaga Book 18 (Remote dimming + Diagnostics)',
    feature: [
      'Auto dimming by time / motion',
      'Environmental sensor (Temp, Lux)',
      'Fault detection',
      'Remote switch & energy monitoring',
    ],
    lifespan: '80,000 hours',
    latLng: latLng(10.85646, 106.630954),
  },
  {
    id: 'SL-TH-017',
    location: 'Thu Thiem Bridge 4',
    type: 'Smart LED Street Light',
    power: '220V AC',
    status: 'Offline',
    statusColor: '#b0b9c6',
    connectivity: 'LoRaWAN / 4G',
    controller: 'Zhaga Book 18 (Remote dimming + Diagnostics)',
    feature: [
      'Auto dimming by time / motion',
      'Environmental sensor (Temp, Lux)',
      'Fault detection',
      'Remote switch & energy monitoring',
    ],
    lifespan: '80,000 hours',
    latLng: latLng(10.856525, 106.631692),
  },
  {
    id: 'SL-TH-018',
    location: 'Thu Thiem Bridge 5',
    type: 'Smart LED Street Light',
    power: '220V AC',
    status: 'Maintenance',
    statusColor: '#ffd600',
    connectivity: 'LoRaWAN / 4G',
    controller: 'Zhaga Book 18 (Remote dimming + Diagnostics)',
    feature: [
      'Auto dimming by time / motion',
      'Environmental sensor (Temp, Lux)',
      'Fault detection',
      'Remote switch & energy monitoring',
    ],
    lifespan: '80,000 hours',
    latLng: latLng(10.856494, 106.631313),
  },
  {
    id: 'SL-TH-019',
    location: 'Thu Thiem Bridge 6',
    type: 'Smart LED Street Light',
    power: '220V AC',
    status: 'Active',
    statusColor: '#00e676',
    connectivity: 'LoRaWAN / 4G',
    controller: 'Zhaga Book 18 (Remote dimming + Diagnostics)',
    feature: [
      'Auto dimming by time / motion',
      'Environmental sensor (Temp, Lux)',
      'Fault detection',
      'Remote switch & energy monitoring',
    ],
    lifespan: '80,000 hours',
    latLng: latLng(10.856052, 106.631706),
  },
];

export const statusList = [
  { label: 'Active', value: 26.5, color: '#5FE9D0' },
  { label: 'Maintenance', value: 23.14, color: '#FAC515' },
  { label: 'Error', value: 20.5, color: '#F97066' },
  { label: 'Offline', value: 10.28, color: '#D0D5DD' },
];

export const lampPositions = [
  { left: '18%', top: '16%', status: 'Active' },
  { left: '38%', top: '10%', status: 'Active' },
  { left: '60%', top: '18%', status: 'Active' },
  { left: '75%', top: '35%', status: 'Maintenance' },
  { left: '80%', top: '60%', status: 'Error' },
  { left: '60%', top: '80%', status: 'Active' },
  { left: '38%', top: '75%', status: 'Offline' },
  { left: '20%', top: '60%', status: 'Active' },
];

export const statusColorMap: Record<string, string> = {
  Active: '#00e676',
  Error: '#ff5252',
  Offline: '#b0b9c6',
  Maintenance: '#ffd600',
};

export const streetLightPolygonCoords = streetLights.map(light => [
  light.latLng.lat,
  light.latLng.lng,
]);
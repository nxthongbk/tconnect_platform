export const streetLights = [
  {
    id: 'SL-TH-014',
    location: 'Thu Thiem Bridge',
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
  },
  {
    id: 'SL-TH-014',
    location: 'Thu Thiem Bridge',
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
  },
  {
    id: 'SL-TH-014',
    location: 'Thu Thiem Bridge',
    type: 'Smart LED Street Light',
    power: '220V AC',
    status: 'Error',
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
  },
  {
    id: 'SL-TH-014',
    location: 'Thu Thiem Bridge',
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
  },
  {
    id: 'SL-TH-014',
    location: 'Thu Thiem Bridge',
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
  },
  {
    id: 'SL-TH-014',
    location: 'Thu Thiem Bridge',
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
  },
];

export const statusList = [
  { label: 'Active', value: 26.5, color: '#5FE9D0' },
  { label: 'Maintenance', value: 23.14, color: '#FAC515' },
  { label: 'Error', value: 20.5, color: '#F97066' },
  { label: 'Offline', value: 10.28, color: '#D0D5DD' },
];

export const lampIconActive = 'assets/images/png/Dot.png';
export const lampIconWarning = 'assets/images/png/Spanner.png';
export const lampIconError = 'assets/images/png/alertTriangle.png';

export const getLampIcon = (status: string) => {
  if (status === 'Active') return lampIconActive;
  if (status === 'Error') return lampIconError;
  if (status === 'Maintenance') return lampIconWarning;
  if (status === 'Offline') return lampIconWarning;
  return lampIconActive;
};

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

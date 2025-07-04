export interface Device {
	id: string;
	status: string;
	alarmStatus?: string;
	latLng: { lat: number; lng: number };
	[key: string]: any;
}

const DEVICE_LATLNG_LIST = [
  { lat: 10.853397686226927, lng: 106.62823723344383 },
  { lat: 10.86, lng: 106.63 },
  { lat: 10.87, lng: 106.64 },
  { lat: 10.88, lng: 106.65 },
  { lat: 10.89, lng: 106.66 },
  { lat: 10.9, lng: 106.67 },
  { lat: 10.91, lng: 106.68 },
  { lat: 10.92, lng: 106.69 },
  { lat: 10.93, lng: 106.7 },
  { lat: 10.94, lng: 106.71 },
  { lat: 10.95, lng: 106.72 },
  { lat: 10.96, lng: 106.73 },
  { lat: 10.97, lng: 106.74 },
  { lat: 10.98, lng: 106.75 },
  { lat: 10.99, lng: 106.76 },
  { lat: 11.0, lng: 106.77 },
  { lat: 11.01, lng: 106.78 },
  { lat: 11.02, lng: 106.79 },
  { lat: 11.03, lng: 106.8 },
  { lat: 11.04, lng: 106.81 },
  { lat: 11.05, lng: 106.82 },
];

export default DEVICE_LATLNG_LIST;


export const mockVoltageData = [
  { time: '14:23', A: 226.69, B: 195.69, C: 215.99 },
  { time: '14:24', A: 228.12, B: 197.01, C: 217.12 },
  { time: '14:25', A: 229.45, B: 196.88, C: 216.55 },
  { time: '14:26', A: 230.50, B: 200.00, C: 215.99 },
  { time: '14:27', A: 235.00, B: 207.42, C: 215.99 },
];

export const mockEnergyConsumptionBarData = [
  { hour: '08:00', A: 0.01, B: 0.01, C: 0.02 },
  { hour: '10:00', A: 0.02, B: 0.01, C: 0.01 },
  { hour: '12:00', A: 0.01, B: 0.02, C: 0.01 },
  { hour: '14:00', A: 0.02, B: 0.01, C: 0.02 },
  { hour: '16:00', A: 0.01, B: 0.01, C: 0.01 },
  { hour: '18:00', A: 0.02, B: 0.02, C: 0.01 },
  { hour: '20:00', A: 0.01, B: 0.01, C: 0.02 },
  { hour: '22:00', A: 0.01, B: 0.01, C: 0.01 },
];

export const mockEnergyMeters = [
  {
    name: 'Smart Meter A',
    label: '1st Floor',
    voltage: 216.88,
    amperage: 8.0,
    power: 1735.04,
  },
  {
    name: 'Smart Meter B',
    label: '2nd Floor',
    voltage: 195.24,
    amperage: 6.66,
    power: 1300.3,
  },
  {
    name: 'Smart Meter C',
    label: '3rd Floor',
    voltage: 207.42,
    amperage: 9.08,
    power: 1883.37,
  },
];

export const mockEnergyConsumptionPie = [
  { name: 'Smart Meter A', value: 0.01, percent: 32, color: '#ff4c4c' },
  { name: 'Smart Meter B', value: 0.01, percent: 32, color: '#4cff4c' },
  { name: 'Smart Meter C', value: 0.02, percent: 36, color: '#4c9cff' },
];

export const mockAmperageData = [
  { time: '14:23', A: 7.06, B: 7.24, C: 7.78 },
  { time: '14:24', A: 8.12, B: 8.01, C: 8.55 },
  { time: '14:25', A: 9.45, B: 8.88, C: 8.99 },
  { time: '14:26', A: 10.50, B: 9.00, C: 9.99 },
  { time: '14:27', A: 9.00, B: 9.42, C: 10.12 },
];

export const mockAlarms = [
  {
    time: '2025-07-01 14:26:59',
    originator: 'Smart Meter B',
    type: 'Low Voltage Alarm',
    severity: 'Critical',
    status: 'Active Unacknowledged',
  },
];
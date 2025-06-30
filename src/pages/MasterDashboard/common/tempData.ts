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
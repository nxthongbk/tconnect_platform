interface Device {
  id: string;
  status: string;
  alarmStatus?: string;
  latLng?: { lat: number; lng: number };
  [key: string]: any;
}

type DeviceType = 'firealarm' | 'cctv' | 'streetlight';

export function mapToDeviceItems(
  device: Device,
  idx: number,
  type: DeviceType,
  latlngList: { lat: number; lng: number }[]
) {
  let status: 'Active' | 'Error' | 'Maintenance' | 'Offline' | 'Alarm';
  if (device.status === 'Active') status = 'Active';
  else if (device.status === 'Error' || device.alarmStatus === 'ALARM') status = 'Error';
  else if (device.status === 'Maintenance') status = 'Maintenance';
  else if (device.status === 'Offline') status = 'Offline';
  else if (device.status === 'Alarm') status = 'Alarm';
  else status = 'Active';

  const latlng =
    device.latLng && device.latLng.lat && device.latLng.lng
      ? device.latLng
      : latlngList[idx] || { lat: null, lng: null };

  return {
    ...device,
    id: device.id,
    name: device.name,
    lat: latlng.lat,
    lng: latlng.lng,
    type,
    status,
  };
}
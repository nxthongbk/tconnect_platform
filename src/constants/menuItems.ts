export interface MenuItem {
  label: string;
  path?: string;
}

export const menuItems: MenuItem[] = [
  { label: 'Traffic Light', path: '/traffic-light' },
  { label: 'CCTV', path: '/cctv' },
  { label: 'Energy', path: '/energy' },
  { label: 'Fire Alarm', path: '/fire-alarm' },
  { label: 'Street Light', path: '/street-light' },
];

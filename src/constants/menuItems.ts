export interface MenuItem {
  label: string;
  path?: string;
}

export const menuItems: MenuItem[] = [
  { label: 'Traffic', path: '/traffic' },
  { label: 'Light', path: '/light' },
  { label: 'CCTV', path: '/cctv' },
  { label: 'Energy', path: '/energy' },
  { label: 'Fire Alarm', path: '/fire-alarm' },
  { label: 'Street Light', path: '/street-light' },
];

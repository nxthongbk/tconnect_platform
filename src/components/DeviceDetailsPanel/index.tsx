import './style.scss';

interface Field {
  label: string;
  key: string;
}

interface DeviceDetailsPanelProps {
  device: any;
  fields: Field[];
  backgroundImage: string;
  panelClassName?: string;
  customRows?: React.ReactNode;
}

const safeValue = (value: any) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') {
    if ('name' in value && typeof value.name === 'string') return value.name;
    return '';
  }
  return String(value);
};

const DeviceDetailsPanel = ({
  device,
  fields,
  backgroundImage,
  panelClassName = 'details-panel',
  customRows,
}: DeviceDetailsPanelProps) => {
  if (!device) return null;
  const deviceProfileName =
    device.deviceProfile && device.deviceProfile.name ? device.deviceProfile.name : device.type;

  return (
    <div className={panelClassName} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="details-id-row">
        <span className="details-id">{safeValue(device.name ? device.name : device.id)}</span>
        <span
          className={`details-status-badge status-${
            device.alarmStatus
              ? safeValue(device.alarmStatus).toLowerCase()
              : safeValue(device.status).toLowerCase()
          }`}
        >
          {device.alarmStatus ? 'WARNING' : safeValue(device.status)}
        </span>
      </div>
      <div className="details-location">
        {safeValue(device.locationInfo?.name ?? device.location ?? 'TMA')}
      </div>
      <div className="details-row">
        <span className="details-label">TYPE</span>
        <span className="details-value">{safeValue(deviceProfileName)}</span>
      </div>
      {fields.map(field => (
        <div className="details-row" key={field.key}>
          <span className="details-label">{field.label}</span>
          <span className="details-value">{safeValue(device[field.key])}</span>
        </div>
      ))}
      {customRows}
    </div>
  );
};

export default DeviceDetailsPanel;

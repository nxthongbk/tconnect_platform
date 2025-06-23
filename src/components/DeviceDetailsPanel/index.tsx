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
        <span className="details-id">{device.name ? device.name : device.id}</span>
        <span
          className={`details-status-badge status-${
            device.alarmStatus ? device.alarmStatus.toLowerCase() : device.status?.toLowerCase()
          }`}
        >
          {device.alarmStatus ? 'WARNING' : device.status}
        </span>
      </div>
      <div className="details-location"> {device.locationInfo ?? device.location ?? 'TMA'}</div>
      <div className="details-row">
        <span className="details-label">TYPE</span>
        <span className="details-value">{deviceProfileName}</span>
      </div>
      {fields.map(field => (
        <div className="details-row" key={field.key}>
          <span className="details-label">{field.label}</span>
          <span className="details-value">{device[field.key]}</span>
        </div>
      ))}
      {customRows}
    </div>
  );
};

export default DeviceDetailsPanel;

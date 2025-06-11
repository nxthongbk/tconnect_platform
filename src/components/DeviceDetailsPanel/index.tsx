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
  return (
    <div className={panelClassName} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="details-id-row">
        <span className="details-id">{device.id}</span>
        <span className={`details-status-badge status-${device.status?.toLowerCase()}`}>
          {device.status}
        </span>
      </div>
      <div className="details-location">{device.location}</div>
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
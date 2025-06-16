import './style.scss';
import dotIcon from '~/assets/images/png/Dot.png';
import spannerIcon from '~/assets/images/png/spanner.png';
import alertTriangleIcon from '~/assets/images/png/alertTriangle.png';
import blockedIcon from '~/assets/images/png/blocked.png';

interface DeviceCardProps {
  device: any;
  icon: string;
  typeLabel?: string;
  powerLabel?: string;
  deviceType: 'streetlight' | 'cctv';
}

const DeviceCardItem = ({
  device,
  icon,
  typeLabel = 'TYPE',
  powerLabel = 'POWER SUPPLY',
  deviceType,
}: DeviceCardProps) => (
  <div className={`device-card-item status-${device.status?.toLowerCase()} bg`}>
    <div className="device-card-item-header">
      <div>
        <div className="device-item-id">{device.id}</div>
        <div className="device-item-location">{device.location}</div>
      </div>
      <img src={icon} alt={deviceType} className="device-card-item-icon" />
    </div>
    <div className="device-card-item-body">
      <div>
        <span className="type-label">{typeLabel}</span>
        <span className="type-value">{device.type}</span>
      </div>
      <div>
        <span className="power-label">{powerLabel}</span>
        <span className="power-value">
          {deviceType === 'streetlight' ? device.power : device.updatedAt}
        </span>
      </div>
    </div>
    <div className={`device-item-status-badge status-${device.status.toLowerCase()}`}>
      {device.status === 'Active' && <img src={dotIcon} alt="Active" className="status-dot" />}
      {device.status === 'Error' && (
        <img src={alertTriangleIcon} alt="Error" className="status-dot" />
      )}
      {device.status === 'Maintenance' && (
        <img src={spannerIcon} alt="Maintenance" className="status-dot" />
      )}
      {device.status === 'Offline' && (
        <img src={blockedIcon} alt="Offline" className="status-dot" />
      )}
      <span className="status-text">{device.status}</span>
    </div>
  </div>
);

export default DeviceCardItem;

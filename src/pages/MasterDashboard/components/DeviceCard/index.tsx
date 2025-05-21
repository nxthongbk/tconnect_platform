import './style.scss';

const DeviceCard = ({ device }: { device: any }) => {
  return (
    <div className="device-card">
      <div className="device-header">
        <div className="device-name">{device.name}</div>
        <span className="device-status">Active</span>
      </div>

      <div className="device-sub">{device.locationShort}</div>

      <div className="device-info">
        <div className="label">UUID</div>
        <div className="value">{device.uuid}</div>

        <div className="label">Location</div>
        <div className="value">{device.locationFull}</div>

        <div className="label">Device Profile</div>
        <div className="value">{device.profile}</div>

        <div className="label">Type</div>
        <div className="value">{device.type}</div>

        <div className="label">Waiting Time</div>
        <div className="value">{device.waitingTime}</div>
      </div>

      <div className="device-actions">
        <button className="btn maintenance">Maintenance</button>
        <button className="btn details">View Details</button>
      </div>
    </div>
  );
};

export default DeviceCard;

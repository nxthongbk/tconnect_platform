import './style.scss';
import streetLamp from '~/assets/images/png/device-lamp.png';
import 'leaflet/dist/leaflet.css';
import dotIcon from '~/assets/images/png/Dot.png';
import spannerIcon from '~/assets/images/png/spanner.png';
import alertTriangleIcon from '~/assets/images/png/alertTriangle.png';
import blockedIcon from '~/assets/images/png/blocked.png';

const DeviceCard = ({ light }: { light: any }) => {
  return (
    <div className={`streetlight-card status-${light.status.toLowerCase()} bg`}>
      <div className="streetlight-card-header">
        <div>
          <div className="streetlight-id">{light.id}</div>
          <div className="streetlight-location">{light.location}</div>
        </div>
        <img src={streetLamp} alt="lamp" className="streetlight-card-icon" />
      </div>
      <div className="streetlight-card-body">
        <div>
          <span className="type-label">TYPE</span>
          <span className="type-value">{light.type}</span>
        </div>
        <div>
          <span className="power-label">POWER SUPPLY</span>
          <span className="power-value">{light.power}</span>
        </div>
      </div>
      <div className={`streetlight-status-badge status-${light.status.toLowerCase()}`}>
        {light.status === 'Active' && <img src={dotIcon} alt="Active" className="status-dot" />}
        {light.status === 'Error' && (
          <img src={alertTriangleIcon} alt="Error" className="status-dot" />
        )}
        {light.status === 'Maintenance' && (
          <img src={spannerIcon} alt="Maintenance" className="status-dot" />
        )}
        {light.status === 'Offline' && (
          <img src={blockedIcon} alt="Offline" className="status-dot" />
        )}
        <span className="status-text">{light.status}</span>
      </div>
    </div>
  );
};

export default DeviceCard;

import './style.scss';
import cctvDetailFrame from '~/assets/images/png/cctvDetailFrame.png';
import liveCamera from '~/assets/images/png/cameraCCTV.png';

const CCTVDetails = ({ device }) => {
  if (!device) return null;
  return (
    <div className="cctv-details-panel" style={{ backgroundImage: `url(${cctvDetailFrame})` }}>
      <div className="details-id-row">
        <span className="details-id">{device.id}</span>
        <span className={`details-status-badge status-${device.status?.toLowerCase()}`}>
          {device.status}
        </span>
      </div>
      <div className="details-location">{device.location}</div>
      <div className="details-row">
        <span className="details-label">TYPE</span>{' '}
        <span className="details-value">{device.type}</span>
      </div>
      <div className="details-row">
        <span className="details-label">RESOLUTION</span>{' '}
        <span className="details-value">{device.resolution}</span>
      </div>
      <div className="details-row">
        <span className="details-label">LENS</span>{' '}
        <span className="details-value">{device.lens}</span>
      </div>
      <div className="details-row">
        <span className="details-label">NIGHT VERSION</span>{' '}
        <span className="details-value">{device.nightVersion}</span>
      </div>
      <div className="details-row">
        <span className="details-label">IR RANGE</span>{' '}
        <span className="details-value">{device.irRange}</span>
      </div>
      <div className="details-row">
        <span className="details-label">SMART FEATURE</span>
        <span className="details-value">{device.smartFeatures}</span>
      </div>
      <div className="details-row">
        <span className="details-label">PROTECTION</span>{' '}
        <span className="details-value">{device.protection}</span>
      </div>
      <div className="details-row">
        <span className="details-label">POWER</span>{' '}
        <span className="details-value">{device.power}</span>
      </div>
      <div className="details-row">
        <span className="details-label">LIVE CAMERA</span>{' '}
        <span className="details-value">
          {' '}
          <img src={liveCamera} />
        </span>
      </div>
    </div>
  );
};

export default CCTVDetails;

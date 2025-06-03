import './style.scss';

const StreetLightDetails = ({ device }) => {
  if (!device) return null;
  return (
    <div className="streetlight-details-panel">
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
        <span className="details-label">MODEL</span>{' '}
        <span className="details-value">{device.model}</span>
      </div>
      <div className="details-row">
        <span className="details-label">POWER SUPPLY</span>{' '}
        <span className="details-value">{device.power}</span>
      </div>
      <div className="details-row">
        <span className="details-label">CONNECTIVITY</span>{' '}
        <span className="details-value">{device.connectivity}</span>
      </div>
      <div className="details-row">
        <span className="details-label">CONTROLLER</span>{' '}
        <span className="details-value">{device.controller}</span>
      </div>
      <div className="details-row">
        <span className="details-label">FEATURE</span>
        <ul className="details-feature-list">
          {device.feature?.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      </div>
      <div className="details-row">
        <span className="details-label">LIFESPAN</span>{' '}
        <span className="details-value">{device.lifespan}</span>
      </div>
    </div>
  );
};

export default StreetLightDetails;

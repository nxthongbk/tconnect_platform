import { useEffect, useState } from 'react';
import './style.scss';
import { Avatar } from '@mui/material';
import DeviceCard from './components/DeviceCard';

const MasterBoardPage = () => {
  const [time, setTime] = useState(new Date());
  const [country, setCountry] = useState('US');
  const [activeDevice, setActiveDevice] = useState<any>();

  const devices = [
    'Wulu-000007',
    'Wulu-000008',
    'Wulu-000009',
    'Wulu-000010',
    'Wulu-000010',
    'Wulu-000010',
    'Wulu-000010',
  ];

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString();

  return (
    <div className="master-board-page">
      <div className="top-bar-wrapper">
        <img src="/assets/Topbar.png" alt="Top Bar" className="top-bar" />

        <div className="top-bar-content">
          <div className="top-bar-date">
            {formattedTime} {formattedDate}
          </div>

          <div className="top-bar-title">Master Dashboard</div>

          <div className="top-bar-controls">
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="country-select"
            >
              <option value="US">USA</option>
              <option value="VN">Vietnam</option>
              <option value="JP">Japan</option>
            </select>

            <Avatar sx={{ width: 25, height: 25 }} alt="User Avatar" />
          </div>
        </div>
      </div>

      <div className="router-layout">
        <div className="router-overview">
          <h2>Router Overview</h2>

          <ul className="device-list">
            {devices.map((device, index) => (
              <li
                key={index}
                className={activeDevice === index ? 'active' : ''}
                onClick={() => setActiveDevice(index)}
              >
                <div className="device-container">
                  <div className="device-info">
                    <span className="device-id">{device}</span>
                    <span className="device-location">QTSC1</span>
                    <span className="device-ip-label">IP ADDRESS</span>
                    <span className="device-ip">192.168.1.23</span>
                    <span className="device-mac-label">MAC</span>
                    <span className="device-mac">8D:74:32:AB:3F:12</span>
                  </div>
                  <img src="/assets/wulu-device.png" alt="Device Img" className="device-image" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="router-main">
          <h2>MAP BOX</h2>
        </div>

        <div>
          <div className="search-container">
            <input type="text" placeholder="Search location" className="search-input" />
          </div>
          <div className="router-detail">
            <h2>Router Detail</h2>

            <DeviceCard
              device={{
                name: 'Wulu-000007',
                locationShort: 'QTSC1',
                uuid: '26dcbbb1-f9c9-4638-b8a0-b5b6cfed6',
                locationFull: '12 Quang Trung',
                profile: '192.168.1.23',
                type: 'WULU-MESH',
                waitingTime: '5 mins',
              }}
            />
          </div>
        </div>
      </div>

      <ul className="bottom-menu">
        <li>Traffic</li>
        <li>Light</li>
        <li>CCTV</li>
        <li>Energy</li>
        <li>Fire Alarm</li>
        <li>Street Light</li>
      </ul>

      <img src="/assets/Bottombar.png" alt="Bottom Bar" className="bottom-bar" />
    </div>
  );
};

export default MasterBoardPage;

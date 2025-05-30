import { useEffect, useState } from 'react';
import './style.scss';
import { Avatar } from '@mui/material';
import BottomMenu from '~/components/BottomMenu';
import { menuItems } from '~/constants/menuItems';
import { useNavigate } from 'react-router-dom';
import ChartArea from './components/Chart/ChartArea';
import CardBlock from './components/Card/CardBlock';
import {
  overviewData,
  powerBlocksData,
  progressListColumn,
  powerCircleData,
  carbonStatisticData,
  deviceStatisticData,
} from './mockData';

import ChartBar from './components/Chart/ChartBar';
import ChartCircle from './components/Chart/ChartCircle.tsx';
import ChartHorizontalBar from './components/Chart/ChartHorizontalBar.tsx';

// Card component for reuse
const Card = ({
  title,
  children,
  height,
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
  height?: string | number;
}) => (
  <div className="dashboard-card" style={height ? { height } : undefined}>
    <div className="dashboard-card-header">
      <span className="dashboard-card-title">{title}</span>
    </div>
    <div className="dashboard-card-content">{children}</div>
  </div>
);

const LeftPanel = () => (
  <div className="dashboard-panel left-panel">
    <Card title="OVERVIEW">
      <div className="overview-grid">
        {overviewData.map((item, idx) => (
          <div className="overview-item" key={idx}>
            <span className="overview-icon">
              <img src={item.icon} alt="icon" />
            </span>
            <div>
              <div className="overview-label">{item.label}</div>
              <div className="overview-value">
                {item.value} <span className="overview-unit">{item.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
    <Card title="POWER">
      <div className="power-blocks">
        {powerBlocksData.map((item, idx) => (
          <CardBlock
            key={idx}
            label={item.label}
            value={item.value}
            unit={item.unit}
            className="card-block"
          />
        ))}
      </div>
    </Card>
    <Card title="INSTANT POWER">
      <ChartArea />
    </Card>
    <Card title="TOP 5 EQUIPMENT TIME MONTHLY">
      <ChartBar data={progressListColumn} />
    </Card>
  </div>
);

const RightPanel = () => (
  <div className="dashboard-panel right-panel">
    <Card title="POWER">
      <div className="power-circles">
        {powerCircleData.map((item, idx) => (
          <div className="animated-circle-chart" key={idx}>
            <ChartCircle value={item.value} />
            <div className="circle-label">{item.label}</div>
          </div>
        ))}
      </div>
    </Card>
    <Card title="TOP 5 PR">
      <ChartHorizontalBar />
    </Card>
    <Card title="TOTAL CARBON REDUCTION">
      <div className="power-blocks">
        {carbonStatisticData.map((item, idx) => (
          <CardBlock
            key={idx}
            label={item.label}
            value={item.value}
            unit={item.unit}
            className="card-block"
          />
        ))}
      </div>
    </Card>
    <Card title="DEVICE STATISTIC">
      <div className="power-blocks">
        {deviceStatisticData.map((item, idx) => (
          <CardBlock
            key={idx}
            label={item.label}
            value={item.value}
            unit={item.unit}
            className="card-block"
          />
        ))}
      </div>
    </Card>
  </div>
);

const CenterMapPanel = () => (
  <div className="dashboard-panel center-panel">
    <div className="map-wrapper">
      <img src="/src/assets/images/png/map.png" alt="Map" className="map-bg" />
    </div>
  </div>
);

const EnergyPage = () => {
  const [time, setTime] = useState(new Date());
  const [country, setCountry] = useState('US');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString();

  return (
    <div className="energy-page dashboard-template">
      {/* Top Bar */}
      <div className="top-bar-wrapper">
        <img src="/src/assets/images/png/Topbar.png" alt="Top Bar" className="top-bar" />
        <div className="top-bar-content">
          <div className="top-bar-date">
            {formattedTime} {formattedDate}
          </div>
          <div
            className="top-bar-title"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Master Dashboard
          </div>
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

      {/* Main Dashboard Layout */}
      <div className="dashboard-main">
        <LeftPanel />
        <CenterMapPanel />
        <RightPanel />
      </div>

      {/* Bottom Menu and Bar */}
      <div>
        <BottomMenu
          activePath={location.pathname}
          items={menuItems}
          onMenuClick={path => path && navigate(path)}
        />
        <img
          src="/src/assets/images/png/Bottombar.png"
          alt="Bottom Bar"
          className="bottom-bar"
          style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100vw',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};

export default EnergyPage;

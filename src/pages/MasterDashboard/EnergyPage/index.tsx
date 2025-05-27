import { useEffect, useState } from 'react';
import './style.scss';
import { Avatar, Grid, Stack, Typography } from '@mui/material';
import BottomMenu from '~/components/BottomMenu';
import { menuItems } from '~/constants/menuItems';
// import DeviceCard from './components/DeviceCard';
import { useNavigate } from 'react-router-dom';
import CardDataBorder from './components/Card/CardDataBorder';
import CardTitle from './components/Card/CardTitle';
import ChartArea from './components/Chart/ChartArea';
import CardDataRound from './components/Card/CardDataRound';
import CardBlock from './components/Card/CardBlock';

// Card component for reuse
const Card = ({
  title,
  icon,
  children,
  height,
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
  height?: string | number;
}) => (
  <div className="dashboard-card" style={height ? { height } : undefined}>
    {/* <img src='/src/assets/images/png/frameEnergy.png' alt="" className="card-bg" /> */}

    <div className="dashboard-card-header">
      {/* <span className="dashboard-card-corner"></span> */}
      {/* {icon && <img src={icon} alt="" className="dashboard-card-icon" />} */}
      <span className="dashboard-card-title">{title}</span>
    </div>
    <div className="dashboard-card-content">{children}</div>
  </div>
);

const LeftPanel = () => (
  <div className="dashboard-panel left-panel">
    <Card title="OVERVIEW">
      <div className="overview-grid">
        <div className="overview-item">
          <span className="overview-icon">
            <img src="/src/assets/images/png/metrics.png" alt="icon" />
          </span>
          <div>
            <div className="overview-label">POWER STATIONS</div>
            <div className="overview-value">
              38 <span className="overview-unit">PCS</span>
            </div>
          </div>
        </div>
        <div className="overview-item">
          <span className="overview-icon">
            <img src="/src/assets/images/png/metrics.png" alt="icon" />
          </span>
          <div>
            <div className="overview-label">INSTANT POWER</div>
            <div className="overview-value">
              858.41 <span className="overview-unit">MWh</span>
            </div>
          </div>
        </div>
        <div className="overview-item">
          <span className="overview-icon">
            <img src="/src/assets/images/png/metrics.png" alt="icon" />
          </span>
          <div>
            <div className="overview-label">TOTAL CAPACITY</div>
            <div className="overview-value">
              2609.71 <span className="overview-unit">MWh</span>
            </div>
          </div>
        </div>
        <div className="overview-item">
          <span className="overview-icon">
            <img src="/src/assets/images/png/metrics.png" alt="icon" />
          </span>
          <div>
            <div className="overview-label">WIND POWER</div>
            <div className="overview-value">
              1097 <span className="overview-unit">MWh</span>
            </div>
          </div>
        </div>
        <div className="overview-item">
          <span className="overview-icon">
            <img src="/src/assets/images/png/metrics.png" alt="icon" />
          </span>
          <div>
            <div className="overview-label">PV CAPACITY</div>
            <div className="overview-value">
              858.41 <span className="overview-unit">MWh</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
    <Card title="POWER" height='154px'>
      {/* <div className="power-station-list">
				<div className="station-item">
					<span className="station-icon">
						<img src="/src/assets/images/png/station.png" alt="icon" />
					</span>
					<div className="station-info">
						<div className="station-name">WULU-000007</div>
						<div className="station-location">QTSC1</div>
					</div>
				</div>
				
			</div> */}
      <div className="power-blocks">
    <CardBlock label="DAILY" value="1536.78" unit="MWh" />
    <CardBlock label="MONTHLY" value="7563.78" unit="MWh" />
    <CardBlock label="YEARLY" value="13563.7" unit="MWh" />
  </div>
    </Card>
    <Card title="INSTANT POWER">
      <div className="chart-placeholder">[Chart]</div>
    </Card>
    <Card title="TOP 5 EQUIPMENT TIME MONTHLY">
      <div className="chart-placeholder">[Bar Chart]</div>
    </Card>
  </div>
);

const RightPanel = () => (
  <div className="dashboard-panel right-panel">
    {/* <img src='/src/assets/images/png/eneryFrame.png' alt="" className="panel-bg" /> */}
    <Card title="POWER">
      <div className="power-circles">
        <div>
          <div className="circle">85%</div>
          <div className="circle-label">PC for the month</div>
        </div>
        <div>
          <div className="circle">68%</div>
          <div className="circle-label">PC for the year</div>
        </div>
      </div>
    </Card>
    <Card title="TOP 5 PR">
      <div className="chart-placeholder">[Horizontal Bar Chart]</div>
    </Card>
    <Card title="TOTAL CARBON REDUCTION">
      <div className="carbon-stats">
        <div>
          <div className="carbon-label">COAL</div>
          <div className="carbon-value">36.26</div>
          <div className="carbon-unit">Million tones</div>
        </div>
        <div>
          <div className="carbon-label">CO2</div>
          <div className="carbon-value">90.3</div>
          <div className="carbon-unit">Million tones</div>
        </div>
        <div>
          <div className="carbon-label">TREES</div>
          <div className="carbon-value">84.42</div>
          <div className="carbon-unit">Million tones</div>
        </div>
      </div>
    </Card>
    <Card title="DEVICE STATISTIC">
      <div className="device-stats">
        <div>
          <div className="device-label">PV INVESTERS</div>
          <div className="device-value">5679</div>
          <div className="device-unit">Set</div>
        </div>
        <div>
          <div className="device-label">WIND TUITION</div>
          <div className="device-value">879</div>
          <div className="device-unit">Set</div>
        </div>
        <div>
          <div className="device-label">TRANSFORMERS</div>
          <div className="device-value">879</div>
          <div className="device-unit">Set</div>
        </div>
      </div>
    </Card>
  </div>
);

const CenterMapPanel = () => (
  <div className="dashboard-panel center-panel">
    <img src="/src/assets/images/png/map.png" alt="Map" className="map-bg" />
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

      {/* Main Dashboard Layout */}
      <div className="dashboard-main">
        <LeftPanel />
        <CenterMapPanel />
        <RightPanel />
      </div>

      {/* Bottom Menu and Bar */}
      <BottomMenu
        activePath={location.pathname}
        items={menuItems}
        onMenuClick={path => path && navigate(path)}
      />
      <img src="/src/assets/images/png/Bottombar.png" alt="Bottom Bar" className="bottom-bar" />
    </div>
  );
};

export default EnergyPage;

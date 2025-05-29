import { useEffect, useState } from 'react';
import './style.scss';
import { Avatar, Box, Grid } from '@mui/material';
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
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';

const Marker = ({ id, top, left }) => (
  <div
    id={id}
    className="glow-marker"
    style={{
      position: 'absolute',
      top,
      left,
    }}
  />
);

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
    <img src="/src/assets/images/png/map.png" alt="Map" className="map-bg" />
    {/* <Box
      sx={{
        backgroundImage: `url(~/assets/images/svg/mapBgColor.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: '150%',
        width: '100%',
        position: 'absolute',
      }}
    ></Box> */}

    <Box
      sx={{
        backgroundImage: `url(~/assets/images/svg/mapBgColor.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: '150%',
        width: '100%',
        position: 'absolute',
      }}
    />

    <Xwrapper>
      {/* <img
        src="/src/assets/images/svg/markEndCenter.svg"
        width={'35px'}
        height={'30px'}
        id="mark-end-center"
        style={{ position: 'absolute', top: '500px', left: '350px' }}
      /> */}
      {/* <img
        src="/src/assets/images/svg/markEnd.svg"
        width={'45px'}
        height={'60px'}
        id="mark-end"
        style={{ position: 'absolute', top: '500px', left: '350px' }}
      /> */}

      <img
        src="/src/assets/images/svg/markEnd.svg"
        width="45px"
        height="60px"
        id="mark-end"
        style={{ position: 'absolute', top: '82%', left: '30%' }}
      />

      {/* <Marker id="marker-2" top="100px" left="120px" />
      <Marker id="marker-3" top="150px" left="180px" />
      <Marker id="marker-4" top="200px" left="140px" />
      <Marker id="marker-5" top="300px" left="160px" />
      <Marker id="marker-6" top="350px" left="100px" />
      <Marker id="marker-7" top="400px" left="190px" />
      <Marker id="marker-8" top="450px" left="210px" /> */}
      {/* <div className="marker-glow" style={{ top: '10%', left: '5%' }} id="marker-1" />
      <div className="marker-glow" style={{ top: '20%', left: '7%' }} id="marker-2" />
      <div className="marker-glow" style={{ top: '30%', left: '8%' }} id="marker-3" />
      <div className="marker-glow" style={{ top: '40%', left: '10%' }} id="marker-4" />
      <div className="marker-glow" style={{ top: '50%', left: '12%' }} id="marker-5" /> */}

      <div className="marker-glow" style={{ top: '12%', left: '8%' }} id="marker-1" />
      <div className="marker-glow" style={{ top: '18%', left: '10%' }} id="marker-2" />
      <div className="marker-glow" style={{ top: '25%', left: '12%' }} id="marker-3" />
      <div className="marker-glow" style={{ top: '35%', left: '9%' }} id="marker-4" />
      <div className="marker-glow" style={{ top: '45%', left: '11%' }} id="marker-5" />
      <div className="marker-glow" style={{ top: '55%', left: '13%' }} id="marker-6" />

      {/* {[2, 3, 4, 5, 6, 7, 8].map(i => (
        <Xarrow
          key={i}
          start={`marker-${i}`}
          end="mark-end"
          showHead={false}
          lineColor="#3ff9e5"
          strokeWidth={2}
          dashness={{ strokeLen: 8, nonStrokeLen: 6 }}
        />
      ))} */}
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Xarrow
          key={i}
          start={`marker-${i}`}
          end="mark-end"
          showHead={false}
          lineColor="#3ff9e5"
          strokeWidth={2}
          dashness={{ strokeLen: 12, nonStrokeLen: 8 }}
          curveness={0.6} // Add this to mimic the curves
        />
      ))}
    </Xwrapper>
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

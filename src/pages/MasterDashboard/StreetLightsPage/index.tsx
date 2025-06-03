import { useEffect, useRef, useState } from 'react';
import './style.scss';
import { Avatar, Box } from '@mui/material';
import DeviceCard from './components/DeviceCard';
import topBar from '~/assets/images/png/Topbar.png';
import bottomBar from '~/assets/images/png/Bottombar.png';
import CustomMap from '~/components/LeafletMapBox';
import { MapRef } from 'react-map-gl';
import { popupStyles } from '~/pages/tenant/ControlCenterPage/styled';

import { useNavigate } from 'react-router-dom';
import BottomMenu from '~/components/BottomMenu';
import { menuItems } from '~/constants/menuItems';
import CardFrame from '~/components/CardFrame';
import { streetLights } from './mockData';
import StatusChart from './components/StatusChart';
import StreetLightDetails from './components/StreetLightDetails';
import { Button, Typography, Paper } from '@mui/material';

const StreetLightBoardPage = () => {
  const mapRefRight = useRef<MapRef>();
  const [time, setTime] = useState(new Date());
  const [country, setCountry] = useState('US');
  const [activeDevice, setActiveDevice] = useState<any>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString();

  return (
    <div className="streetlights-page dashboard-streetlights-template">
      <Box className="streetlights-main" sx={popupStyles}>
        <CustomMap
          initialCenter={{ lat: -16.92250772004144, lng: 145.7485087054897 }}
          mapRef={mapRefRight}
        />
      </Box>

      <div className="top-bar-wrapper">
        <img src={topBar} alt="Top Bar" className="top-bar" />

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

      <div className="streetlights-layout">
        <div className="left-container">
          <CardFrame title="STREETLIGHT OVERVIEW">
            <div className="streetlights-overview">
              <div className="overview-tabs">
                <button className="tab">Locations</button>
                <button className="tab active">Devices</button>
              </div>
              <ul className="streetlight-list">
                {streetLights.map((device, index) => (
                  <li
                    key={index}
                    className={`${activeDevice === index ? 'active' : ''} ${device.status === 'Error' ? 'error' : ''}`}
                    onClick={() => setActiveDevice(index)}
                  >
                    <DeviceCard light={device} />
                  </li>
                ))}
              </ul>
            </div>
          </CardFrame>
        </div>

        <div className="right-container">
          {/* <div className="search-container">
            <input type="text" placeholder="Search location" className="search-input" />
          </div> */}

          <CardFrame title="STREETLIGHT STATUS">
            <StatusChart />
          </CardFrame>

          <CardFrame title="STREETLIGHT DETAILS">
            <Paper
              sx={{
                backgroundColor: 'transparent',
                border: '2px gray solid',
                borderRadius: 0,
                boxShadow: 'none',
                clipPath:
                  'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}
            >
              <StreetLightDetails device={streetLights[activeDevice]} />
            </Paper>
          </CardFrame>
        </div>
      </div>

      <BottomMenu
        items={menuItems}
        onMenuClick={path => path && navigate(path)}
        activePath={location.pathname}
      />

      <img src={bottomBar} alt="Bottom Bar" className="bottom-bar" />
    </div>
  );
};

export default StreetLightBoardPage;

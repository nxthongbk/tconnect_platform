import { useEffect, useRef, useState } from 'react';
import './style.scss';
import { Box } from '@mui/material';
import DeviceCard from './components/DeviceCard';
import topBarBg from '~/assets/images/png/Topbar.png';
import bottomBar from '~/assets/images/png/Bottombar.png';
import { MapRef } from 'react-map-gl';
import { popupStyles } from '~/pages/tenant/ControlCenterPage/styled';

import { useNavigate } from 'react-router-dom';
import BottomMenu from '~/components/BottomMenu';
import { menuItems } from '~/constants/menuItems';
import CardFrame from '~/components/CardFrame';
import { streetLights } from './mockData';
import StatusChart from './components/StatusChart';
import StreetLightDetails from './components/StreetLightDetails';
import TopBar from '~/components/TopBar';
import ROUTES from '~/constants/routes.constant';
import StreetLightMap from './components/StreetLightMap';

const StreetLightBoardPage = () => {
  const mapRefRight = useRef<MapRef>();
  const [time, setTime] = useState(new Date());
  const [country, setCountry] = useState('US');
  const [openMarkerId, setOpenMarkerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'Devices' | 'Locations'>('Devices');
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
        <StreetLightMap
          initialCenter={{ lat: 10.855641, lng: 106.631699 }}
          mapRef={mapRefRight}
          listOfDevices={streetLights.map(device => ({
            ...device,
            lat: device.latLng.lat,
            lng: device.latLng.lng,
            status:
              device.status === 'Active'
                ? 'Active'
                : device.status === 'Error'
                  ? 'Error'
                  : device.status === 'Maintenance'
                    ? 'Maintenance'
                    : 'Active',
          }))}
          openMarkerId={openMarkerId}
          setOpenMarkerId={setOpenMarkerId}
        />
      </Box>

      <TopBar
        topBarBg={topBarBg}
        formattedTime={formattedTime}
        formattedDate={formattedDate}
        country={country}
        setCountry={setCountry}
        onTitleClick={() => navigate(ROUTES.DASHBOARD)}
      />

      <div className="streetlights-layout">
        <div className="left-container">
          <CardFrame title="STREETLIGHT OVERVIEW">
            <div className="streetlights-overview">
              <div className="overview-tabs">
                <button
                  className={`tab${activeTab === 'Locations' ? ' active' : ''}`}
                  onClick={() => setActiveTab('Locations')}
                >
                  Locations
                </button>
                <button
                  className={`tab${activeTab === 'Devices' ? ' active' : ''}`}
                  onClick={() => setActiveTab('Devices')}
                >
                  Devices
                </button>
              </div>
              <ul className="streetlight-list">
                {streetLights.map(device => (
                  <li
                    key={device.id}
                    className={`${openMarkerId === device.id ? 'active' : ''} ${device.status === 'Error' ? 'error' : ''}`}
                    onClick={() => {
                      if (openMarkerId !== device.id) {
                        // Clicking a different card				
												setOpenMarkerId(openMarkerId === device.id ? null : device.id); // Close the old one
                        setTimeout(() => setOpenMarkerId(device.id), 100); // Then open the new one
                      } else {
                        setOpenMarkerId(device.id); // Default behavior if clicking the same card
                      }
                    }}
                  >
                    <DeviceCard light={device} />
                  </li>
                ))}
              </ul>
            </div>
          </CardFrame>
        </div>

        <div className="right-container">
          <CardFrame title="STREETLIGHT STATUS">
            <StatusChart />
          </CardFrame>

          <CardFrame title="STREETLIGHT DETAILS">
            <StreetLightDetails
              device={streetLights.find(d => d.id === openMarkerId) || streetLights[0]}
            />
          </CardFrame>
        </div>
      </div>

      <BottomMenu
        activePath={location.pathname}
        items={menuItems}
        onMenuClick={path => path && navigate(path)}
        bottomBarBg={bottomBar}
      />
    </div>
  );
};

export default StreetLightBoardPage;

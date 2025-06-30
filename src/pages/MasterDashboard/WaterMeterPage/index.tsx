import { useEffect, useRef, useState } from 'react';
import './style.scss';
import { Box } from '@mui/material';
import topBarBg from '~/assets/images/png/Topbar.png';
import bottomBar from '~/assets/images/png/Bottombar.png';
import { MapRef } from 'react-map-gl';
import { popupStyles } from '~/pages/tenant/ControlCenterPage/styled';

import { useNavigate } from 'react-router-dom';
import BottomMenu from '~/components/BottomMenu';
import { menuItems } from '~/constants/menuItems';
import CardFrame from '~/components/CardFrame';
import { streetLights, statusList } from './mockData';

import TopBar from '~/components/TopBar';
import ROUTES from '~/constants/routes.constant';
import DeviceCardItem from '~/components/DeviceCard';
import streetLamp from '~/assets/images/png/device-lamp.png';
import DeviceMapContainer from '~/components/DeviceMap';
import StatusChart from '~/components/StatusChart';
import streetLightFrame from '~/assets/images/png/streetLightFrame.png';
import DeviceDetailsPanel from '~/components/DeviceDetailsPanel';

function mapToDeviceItems(device: any) {
  let status: 'Active' | 'Error' | 'Maintenance' | 'Offline' | 'Alarm';
  switch (device.status) {
    case 'Active':
      status = 'Active';
      break;
    case 'Error':
      status = 'Error';
      break;
    case 'Maintenance':
      status = 'Maintenance';
      break;
    case 'Offline':
      status = 'Offline';
      break;
    case 'Alarm':
      status = 'Alarm';
      break;
    default:
      status = 'Active';
  }
  return {
    id: device.id,
    lat: device.latLng?.lat ?? 0,
    lng: device.latLng?.lng ?? 0,
    type: 'streetlight' as 'streetlight',
    status,
  };
}

const WaterMeterMonitoringPage = () => {
  const mapRefRight = useRef<MapRef>();
  const [time, setTime] = useState(new Date());
  const [country, setCountry] = useState('US');
  const [openMarkerId, setOpenMarkerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'Devices' | 'Locations'>('Devices');
  const navigate = useNavigate();

  const streetLightFields = [
    { label: 'TYPE', key: 'type' },
    { label: 'MODEL', key: 'model' },
    { label: 'POWER SUPPLY', key: 'power' },
    { label: 'CONNECTIVITY', key: 'connectivity' },
    { label: 'CONTROLLER', key: 'controller' },
  ];

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString();

  const device = streetLights.find(d => d.id === openMarkerId) || streetLights[0];

  return (
    <div className="streetlights-page dashboard-streetlights-template">
      <Box className="streetlights-main" sx={popupStyles}>
        <DeviceMapContainer
          initialCenter={{ lat: 10.855641, lng: 106.631699 }}
          mapRef={mapRefRight}
          listOfDevices={streetLights.map(mapToDeviceItems)}
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
          <CardFrame title="WATER METER MONITORING">
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
              <ul className="device-list">
                {streetLights.map(device => (
                  <li
                    key={device.id}
                    className={`${openMarkerId === device.id ? 'active' : ''} ${device.status === 'Error' ? 'error' : ''}`}
                    onClick={() => {
                      if (openMarkerId !== device.id) {
                        setOpenMarkerId(openMarkerId === device.id ? null : device.id);
                        setTimeout(() => setOpenMarkerId(device.id), 100);
                      } else {
                        setOpenMarkerId(device.id);
                      }
                    }}
                  >
                    <DeviceCardItem
                      device={device}
                      icon={streetLamp}
                      deviceType="streetlight"
                      powerLabel="POWER SUPPLY"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </CardFrame>
        </div>

        <div className="right-container">
          <div className="search-container">
            <input type="text" placeholder="Search location" className="search-input" />
          </div>
          <CardFrame title="WATER METER MONITOR STATUS">
            <StatusChart statusList={statusList} />
          </CardFrame>

          <CardFrame title="DEVICE DETAILS">
            <DeviceDetailsPanel
              device={device}
              fields={streetLightFields}
              backgroundImage={streetLightFrame}
              customRows={
                <>
                  <div className="details-row">
                    <span className="details-label">FEATURE</span>
                    <ul className="details-feature-list">
                      {device.feature?.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                  <div className="details-row">
                    <span className="details-label">LIFESPAN</span>
                    <span className="details-value">{device.lifespan}</span>
                  </div>
                </>
              }
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

export default WaterMeterMonitoringPage;

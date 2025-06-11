import './style.scss';
import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import topBarBg from '~/assets/images/png/Topbar.png';
import bottomBar from '~/assets/images/png/Bottombar.png';
import { MapRef } from 'react-map-gl';
import { popupStyles } from '~/pages/tenant/ControlCenterPage/styled';
import { useNavigate } from 'react-router-dom';
import BottomMenu from '~/components/BottomMenu';
import { menuItems } from '~/constants/menuItems';
import TopBar from '~/components/TopBar';
import ROUTES from '~/constants/routes.constant';

import CardFrame from '~/components/CardFrame';
import { cctvDevices, statusList } from './mockData';
import cctvIcon from '~/assets/images/png/cctvDevice.png';
import DeviceCardItem from '~/components/DeviceCard';
import DeviceMapContainer from '~/components/DeviceMap';
import StatusChart from '~/components/StatusChart';
import DeviceDetailsPanel from '~/components/DeviceDetailsPanel';
import cctvDetailFrame from '~/assets/images/png/cctvDetailFrame.png';
import liveCamera from '~/assets/images/png/cameraCCTV.png';

const CCTVPage = () => {
  const mapRefRight = useRef<MapRef>();
  const [time, setTime] = useState(new Date());
  const [country, setCountry] = useState('US');
  const [openMarkerId, setOpenMarkerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'Devices' | 'Locations'>('Devices');
  const navigate = useNavigate();

  const cctvFields = [
    { label: 'TYPE', key: 'type' },
    { label: 'RESOLUTION', key: 'resolution' },
    { label: 'LENS', key: 'lens' },
    { label: 'NIGHT VERSION', key: 'nightVersion' },
    { label: 'IR RANGE', key: 'irRange' },
    { label: 'SMART FEATURE', key: 'smartFeatures' },
    { label: 'PROTECTION', key: 'protection' },
    { label: 'POWER', key: 'power' },
  ];

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString();

  const device = cctvDevices.find(d => d.id === openMarkerId) || cctvDevices[0];

  return (
    <div className="cctv-page dashboard-cctv-template">
      <Box className="cctv-main" sx={popupStyles}>
        <DeviceMapContainer
          initialCenter={{ lat: 10.855641, lng: 106.631699 }}
          mapRef={mapRefRight}
          listOfDevices={cctvDevices.map(device => ({
            ...device,
            lat: device.latLng.lat,
            lng: device.latLng.lng,
            type: 'cctv',
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

      <div className="cctv-layout">
        <div className="left-container">
          <CardFrame title="CCTV OVERVIEW">
            <div className="cctv-overview">
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
                {cctvDevices.map(device => (
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
                      icon={cctvIcon}
                      deviceType="cctv"
                      powerLabel="UPDATED"
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
          <CardFrame title="CCTV STATUS">
            <StatusChart statusList={statusList} />
          </CardFrame>

          <CardFrame title="CCTV DETAILS">
            <DeviceDetailsPanel
              device={device}
              backgroundImage={cctvDetailFrame}
              fields={cctvFields}
              customRows={
                <div className="details-row">
                  <span className="details-label">LIVE CAMERA</span>
                  <span className="details-value">
                    <img src={liveCamera} alt="Live Camera" />
                  </span>
                </div>
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

export default CCTVPage;

import './style.scss';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import statusFrame from '~/assets/images/png/streetLightStatusFrame.png';
import cctvIcon from '~/assets/images/png/cctvDevice.png';
import DeviceCardItem from '~/components/DeviceCard';
import DeviceMapContainer from '~/components/DeviceMap';
import DeviceDetailsPanel from '~/components/DeviceDetailsPanel';
import cctvDetailFrame from '~/assets/images/png/cctvDetailFrame.png';
import {
  useGetDataDevice,
  useGetLatestTelemetryNoC,
  useGetLatestTelemetrysNoC,
} from '~/pages/tenant/DevicePage/handleApi';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Sound from '~/assets/videos/fire-alarm-33770.mp3';
import { AppContext } from '~/contexts/app.context';

const SOCKET_URL = import.meta.env.VITE_API_HOST + '/websocket/ws';

interface Device {
  id: string;
  status: string;
  alarmStatus?: string;
  latLng: { lat: number; lng: number };
  [key: string]: any;
}

const DEVICE_LATLNG_LIST = [
  { lat: 10.85, lng: 106.62 },
  { lat: 10.86, lng: 106.63 },
  { lat: 10.87, lng: 106.64 },
  { lat: 10.88, lng: 106.65 },
  { lat: 10.89, lng: 106.66 },
  { lat: 10.9, lng: 106.67 },
  { lat: 10.91, lng: 106.68 },
  { lat: 10.92, lng: 106.69 },
  { lat: 10.93, lng: 106.7 },
  { lat: 10.94, lng: 106.71 },
  { lat: 10.95, lng: 106.72 },
  { lat: 10.96, lng: 106.73 },
  { lat: 10.97, lng: 106.74 },
  { lat: 10.98, lng: 106.75 },
  { lat: 10.99, lng: 106.76 },
  { lat: 11.0, lng: 106.77 },
  { lat: 11.01, lng: 106.78 },
  { lat: 11.02, lng: 106.79 },
  { lat: 11.03, lng: 106.8 },
  { lat: 11.04, lng: 106.81 },
  { lat: 11.05, lng: 106.82 },
];

function mapToDeviceItems(device: Device, idx: number) {
  let status: 'Active' | 'Error' | 'Maintenance' | 'Offline' | 'Alarm';
  if (device.status === 'Active') status = 'Active';
  else if (device.status === 'Error' || device.alarmStatus === 'ALARM') status = 'Error';
  else if (device.status === 'Maintenance') status = 'Maintenance';
  else if (device.status === 'Offline') status = 'Offline';
  else if (device.status === 'Alarm') status = 'Alarm';
  else status = 'Active';

  const latlng =
    device.latLng && device.latLng.lat && device.latLng.lng
      ? device.latLng
      : DEVICE_LATLNG_LIST[idx] || { lat: null, lng: null };

  return {
    ...device,
    id: device.id,
    name: device.name,
    lat: latlng.lat,
    lng: latlng.lng,
    type: 'firealarm' as 'firealarm',
    status,
  };
}

const FireAlarmPage = () => {
  const mapRefRight = useRef<MapRef>();
  const [time, setTime] = useState(new Date());
  const [country, setCountry] = useState('US');
  const [openMarkerId, setOpenMarkerId] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'Devices' | 'Locations'>('Devices');
  const navigate = useNavigate();
  const [telemetries, setTelemetries] = useState<any>();
  const deviceQueryParams = useMemo(() => ({ page: 0, size: 10, keyword: '' }), []);
  const { data: deviceData } = useGetDataDevice(deviceQueryParams);
  const devices = deviceData?.data?.content || [];

  const mappedId = devices.map(device => device.id);
  const [listOfDevices, setListOfDevices] = useState<any[]>(devices);
  const [selectedDeviceId, setSelectedDeviceId] = useState<any | null>(null);
  const { userInfo } = useContext(AppContext);

  const [socketData, setSocketData] = useState<any>(null);
  const alarmSoundRef = useRef<HTMLAudioElement | null>(null);
  const timeoutId = useRef<NodeJS.Timeout>();
  const stompClientRef = useRef<any>(null);

  const [showImageModal, setShowImageModal] = useState(false);

  const { data: latestTelemetry } = useGetLatestTelemetryNoC({
    entityType: 'DEVICE',
    entityId: selectedDeviceId,
  });

  // Setup socket connection and alarm sound
  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    const topic = '/topic/' + userInfo?.tenant?.id;
    const connectHeaders = {};

    stompClient.connect(connectHeaders, () => {
      stompClient.subscribe(topic, (message: any) => {
        const body = JSON.parse(message.body);
        setSocketData(body);

        if (body.alarmStatus === 'ALARM' || body.status === 'ALARM') {
          if (!alarmSoundRef.current) {
            alarmSoundRef.current = new Audio(Sound);
            alarmSoundRef.current.loop = true;
          }
          alarmSoundRef.current.play();
        } else if (alarmSoundRef.current) {
          alarmSoundRef.current.pause();
          alarmSoundRef.current.currentTime = 0;
        }
      });
    });

    return () => {
      clearTimeout(timeoutId.current);
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {});
      }
      if (alarmSoundRef.current) {
        alarmSoundRef.current.pause();
        alarmSoundRef.current.currentTime = 0;
      }
    };
  }, [userInfo?.tenant?.id]);

  useEffect(() => {
    if (!socketData) return;
    setListOfDevices(prev =>
      prev.map(device => (device.id === socketData.id ? { ...device, ...socketData } : device))
    );
  }, [socketData]);

  useEffect(() => {
    setListOfDevices(devices);
  }, [devices]);

  useEffect(() => {
    if (devices.length > 0 && !openMarkerId) {
      setOpenMarkerId(devices[0].id);
      setSelectedDeviceId(devices[0].id);
    }
  }, [devices]);

  const cctvFields = [
    { label: 'RESOLUTION', key: 'resolution' },
    { label: 'LENS', key: 'lens' },
    { label: 'NIGHT VERSION', key: 'nightVersion' },
    { label: 'IR RANGE', key: 'irRange' },
    { label: 'SMART FEATURE', key: 'smartFeatures' },
    { label: 'PROTECTION', key: 'protection' },
    { label: 'POWER', key: 'power' },
  ];

  const telemetryQueries = useGetLatestTelemetrysNoC({
    entityType: 'DEVICE',
    entityIds: mappedId,
  });

  function cleanedData(data: Record<string, any>[]) {
    return data.map((item: Record<string, any>) => {
      const result: Record<string, any> = {};
      for (const key in item) {
        if (typeof item[key] === 'object' && item[key] !== null && 'value' in item[key]) {
          result[key] = item[key].value;
        } else {
          result[key] = item[key];
        }
      }
      return result;
    });
  }

  useEffect(() => {
    const newTelemetries: any[] = [];
    telemetryQueries?.forEach((query: any, index: number) => {
      const deviceId = mappedId[index];
      if (query.data?.data?.data) {
        newTelemetries.push({
          id: deviceId,
          ...query.data.data.data,
        });
      }
    });

    if (JSON.stringify(newTelemetries) !== JSON.stringify(telemetries)) {
      const updatedList = [...listOfDevices];
      const data = cleanedData(newTelemetries);

      data.forEach((telemetry: any) => {
        const index = updatedList.findIndex((item: Device) => item.id === telemetry.id);
        if (index !== -1) {
          updatedList[index] = {
            ...updatedList[index],
            ...telemetry,
          };
        }
      });
      setTelemetries(newTelemetries);
      setListOfDevices(updatedList);
    }
  }, [telemetryQueries]);

  const selectedDevice = devices.find((d: Device) => d.id === openMarkerId) || devices[0] || {};

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString();

  const mappedDevices = devices.map(mapToDeviceItems);

  return (
    <div className="cctv-page dashboard-cctv-template">
      <Box className="cctv-main" sx={popupStyles}>
        <DeviceMapContainer
          initialCenter={{ lat: 10.855641, lng: 106.631699 }}
          mapRef={mapRefRight}
          listOfDevices={mappedDevices}
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
                {mappedDevices.map(device => (
                  <li
                    key={device.id}
                    className={`${openMarkerId === device.id ? 'active' : ''} ${device.status === 'Error' ? 'error' : ''} ${device.alarmStatus === 'ALARM' ? 'alarm' : ''}`}
                    onClick={() => {
                      if (openMarkerId !== device.id) {
                        setOpenMarkerId(openMarkerId === device.id ? null : device.id);
                        setTimeout(() => setOpenMarkerId(device.id), 100);
                      } else {
                        setOpenMarkerId(device.id);
                      }
                      setSelectedDeviceId(device.id);
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
          <CardFrame title="CCTV LIVE CAMERA">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 340,
                minHeight: 180,
                backgroundImage: `url(${statusFrame})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                position: 'relative',
                zIndex: 3,
                margin: '0 auto',
                cursor: latestTelemetry?.data?.data?.image?.value ? 'pointer' : 'default',
              }}
              onClick={() => {
                if (latestTelemetry?.data?.data?.image?.value) setShowImageModal(true);
              }}
              title={latestTelemetry?.data?.data?.image?.value ? 'Click to enlarge' : ''}
            >
              {latestTelemetry?.data?.data?.image?.value ? (
                <img
                  src={`data:image/jpeg;base64,${latestTelemetry?.data?.data?.image?.value}`}
                  alt="Live Camera"
                  style={{
                    maxWidth: '100%',
                    maxHeight: 170,
                    objectFit: 'fill',
                    width: '324px',
                    borderRadius: '4px',
                    zIndex: 10,
                  }}
                />
              ) : (
                <span>No Live Camera Feed</span>
              )}
            </div>
          </CardFrame>

          {showImageModal && latestTelemetry?.data?.data?.image?.value && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
              }}
              onClick={() => setShowImageModal(false)}
            >
              <div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="modal-close-btn"
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'rgba(0,0,0,0.4)',
                    color: '#fff',
                    border: '1px solid #00d9ff',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    fontSize: 22,
                    cursor: 'pointer',
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                  onClick={() => setShowImageModal(false)}
                  aria-label="Close"
                  title="Close"
                >
                  &times;
                </button>
                <img
                  src={`data:image/jpeg;base64,${latestTelemetry?.data?.data?.image?.value}`}
                  alt="Live Camera Large"
                  style={{
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    borderRadius: 8,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                    background: '#222',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          )}

          <CardFrame title="CCTV DETAILS">
            <DeviceDetailsPanel
              device={selectedDevice}
              backgroundImage={cctvDetailFrame}
              fields={cctvFields}
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

export default FireAlarmPage;

import './style.scss';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MapRef } from 'react-map-gl';

import topBarBg from '~/assets/images/png/Topbar.png';
import bottomBar from '~/assets/images/png/Bottombar.png';
import statusFrame from '~/assets/images/png/streetLightStatusFrame.png';
import cctvIcon from '~/assets/images/png/cctvDevice.png';
import cctvDetailFrame from '~/assets/images/png/cctvDetailFrame.png';
import Sound from '~/assets/videos/fire-alarm-33770.mp3';

import { popupStyles } from '~/pages/tenant/ControlCenterPage/styled';
import {
  useGetDataDevice,
  useGetLatestTelemetryNoC,
  useGetLatestTelemetrysNoC,
} from '~/pages/tenant/DevicePage/handleApi';
import ROUTES from '~/constants/routes.constant';
import { AppContext } from '~/contexts/app.context';

import CardFrame from '~/components/CardFrame';
import DeviceCardItem from '~/components/DeviceCard';
import DeviceMapContainer from '~/components/DeviceMap';
import DeviceDetailsPanel from '~/components/DeviceDetailsPanel';
import BottomMenu from '~/components/BottomMenu';
import TopBar from '~/components/TopBar';

import { menuItems } from '~/constants/menuItems';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import DEVICE_LATLNG_LIST, { Device } from '../common/tempData';
import { mapToDeviceItems } from '../common/mapToDeviceItems';

const SOCKET_URL = import.meta.env.VITE_API_HOST + '/websocket/ws';

const SafetyPage = () => {
  const mapRefRight = useRef<MapRef>();
  const [time, setTime] = useState(new Date());
  const [country, setCountry] = useState('US');
  const [openMarkerId, setOpenMarkerId] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'Devices' | 'Locations'>('Devices');
  const [telemetries, setTelemetries] = useState<any>();
  const [showImageModal, setShowImageModal] = useState(false);

  const alarmSoundRef = useRef<HTMLAudioElement | null>(null);
  const timeoutId = useRef<NodeJS.Timeout>();
  const stompClientRef = useRef<any>(null);

  const navigate = useNavigate();
  const { userInfo } = useContext(AppContext);

  const deviceQueryParams = useMemo(() => ({ page: 0, size: 10, keyword: '' }), []);
  const { data: deviceData } = useGetDataDevice(deviceQueryParams);
  const devices = deviceData?.data?.content || [];

  const mappedId = devices.map(device => device.id);
  const [listOfDevices, setListOfDevices] = useState<any[]>(devices);
  const [selectedDeviceId, setSelectedDeviceId] = useState<any | null>(null);

  const { data: latestTelemetry } = useGetLatestTelemetryNoC({
    entityType: 'DEVICE',
    entityId: selectedDeviceId,
  });

  const telemetryQueries = useGetLatestTelemetrysNoC({
    entityType: 'DEVICE',
    entityIds: mappedId,
  });

  // ===== WebSocket Setup =====
  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    const topic = '/topic/' + userInfo?.tenant?.id;
    const connectHeaders = {};

    stompClient.connect(connectHeaders, () => {
      stompClient.subscribe(topic, (message: any) => {
        const body = JSON.parse(message.body);

        setListOfDevices(prev =>
          prev.map(device =>
            device.id === body.id
              ? {
                  ...device,
                  ...body,
                  image: body.image?.value ?? device.image,
                }
              : device
          )
        );

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

  // ===== Sync device data and socket image =====
  useEffect(() => {
    setListOfDevices(devices);
  }, [devices]);

  useEffect(() => {
    if (devices.length > 0 && !openMarkerId) {
      setOpenMarkerId(devices[0].id);
      setSelectedDeviceId(devices[0].id);
    }
  }, [devices]);

  function cleanedData(data: Record<string, any>[]) {
    return data.map((item: Record<string, any>) => {
      const result: Record<string, any> = {};
      for (const key in item) {
        result[key] =
          typeof item[key] === 'object' && item[key]?.value ? item[key].value : item[key];
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

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString();

  const mappedDevices = devices.map((device, idx) =>
    mapToDeviceItems(device, idx, 'firealarm', DEVICE_LATLNG_LIST)
  );

  const selectedDevice =
    listOfDevices.find((d: Device) => d.id === openMarkerId) || devices[0] || {};
  const imageValue = selectedDevice?.image || latestTelemetry?.data?.data?.image?.value;

  const cctvFields = [
    { label: 'RESOLUTION', key: 'resolution' },
    { label: 'LENS', key: 'lens' },
    { label: 'NIGHT VERSION', key: 'nightVersion' },
    { label: 'IR RANGE', key: 'irRange' },
    { label: 'SMART FEATURE', key: 'smartFeatures' },
    { label: 'PROTECTION', key: 'protection' },
    { label: 'POWER', key: 'power' },
  ];

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
                      setOpenMarkerId(device.id);
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
                cursor: imageValue ? 'pointer' : 'default',
              }}
              onClick={() => imageValue && setShowImageModal(true)}
              title={imageValue ? 'Click to enlarge' : ''}
            >
              {imageValue ? (
                <img
                  src={`data:image/jpeg;base64,${imageValue}`}
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

          {showImageModal && imageValue && (
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
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                }}
                onClick={e => e.stopPropagation()}
              >
                <button
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
                  }}
                  onClick={() => setShowImageModal(false)}
                >
                  &times;
                </button>
                <img
                  src={`data:image/jpeg;base64,${imageValue}`}
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

export default SafetyPage;

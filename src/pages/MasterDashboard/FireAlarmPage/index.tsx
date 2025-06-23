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
import { statusList } from './mockData';
import cctvIcon from '~/assets/images/png/cctvDevice.png';
import DeviceCardItem from '~/components/DeviceCard';
import DeviceMapContainer from '~/components/DeviceMap';
import StatusChart from '~/components/StatusChart';
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

function mapToDeviceItems(device: Device) {
  let status: 'Active' | 'Error' | 'Maintenance' | 'Offline' | 'Alarm';
  if (device.status === 'Active') status = 'Active';
  else if (device.status === 'Error' || device.alarmStatus === 'ALARM') status = 'Error';
  else if (device.status === 'Maintenance') status = 'Maintenance';
  else if (device.status === 'Offline') status = 'Offline';
  else if (device.status === 'Alarm') status = 'Alarm';
  else status = 'Active';
  return {
    id: device.id,
    name: device.name,
    lat: device.latLng?.lat ?? 10.853397686226927,
    lng: device.latLng?.lng ?? 106.62823723344383,
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

  return (
    <div className="cctv-page dashboard-cctv-template">
      <Box className="cctv-main" sx={popupStyles}>
        <DeviceMapContainer
          initialCenter={{ lat: 10.855641, lng: 106.631699 }}
          mapRef={mapRefRight}
          listOfDevices={devices.map(mapToDeviceItems)}
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
                {devices.map(device => (
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
          <CardFrame title="CCTV STATUS">
            <StatusChart statusList={statusList} />
          </CardFrame>

          <CardFrame title="CCTV DETAILS">
            <DeviceDetailsPanel
              device={selectedDevice}
              backgroundImage={cctvDetailFrame}
              fields={cctvFields}
              customRows={
                <div className="details-row">
                  <span className="details-label">LIVE CAMERA</span>
                  <span className="details-value">
                    {latestTelemetry?.data?.data?.image?.value ? (
                      <img
                        src={`data:image/jpeg;base64,${latestTelemetry?.data?.data?.image?.value}`}
                        alt="Live Camera"
                        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                      />
                    ) : (
                      <span>No Live Camera Feed</span>
                    )}
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

export default FireAlarmPage;

import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import TopBar from '~/components/TopBar';
import BottomMenu from '~/components/BottomMenu';
import { menuItems } from '~/constants/menuItems';
import ROUTES from '~/constants/routes.constant';

import { useGetLatestTelemetrysNoC } from '~/pages/tenant/DevicePage/handleApi';
import topBarBg from '~/assets/images/png/Topbar.png';
import bottomBarBg from '~/assets/images/png/Bottombar.png';
import deviceService from '~/services/device.service';

import './style.scss';
import EnergySummaryCard from './SummaryCard';
import LocationChartCircle from './LocationChartCircle';
import { LocationAreaChart } from './LocationChartCustom';
import IconPhosphor from '~/assets/iconPhosphor';

const LocationCard = ({
  title,
  children,
  className = 'span-4',
  height,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  height?: string | number;
}) => (
  <div className={`dashboard-location-card ${className}`} style={{ ...(height ? { height } : {}) }}>
    <div className="dashboard-location-card-header">
      <span className="dashboard-location-card-title">{title}</span>
    </div>
    <div className="dashboard-location-card-content">{children}</div>
  </div>
);

const SUMMARY_CARDS = [
  { key: 'Daily', label: 'Total Daily', icon: 'CalendarDot', unit: 'kWh' },
  { key: 'Monthly', label: 'Total Monthly', icon: 'CalendarDots', unit: 'kWh' },
  { key: 'Yearly', label: 'Total Yearly', icon: 'Calendar', unit: 'kWh' },
  { key: 'Coal', label: 'COAL', icon: 'Package', unit: 'Million tones' },
  { key: 'Co2', label: 'CO2', icon: 'Waves', unit: 'Million tones' },
  { key: 'Trees', label: 'TREES', icon: 'Plant', unit: 'Trees' },
  {
    key: 'RenewableEnergyShare',
    label: 'Renewable Energy Share',
    icon: 'ArrowsCounterClockwise',
    unit: '%',
    isComputed: true,
  },
];

const PIE_KEYS = [
  { key: 'PowerFactor', title: 'Power Factor (PF)' },
  { key: 'HarmonicDistortion', title: 'Harmonic Distortion (THD)' },
  { key: 'PhaseImbalance', title: 'Phase Imbalance' },
  { key: 'VoltageStability', title: 'Voltage Stability' },
];

const CHART_KEYS = ['TotalEnergyConsumption', 'GridEnergyConsumption', 'SolarEnergyGeneration'];

const LocationDashboardPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [time, setTime] = useState(new Date());
  const [country, setCountry] = useState('US');
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      deviceService
        .getDevice({
          page: 0,
          size: 100,
          keyword: '',
          tenantCode: '',
          deviceProfileId: '',
          locationId: id,
          status: '',
          alarmStatus: '',
        })
        .then(res => {
          setDevices(res?.data?.content || []);
        });
    }
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString();

  const deviceIds = useMemo(() => devices.map(device => device.id).filter(Boolean), [devices]);
  const deviceId = useMemo(() => deviceIds[0] ?? '', [deviceIds]);
  const deviceData = devices[0] || '';

  // Telemetry
  const telemetryQueries = useGetLatestTelemetrysNoC({
    entityType: 'DEVICE',
    entityIds: deviceIds,
  });

  const getDataFromTelemetry = (key: string) =>
    telemetryQueries
      .map(query => Number((query.data as { data?: any })?.data?.data?.[key]?.value))
      .filter(val => !isNaN(val));

  const getTotalTelemetry = key => getDataFromTelemetry(key).reduce((sum, val) => sum + val, 0);

  const renewableEnergyShare = useMemo(() => {
    const total = getTotalTelemetry('TotalEnergyConsumption');
    const solar = getTotalTelemetry('SolarEnergyGeneration');
    return total ? ((solar / total) * 100).toFixed(2) : 0;
  }, [telemetryQueries]);

  const areaChartItems = CHART_KEYS.map(key => ({
    key,
    item: useMemo(() => (deviceId ? { deviceId, telemetryIds: [{ key }] } : null), [deviceId]),
  }));

  return (
    <div className="dashboard-location-page dashboard-location-template">
      <TopBar
        onTitleClick={() => navigate(ROUTES.ENERGY)}
        topBarBg={topBarBg}
        formattedTime={formattedTime}
        formattedDate={formattedDate}
        country={country}
        setCountry={setCountry}
      />

      <div className="breadcrumb-wrapper">
        <span className="breadcrumb">
          <span className="breadcrumb-link" onClick={() => navigate(ROUTES.ENERGY)}>
            Energy
          </span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{deviceData?.locationInfo?.name}</span>
        </span>
      </div>

      <div className="dashboard-row">
        {SUMMARY_CARDS.map(({ key, label, icon, unit, isComputed }) => {
          const value = isComputed ? renewableEnergyShare : (getDataFromTelemetry(key)[0] ?? 0);

          return (
            <EnergySummaryCard
              key={key}
              icon={<IconPhosphor iconName={icon} size={24} color="#36bffa" />}
              label={label}
              value={value}
              unit={unit}
            />
          );
        })}
      </div>
      <div className="dashboard-location-main">
        {areaChartItems.map(({ key, item }) => (
          <LocationCard
            key={key}
            title={key
              .replace(/([A-Z])/g, ' $1')
              .trim()
              .toUpperCase()}
            className="span-4"
          >
            <LocationAreaChart item={item} />
          </LocationCard>
        ))}

        {PIE_KEYS.map(({ key, title }) => (
          <LocationCard key={key} title={title} className="span-3">
            <LocationChartCircle
              value={getDataFromTelemetry(key)[0] ?? 0}
              name={deviceData?.name ?? ''}
            />
          </LocationCard>
        ))}
      </div>
      <BottomMenu
        activePath={location.pathname}
        items={menuItems}
        onMenuClick={path => path && navigate(path)}
        bottomBarBg={bottomBarBg}
      />
    </div>
  );
};

export default LocationDashboardPage;

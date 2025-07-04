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
  className = 'span-4', // default span-4
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

const pieData = (device: any, value: number | undefined) =>
  device
    ? [
        {
          name: device.name,
          value: value ?? 0,
        },
      ]
    : [];

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

  // Telemetry
  const telemetryQueries = useGetLatestTelemetrysNoC({
    entityType: 'DEVICE',
    entityIds: deviceIds,
  });

  const getDataFromTelemetry = (key: string) =>
    telemetryQueries
      .map(query => Number((query.data as { data?: any })?.data?.data?.[key]?.value))
      .filter(val => !isNaN(val));

  const singleDevice = devices[0];

  // Pie chart data
  const powerPieData = pieData(singleDevice, getDataFromTelemetry('PowerFactor')[0]);
  const harmonicPieData = pieData(singleDevice, getDataFromTelemetry('HarmonicDistortion')[0]);
  const phasePieData = pieData(singleDevice, getDataFromTelemetry('PhaseImbalance')[0]);
  const voltagePieData = pieData(singleDevice, getDataFromTelemetry('VoltageStability')[0]);

  function getAreaChartItem(deviceId: string, key: string) {
    return deviceId && key
      ? {
          deviceId,
          telemetryIds: [{ key: key }],
        }
      : null;
  }
  const totalEnergyChartItem = useMemo(
    () => getAreaChartItem(deviceIds[0], 'TotalEnergyConsumption'),
    [deviceIds]
  );
  const gridEnergyChartItem = useMemo(
    () => getAreaChartItem(deviceIds[0], 'GridEnergyConsumption'),
    [deviceIds]
  );

  const solarEnergyChartItem = useMemo(
    () => getAreaChartItem(deviceIds[0], 'SolarEnergyGeneration'),
    [deviceIds]
  );

  const getTotalFromTelemetry = (key: string) =>
    telemetryQueries
      .map(query => Number((query.data as { data?: any })?.data?.data?.[key]?.value))
      .filter(val => !isNaN(val))
      .reduce((sum, val) => sum + val, 0);

  // Compute all totals
  const totalEnergyConsumption = getTotalFromTelemetry('TotalEnergyConsumption');
  const totalSolarEnergyGeneration = getTotalFromTelemetry('SolarEnergyGeneration');
  const totalDaily = getTotalFromTelemetry('Daily');
  const totalMonthly = getTotalFromTelemetry('Monthly');
  const totalYearly = getTotalFromTelemetry('Yearly');

  const renewableEnergyShare = totalEnergyConsumption
    ? ((totalSolarEnergyGeneration / totalEnergyConsumption) * 100).toFixed(2)
    : 0;

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

      <div className="dashboard-row">
        <EnergySummaryCard
          icon={<IconPhosphor iconName="CalendarDot" size={24} color="#36bffa" />}
          label="Total Daily"
          value={totalDaily}
          unit="kWh"
        />
        <EnergySummaryCard
          icon={<IconPhosphor iconName="CalendarDots" size={24} color="#36bffa" />}
          label="Total Monthly"
          value={`${totalMonthly}`}
          unit="kWh"
        />
        <EnergySummaryCard
          icon={<IconPhosphor iconName="Calendar" size={24} color="#36bffa" />}
          label="Total Yearly"
          value={`${totalYearly}`}
          unit="kWh"
        />
        <EnergySummaryCard
          icon={<IconPhosphor iconName="ArrowsCounterClockwise" size={24} color="#36bffa" />}
          label="Renewable Energy Share"
          value={`${renewableEnergyShare}`}
          unit="%"
        />
        <EnergySummaryCard
          icon={<IconPhosphor iconName="Package" size={24} color="#36bffa" />}
          label="COAL"
          value={99}
          unit="Million tones"
        />
        <EnergySummaryCard
          icon={<IconPhosphor iconName="Waves" size={24} color="#36bffa" />}
          label="CO2"
          value={99}
          unit="Million tones"
        />
        <EnergySummaryCard
          icon={<IconPhosphor iconName="Plant" size={24} color="#36bffa" />}
          label="TREES"
          value={99}
          unit="Trees"
        />
      </div>
      <div className="dashboard-location-main">
        <LocationCard title="ENERGY CONSUMPTION" className="span-4">
          <div>
            <LocationAreaChart item={totalEnergyChartItem} />
          </div>
        </LocationCard>

        <LocationCard title="GRID ENERGY CONSUMPTION" className="span-4">
          <div>
            <LocationAreaChart item={gridEnergyChartItem} />
          </div>
        </LocationCard>
        <LocationCard title="SOLAR ENERGY GENERATION" className="span-4">
          <div>
            <LocationAreaChart item={solarEnergyChartItem} />
          </div>
        </LocationCard>

        <LocationCard title="Power Factor (PF)" className="span-3">
          <div>
            <LocationChartCircle
              value={powerPieData[0]?.value ?? 0}
              name={powerPieData[0]?.name ?? ''}
            ></LocationChartCircle>
          </div>
        </LocationCard>

        <LocationCard title="Harmonic Distortion (THD)" className="span-3">
          <div>
            <LocationChartCircle
              value={harmonicPieData[0]?.value ?? 0}
              name={harmonicPieData[0]?.name ?? ''}
            ></LocationChartCircle>
          </div>
        </LocationCard>
        <LocationCard title="Phase Imbalance" className="span-3">
          <div>
            <LocationChartCircle
              value={phasePieData[0]?.value ?? 0}
              name={phasePieData[0]?.name ?? ''}
            ></LocationChartCircle>
          </div>
        </LocationCard>
        <LocationCard title="Voltage Stability" className="span-3">
          <div>
            <LocationChartCircle
              value={voltagePieData[0]?.value ?? 0}
              name={voltagePieData[0]?.name ?? ''}
            ></LocationChartCircle>
          </div>
        </LocationCard>
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

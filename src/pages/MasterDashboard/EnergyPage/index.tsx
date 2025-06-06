import { useEffect, useState } from 'react';
import './style.scss';
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
import ROUTES from '~/constants/routes.constant';
import ChartBar from './components/Chart/ChartBar';
import ChartCircle from './components/Chart/ChartCircle.tsx';
import ChartHorizontalBar from './components/Chart/ChartHorizontalBar.tsx';
import { useGetLatestTelemetryNoC } from '~/pages/tenant/DevicePage/handleApi';
import topBarBg from '~/assets/images/png/Topbar.png';
import bottomBarBg from '~/assets/images/png/Bottombar.png';
import mapBg from '~/assets/images/png/Map.png';
import metricsIcon from '~/assets/images/png/metrics.png';
import TopBar from '~/components/TopBar';

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

const LeftPanel = ({
  updatedOverviewData,
  updatedPowerBlocksData,
}: {
  updatedOverviewData: typeof overviewData;
  updatedPowerBlocksData: typeof powerBlocksData;
}) => (
  <div className="dashboard-panel left-panel">
    <Card title="OVERVIEW">
      <div className="overview-grid">
        {updatedOverviewData?.map((item, idx) => (
          <div className="overview-item" key={idx}>
            <span className="overview-icon">
              <img src={metricsIcon} alt="icon" />
            </span>
            <div>
              <div className="overview-label uppercase">{item.label}</div>
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
        {updatedPowerBlocksData.map((item, idx) => (
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

const RightPanel = ({
  updatedPowerCircleData,
  updatedCarbonStatisticData,
  updatedDeviceStatisticData,
}: {
  updatedPowerCircleData: typeof powerCircleData;
  updatedCarbonStatisticData: typeof carbonStatisticData;
  updatedDeviceStatisticData: typeof deviceStatisticData;
}) => (
  <div className="dashboard-panel right-panel">
    <Card title="POWER QUALITY INDEX">
      <div className="power-circles">
        {updatedPowerCircleData?.map((item, idx) => (
          <div className="circle-item" key={idx}>
            <div className="animated-circle-chart">
              <ChartCircle value={item.value} />
            </div>
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
        {updatedCarbonStatisticData.map((item, idx) => (
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
        {updatedDeviceStatisticData.map((item, idx) => (
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
    <div className="map-wrapper">
      <img src={mapBg} alt="Map" className="map-bg" />
    </div>
  </div>
);

const EnergyPage = () => {
  const [time, setTime] = useState(new Date());
  const [country, setCountry] = useState('US');
  const navigate = useNavigate();

  const { data: initLatestTelemetry } = useGetLatestTelemetryNoC({
    entityType: 'DEVICE',
    entityId: 'b220ed1d-af84-4b96-9420-346cfe6e0de6',
  });

  const telemetryValues = initLatestTelemetry?.data?.data || {};
  console.log(telemetryValues);

  const labelToTelemetryKeyMap: Record<string, string> = {
    'POWER STATIONS': 'totalP',
    'TOTAL CAPACITY': 'totalYield',
    'PV CAPACITY': 'PV',
    'INSTANT POWER': 'InstalledPower',
    DAILY: 'Daily yield',
    CO2: 'Co2Reduction',
  };

  const applyTelemetryToMockData = (
    dataArray: any[],
    telemetryMap: Record<string, { value: any }>,
    labelToKeyMap: Record<string, string>
  ) => {
    return dataArray.map(item => {
      const telemetryKey = labelToKeyMap[item.label] || item.label;
      const telemetryEntry = telemetryMap[telemetryKey];
      if (telemetryEntry) {
        let rawValue =
          typeof telemetryEntry.value === 'string'
            ? Number(telemetryEntry.value)
            : telemetryEntry.value;

        // Format to 5 significant digits
        const formattedValue =
          typeof rawValue === 'number' ? Number(rawValue.toPrecision(5)) : rawValue;

        return {
          ...item,
          value: formattedValue,
        };
      }
      return item;
    });
  };

  const updatedOverviewData = applyTelemetryToMockData(
    overviewData,
    telemetryValues,
    labelToTelemetryKeyMap
  );
  const updatedPowerBlocksData = applyTelemetryToMockData(
    powerBlocksData,
    telemetryValues,
    labelToTelemetryKeyMap
  );
  const updatedCarbonStatisticData = applyTelemetryToMockData(
    carbonStatisticData,
    telemetryValues,
    labelToTelemetryKeyMap
  );
  const updatedPowerCircleData = applyTelemetryToMockData(
    powerCircleData,
    telemetryValues,
    labelToTelemetryKeyMap
  );
  const updatedDeviceStatisticData = applyTelemetryToMockData(
    deviceStatisticData,
    telemetryValues,
    labelToTelemetryKeyMap
  );

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString();

  return (
    <div className="energy-page dashboard-template">
      <TopBar
        topBarBg={topBarBg}
        formattedTime={formattedTime}
        formattedDate={formattedDate}
        country={country}
        setCountry={setCountry}
        onTitleClick={() => navigate(ROUTES.DASHBOARD)}
      />

      <div className="dashboard-main">
        <LeftPanel
          updatedOverviewData={updatedOverviewData}
          updatedPowerBlocksData={updatedPowerBlocksData}
        />
        <CenterMapPanel />
        <RightPanel
          updatedPowerCircleData={updatedPowerCircleData}
          updatedCarbonStatisticData={updatedCarbonStatisticData}
          updatedDeviceStatisticData={updatedDeviceStatisticData}
        />
      </div>

      <div>
        <BottomMenu
          activePath={location.pathname}
          items={menuItems}
          onMenuClick={path => path && navigate(path)}
          bottomBarBg={bottomBarBg}
        />
      </div>
    </div>
  );
};

export default EnergyPage;

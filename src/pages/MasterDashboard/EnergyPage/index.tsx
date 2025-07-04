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
  powerCircleData,
  carbonStatisticData,
  deviceStatisticData,
} from './mockData';
import ROUTES from '~/constants/routes.constant';
import ChartBar from './components/Chart/ChartBar';
import ChartCircle from './components/Chart/ChartCircle.tsx';
import ChartHorizontalBar from './components/Chart/ChartHorizontalBar.tsx';
import {
  useGetLatestTelemetryNoC,
  useGetLatestTelemetrysNoC,
} from '~/pages/tenant/DevicePage/handleApi';
import topBarBg from '~/assets/images/png/Topbar.png';
import bottomBarBg from '~/assets/images/png/Bottombar.png';
import metricsIcon from '~/assets/images/png/metrics.png';
import TopBar from '~/components/TopBar';
import CenterMapPanel from './components/CenterMapPanel/index.tsx';

import { useGetLocationMap } from '~/pages/tenant/ControlCenterPage/handleApi';
import { useGetDataDevice } from '~/pages/tenant/DevicePage/handleApi';

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
  chartBarData,
}: {
  updatedOverviewData: typeof overviewData;
  updatedPowerBlocksData: typeof powerBlocksData;
  chartBarData: { name: string; value: string }[];
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
    <Card title="TOP EQUIPMENTS TIME MONTHLY">
      <ChartBar data={chartBarData} />
    </Card>
  </div>
);

const RightPanel = ({
  updatedPowerCircleData,
  updatedCarbonStatisticData,
  updatedDeviceStatisticData,
  chartLocations,
}: {
  updatedPowerCircleData: typeof powerCircleData;
  updatedCarbonStatisticData: typeof carbonStatisticData;
  updatedDeviceStatisticData: typeof deviceStatisticData;
  chartLocations: { name: string; value: number }[];
}) => (
  <div className="dashboard-panel right-panel">
    <Card title="POWER QUALITY INDEX">
      <div className="power-circles">
        {updatedPowerCircleData?.map((item, idx) => (
          <div className="circle-item" key={idx}>
            <div>
              <ChartCircle
                value={
                  item.value !== undefined && item.value !== null && !isNaN(Number(item.value))
                    ? item.value
                    : undefined
                }
              />
            </div>
            <div className="circle-label">{item.label}</div>
          </div>
        ))}
      </div>
    </Card>
    <Card title="LOCATIONS">
      <ChartHorizontalBar data={chartLocations} />
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

const EnergyPage = () => {
  const [time, setTime] = useState(new Date());
  const [country, setCountry] = useState('US');
  const [selectedLocation] = useState<any>(null);
  const navigate = useNavigate();

  // Locations chart
  const { data: locationData } = useGetLocationMap({ page: 0, size: 100 });
  const locations = locationData?.data?.content || [];
  const rawLocationValues = locations.map((_, idx) => [80, 65, 50, 40, 30][idx] ?? 20);
  const totalLocationValue = rawLocationValues.reduce((sum, val) => sum + val, 0) || 1;
  const chartLocations = locations.map((location, idx) => ({
    name: location.name,
    value: Number(((rawLocationValues[idx] / totalLocationValue) * 100).toFixed(2)),
    id: location.id,
  }));

  // Devices chart
  const { data: deviceData } = useGetDataDevice({ page: 0, size: 10, keyword: '' });
  const devices = deviceData?.data?.content || [];

  // Filter devices by selected location if any
  const filteredDevices = selectedLocation
    ? devices.filter(device => device.locationId === selectedLocation.id)
    : devices;

  const chartBarData = devices.map((device, idx) => ({
    name: device.name,
    value: [80, 65, 50, 40, 30][idx] ?? 20,
  }));

  const deviceId = filteredDevices.map(device => device.id);

  // Overview, power chart
  const telemetryQueries = useGetLatestTelemetrysNoC({
    entityType: 'DEVICE',
    entityIds: deviceId,
  });

  const { data: initLatestTelemetry } = useGetLatestTelemetryNoC({
    entityType: 'DEVICE',
    entityId: deviceId[0] || '',
  });

  // const { data: initLatestTelemetry } = useGetLatestTelemetryNoC({
  //   entityType: 'DEVICE',
  //   entityId: 'b220ed1d-af84-4b96-9420-346cfe6e0de6',
  // });

  const telemetryValues = initLatestTelemetry?.data?.data || {};
  // console.log(telemetryValues);

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

  const getTotalFromTelemetry = (key: string) =>
    telemetryQueries
      .map(query => Number((query.data as { data?: any })?.data?.data?.[key]?.value))
      .filter(val => !isNaN(val))
      .reduce((sum, val) => sum + val, 0);

  const updateDataWithTotals = <
    T extends { label: string; value: number; unit: string; icon?: string },
  >(
    data: T[],
    labelToValueMap: Record<string, number | string>
  ): T[] =>
    data.map(item =>
      labelToValueMap.hasOwnProperty(item.label)
        ? { ...item, value: Number(labelToValueMap[item.label]) }
        : item
    );

  // Compute all totals
  const totalEnergyConsumption = getTotalFromTelemetry('TotalEnergyConsumption');
  const totalGridEnergyConsumption = getTotalFromTelemetry('GridEnergyConsumption');
  const totalSolarEnergyGeneration = getTotalFromTelemetry('SolarEnergyGeneration');
  const totalDaily = getTotalFromTelemetry('Daily');
  const totalMonthly = getTotalFromTelemetry('Monthly');
  const totalYearly = getTotalFromTelemetry('Yearly');
  const totalCoal = getTotalFromTelemetry('Coal');
  const totalCo2 = getTotalFromTelemetry('Co2');
  const totalTrees = getTotalFromTelemetry('Trees');

  const renewableEnergyShare = totalEnergyConsumption
    ? ((totalSolarEnergyGeneration / totalEnergyConsumption) * 100).toFixed(2)
    : 0;

  // Label-to-value maps
  const overviewLabelToValueMap: Record<string, number | string> = {
    'Total Energy Consumption': totalEnergyConsumption,
    'Grid Energy Consumption': totalGridEnergyConsumption,
    'Solar Energy Generation': totalSolarEnergyGeneration,
    'Renewable Energy Share': renewableEnergyShare,
  };

  const powerBlockLabelToValueMap: Record<string, number | string> = {
    DAILY: totalDaily,
    MONTHLY: totalMonthly,
    YEARLY: totalYearly,
  };

  const carbonStatisticDataToValueMap: Record<string, number | string> = {
    COAL: totalCoal,
    CO2: totalCo2,
    TREES: totalTrees,
  };

  // Update data arrays
  const updatedOverviewDataWithTotals = updateDataWithTotals(
    updatedOverviewData,
    overviewLabelToValueMap
  );
  const updatedPowerBlocksDataWithTotals = updateDataWithTotals(
    updatedPowerBlocksData,
    powerBlockLabelToValueMap
  );
  const updatedCarbonStatisticDataWithTotals = updateDataWithTotals(
    updatedCarbonStatisticData,
    carbonStatisticDataToValueMap
  );

  const getAvgFromTelemetry = (key: string) => {
    const values = telemetryQueries
      .map(query => Number((query.data as { data?: any })?.data?.data?.[key]?.value))
      .filter(val => !isNaN(val));
    if (values.length === 0) return 0;
    return (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2);
  };

  const avgPowerFactor = getAvgFromTelemetry('PowerFactor');
  const avgPhaseImbalance = getAvgFromTelemetry('PhaseImbalance');
  const avgVoltageStability = getAvgFromTelemetry('VoltageStability');
  const avgHarmonicDistortion = getAvgFromTelemetry('HarmonicDistortion');

  const powerCircleLabelToValueMap: Record<string, number | string> = {
    'Power Factor (PF)': avgPowerFactor,
    'Phase Imbalance': avgPhaseImbalance,
    'Voltage Stability': avgVoltageStability,
    'Harmonic Distortion (THD)': avgHarmonicDistortion,
  };

  const isTelemetryLoading = telemetryQueries.some(q => !q.data);
  const updatedPowerCircleDataWithAvg = isTelemetryLoading
    ? powerCircleData?.map(item => ({ ...item, value: undefined }))
    : updateDataWithTotals(updatedPowerCircleData, powerCircleLabelToValueMap);

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
          updatedOverviewData={updatedOverviewDataWithTotals}
          updatedPowerBlocksData={updatedPowerBlocksDataWithTotals}
          chartBarData={chartBarData}
        />
        <CenterMapPanel />
        <RightPanel
          updatedPowerCircleData={updatedPowerCircleDataWithAvg}
          updatedCarbonStatisticData={updatedCarbonStatisticDataWithTotals}
          updatedDeviceStatisticData={updatedDeviceStatisticData}
          chartLocations={chartLocations}
        />
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

export default EnergyPage;

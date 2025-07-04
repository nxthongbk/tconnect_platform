
import CardBlock from '../Card/CardBlock';
import { Card } from '../Card/CardTitle';
import ChartCircle from '../Chart/ChartCircle';
import ChartHorizontalBar from '../Chart/ChartHorizontalBar';
import { carbonStatisticData, deviceStatisticData, powerCircleData } from '../../mockData';


export const RightPanel = ({
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
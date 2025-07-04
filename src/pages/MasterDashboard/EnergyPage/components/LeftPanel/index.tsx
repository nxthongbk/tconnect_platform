import CardBlock from '../Card/CardBlock';
import { Card } from '../Card/CardTitle';
import ChartArea from '../Chart/ChartArea';
import ChartBar from '../Chart/ChartBar';
import metricsIcon from '~/assets/images/png/metrics.png';

type OverviewItem = { label: string; value: number | string; unit: string };
type PowerBlockItem = { label: string; value: number | string; unit: string };
type ChartBarData = { name: string; value: string | number };

export const LeftPanel = ({
  updatedOverviewData,
  updatedPowerBlocksData,
  chartBarData,
}: {
  updatedOverviewData: OverviewItem[];
  updatedPowerBlocksData: PowerBlockItem[];
  chartBarData: ChartBarData[];
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
      <ChartBar data={chartBarData.map(item => ({ ...item, value: String(item.value) }))} />
    </Card>
  </div>
);
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { statusList } from '../../mockData';

const series = statusList.map(s => s.value);
const labels = statusList.map(s => s.label);
const colors = statusList.map(s => s.color);

const options: ApexOptions = {
  chart: {
    type: 'donut',
    background: 'transparent',
  },
  labels,
  colors,
  legend: { show: false },
  dataLabels: { enabled: false },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
      },
    },
  },
  tooltip: { enabled: false },
};

const StreetLightStatus = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: 360 }}>
    <ReactApexChart options={options} series={series} type="donut" width={160} />
    <div>
      {statusList.map((s) => (
        <div
          key={s.label}
          style={{ display: 'flex', alignItems: 'center', marginBottom: 6, fontSize: 13 }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: s.color,
              marginRight: 2,
            }}
          />
          <span style={{ color: '#fff', minWidth: 110 }}>{s.label}</span>
          <span style={{ color: s.color, fontWeight: 700, marginLeft: 2 }}>
            {s.value.toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default StreetLightStatus;

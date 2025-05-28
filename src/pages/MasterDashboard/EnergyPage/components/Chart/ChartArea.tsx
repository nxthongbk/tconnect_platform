import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
const ChartArea = () => {
  return <Chart options={optionsDef} series={series} type="area" height={'200px'} />;
};
export default ChartArea;
const series: ApexAxisChartSeries = [
  {
    name: 'INSTANT POWER',
    color: '#00E4FF',
    data: [
      { x: '01:00', y: 100 },
      { x: '03:00', y: 120 },
      { x: '05:00', y: 210 },
      { x: '07:00', y: 80 },
      { x: '09:00', y: 190 },
      { x: '11:00', y: 170 },
      { x: '13:00', y: 220 },
      { x: '15:00', y: 300 },
    ],
  },
];

const optionsDef: ApexOptions = {
  chart: {
    id: 'instant-power',
    background: 'transparent',
    toolbar: { show: false },
    zoom: { enabled: false },
    dropShadow: {
      enabled: true,
      top: 0,
      left: 0,
      blur: 8,
      color: '#00E4FF',
      opacity: 0.6,
    },
  },
  grid: {
    borderColor: 'rgba(0, 228, 255, 0.15)',
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
  },
  dataLabels: { enabled: false },
  stroke: {
    width: 2.5,
    curve: 'straight',
    colors: ['#36BFFA'],
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.7,
      gradientToColors: ['#00E4FF'],
      inverseColors: false,
      opacityFrom: 0.35,
      opacityTo: 0.01,
      stops: [0, 100],
    },
  },
  xaxis: {
    type: 'category',
    labels: {
      style: {
        colors: '#b0b9c6',
        fontSize: '13px',
        fontWeight: 400,
      },
    },
    axisBorder: { color: 'rgba(0, 228, 255, 0.25)' },
    axisTicks: { show: false },
  },
  yaxis: {
    tickAmount: 5,
    labels: {
      style: {
        colors: '#b0b9c6',
        fontSize: '13px',
        fontWeight: 400,
      },
      formatter: (val: number) => val.toFixed(1),
    },
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
    style: {
      fontSize: '13px',
      fontFamily: 'Noto Sans',
    },
  },
  legend: { show: false },
  noData: {
    text: localStorage.getItem('ctf-language') === 'vi' ? 'Đang tải...' : 'Loading...',
    style: { color: '#fff' },
  },
};

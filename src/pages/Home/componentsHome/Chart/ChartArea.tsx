import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
const ChartArea = ({ options }: { options?: ApexOptions }) => {
  return (
    <Chart options={optionsDef} series={series} type="area" height={'200px'} />
  );
};
export default ChartArea;
const series: ApexAxisChartSeries = [
  {
    name: 'STOCK ABC',
    color:'#42F0DB',
    data: [
      { x: '01:00', y: 10 },
      { x: '03:00', y: 80 },


      { x: '05:00', y: 70 },


      { x: '07:00', y: 300 },


      { x: '09:00', y: 270 },


      { x: '11:00', y: 470 },


      { x: '13:00', y: 430 },


      { x: '15:00', y: 400 },
    ],
  },
];
const optionsDef: ApexOptions = {
  colors: ['var(--blue-200)', 'var(--red-300)'],
  legend: {
    show: false,
    position: 'bottom',
    fontSize: '10px',
    showForSingleSeries: true,
    markers: {
      width: 34,
      height: 3,
      radius: 2,
    },
    labels: {
      colors: 'var(--blue-200)',
      useSeriesColors: false,
    },
    itemMargin: {
      horizontal: 0,
      vertical: -2,
    },
  },
  chart: {
    id: 'basic-bar',
    background: 'transparent',
    height: '100%',
    zoom: {
      enabled: false,
      autoScaleYaxis: true,
    },
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    labels: {
      show: true,
      rotate: 0,
      rotateAlways: false,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
      minHeight: 0,
      maxHeight: 150,
      style: {
        fontFamily: 'Noto Sans',
        colors: 'var(--text-primary)',
        fontSize: '12px',
        fontWeight: 400,
      },
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MM/yyyy',
        day: 'dd/MM',
        hour: 'HH:mm',
      },
    },
    axisBorder: {
      color: 'transparent',
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    tickAmount: 5,
    labels: {
      formatter: function (val) {
        return val.toFixed(1);
      },
      style: {
        fontFamily: 'Noto Sans',
        colors: 'var(--text-primary)',
        fontSize: '12px',
        fontWeight: 400,
      },
    },
  },
  stroke: {
    width: 2,
    curve: ['straight', 'stepline'],
  },
  grid: {
    borderColor: 'rgba(49, 74, 94, 1)',
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
  },
  noData: {
    text:
      localStorage.getItem('ctf-language') === 'vi'
        ? 'Đang tải...'
        : 'Loading...',
    style: {
      color: 'var(--white)',
    },
  },
};

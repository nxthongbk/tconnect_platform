import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const ChartBar = ({ data }: { data: { title: string; precent: string }[] }) => {
  const series = [
    {
      name: 'Time (%)',
      data: data.map(item => parseFloat(item.precent.replace('%', ''))),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '40%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.map(item => item.title),
      labels: {
        style: {
          colors: '#b0b9c6',
          fontSize: '15px',
        },
      },
      axisBorder: { color: 'rgba(0, 228, 255, 0.25)' },
      axisTicks: { show: false },
    },
    yaxis: {
      max: 100,
      labels: {
        formatter: val => `${val}%`,
        style: {
          colors: '#b0b9c6',
          fontSize: '15px',
        },
      },
    },
    grid: {
      borderColor: 'rgba(0, 228, 255, 0.15)',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.7,
        gradientToColors: ['#42F0DB'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
    colors: ['#42F0DB'],
    tooltip: {
      enabled: true,
      theme: 'dark',
      y: {
        formatter: val => `${val}%`,
      },
    },
    legend: { show: false },
  };

  return <Chart options={options} series={series} type="bar" height={250} />;
};

export default ChartBar;

import Chart from 'react-apexcharts';

const ChartCircle = ({ value }: { value: number }) => {
  const options = {
    chart: {
      type: 'radialBar' as const,
      sparkline: { enabled: true },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1200,
        animateGradually: { enabled: true, delay: 300 },
        dynamicAnimation: { enabled: true, speed: 900 },
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '60%' },
        track: {
          background: '#1A2A3A',
          strokeWidth: '50%',
        },
        dataLabels: {
          show: true,
          value: {
            fontSize: '32px',
            color: '#fff',
            show: true,
            offsetY: 6,
            formatter: (val: number) => `${val}%`,
          },
          name: { show: false },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        gradientToColors: ['#5FE9D0'],
        stops: [0, 100],
        colorStops: [],
      },
      colors: ['#5FE9D0'],
    },
    stroke: {
      lineCap: 'round' as 'round' | 'butt' | 'square',
    },
    labels: [''],
  };

  return <Chart options={options} series={[value]} type="radialBar" height={120} width={120} />;
};

export default ChartCircle;

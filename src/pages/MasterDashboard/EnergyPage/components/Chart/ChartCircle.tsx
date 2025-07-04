import Chart from 'react-apexcharts';

const ChartCircle = ({ value }: { value?: number | string }) => {
	  if (value === undefined || value === null) {
    return <div className="chart-circle-loading">Loading...</div>;
  }
  const options = {
    chart: {
      type: 'radialBar' as const,
      sparkline: { enabled: true },
      animations: {
        enabled: true,
        speed: 1800,
        animateGradually: { enabled: true, delay: 200 },
        dynamicAnimation: { enabled: true, speed: 1400 },
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '60%' },
        track: {
          background: '#1A2A3A',
          strokeWidth: '50%',
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 8,
            color: '#5FE9D0',
            opacity: 0.6,
          },
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
        shadeIntensity: 0.8,
        gradientToColors: ['#36BFFA', '#5FE9D0'],
        inverseColors: false,
        opacityFrom: 0.95,
        opacityTo: 0.65,
        stops: [0, 100],
      },
      colors: ['#5FE9D0'],
    },
    stroke: {
      lineCap: 'round' as 'round' | 'butt' | 'square',
    },
    labels: [''],
  };

  return <Chart key={value} options={options} series={[typeof value === 'string' ? parseFloat(value) : value]} type="radialBar" height={120} width={120} />;
};

export default ChartCircle;

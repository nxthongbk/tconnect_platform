import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Text,
} from 'recharts';

const sampleData = [
  { name: 'Điện gió số 5 - Ninh Thuận', value: 85 },
  { name: 'Điện gió Đông Hải 1 - Trà Vinh', value: 65 },
  { name: 'Điện gió Ea Nam', value: 45 },
  { name: 'Điện mặt trời Thuận Bắc - Ninh Thuận', value: 35 },
  { name: 'Điện mặt trời Trung Nam - Trà Vinh', value: 20 },
];

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <Text
      x={x + 10}
      y={y + 22}
      width={260}
      textAnchor="start"
      fontSize={18}
      fontFamily="Orbitron, Noto Sans, sans-serif"
      fontWeight={700}
      fill="#B8EFFF"
      style={{ pointerEvents: 'none' }}
    >
      {payload.value}
    </Text>
  );
};

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <Text
      x={x}
      y={y + 28}
      textAnchor="middle"
      fontSize={16}
      fontFamily="Orbitron, Noto Sans, sans-serif"
      fontWeight={600}
      fill="#B8EFFF"
    >
      {`${payload.value}%`}
    </Text>
  );
};

const  ChartHorizontalBar = ({ data }: { data?: { name: string; value: number }[] }) => (
  <ResponsiveContainer width="100%" height={320}>
    <BarChart
        layout="vertical"
      data={data && data.length ? data : sampleData} // Use sampleData if data is empty
      margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
      barCategoryGap={40}
    >
      <CartesianGrid
        stroke="rgba(0, 228, 255, 0.15)"
        strokeDasharray="4 4"
        horizontal
        vertical={false}
      />
      <XAxis
        type="number"
        domain={[0, 100]}
        ticks={[0, 20, 40, 60, 80, 100]}
        axisLine={{ stroke: 'rgba(0, 228, 255, 0.25)' }}
        tickLine={false}
        tick={<CustomXAxisTick />}
      />
      <YAxis
        type="category"
        dataKey="name"
        width={260}
        axisLine={false}
        tickLine={false}
        tick={<CustomYAxisTick />}
        interval={0}
      />
      <Tooltip
        cursor={{ fill: 'rgba(86, 232, 255, 0.08)' }}
        contentStyle={{
          background: '#0A1A2A',
          border: '1px solid #36bffa',
          borderRadius: 8,
          color: '#B8EFFF',
          fontFamily: 'Orbitron, Noto Sans, sans-serif',
        }}
        formatter={(value: number) => `${value}%`}
      />
      <Bar
        dataKey="value"
        fill="url(#barGradient)"
        radius={[10, 10, 10, 10]}
        barSize={28}
      />
      <defs>
        <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#36bffa" />
          <stop offset="100%" stopColor="#5FE9D0" />
        </linearGradient>
      </defs>
    </BarChart>
  </ResponsiveContainer>
);

export default ChartHorizontalBar;
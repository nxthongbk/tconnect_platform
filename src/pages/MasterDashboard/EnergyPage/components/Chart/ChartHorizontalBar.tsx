import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Điện gió số 5 - Ninh Thuận', value: 90 },
  { name: 'Điện gió Đông Hải 1 - Trà Vinh', value: 75 },
  { name: 'Điện gió Ea Nam', value: 60 },
  { name: 'Điện mặt trời Thuận Bắc - Ninh Thuận', value: 45 },
  { name: 'Điện mặt trời Trung Nam - Trà Vinh', value: 25 },
];

const CustomLabel = ({ x, y, index }) => {
  return (
    <text x={x} y={y - 10} fill="#ffffff" fontSize={13} fontFamily="Orbitron">
      {data[index].name}
    </text>
  );
};

export default function CustomBarChart() {
  return (
    <div
      className="animated-chart-container float-glow-chart p-4"
      style={{ width: '100%', height: 360 }}
    >
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 5, left: 5, bottom: 10 }}>
          <defs>
            <linearGradient id="barGradient" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#36BFFA" />
              <stop offset="100%" stopColor="rgba(54, 191, 250, 0.10)" />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="1 0"
            horizontal={true}
            vertical={true}
            stroke="#2c4964"
            strokeOpacity={0.1}
          />

          <XAxis
            type="number"
            domain={[0, 100]}
            ticks={[20, 40, 60, 80, 100]}
            tickFormatter={value => `${value}%`}
            stroke="#66cfff"
            axisLine={false}
            tickLine={false}
            fontFamily="Orbitron"
            fontSize={13}
            dy={10}
          />

          <YAxis type="category" dataKey="name" hide={true} />

          <Tooltip
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            contentStyle={{
              backgroundColor: '#0f172a',
              border: '1px solid #38bdf8',
              borderRadius: 8,
              fontFamily: 'Orbitron',
            }}
            labelStyle={{ color: '#38bdf8' }}
            itemStyle={{ color: '#ffffff' }}
          />

          <Bar
            dataKey="value"
            fill="url(#barGradient)"
            barSize={18}
            radius={[0, 1, 1, 0]}
            label={CustomLabel}
            isAnimationActive={true}
            animationDuration={1200}
            className="progress-bar-glow"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

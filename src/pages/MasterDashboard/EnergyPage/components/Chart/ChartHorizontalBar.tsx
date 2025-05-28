import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Điện gió số 5 - Ninh Thuận', value: 90 },
  { name: 'Điện gió Đông Hải 1 - Trà Vinh', value: 75 },
  { name: 'Điện gió Ea Nam', value: 60 },
  { name: 'Điện mặt trời Thuận Bắc - Ninh Thuận', value: 45 },
  { name: 'Điện mặt trời Trung Nam - Trà Vinh', value: 25 },
];

const CustomLabel = ({ x, y, width, value, index }) => {
  return (
    <text x={x} y={y - 10} fill="#66ccff" fontSize={13} fontFamily="Orbitron">
      {data[index].name}
    </text>
  );
};

export default function CustomBarChart() {
  return (
    <div style={{ width: '100%', height: 360 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0b3b60" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
            stroke="#2c4964"
          />

          <XAxis
            type="number"
            domain={[0, 100]}
            ticks={[20, 60, 100]}
            tickFormatter={value => `${value}%`}
            stroke="#66cfff"
            axisLine={false}
            tickLine={false}
            fontFamily="Orbitron"
            fontSize={13}
            dy={10}
          />

          <YAxis
            type="category"
            dataKey="name"
            hide={true} // hide default labels
          />

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
            barSize={20}
            radius={[0, 12, 12, 0]}
            label={CustomLabel}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

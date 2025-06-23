import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface ChartDataItem {
  name: string;
  value: number;
}

const CustomLabel = (props: any) => {
  const { x, y, name } = props;
  if (!name) return null;

  return (
    <text
      x={x}
      y={y - 10}
      fill="#fff"
      fontWeight={400}
      fontSize={11}
      fontFamily="'Orbitron', monospace"
      color="#fff"
    >
      {name}
    </text>
  );
};

export default function CustomBarChart({ data }: { data: ChartDataItem[] }) {
  const barHeight = 60;
  const minHeight = 220;
  const chartHeight = Math.max(minHeight, data.length * barHeight);

  return (
    <div className="p-4 bar-glow-wrapper" style={{ width: '100%', height: chartHeight }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 14, right: 5, left: 5, bottom: 10 }}>
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
            stroke="#b0b9c6"
            axisLine={false}
            tickLine={false}
            fontFamily="Orbitron"
            fontSize={14}
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
            filter="url(#barGlow)"
            barSize={18}
            radius={[0, 1, 1, 0]}
            label={CustomLabel}
            isAnimationActive={true}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ChartCircleProps {
  value: number;
  color?: string;
  name: string;
  gradientToColors?: [string, string];
}

const LocationChartCircle: React.FC<ChartCircleProps> = ({ value, color = '#5FE9D0', name }) => {
  const percent = Math.max(0, Math.min(100, Math.round(value)));
  const COLORS = [color, 'rgba(255,255,255,0.05)'];
  const data = [
    { name, value: percent, color: COLORS[0] },
    { name: '', value: 100 - percent, color: COLORS[1] },
  ];
  return (
    <div
      style={{
        width: '100%',
        height: 320,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div style={{ width: 240, height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              startAngle={90}
              endAngle={-270}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              dataKey="value"
              stroke="none"
              isAnimationActive={false}
            >
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div
          style={{
            position: 'absolute',
            top: '46%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 24,
            pointerEvents: 'none',
            textAlign: 'center',
            lineHeight: 1,
          }}
        >
          {`${percent.toFixed(2)}%`}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: 8,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 600,
            minWidth: 140,
            marginRight: 12,
            fontSize: 14,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: color,
              marginRight: 8,
            }}
          />
          <span style={{ color: color, marginRight: 8 }}>{name}</span>
          <span style={{ color: '#fff', fontWeight: 700, marginRight: 4 }}>
            {percent.toFixed(2)}
          </span>
          <span style={{ color: '#90caf9', fontWeight: 700 }}>%</span>
        </div>
      </div>
    </div>
  );
};

export default LocationChartCircle;

import { ResponsiveContainer, Sankey, Tooltip } from 'recharts';

type SankeyData = {
  nodes: { name: string; color?: string }[];
  links: { source: number; target: number; value: number }[];
};

type SankeyChartRechartsProps = {
  data: SankeyData;
};

const colorPalette = [
  '#8884d8',
  '#ff8000',
  '#3366ff',
  '#9933ff',
  '#66ff99',
  '#ff66cc',
  '#00cccc',
  '#ccff33',
  '#996633',
  '#999999',
];

const getNodeColor = (name: string, nodeColorMap: Record<string, string>) => {
  return nodeColorMap[name] || '#8884d8';
};

export default function SankeyChartRecharts({ data }: SankeyChartRechartsProps) {
  const nodeColorMap: Record<string, string> = {};
  data.nodes.forEach((node, index) => {
    nodeColorMap[node.name] = colorPalette[index % colorPalette.length];
  });

  const renderCustomNode = (nodeProps: any) => {
    const { x, y, width, height, index, payload } = nodeProps;
    const nodeColor = getNodeColor(payload.name, nodeColorMap);

    return (
      <g key={`node-${index}`}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={nodeColor}
          stroke="#fff"
          strokeWidth={1}
        />
        <text
          x={x + width + 6}
          y={y + height / 2}
          fontSize={12}
          fill="#fff"
          dominantBaseline="middle"
        >
          {payload.name}
          <tspan x={x + width + 6} y={y + height / 2 + 20} fontSize={9} fill="#ccc">
            {payload.value !== undefined ? payload.value + ' kWh' : ''}
          </tspan>
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" minHeight={400}>
      <Sankey
        data={data}
        node={renderCustomNode}
        link={{ strokeWidth: 2, stroke: '#ccc' }}
        nodePadding={20}
        margin={{ top: 20, bottom: 20, left: 20, right: 220 }}
      >
        <Tooltip />
      </Sankey>
    </ResponsiveContainer>
  );
}

import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

import telemetryService from '~/services/telemetry.service';
import { timestampToDate } from '~/pages/tenant/Dashboard/utils/const-dashboard';
import dayjs from 'dayjs';
import useSocketLatestTelemetryBoard from '~/utils/hooks/socket/useSocketLatestTelemetryBoard';

export function LocationAreaChart({ item }) {
  const [dataChart, setDataChart] = useState<any>([]);
  const telemetryIds = Array.isArray(item?.telemetryIds) ? item.telemetryIds : [];
  const deviceId = item?.deviceId;

  const { rows } = useSocketLatestTelemetryBoard({
    dependency: [deviceId],
    topic: `/topic/${deviceId}`,
    connectHeaders: {},
    initData: {},
  });

  useEffect(() => {
    if (rows.length > 0) {
      const dataList = [];
      item?.telemetryIds.map(telemetry => {
        const value = rows.find(e => e.id === telemetry.key);

        if (value) {
          const valueItem = JSON.parse(value.value);
          dataList.push({
            key: dataChart.length + 1,
            time: value.time,
            [telemetry.key]: Number(valueItem.value),
          });
        }
      });
      const chartChange = dataChart.concat(dataList);
      setDataChart(chartChange);
    }
  }, [rows]);

  useEffect(() => {
    if (!deviceId || telemetryIds.length === 0) {
      setDataChart([]);
      return;
    }

    const today = new Date();
    const keys = telemetryIds.map(t => t.key).filter(Boolean);

    telemetryService
      .getTimeseriTelemetry({
        entityId: deviceId,
        startTime: 0,
        endTime: today.getTime(),
        keys,
      })
      .then(({ data }) => {
        const resultMap = new Map();
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            data[key].forEach(el => {
              const timestamp = timestampToDate(el.ts);
              const value = JSON.parse(el.value);
              if (resultMap.has(timestamp)) {
                const existingItem = resultMap.get(timestamp);
                resultMap.set(timestamp, { ...existingItem, [key]: value });
              } else {
                resultMap.set(timestamp, {
                  index: resultMap.size + 1,
                  time: timestamp,
                  [key]: value,
                });
              }
            });
          }
        }
        const combinedData = Array.from(resultMap.values()).sort(
          (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        );
        const uniqueByMinute = [];
        const seenMinutes = new Set();
        for (const item of combinedData) {
          const minute = dayjs(item.time).format('YYYY-MM-DD HH:mm');
          if (!seenMinutes.has(minute)) {
            uniqueByMinute.push(item);
            seenMinutes.add(minute);
          }
        }
        setDataChart(uniqueByMinute.slice(-10));
      });
  }, [item]);

  return (
    <ResponsiveContainer width="100%" height={360}>
      <AreaChart data={dataChart} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="time"
          allowDuplicatedCategory={false}
          tickFormatter={(time, index) => {
            const d = dayjs(time);
            if (index === 0 || (d.hour() === 0 && d.minute() === 0)) {
              return d.format('MMM DD');
            }
            return d.format('HH:mm');
          }}
          interval="preserveStartEnd"
          tick={{ fill: '#e0f2fe' }}
          tickMargin={8}
        />
        <YAxis
          label={{ value: '(kWh)', angle: -90, position: 'left', offset: 0, textAnchor: 'middle' }}
          tick={{ fill: '#e0f2fe' }}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#1b2a47', color: '#fff' }}
          labelFormatter={time => dayjs(time).format('YYYY-MM-DD HH:mm')}
        />
        <Legend wrapperStyle={{ color: '#fff' }} />
        {item?.telemetryIds?.map((tid, index) => (
          <defs key={tid.key}>
            <linearGradient id={tid.key} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
        ))}
        {item?.telemetryIds?.map((tid, index) => (
          <Area
            key={tid.key}
            type="monotone"
            dataKey={tid.key}
            name={tid.name}
            stackId="1"
            stroke={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]}
            fillOpacity={0.2}
            fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

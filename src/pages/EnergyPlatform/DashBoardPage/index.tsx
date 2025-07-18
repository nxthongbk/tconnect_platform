import { SummaryCard } from '../CommonComponents/Card/SummaryCard';
import { EnergyUsageChart } from '../CommonComponents/Chart/EnergyUsageChart';
import {
  Lightning,
  CurrencyDollar,
  SpinnerBall,
  Leaf,
  Gear,
  Clock,
  Pulse,
  Cpu,
} from '@phosphor-icons/react';

import { Activity, useLiveDeviceTelemetry } from '../CommonComponents/useLiveDeviceTelemetry';
import { useState, useEffect } from 'react';
import SankeyChartRecharts from '../CommonComponents/Chart/DevicesChart';

export default function DashboardPage() {
  const { filteredDevices, liveTelemetryMap, getTelemetryValue, latestPowerUpdates } =
    useLiveDeviceTelemetry({});
  const [activities, setActivities] = useState<Activity[]>([]);

	const [sankeyData, setSankeyData] = useState<{ nodes: any[]; links: any[] }>({
    nodes: [],
    links: []
  });

  useEffect(() => {
    setActivities(latestPowerUpdates);
  }, [latestPowerUpdates]);

	 useEffect(() => {
    // Our root node is "Devices"
    const baseNode = { name: 'Devices' };

    // Create a node for each device using its name.
    // For Recharts, nodes are an array and links refer to their index.
    const deviceNodes = filteredDevices.map(device => ({ name: device.name }));
    const nodes = [baseNode, ...deviceNodes];

    // Build links: from "Devices" (index 0) to each device node (index 1, 2, ...) with weight from TotalActivePower.
    const links = filteredDevices.map((device, index) => {
      const telemetry = liveTelemetryMap[device.id] || {};
      const power = telemetry?.TotalActivePower?.value || 0;
      return {
        source: 0,               // from "Devices"
        target: index + 1,       // device node index in nodes array
        value: power > 0 ? power : 0.1, // ensure a minimal value to render (Recharts may not render 0)
      };
    });

    setSankeyData({ nodes, links });
  }, [filteredDevices, liveTelemetryMap]);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Welcome back!</h1>
        <p className="text-white/80">Here's your energy overview for today</p>
      </div>

      <div className="grid grid-cols-1 tablet:grid-cols-2 miniLaptop:grid-cols-4 gap-6">
        <SummaryCard
          title="Current Usage"
          value="4.2 kW"
          change="+2.3%"
          icon={<Lightning size={24} color="#36bffa" />}
          changeColor="text-green-400"
        />
        <SummaryCard
          title="Monthly Cost"
          value="$284.50"
          change="-12.1%"
          icon={<CurrencyDollar size={24} color="#22c55e" />}
          changeColor="text-red-400"
        />
        <SummaryCard
          title="Efficiency Score"
          value="87%"
          change="+5.2%"
          icon={<SpinnerBall size={24} color="#10b981" />}
          changeColor="text-green-400"
        />
        <SummaryCard
          title="CO₂ Saved"
          value="124 kg"
          change="+8.7%"
          icon={<Leaf size={24} color="#059669" />}
          changeColor="text-green-400"
        />
      </div>

      <div className="grid grid-cols-1 miniLaptop:grid-cols-2 gap-8">
        <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-6 min-h-[380px] flex flex-col justify-between">
          <h3 className="text-white font-semibold mb-4">Energy Usage Today</h3>
          <div className="flex-1 flex items-center justify-center">
            <EnergyUsageChart />
          </div>
        </div>
        <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-6 min-h-[380px] flex flex-col">
          <h3 className="text-white font-semibold mb-4">Active Devices</h3>
          <div className="space-y-4">
            {filteredDevices.map(device => (
              <div
                key={device.id}
                className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 p-4 shadow-sm hover:bg-white/20 transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/5 rounded-lg flex items-center justify-center">
                    <Cpu size={24} color="#b3e0ff" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-white font-medium text-base leading-tight">
                      {device.name}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <span
                        className={`w-2 h-2 rounded-full inline-block ${
                          device.status === 'Active' || device.status === 'CONNECTED'
                            ? 'bg-green-400'
                            : device.status === 'Standby'
                              ? 'bg-yellow-400'
                              : 'bg-gray-400'
                        }`}
                      ></span>
                      <span
                        className={`text-xs ${
                          device.status === 'Active' || device.status === 'CONNECTED'
                            ? 'text-green-400'
                            : device.status === 'Standby'
                              ? 'text-yellow-400'
                              : 'text-gray-400'
                        }`}
                      >
                        {device.status || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right min-w-[80px]">
                    <div className="text-white font-semibold text-lg">
                      {getTelemetryValue(liveTelemetryMap[device.id] || {}, 'TotalActivePower')}{' '}
                      <span className="text-white">KWh</span>
                    </div>
                    <div className="text-xs text-gray-300">
                      Efficiency:{' '}
                      {getTelemetryValue(liveTelemetryMap[device.id] || {}, 'PowerFactor')}%
                    </div>
                  </div>
                  <Gear size={18} color="#a3aed6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Pulse size={22} color="#4ade80" className="mr-2" />
          <h3 className="text-white font-semibold text-lg">Recent Activity</h3>
        </div>
        <div className="space-y-4">
          {activities.map((a, i) => (
            <div
              key={i}
              className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg justify-between"
            >
              <div className="flex items-center gap-2 text-gray-200 text-sm">
                <Clock size={16} className="opacity-70" />
                <span className="text-gray-400 mr-2">{a.time}</span>
                <span className="text-white/80">{a.desc}</span>
              </div>
              <span className={`w-3 h-3 rounded-full ${a.color}`}></span>
            </div>
          ))}
        </div>
      </div>

			 <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-6 min-h-[380px]">
          <h3 className="text-white font-semibold mb-4">Live Device Power Flow</h3>
          <SankeyChartRecharts data={sankeyData} />
        </div>
    </div>
  );
}

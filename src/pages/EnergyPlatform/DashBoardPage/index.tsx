import { SummaryCard } from '../CommonComponents/Card/SummaryCard';
import { EnergyUsageChart } from '../CommonComponents/Chart/EnergyUsageChart';
import {
  Lightning,
  CurrencyDollar,
  SpinnerBall,
  Leaf,
  Television,
  Lightbulb,
  Thermometer,
  WashingMachine,
  WifiHigh,
  Gear,
  Dresser,
  Clock,
  Pulse,
} from '@phosphor-icons/react';

const devices = [
  {
    name: 'Living Room TV',
    icon: <Television size={24} color="#b3e0ff" />,
    power: '125W',
    status: 'Active',
    statusColor: 'text-green-400',
    dotColor: 'bg-green-400',
    efficiency: '85%',
  },
  {
    name: 'Smart Lights',
    icon: <Lightbulb size={24} color="#ffe066" />,
    power: '45W',
    status: 'Active',
    statusColor: 'text-green-400',
    dotColor: 'bg-green-400',
    efficiency: '92%',
  },
  {
    name: 'Thermostat',
    icon: <Thermometer size={24} color="#ffd166" />,
    power: '0W',
    status: 'Standby',
    statusColor: 'text-yellow-400',
    dotColor: 'bg-yellow-400',
    efficiency: '88%',
  },
  {
    name: 'Refrigerator',
    icon: <Dresser size={24} color="#b3e0ff" />,
    power: '180W',
    status: 'Active',
    statusColor: 'text-green-400',
    dotColor: 'bg-green-400',
    efficiency: '78%',
  },
  {
    name: 'Washing Machine',
    icon: <WashingMachine size={24} color="#e0e7ef" />,
    power: '0W',
    status: 'Off',
    statusColor: 'text-gray-400',
    dotColor: 'bg-gray-400',
    efficiency: '95%',
  },
  {
    name: 'WiFi Router',
    icon: <WifiHigh size={24} color="#b3e0ff" />,
    power: '12W',
    status: 'Active',
    statusColor: 'text-green-400',
    dotColor: 'bg-green-400',
    efficiency: '90%',
  },
];

const activities = [
  {
    time: '2 min ago',
    desc: 'Smart thermostat adjusted to 72°F',
    color: 'bg-blue-400',
  },
  {
    time: '15 min ago',
    desc: 'Washing machine cycle completed',
    color: 'bg-green-400',
  },
  {
    time: '1 hour ago',
    desc: 'Peak hour started - reduced non-essential loads',
    color: 'bg-yellow-400',
  },
  {
    time: '3 hours ago',
    desc: 'Solar panels generated 2.1 kW',
    color: 'bg-green-400',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold mt-6 text-gray-300">Welcome back!</h1>
        <p className="text-md text-gray-400 mb-6">Here's your energy overview for today</p>
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
            {devices.map(device => (
              <div
                key={device.name}
                className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 p-4 shadow-sm hover:bg-white/20 transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/5 rounded-lg flex items-center justify-center">
                    {device.icon}
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-white font-medium text-base leading-tight">
                      {device.name}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <span
                        className={`w-2 h-2 rounded-full inline-block ${device.dotColor}`}
                      ></span>
                      <span className={`text-xs ${device.statusColor}`}>{device.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right min-w-[80px]">
                    <div className="text-white font-semibold text-lg">{device.power}</div>
                    <div className="text-xs text-gray-300">Efficiency: {device.efficiency}</div>
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
    </div>
  );
}

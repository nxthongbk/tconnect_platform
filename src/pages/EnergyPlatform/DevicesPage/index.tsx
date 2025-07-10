import { useState } from 'react';
import {
  Television,
  Lightbulb,
  Thermometer,
  Dresser,
  WashingMachine,
  WifiHigh,
  Gear,
  Power,
  Plus,
  MagnifyingGlass,
  Funnel,
} from '@phosphor-icons/react';

const devices = [
  {
    name: 'Living Room TV',
    icon: <Television size={28} />,
    room: 'Living Room',
    status: 'Active',
    statusColor: 'text-green-400',
    dotColor: 'bg-green-400',
    power: '125W',
    efficiency: '85%',
    schedule: 'Auto',
    lastUsed: '2 hours ago',
  },
  {
    name: 'Smart Lights',
    icon: <Lightbulb size={28} />,
    room: 'Bedroom',
    status: 'Active',
    statusColor: 'text-green-400',
    dotColor: 'bg-green-400',
    power: '45W',
    efficiency: '92%',
    schedule: 'Scheduled',
    lastUsed: 'Active',
  },
  {
    name: 'Thermostat',
    icon: <Thermometer size={28} />,
    room: 'Hallway',
    status: 'Standby',
    statusColor: 'text-yellow-400',
    dotColor: 'bg-yellow-400',
    power: '0W',
    efficiency: '88%',
    schedule: 'Smart',
    lastUsed: '30 min ago',
  },
  {
    name: 'Refrigerator',
    icon: <Dresser size={28} />,
    room: 'Kitchen',
    status: 'Active',
    statusColor: 'text-green-400',
    dotColor: 'bg-green-400',
    power: '180W',
    efficiency: '78%',
    schedule: 'Auto',
    lastUsed: 'Active',
  },
  {
    name: 'Washing Machine',
    icon: <WashingMachine size={28} />,
    room: 'Laundry',
    status: 'Off',
    statusColor: 'text-gray-400',
    dotColor: 'bg-gray-400',
    power: '0W',
    efficiency: '95%',
    schedule: 'Manual',
    lastUsed: 'Active',
  },
  {
    name: 'WiFi Router',
    icon: <WifiHigh size={28} />,
    room: 'Office',
    status: 'Active',
    statusColor: 'text-green-400',
    dotColor: 'bg-green-400',
    power: '12W',
    efficiency: '90%',
    schedule: 'Auto',
    lastUsed: 'Active',
  },
];

export default function DevicesPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Device Manager</h1>
            <p className="text-white/80 mt-1">Control and monitor all your connected devices</p>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 transition mt-2 tablet:mt-0">
            <Plus size={20} />
            Add Device
          </button>
        </div>

        <div className="w-full">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2">
                <MagnifyingGlass className="text-white/50 mr-2" size={20} />
                <input
                  type="text"
                  placeholder="Search devices..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none"
                />
              </div>
              <Funnel size={18} className="text-white/50" />
              <select className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white/90 focus:outline-none">
                <option>All Devices</option>
                {/* Add more filter options here */}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 tablet:grid-cols-2 miniLaptop:grid-cols-3 gap-6">
        {devices
          .filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
          .map(device => (
            <div
              key={device.name}
              className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg p-6 flex flex-col h-[338px] relative"
            >
              <div className="absolute top-8 right-8 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${device.dotColor}`}></span>
                <span className={`${device.statusColor} text-sm`}>{device.status}</span>
              </div>
              <div className="flex flex-col items-start">
                <div
                  className="p-3 bg-white/10 rounded-lg text-white flex items-center justify-center mb-3"
                  style={{ minWidth: 36, minHeight: 36 }}
                >
                  {device.icon}
                </div>
                <span className="block text-white font-medium text-lg leading-tight">
                  {device.name}
                </span>
                <span className="block text-white/80 text-sm mt-1">{device.room}</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-y-1 text-white/60 text-sm">
                <div>Power Usage</div>
                <div className="text-right text-white">{device.power}</div>
                <div>Efficiency</div>
                <div className="text-right text-white">{device.efficiency}</div>
                <div>Schedule</div>
                <div className="text-right text-white">{device.schedule}</div>
                <div>Last Used</div>
                <div className="text-right text-white">{device.lastUsed}</div>
              </div>
              <div className="flex items-center gap-2 mt-8">
                <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-1.5 rounded-lg flex items-center justify-center gap-2 transition">
                  <Power size={18} color="#fff" />
                  Toggle
                </button>
                <button className="bg-white/10 hover:bg-white/20 rounded-lg py-2 px-3 text-white transition">
                  <Gear size={18} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

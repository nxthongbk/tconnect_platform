import { useEffect, useState } from 'react';
import { Plus, MagnifyingGlass, Funnel } from '@phosphor-icons/react';
import DeviceCard from './DeviceCard';
import { useLiveDeviceTelemetry } from '../CommonComponents/useLiveDeviceTelemetry';

function useDebounce(value: string, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function DevicesPage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const { isLoading, filteredDevices, liveTelemetryMap, getTelemetryValue, getLatestTs } =
    useLiveDeviceTelemetry({ search: debouncedSearch });

  const safeValue = (v: unknown): string => {
    if (v === null || v === undefined) return '-';
    if (Array.isArray(v)) return v.join(', ');
    if (typeof v === 'object') return '-';
    if (typeof v === 'boolean') return v ? 'Yes' : 'No';
    return String(v);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <svg
          className="animate-spin h-8 w-8 text-emerald-400 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <div className="text-white text-lg">Loading devices...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Device Manager</h1>
            <p className="text-gray-300">Control and monitor all your connected devices</p>
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
        {filteredDevices.length === 0 && (
          <div className="text-white col-span-full text-center py-12 text-lg opacity-70">
            No devices found.
          </div>
        )}

        {filteredDevices.map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            telemetry={liveTelemetryMap[device?.id] || {}}
            getTelemetryValue={getTelemetryValue}
            getLatestTs={getLatestTs}
            safeValue={safeValue}
          />
        ))}
      </div>
    </div>
  );
}

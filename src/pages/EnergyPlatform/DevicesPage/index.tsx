import { useContext, useEffect, useMemo, useState } from 'react';
import { Gear, Power, Plus, MagnifyingGlass, Funnel, Cpu } from '@phosphor-icons/react';
import { useGetDataDevice, useGetLatestTelemetrysNoC } from '~/pages/tenant/DevicePage/handleApi';
import TimeAgo from '../CommonComponents/TimeAgo';

import useSocket from '~/utils/hooks/socket/useSocket';
import { AppContext } from '~/contexts/app.context';
import { isEqual } from 'lodash';

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
  const { userInfo } = useContext(AppContext);

  const debouncedSearch = useDebounce(search);

  const { data: deviceData } = useGetDataDevice({ page: 0, size: 10, keyword: '' });
  const devicesList = deviceData?.data?.content || [];
  const deviceIdList = devicesList.map(device => device.id);

  const telemetryQueries = useGetLatestTelemetrysNoC({
    entityType: 'DEVICE',
    entityIds: deviceIdList,
  });

  const apiTelemetryMap = useMemo(() => {
    const map = {};
    for (const query of telemetryQueries) {
      const id = query?.data?.data?.deviceId;
      const data = query?.data?.data?.data;
      if (id && data) map[id] = data;
    }
    return map;
  }, [JSON.stringify(telemetryQueries.map(q => q?.data?.data))]);

  const [liveDevices, setLiveDevices] = useState(devicesList);
  const [liveTelemetryMap, setLiveTelemetryMap] = useState(apiTelemetryMap);

  const socketData = useSocket({
    dependency: [userInfo?.tenant?.id],
    topic: '/topic/' + userInfo?.tenant?.id,
    connectHeaders: {},
  }) as any;

  useEffect(() => {
    if (!isEqual(liveDevices, devicesList)) {
      setLiveDevices(devicesList);
    }
    if (!isEqual(liveTelemetryMap, apiTelemetryMap)) {
      setLiveTelemetryMap(apiTelemetryMap);
    }
  }, [devicesList, apiTelemetryMap]);

  useEffect(() => {
    if (!socketData?.deviceId) return;

    const { deviceId, token, ...telemetryFields } = socketData;

    setLiveDevices(prev =>
      prev.map(device => (device.id === deviceId ? { ...device, token } : device))
    );

    setLiveTelemetryMap(prev => {
      const updated = {
        ...prev,
        [deviceId]: {
          ...(prev[deviceId] ?? {}),
          ...telemetryFields,
        },
      };
      return structuredClone(updated);
    });
  }, [socketData]);

  const safeValue = v => {
    if (v === null || v === undefined) return '-';
    if (Array.isArray(v)) return v.join(', ');
    if (typeof v === 'object') return '-';
    if (typeof v === 'boolean') return v ? 'Yes' : 'No';
    return String(v);
  };

  const getTelemetryValue = (telemetry, key) => {
    if (!telemetry || typeof telemetry !== 'object') return '-';
    const val = telemetry[key];
    if (val && typeof val === 'object' && 'value' in val) {
      return safeValue(val.value);
    }
    return safeValue(val);
  };

  const filteredDevices = useMemo(() => {
    return liveDevices.filter(d => d.name?.toLowerCase().includes(debouncedSearch.toLowerCase()));
  }, [liveDevices, debouncedSearch]);

  if (!deviceData) {
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

        {filteredDevices.map(device => {
          const telemetry = liveTelemetryMap[device?.id] || {};
          const power = getTelemetryValue(telemetry, 'PowerUsage');
          const efficiency = getTelemetryValue(telemetry, 'Efficiency');
          const schedule = getTelemetryValue(telemetry, 'Schedule');
          const status = device.status || 'Unknown';

          const statusColor =
            status === 'Active' || status === 'CONNECTED'
              ? 'text-green-400'
              : status === 'Standby'
                ? 'text-yellow-400'
                : 'text-gray-400';

          const dotColor =
            status === 'Active' || status === 'CONNECTED'
              ? 'bg-green-400'
              : status === 'Standby'
                ? 'bg-yellow-400'
                : 'bg-gray-400';

          return (
            <div
              key={device.id}
              className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg p-6 flex flex-col h-[338px] relative"
            >
              <div className="absolute top-8 right-8 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
                <span className={`${statusColor} text-sm`}>{status}</span>
              </div>
              <div className="flex flex-col items-start">
                <div
                  className="p-3 bg-white/10 rounded-lg text-white flex items-center justify-center mb-3"
                  style={{ minWidth: 36, minHeight: 36 }}
                >
                  <Cpu size={24} color="#fff" />
                </div>
                <span className="block text-white font-medium text-lg leading-tight">
                  {safeValue(device?.name)}
                </span>
                <span className="block text-white/80 text-sm mt-1">
                  {safeValue(device?.tenantInfo?.name)}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-y-1 text-white/60 text-sm">
                <div>Power Usage</div>
                <div className="text-right text-white">{power} KWh</div>
                <div>Efficiency</div>
                <div className="text-right text-white">{efficiency} %</div>
                <div>Schedule</div>
                <div className="text-right text-white">{schedule}</div>
                <div>Last Updated</div>
                <div className="text-right text-white">
                  <TimeAgo date={device?.updatedAt} />
                </div>
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
          );
        })}
      </div>
    </div>
  );
}

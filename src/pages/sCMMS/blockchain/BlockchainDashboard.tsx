import { useState, useEffect } from 'react';
import {
  Shield,
  Activity,
  Cpu,
  Wifi,
  Battery,
  Download,
  CheckCircle,
  Clock,
  Server,
  Radio,
  Thermometer,
  RefreshCw,
  Settings,
  TrendingUp,
  Database,
  Eye,
} from 'lucide-react';
import { mockBlockchainTransactions, mockIoTDevices, mockOTAUpdates } from '../data/mockData';
import { BlockchainTransaction, IoTDevice, OTAUpdate } from '../types';

export default function BlockchainDashboard() {
  const [transactions] = useState<BlockchainTransaction[]>(mockBlockchainTransactions);
  const [iotDevices, setIoTDevices] = useState<IoTDevice[]>(mockIoTDevices);
  const [otaUpdates, setOTAUpdates] = useState<OTAUpdate[]>(mockOTAUpdates);
  const [selectedDevice, setSelectedDevice] = useState<IoTDevice | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'blockchain' | 'iot' | 'ota'>('overview');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update sensor values
      setIoTDevices(prev =>
        prev.map(device => ({
          ...device,
          sensors: device.sensors.map(sensor => ({
            ...sensor,
            value: sensor.value + (Math.random() - 0.5) * 2,
            timestamp: new Date().toISOString(),
          })),
        }))
      );

      // Update OTA progress
      setOTAUpdates(prev =>
        prev.map(update => {
          if (update.status === 'downloading' && update.progress < 100) {
            return {
              ...update,
              progress: Math.min(100, update.progress + Math.random() * 10),
            };
          }
          return update;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = {
    totalTransactions: transactions.length,
    verifiedTransactions: transactions.filter(t => t.verified).length,
    onlineDevices: iotDevices.filter(d => d.status === 'online').length,
    totalDevices: iotDevices.length,
    pendingUpdates: otaUpdates.filter(u => u.status === 'pending' || u.status === 'downloading')
      .length,
    completedUpdates: otaUpdates.filter(u => u.status === 'completed').length,
    avgGasUsed: transactions.reduce((acc, t) => acc + (t.gasUsed || 0), 0) / transactions.length,
    totalSensors: iotDevices.reduce((acc, d) => acc + d.sensors.length, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'completed':
      case 'verified':
      case 'normal':
        return 'text-green-600 bg-green-100';
      case 'offline':
      case 'failed':
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'updating':
      case 'downloading':
      case 'pending':
      case 'warning':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const StatCard = ({ title, value, subtext, icon: Icon, color, bgColor }: any) => (
    <div
      className={`${bgColor} p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 group relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-current to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
      </div>
      <div className="flex items-center gap-4">
        <div
          className={`p-5 rounded-3xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${
            color === 'text-blue-600'
              ? 'bg-gradient-to-br from-blue-50 to-blue-100'
              : color === 'text-green-600'
                ? 'bg-gradient-to-br from-green-50 to-green-100'
                : color === 'text-purple-600'
                  ? 'bg-gradient-to-br from-purple-50 to-purple-100'
                  : color === 'text-orange-600'
                    ? 'bg-gradient-to-br from-orange-50 to-orange-100'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100'
          }`}
        >
          <Icon size={28} className={color} />
        </div>
        <div>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            {title}
          </p>
          <p className={`text-4xl font-bold mb-1 ${color}`}>{value}</p>
          {subtext && <p className="text-slate-400 text-sm">{subtext}</p>}
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-10">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-4 gap-8">
        <StatCard
          title="Blockchain Transactions"
          value={stats.totalTransactions}
          subtext={`${stats.verifiedTransactions} verified`}
          icon={Shield}
          color="text-blue-600"
          bgColor="bg-white/80 backdrop-blur-sm"
        />
        <StatCard
          title="IoT Devices Online"
          value={`${stats.onlineDevices}/${stats.totalDevices}`}
          subtext={`${((stats.onlineDevices / stats.totalDevices) * 100).toFixed(1)}% uptime`}
          icon={Wifi}
          color="text-green-600"
          bgColor="bg-white/80 backdrop-blur-sm"
        />
        <StatCard
          title="OTA Updates"
          value={stats.pendingUpdates}
          subtext={`${stats.completedUpdates} completed`}
          icon={Download}
          color="text-purple-600"
          bgColor="bg-white/80 backdrop-blur-sm"
        />
        <StatCard
          title="Total Sensors"
          value={stats.totalSensors}
          subtext="Active monitoring"
          icon={Activity}
          color="text-orange-600"
          bgColor="bg-white/80 backdrop-blur-sm"
        />
      </div>

      {/* Real-time Monitoring */}
      <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-8">
        {/* Network Status */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
              <Radio className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Network Status</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={20} />
                <span className="font-medium text-green-900">Blockchain Network</span>
              </div>
              <span className="text-sm text-green-600">Connected</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={20} />
                <span className="font-medium text-green-900">IoT Gateway</span>
              </div>
              <span className="text-sm text-green-600">Online</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-center gap-3">
                <Clock className="text-orange-600" size={20} />
                <span className="font-medium text-orange-900">OTA Server</span>
              </div>
              <span className="text-sm text-orange-600">Syncing</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
              <Database className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Recent Transactions</h3>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 3).map(tx => (
              <div
                key={tx.id}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{tx.dataType}</p>
                    <p className="text-sm text-gray-500">Block #{tx.blockNumber}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.verified ? 'verified' : 'pending')}`}
                    >
                      {tx.verified ? 'Verified' : 'Pending'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(tx.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBlockchain = () => (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Blockchain Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-blue-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hash
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Equipment
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Block
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Gas Used
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="text-sm font-mono text-gray-900">
                      {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 8)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        tx.dataType === 'maintenance'
                          ? 'bg-blue-100 text-blue-800'
                          : tx.dataType === 'sensor'
                            ? 'bg-green-100 text-green-800'
                            : tx.dataType === 'firmware'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {tx.dataType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Equipment {tx.equipmentId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">#{tx.blockNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{tx.gasUsed?.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.verified ? 'verified' : 'pending')}`}
                    >
                      {tx.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(tx.timestamp).toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderIoT = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-3 gap-6">
        {iotDevices.map(device => (
          <div
            key={device.id}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    device.deviceType === 'sensor'
                      ? 'bg-blue-100'
                      : device.deviceType === 'controller'
                        ? 'bg-green-100'
                        : 'bg-purple-100'
                  }`}
                >
                  {device.deviceType === 'sensor' ? (
                    <Activity className="text-blue-600" size={20} />
                  ) : device.deviceType === 'controller' ? (
                    <Cpu className="text-green-600" size={20} />
                  ) : (
                    <Server className="text-purple-600" size={20} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 capitalize">{device.deviceType}</h3>
                  <p className="text-sm text-gray-500">{device.id}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}
              >
                {device.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">IP Address:</span>
                <span className="font-mono text-gray-900">{device.ipAddress}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Firmware:</span>
                <span className="font-mono text-gray-900">v{device.firmwareVersion}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Signal:</span>
                <div className="flex items-center gap-2">
                  <Wifi
                    size={14}
                    className={
                      device.signalStrength > -50
                        ? 'text-green-600'
                        : device.signalStrength > -70
                          ? 'text-orange-600'
                          : 'text-red-600'
                    }
                  />
                  <span className="text-gray-900">{device.signalStrength} dBm</span>
                </div>
              </div>
              {device.batteryLevel && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Battery:</span>
                  <div className="flex items-center gap-2">
                    <Battery
                      size={14}
                      className={
                        device.batteryLevel > 50
                          ? 'text-green-600'
                          : device.batteryLevel > 20
                            ? 'text-orange-600'
                            : 'text-red-600'
                      }
                    />
                    <span className="text-gray-900">{device.batteryLevel}%</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Sensors ({device.sensors.length})
                </span>
                <button
                  onClick={() => setSelectedDevice(device)}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded"
                >
                  <Eye size={16} />
                </button>
              </div>
              <div className="space-y-2">
                {device.sensors.slice(0, 2).map(sensor => (
                  <div key={sensor.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <Thermometer size={14} className="text-gray-400" />
                      <span className="text-gray-600 capitalize">{sensor.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gray-900">
                        {sensor.value.toFixed(1)} {sensor.unit}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          sensor.status === 'normal'
                            ? 'bg-green-500'
                            : sensor.status === 'warning'
                              ? 'bg-orange-500'
                              : 'bg-red-500'
                        }`}
                      ></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Device Details Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedDevice.deviceType.charAt(0).toUpperCase() +
                  selectedDevice.deviceType.slice(1)}{' '}
                Details
              </h2>
              <button
                onClick={() => setSelectedDevice(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device ID</label>
                  <p className="text-sm font-mono text-gray-900">{selectedDevice.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    MAC Address
                  </label>
                  <p className="text-sm font-mono text-gray-900">{selectedDevice.macAddress}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                  <p className="text-sm font-mono text-gray-900">{selectedDevice.ipAddress}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Firmware Version
                  </label>
                  <p className="text-sm font-mono text-gray-900">
                    v{selectedDevice.firmwareVersion}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sensor Readings</h3>
                <div className="space-y-4">
                  {selectedDevice.sensors.map(sensor => (
                    <div key={sensor.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900 capitalize">{sensor.type}</h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}
                        >
                          {sensor.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Current:</span>
                          <p className="font-mono text-gray-900">
                            {sensor.value.toFixed(2)} {sensor.unit}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Min Threshold:</span>
                          <p className="font-mono text-gray-900">
                            {sensor.threshold.min} {sensor.unit}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Max Threshold:</span>
                          <p className="font-mono text-gray-900">
                            {sensor.threshold.max} {sensor.unit}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              sensor.status === 'normal'
                                ? 'bg-green-500'
                                : sensor.status === 'warning'
                                  ? 'bg-orange-500'
                                  : 'bg-red-500'
                            }`}
                            style={{
                              width: `${Math.min(100, Math.max(0, ((sensor.value - sensor.threshold.min) / (sensor.threshold.max - sensor.threshold.min)) * 100))}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderOTA = () => (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">OTA Updates</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {otaUpdates.map(update => {
              const device = iotDevices.find(d => d.id === update.deviceId);
              return (
                <div
                  key={update.id}
                  className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {device?.deviceType} - {update.deviceId}
                      </h4>
                      <p className="text-sm text-gray-600">Firmware v{update.firmwareVersion}</p>
                      <p className="text-xs text-gray-500">
                        Size: {(update.updateSize / 1024 / 1024).toFixed(1)} MB
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(update.status)}`}
                    >
                      {update.status}
                    </span>
                  </div>

                  {update.status === 'downloading' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-900">{update.progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${update.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 smallLaptop:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Started:</span>
                      <p className="font-mono text-gray-900">
                        {new Date(update.startTime).toLocaleString()}
                      </p>
                    </div>
                    {update.completedTime && (
                      <div>
                        <span className="text-gray-600">Completed:</span>
                        <p className="font-mono text-gray-900">
                          {new Date(update.completedTime).toLocaleString()}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600">Checksum:</span>
                      <p className="font-mono text-gray-900 truncate">
                        {update.checksum.substring(7, 15)}...
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Signature:</span>
                      <p className="font-mono text-gray-900 truncate">
                        {update.signature.substring(0, 8)}...
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            Blockchain IoT Dashboard
          </h1>
          <p className="text-slate-600 mt-2 text-xl font-medium">
            Secure IoT data management with blockchain verification
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            <Settings size={16} />
            Settings
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-2">
        <nav className="flex space-x-1">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'blockchain', label: 'Blockchain', icon: Shield },
            { id: 'iot', label: 'IoT Devices', icon: Wifi },
            { id: 'ota', label: 'OTA Updates', icon: Download },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'blockchain' && renderBlockchain()}
      {activeTab === 'iot' && renderIoT()}
      {activeTab === 'ota' && renderOTA()}
    </div>
  );
}

import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Wrench,
  CheckCircle,
  Clock,
  AlertTriangle,
  Power,
  ArrowLeft,
  Activity,
  Thermometer,
  Zap,
  QrCode,
  Play,
  Pause,
  Hash,
  Tag,
  MapPin,
  Calendar,
  GitPullRequestDraft,
} from 'lucide-react';
import { Equipment } from '../types';
import { mockEquipment, mockMaintenance, additionalMaintenanceHistory } from '../data/mockData';
import EquipmentForm from './EquipmentForm';

export default function EquipmentList() {
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [runningState, setRunningState] = useState<'running' | 'idle' | 'error'>('running');
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [equipmentLogs, setEquipmentLogs] = useState<any[]>([]);

  // Simulate real-time sensor data
  React.useEffect(() => {
    if (!selectedEquipment) return;

    const interval = setInterval(() => {
      const newData = {
        temperature: 45 + Math.random() * 20,
        vibration: 0.5 + Math.random() * 1.5,
        timestamp: new Date().toLocaleTimeString(),
      };

      setSensorData(prev => [...prev.slice(-19), newData]);
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedEquipment]);

  // Simulate equipment logs
  React.useEffect(() => {
    if (!selectedEquipment) return;

    const logs = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 60000).toLocaleTimeString(),
        event: 'System Started',
        severity: 'info',
        details: 'Equipment powered on successfully',
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 120000).toLocaleTimeString(),
        event: 'Temperature Alert',
        severity: 'warning',
        details: 'Temperature reached 62°C',
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 180000).toLocaleTimeString(),
        event: 'Maintenance Due',
        severity: 'info',
        details: 'Maintenance due in 5 days',
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 240000).toLocaleTimeString(),
        event: 'Vibration Normal',
        severity: 'info',
        details: 'Vibration levels within range',
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 300000).toLocaleTimeString(),
        event: 'Pressure Check',
        severity: 'info',
        details: 'Hydraulic pressure optimal',
      },
      {
        id: '6',
        timestamp: new Date(Date.now() - 360000).toLocaleTimeString(),
        event: 'Speed Adjusted',
        severity: 'info',
        details: 'Operating speed set to 85%',
      },
      {
        id: '7',
        timestamp: new Date(Date.now() - 420000).toLocaleTimeString(),
        event: 'Safety Check',
        severity: 'warning',
        details: 'Emergency stop tested',
      },
      {
        id: '8',
        timestamp: new Date(Date.now() - 480000).toLocaleTimeString(),
        event: 'Lubrication OK',
        severity: 'info',
        details: 'All bearings lubricated',
      },
      {
        id: '9',
        timestamp: new Date(Date.now() - 540000).toLocaleTimeString(),
        event: 'Filter Changed',
        severity: 'info',
        details: 'Air filter replaced',
      },
      {
        id: '10',
        timestamp: new Date(Date.now() - 600000).toLocaleTimeString(),
        event: 'System Calibrated',
        severity: 'info',
        details: 'Sensors recalibrated',
      },
    ];
    setEquipmentLogs(logs);
  }, [selectedEquipment]);

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesLocation =
      locationFilter === 'all' ||
      item.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesCategory && matchesLocation;
  });

  // Get unique categories and locations for filter options
  const categories = [...new Set(equipment.map(item => item.category))].filter(Boolean);
  const locations = [...new Set(equipment.map(item => item.location))].filter(Boolean);

  // Calculate statistics
  const stats = {
    total: equipment.length,
    operational: equipment.filter(e => e.status === 'operational').length,
    maintenance: equipment.filter(e => e.status === 'maintenance').length,
    broken: equipment.filter(e => e.status === 'broken').length,
    offline: equipment.filter(e => e.status === 'offline').length,
    operationalRate:
      equipment.length > 0
        ? (
            (equipment.filter(e => e.status === 'operational').length / equipment.length) *
            100
          ).toFixed(1)
        : '0',
  };

  const StatCard = ({ title, value, subtext, icon: Icon, color, bgColor }: any) => (
    <div
      className={`${bgColor} p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          {subtext && <p className="text-gray-400 text-sm mt-1">{subtext}</p>}
        </div>
        <div
          className={`p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 ml-1 ${
            color === 'text-blue-600'
              ? 'bg-gradient-to-br from-blue-50 to-blue-100'
              : color === 'text-green-600'
                ? 'bg-gradient-to-br from-green-50 to-green-100'
                : color === 'text-orange-600'
                  ? 'bg-gradient-to-br from-orange-50 to-orange-100'
                  : color === 'text-red-600'
                    ? 'bg-gradient-to-br from-red-50 to-red-100'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100'
          }`}
        >
          <Icon size={24} className={color} />
        </div>
      </div>
    </div>
  );

  const getStatusBadge = (status: Equipment['status']) => {
    const styles = {
      operational: 'bg-green-100 text-green-800',
      maintenance: 'bg-orange-100 text-orange-800',
      broken: 'bg-red-100 text-red-800',
      offline: 'bg-gray-100 text-gray-800',
    };

    const labels = {
      operational: 'Operational',
      maintenance: 'Maintenance',
      broken: 'Out of Order',
      offline: 'Offline',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const handleEdit = (item: Equipment) => {
    setEditingEquipment(item);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setEquipment(equipment.filter(item => item.id !== id));
  };

  const handleSave = (equipmentData: Omit<Equipment, 'id'>) => {
    if (editingEquipment) {
      setEquipment(
        equipment.map(item =>
          item.id === editingEquipment.id ? { ...equipmentData, id: editingEquipment.id } : item
        )
      );
    } else {
      const newEquipment: Equipment = {
        ...equipmentData,
        id: Date.now().toString(),
      };
      setEquipment([...equipment, newEquipment]);
    }
    setShowForm(false);
    setEditingEquipment(null);
  };

  const getRunningStateColor = (state: string) => {
    switch (state) {
      case 'running':
        return 'text-green-600 bg-green-100';
      case 'idle':
        return 'text-orange-600 bg-orange-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRunningStateIcon = (state: string) => {
    switch (state) {
      case 'running':
        return <Play size={16} />;
      case 'idle':
        return <Pause size={16} />;
      case 'error':
        return <AlertTriangle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  // const getLogSeverityColor = (severity: string) => {
  //   switch (severity) {
  //     case 'info':
  //       return 'text-blue-600 bg-blue-50 border-blue-200';
  //     case 'warning':
  //       return 'text-orange-600 bg-orange-50 border-orange-200';
  //     case 'error':
  //       return 'text-red-600 bg-red-50 border-red-200';
  //     default:
  //       return 'text-gray-600 bg-gray-50 border-gray-200';
  //   }
  // };

  const currentTemp = sensorData.length > 0 ? sensorData[sensorData.length - 1].temperature : 0;
  const currentVibration = sensorData.length > 0 ? sensorData[sensorData.length - 1].vibration : 0;

  // Combine all maintenance records and filter by equipment, then sort by date (most recent first)
  const allMaintenanceRecords = [...mockMaintenance, ...additionalMaintenanceHistory];
  const maintenanceHistory = allMaintenanceRecords
    .filter(m => selectedEquipment && m.equipmentId === selectedEquipment.id)
    .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
    .slice(0, 3); // Show only the 3 most recent records

  if (selectedEquipment) {
    return (
      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setSelectedEquipment(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to Equipment List
          </button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              {selectedEquipment.imageUrl ? (
                <img
                  src={selectedEquipment.imageUrl}
                  alt={selectedEquipment.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Wrench className="text-gray-500" size={28} />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {selectedEquipment.name}
              </h1>
              <p className="text-gray-600 text-lg">
                {selectedEquipment.model} • {selectedEquipment.serialNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Row 1: Equipment Information, Equipment Logs, Maintenance History */}
        <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-8 mb-8">
          {/* Equipment Information Card */}
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              Equipment Information
            </h3>

            <div className="space-y-3">
              {/* Compact Info with Icons */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <Wrench className="text-blue-600 flex-shrink-0" size={16} />
                  <span className="font-semibold text-gray-900">{selectedEquipment.model}</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <Hash className="text-green-600 flex-shrink-0" size={16} />
                  <span className="font-semibold text-gray-900">
                    {selectedEquipment.serialNumber}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <Tag className="text-purple-600 flex-shrink-0" size={16} />
                  <span className="font-semibold text-gray-900">{selectedEquipment.category}</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <MapPin className="text-red-600 flex-shrink-0" size={16} />
                  <span className="font-semibold text-gray-900">{selectedEquipment.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-center p-2">
                <QrCode className="text-blue-600" size={65} />
              </div>

              {/* Install Date */}
              <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
                <Calendar className="text-blue-600 flex-shrink-0" size={16} />
                <span className="text-sm font-medium text-blue-900">
                  Installed: {new Date(selectedEquipment.installDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="absolute top-4 right-4">{getStatusBadge(selectedEquipment.status)}</div>
          </div>

          {/* Equipment Logs Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="text-blue-600" size={20} />
              Equipment Logs
            </h3>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {equipmentLogs.map(log => (
                <div
                  key={log.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      log.severity === 'info'
                        ? 'bg-blue-500'
                        : log.severity === 'warning'
                          ? 'bg-orange-500'
                          : 'bg-red-500'
                    }`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {log.event}
                      </span>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {log.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 truncate">{log.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance History Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Wrench className="text-green-600" size={20} />
              Maintenance History
            </h3>
            {maintenanceHistory.length > 0 ? (
              <div className="relative max-h-[266px] overflow-y-auto">
                {/* Timeline Line */}
                <div className="absolute left-[71px] top-0 bottom-0 w-0.5 bg-gray-200"></div>

                <div className="space-y-6">
                  {maintenanceHistory.map((record, index) => (
                    <div key={record.id || index} className="relative flex items-start">
                      {/* Timeline Date */}
                      <div className="w-14 text-right pr-2 flex-shrink-0">
                        <div className="text-xs font-semibold text-gray-900">
                          {new Date(record.scheduledDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(record.scheduledDate).getFullYear()}
                        </div>
                      </div>

                      {/* Timeline Dot */}
                      <div
                        className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-lg ${
                          record.status === 'completed'
                            ? 'bg-green-500'
                            : record.status === 'in-progress'
                              ? 'bg-orange-500'
                              : 'bg-blue-500'
                        }`}
                      >
                        {record.status === 'completed' ? (
                          <CheckCircle className="text-white" size={12} />
                        ) : record.status === 'in-progress' ? (
                          <Clock className="text-white" size={12} />
                        ) : (
                          <Calendar className="text-white" size={12} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="ml-2 mr-1 flex-1 pb-4">
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-gray-900 text-xs leading-tight">
                              {record.description}
                            </h4>
                            <span
                              className={`px-1.5 py-0.5 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${
                                record.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : record.status === 'in-progress'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {record.status === 'completed'
                                ? 'Done'
                                : record.status === 'in-progress'
                                  ? 'Active'
                                  : 'Planned'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">By: {record.technician}</p>
                          <div className="flex justify-between text-xs">
                            <div>
                              <span className="text-gray-500">Cost: </span>
                              <span className="font-medium text-gray-900">${record.cost}</span>
                            </div>
                            {record.duration && (
                              <div>
                                <span className="text-gray-500">Duration: </span>
                                <span className="font-medium text-gray-900">
                                  {record.duration}min
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Wrench className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No maintenance history</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No maintenance records found for this equipment.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Running State Card */}
        <div className="mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="text-green-600" size={20} />
              Running State
            </h3>

            {/* Current Status */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-600 font-medium">Current State:</span>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-full font-semibold ${getRunningStateColor(runningState)}`}
              >
                {getRunningStateIcon(runningState)}
                {runningState.charAt(0).toUpperCase() + runningState.slice(1)}
              </div>
            </div>

            {/* Timeline Chart */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold text-gray-700">24-Hour Timeline</h4>
                <div className="text-xs text-gray-500">{new Date().toLocaleDateString()}</div>
              </div>

              {/* Timeline Bar */}
              <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden mb-4">
                {/* Running periods */}
                <div
                  className="absolute top-0 left-0 h-full bg-green-500"
                  style={{ width: '45%' }}
                ></div>
                <div
                  className="absolute top-0 left-[50%] h-full bg-green-500"
                  style={{ width: '25%' }}
                ></div>

                {/* Idle periods */}
                <div
                  className="absolute top-0 left-[45%] h-full bg-orange-400"
                  style={{ width: '5%' }}
                ></div>
                <div
                  className="absolute top-0 left-[75%] h-full bg-orange-400"
                  style={{ width: '15%' }}
                ></div>

                {/* Error periods */}
                <div
                  className="absolute top-0 left-[90%] h-full bg-red-500"
                  style={{ width: '10%' }}
                ></div>

                {/* Time markers */}
                <div className="absolute top-0 left-0 w-px h-full bg-gray-300"></div>
                <div className="absolute top-0 left-1/4 w-px h-full bg-gray-300"></div>
                <div className="absolute top-0 left-1/2 w-px h-full bg-gray-300"></div>
                <div className="absolute top-0 left-3/4 w-px h-full bg-gray-300"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-gray-300"></div>
              </div>

              {/* Time Labels */}
              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
              </div>
            </div>

            {/* Status Percentages */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Running</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">70%</span>
                  <span className="text-xs text-gray-500">(16.8h)</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Idle</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">20%</span>
                  <span className="text-xs text-gray-500">(4.8h)</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Error</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">10%</span>
                  <span className="text-xs text-gray-500">(2.4h)</span>
                </div>
              </div>
            </div>

            {/* Report Error Button - Small button in corner */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setRunningState('error')}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                title="Report Error"
              >
                <AlertTriangle size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Row 3: Real-time Monitoring with Timeline Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Thermometer className="text-red-600" size={20} />
            Real-time Monitoring
          </h3>

          <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-8">
            {/* Current Values - Circular Display */}
            <div className="space-y-6">
              {/* Temperature Circle */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Outer Circle */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-50 to-red-100 border-4 border-red-200 flex items-center justify-center shadow-lg">
                    {/* Inner Content */}
                    <div className="text-center">
                      <Thermometer className="text-red-600 mx-auto mb-1" size={24} />
                      <div className="text-2xl font-bold text-red-600">
                        {currentTemp.toFixed(1)}°C
                      </div>
                      <div className="text-xs text-red-500 font-medium">Temperature</div>
                    </div>
                  </div>
                  {/* Status Ring */}
                  <div
                    className={`absolute inset-0 rounded-full border-4 ${
                      currentTemp >= 40 && currentTemp <= 60
                        ? 'border-green-400'
                        : currentTemp > 60
                          ? 'border-red-400'
                          : 'border-orange-400'
                    } border-opacity-60`}
                  ></div>
                </div>
              </div>

              {/* Vibration Circle */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Outer Circle */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-50 to-purple-100 border-4 border-purple-200 flex items-center justify-center shadow-lg">
                    {/* Inner Content */}
                    <div className="text-center">
                      <Zap className="text-purple-600 mx-auto mb-1" size={24} />
                      <div className="text-2xl font-bold text-purple-600">
                        {currentVibration.toFixed(2)}
                      </div>
                      <div className="text-xs text-purple-500 font-medium">mm/s</div>
                    </div>
                  </div>
                  {/* Status Ring */}
                  <div
                    className={`absolute inset-0 rounded-full border-4 ${
                      currentVibration >= 0.5 && currentVibration <= 1.5
                        ? 'border-green-400'
                        : currentVibration > 1.5
                          ? 'border-red-400'
                          : 'border-orange-400'
                    } border-opacity-60`}
                  ></div>
                </div>
              </div>

              {/* Status Legend */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-gray-600">Normal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                    <span className="text-gray-600">Warning</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="text-gray-600">Critical</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  <div>Temp: 40-60°C Normal</div>
                  <div>Vibration: 0.5-1.5 mm/s Normal</div>
                </div>
              </div>
            </div>

            {/* Timeline Charts */}
            <div className="space-y-6">
              {/* Temperature Chart */}
              <div>
                {/* <h4 className="text-sm font-semibold text-gray-700 mb-3">Temperature Timeline</h4> */}
                <div className="h-32 p-4">
                  <svg width="100%" height="100%" viewBox="0 0 300 80">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                        <path
                          d="M 30 0 L 0 0 0 20"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Y-axis labels */}
                    <text x="-15" y="15" fontSize="10" fill="#6b7280">
                      70°C
                    </text>
                    <text x="-15" y="45" fontSize="10" fill="#6b7280">
                      55°C
                    </text>
                    <text x="-15" y="75" fontSize="10" fill="#6b7280">
                      40°C
                    </text>

                    {/* Temperature line */}
                    {sensorData.length > 1 && (
                      <polyline
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="2"
                        points={sensorData
                          .slice(-10)
                          .map((data, index) => {
                            const x = 30 + index * 25;
                            const y = 80 - ((data.temperature - 40) / 30) * 60;
                            return `${x},${y}`;
                          })
                          .join(' ')}
                      />
                    )}

                    {/* Data points */}
                    {sensorData.slice(-10).map((data, index) => {
                      const x = 30 + index * 25;
                      const y = 80 - ((data.temperature - 40) / 30) * 60;
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="3"
                          fill="#dc2626"
                          className="hover:r-4 transition-all"
                        />
                      );
                    })}
                  </svg>
                </div>
                <p className="text-xs text-gray-700 text-center">Temperature Timeline</p>
              </div>

              {/* Vibration Chart */}
              <div>
                {/* <h4 className="text-sm font-semibold text-gray-700 mb-3">Vibration Timeline</h4> */}
                <div className="h-32 p-4">
                  <svg width="100%" height="100%" viewBox="0 0 300 80">
                    {/* Grid lines */}
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Y-axis labels */}
                    <text x="-15" y="15" fontSize="10" fill="#6b7280">
                      2.0
                    </text>
                    <text x="-15" y="45" fontSize="10" fill="#6b7280">
                      1.25
                    </text>
                    <text x="-15" y="75" fontSize="10" fill="#6b7280">
                      0.5
                    </text>

                    {/* Vibration line */}
                    {sensorData.length > 1 && (
                      <polyline
                        fill="none"
                        stroke="#7c3aed"
                        strokeWidth="2"
                        points={sensorData
                          .slice(-10)
                          .map((data, index) => {
                            const x = 30 + index * 25;
                            const y = 80 - ((data.vibration - 0.5) / 1.5) * 60;
                            return `${x},${y}`;
                          })
                          .join(' ')}
                      />
                    )}

                    {/* Data points */}
                    {sensorData.slice(-10).map((data, index) => {
                      const x = 30 + index * 25;
                      const y = 80 - ((data.vibration - 0.5) / 1.5) * 60;
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="3"
                          fill="#7c3aed"
                          className="hover:r-4 transition-all"
                        />
                      );
                    })}
                  </svg>
                </div>
                <p className="text-xs text-gray-700 text-center">Vibration Timeline</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight"
            style={{ marginBottom: 0, paddingBottom: 2 }}
          >
            Equipment Management
          </h1>
          <p className="text-slate-600 mt-2 text-xl font-medium">
            Monitor and manage all factory equipment
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          <Plus size={20} />
          Add Equipment
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-5 gap-2 laptop:gap-8 mb-10">
        <StatCard
          title="Total Equipment"
          value={stats.total}
          icon={Wrench}
          color="text-blue-600"
          bgColor="bg-white/80 backdrop-blur-sm"
        />
        <StatCard
          title="Operational"
          value={stats.operational}
          subtext={`${stats.operationalRate}% uptime`}
          icon={CheckCircle}
          color="text-green-600"
          bgColor="bg-white"
        />
        <StatCard
          title="Under Maintenance"
          value={stats.maintenance}
          icon={Clock}
          color="text-orange-600"
          bgColor="bg-white"
        />
        <StatCard
          title="Out of Order"
          value={stats.broken}
          icon={AlertTriangle}
          color="text-red-600"
          bgColor="bg-white"
        />
        <StatCard
          title="Offline"
          value={stats.offline}
          icon={Power}
          color="text-gray-600"
          bgColor="bg-white"
        />
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 mb-10">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap items-center gap-4">
            <Filter size={20} className="text-gray-500" />

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white min-w-[140px]"
            >
              <option value="all">All Status</option>
              <option value="operational">Operational</option>
              <option value="maintenance">Maintenance</option>
              <option value="broken">Out of Order</option>
              <option value="offline">Offline</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white min-w-[160px]"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white min-w-[180px]"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            {/* Clear Filters Button */}
            {(statusFilter !== 'all' ||
              categoryFilter !== 'all' ||
              locationFilter !== 'all' ||
              searchTerm) && (
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setCategoryFilter('all');
                  setLocationFilter('all');
                  setSearchTerm('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Filter Summary */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>
              Showing {filteredEquipment.length} of {equipment.length} equipment
            </span>
            {(statusFilter !== 'all' ||
              categoryFilter !== 'all' ||
              locationFilter !== 'all' ||
              searchTerm) && <span className="text-blue-600">• Filters applied</span>}
          </div>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-blue-50">
              <tr>
                <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Equipment
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Next Maintenance
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredEquipment.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-xl overflow-hidden shadow-lg bg-gray-100 flex-shrink-0 cursor-pointer hover:shadow-xl transition-shadow duration-200"
                        onClick={() => setSelectedEquipment(item)}
                      >
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <Wrench className="text-gray-500" size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <div
                          className="text-sm font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                          onClick={() => setSelectedEquipment(item)}
                        >
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.model} - {item.serialNumber}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{item.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-900">{item.location}</div>
                  </td>
                  <td className="px-6 py-5">{getStatusBadge(item.status)}</td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-900">
                      {item.nextMaintenance
                        ? new Date(item.nextMaintenance).toLocaleDateString()
                        : 'Not scheduled'}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Equipment Form Modal */}
      {showForm && (
        <EquipmentForm
          equipment={editingEquipment}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingEquipment(null);
          }}
        />
      )}
    </div>
  );
}

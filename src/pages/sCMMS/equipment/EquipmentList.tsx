import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Wrench,
  CheckCircle,
  AlertTriangle,
  Clock,
  Edit,
  Trash2,
  X,
  Calendar,
  TrendingUp,
  Activity,
  Zap,
  Target,
  Lightbulb,
  Settings,
  Power,
  ArrowLeft,
  Play,
  Pause,
  Thermometer,
  QrCode,
  Hash,
  Tag,
  MapPin,
  RefreshCw,
  Brain,
  Gauge,
  BarChart3,
  TrendingDown,
  Info,
  FileText,
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
  const [viewingEquipment, setViewingEquipment] = useState<Equipment | null>(null);
  const [viewingDetail, setViewingDetail] = useState<Equipment | null>(null);
  const [realtimeOEE, setRealtimeOEE] = useState<{ [key: string]: any }>({});

  // Simulate realtime OEE updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeOEE(prev => {
        const updated = { ...prev };
        equipment.forEach(eq => {
          if (eq.oee) {
            updated[eq.id] = {
              ...eq.oee,
              overall: eq.oee.overall + (Math.random() - 0.5) * 2,
              availability: eq.oee.availability + (Math.random() - 0.5) * 1,
              performance: eq.oee.performance + (Math.random() - 0.5) * 1,
              quality: eq.oee.quality + (Math.random() - 0.5) * 0.5,
              lastUpdated: new Date().toISOString(),
            };
          }
        });
        return updated;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [equipment]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [runningState, setRunningState] = useState<'running' | 'idle' | 'error'>('running');
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [equipmentLogs, setEquipmentLogs] = useState<any[]>([]);
  const [errorPeriods, setErrorPeriods] = useState<any[]>([]);
  const [selectedError, setSelectedError] = useState<any>(null);
  const [editingError, setEditingError] = useState<any>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [timeFilter, setTimeFilter] = useState({
    startTime: new Date().toISOString().split('T')[0],
    endTime: new Date().toISOString().split('T')[0],
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

    // Set up error periods data
    const errors = [
      {
        id: 'error1',
        startTime: '22:00',
        endTime: '24:00',
        startPercent: 90,
        widthPercent: 10,
        errorCode: 'E001',
        description: 'Hydraulic Pressure Drop',
        severity: 'Critical',
        cause: 'Hydraulic pump malfunction detected',
        solution: 'Replace hydraulic pump and check system pressure',
        reportedBy: 'System Auto-Detection',
        timestamp: new Date(Date.now() - 120000).toLocaleString(),
      },
      {
        id: 'error2',
        startTime: '14:30',
        endTime: '15:00',
        startPercent: 60,
        widthPercent: 2,
        errorCode: 'W002',
        description: 'Temperature Warning',
        severity: 'Warning',
        cause: 'Operating temperature exceeded 65°C',
        solution: 'Check cooling system and clean air filters',
        reportedBy: 'Temperature Sensor',
        timestamp: new Date(Date.now() - 480000).toLocaleString(),
      },
    ];
    setErrorPeriods(errors);

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

  // Pagination logic
  const totalPages = Math.ceil(filteredEquipment.length / itemsPerPage);
  const paginatedEquipment = filteredEquipment.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filters/search/itemsPerPage change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter, locationFilter, itemsPerPage]);

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

  const getCurrentOEE = (equipmentId: string) => {
    return realtimeOEE[equipmentId] || equipment.find(eq => eq.id === equipmentId)?.oee;
  };

  const getOEEColor = (value: number) => {
    if (value >= 85) return 'text-green-600';
    if (value >= 70) return 'text-yellow-600';
    if (value >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getOEEBgColor = (value: number) => {
    if (value >= 85) return 'bg-green-50 border-green-200';
    if (value >= 70) return 'bg-yellow-50 border-yellow-200';
    if (value >= 60) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  // Generate OEE data for equipment
  const generateOEEData = (equipmentId: string) => {
    // Simulated OEE calculation based on equipment status and maintenance history
    console.log('equipmentId', equipmentId);

    const baseOEE = {
      availability: Math.floor(Math.random() * 20) + 80, // 80-100%
      performance: Math.floor(Math.random() * 15) + 85, // 85-100%
      quality: Math.floor(Math.random() * 10) + 90, // 90-100%
    };

    const overall = Math.round(
      (baseOEE.availability * baseOEE.performance * baseOEE.quality) / 10000
    );

    return {
      ...baseOEE,
      overall,
      trend: Math.floor(Math.random() * 10) - 5, // -5% to +5%
      lastUpdated: new Date().toISOString(),
      dailyData: Array.from({ length: 7 }, (_, i) => ({
        day: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          weekday: 'short',
        }),
        oee: Math.floor(Math.random() * 20) + 70,
      })),
      weeklyTrend: Array.from({ length: 7 }, (_, i) => ({
        day: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          weekday: 'short',
        }),
        value: Math.floor(Math.random() * 20) + 70,
      })),
      insights: [
        'Equipment performance is above average',
        'Minor downtime detected during shift changes',
        'Quality metrics are consistently high',
      ],
      recommendations: [
        'Schedule preventive maintenance',
        'Optimize changeover procedures',
        'Monitor temperature trends',
      ],
    };
  };

  const getOEEStatus = (value: number) => {
    if (value >= 85) return 'Excellent';
    if (value >= 70) return 'Good';
    if (value >= 60) return 'Fair';
    return 'Poor';
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

  const handleEditError = (error: any) => {
    setEditingError({ ...error });
  };

  const handleSaveError = () => {
    if (editingError) {
      // Update the error in the data
      const updatedErrors = errorPeriods.map(error =>
        error.id === editingError.id ? editingError : error
      );
      // In a real app, you would save this to your backend
      console.log('Saving error:', editingError, updatedErrors);
      setSelectedError(editingError);
      setEditingError(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingError(null);
  };

  const handleErrorClick = (error: any) => {
    setSelectedError(error);
    setShowErrorModal(true);
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

  const getAvatarColor = (name: string) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-red-500 to-red-600',
      'from-yellow-500 to-yellow-600',
      'from-indigo-500 to-indigo-600',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

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
              <div className="text-sm text-gray-600">
                {selectedEquipment.description || 'No description available'}
              </div>
            </div>
          </div>
        </div>

        {/* OEE Performance Section */}
        {selectedEquipment.oee && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Gauge className="text-blue-600" size={24} />
              Overall Equipment Effectiveness (OEE)
            </h3>

            {/* Main OEE Score */}
            <div className="grid grid-cols-1 smallLaptop:grid-cols-4 gap-6 mb-8">
              <div className="smallLaptop:col-span-1">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-xl border border-blue-200 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full transform translate-x-8 -translate-y-8"></div>
                  </div>
                  <div className="relative">
                    <div className="text-6xl font-bold text-blue-600 mb-2">
                      {selectedEquipment.oee.overall}%
                    </div>
                    <div className="text-lg font-semibold text-blue-800 mb-4">Overall OEE</div>
                    <div
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        selectedEquipment.oee.trend >= 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {selectedEquipment.oee.trend >= 0 ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      {selectedEquipment.oee.trend >= 0 ? '+' : ''}
                      {selectedEquipment.oee.trend}%
                    </div>
                    <div className="text-xs text-blue-600 mt-2">vs last period</div>
                  </div>
                </div>
              </div>

              {/* Component Breakdown */}
              <div className="smallLaptop:col-span-3 grid grid-cols-1 smallLaptop:grid-cols-3 gap-4">
                {/* Availability */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <CheckCircle className="text-green-600" size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {selectedEquipment.oee.availability}%
                      </div>
                      <div className="text-sm font-medium text-gray-700">Availability</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${selectedEquipment.oee.availability}%` }}
                    ></div>
                  </div>
                </div>

                {/* Performance */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Zap className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedEquipment.oee.performance}%
                      </div>
                      <div className="text-sm font-medium text-gray-700">Performance</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${selectedEquipment.oee.performance}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quality */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <Target className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {selectedEquipment.oee.quality}%
                      </div>
                      <div className="text-sm font-medium text-gray-700">Quality</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${selectedEquipment.oee.quality}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Trend Chart */}
            <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="text-orange-600" size={20} />
                  7-Day OEE Trend
                </h4>
                <div className="h-48 flex items-end justify-between gap-2">
                  {selectedEquipment.oee.weeklyTrend.map((day, index) => {
                    const height = (day.value / 100) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="text-sm font-bold text-gray-900 mb-2">{day.value}%</div>
                        <div
                          className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg transition-all duration-1000 ease-out hover:shadow-lg transform hover:scale-105"
                          style={{ height: `${height}%`, minHeight: '20px' }}
                        ></div>
                        <div className="text-xs text-gray-600 mt-2 font-medium">{day.day}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* OEE Status Summary */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="text-green-600" size={20} />
                  Performance Summary
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                    <span className="font-medium text-blue-900">Last Updated</span>
                    <span className="text-sm text-blue-700">
                      {new Date(selectedEquipment.oee.lastUpdated).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                    <span className="font-medium text-green-900">Trend Direction</span>
                    <div
                      className={`flex items-center gap-1 ${selectedEquipment.oee.trend >= 0 ? 'text-green-700' : 'text-red-700'}`}
                    >
                      {selectedEquipment.oee.trend >= 0 ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )}
                      <span className="text-sm font-semibold">
                        {selectedEquipment.oee.trend >= 0 ? 'Improving' : 'Declining'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                    <span className="font-medium text-purple-900">Performance Rating</span>
                    <span
                      className={`text-sm font-semibold px-2 py-1 rounded-full ${
                        selectedEquipment.oee.overall >= 85
                          ? 'bg-green-100 text-green-800'
                          : selectedEquipment.oee.overall >= 65
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {selectedEquipment.oee.overall >= 85
                        ? 'Excellent'
                        : selectedEquipment.oee.overall >= 65
                          ? 'Good'
                          : 'Needs Improvement'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights and Recommendations */}
            <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-8 mb-8">
              {/* Insights */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="text-blue-600" size={20} />
                  AI Insights
                </h4>
                <div className="space-y-3">
                  {selectedEquipment.oee.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/70 rounded-xl">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-blue-800">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                <h4 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                  <Settings className="text-green-600" size={20} />
                  Recommendations
                </h4>
                <div className="space-y-3">
                  {selectedEquipment.oee.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/70 rounded-xl">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-green-800">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

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

            {/* Date Filter Controls - Compact */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-600 font-medium">Date Range:</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-gray-600">From:</label>
                  <input
                    type="date"
                    value={timeFilter.startTime}
                    onChange={e => setTimeFilter({ ...timeFilter, startTime: e.target.value })}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-gray-600">To:</label>
                  <input
                    type="date"
                    value={timeFilter.endTime}
                    onChange={e => setTimeFilter({ ...timeFilter, endTime: e.target.value })}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <button
                  onClick={() =>
                    setTimeFilter({
                      startTime: new Date().toISOString().split('T')[0],
                      endTime: new Date().toISOString().split('T')[0],
                    })
                  }
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                >
                  Today
                </button>
              </div>
            </div>

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
                <div className="text-xs text-gray-500">
                  {timeFilter.startTime === timeFilter.endTime
                    ? new Date(timeFilter.startTime).toLocaleDateString()
                    : `${new Date(timeFilter.startTime).toLocaleDateString()} - ${new Date(timeFilter.endTime).toLocaleDateString()}`}
                </div>
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
                {errorPeriods.map(error => (
                  <div
                    key={error.id}
                    className="absolute top-0 h-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors duration-200"
                    style={{ left: `${error.startPercent}%`, width: `${error.widthPercent}%` }}
                    onClick={() => handleErrorClick(error)}
                    title={`${error.errorCode}: ${error.description} (${error.startTime} - ${error.endTime})`}
                  ></div>
                ))}

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

        {/* Error Information Modal */}
        {showErrorModal && selectedError && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      selectedError.severity === 'Critical'
                        ? 'bg-red-100'
                        : selectedError.severity === 'Warning'
                          ? 'bg-orange-100'
                          : 'bg-yellow-100'
                    }`}
                  >
                    <AlertTriangle
                      className={`${
                        selectedError.severity === 'Critical'
                          ? 'text-red-600'
                          : selectedError.severity === 'Warning'
                            ? 'text-orange-600'
                            : 'text-yellow-600'
                      }`}
                      size={24}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Error Details - {selectedError.errorCode}
                    </h2>
                    <p className="text-sm text-gray-600">{selectedError.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Error Information */}
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Error Code
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        {editingError ? (
                          <input
                            type="text"
                            value={editingError.errorCode}
                            onChange={e =>
                              setEditingError({ ...editingError, errorCode: e.target.value })
                            }
                            className="font-mono text-lg font-bold text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-transparent w-full"
                          />
                        ) : (
                          <span className="font-mono text-lg text-red-600">
                            {selectedError.errorCode}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Severity Level
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        {editingError ? (
                          <select
                            value={editingError.severity}
                            onChange={e =>
                              setEditingError({ ...editingError, severity: e.target.value })
                            }
                            className={`px-3 py-2 rounded-lg text-sm font-semibold border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              editingError.severity === 'Critical'
                                ? 'bg-red-100 text-red-800 border-red-200'
                                : 'bg-orange-100 text-orange-800 border-orange-200'
                            }`}
                          >
                            <option value="Critical">Critical</option>
                            <option value="Warning">Warning</option>
                            <option value="Minor">Minor</option>
                          </select>
                        ) : (
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              selectedError.severity === 'Critical'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {selectedError.severity}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Time Period
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <span className="text-gray-900">
                          {selectedError.startTime} - {selectedError.endTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Reported By
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        {editingError ? (
                          <input
                            type="text"
                            value={editingError.reportedBy}
                            onChange={e =>
                              setEditingError({ ...editingError, reportedBy: e.target.value })
                            }
                            className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                          />
                        ) : (
                          <span className="text-gray-900">{selectedError.reportedBy}</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Timestamp
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <span className="text-gray-900">{selectedError.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-gray-900">{selectedError.description}</p>
                  </div>
                </div>

                {/* Root Cause */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Root Cause Analysis
                  </label>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-gray-900">{selectedError.cause}</p>
                  </div>
                </div>

                {/* Recommended Solution */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recommended Solution
                  </label>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-gray-900">{selectedError.solution}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                    {editingError ? (
                      <>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveError}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditError(selectedError)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          Edit Error
                        </button>
                        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200">
                          Acknowledge Error
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                          Create Maintenance Task
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setSelectedError(null)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
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
      <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-5 gap-4 mb-10">
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
                  OEE (Realtime)
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
              {paginatedEquipment.map(item => {
                const currentOEE = getCurrentOEE(item.id);
                return (
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
                              className="w-full h-full object-cover"
                              onError={e => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div
                              className={`w-full h-full bg-gradient-to-br ${getAvatarColor(item.name)} flex items-center justify-center`}
                            >
                              <span className="text-white font-bold text-lg">
                                {item.name
                                  .split(' ')
                                  .map(n => n[0])
                                  .join('')
                                  .toUpperCase()}
                              </span>
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
                      {currentOEE ? (
                        <div className="space-y-2">
                          <div
                            className={`flex items-center gap-2 p-2 rounded-lg ${getOEEBgColor(currentOEE.overall)}`}
                          >
                            <Activity className={getOEEColor(currentOEE.overall)} size={16} />
                            <div>
                              <div
                                className={`text-lg font-bold ${getOEEColor(currentOEE.overall)}`}
                              >
                                {currentOEE.overall.toFixed(1)}%
                              </div>
                              <div className="text-xs text-gray-500">Overall</div>
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                              {currentOEE.trend >= 0 ? (
                                <TrendingUp className="text-green-600" size={12} />
                              ) : (
                                <TrendingDown className="text-red-600" size={12} />
                              )}
                              <span
                                className={`text-xs ${currentOEE.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}
                              >
                                {Math.abs(currentOEE.trend).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-1 text-xs">
                            <div className="text-center">
                              <div className="font-semibold text-green-600">
                                {currentOEE.availability.toFixed(0)}%
                              </div>
                              <div className="text-gray-500">Avail</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-blue-600">
                                {currentOEE.performance.toFixed(0)}%
                              </div>
                              <div className="text-gray-500">Perf</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-purple-600">
                                {currentOEE.quality.toFixed(0)}%
                              </div>
                              <div className="text-gray-500">Qual</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 text-center">
                            Updated: {new Date(currentOEE.lastUpdated).toLocaleTimeString()}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400">No OEE data</div>
                      )}
                    </td>
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
                          onClick={() => setViewingEquipment(item)}
                          className="text-purple-600 hover:text-purple-800 p-2 rounded-lg hover:bg-purple-50 transition-all duration-200"
                          title="View OEE Details"
                        >
                          <BarChart3 size={16} />
                        </button>
                        <button
                          onClick={() => setViewingDetail(item)}
                          className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-all duration-200"
                          title="View Equipment Detail"
                        >
                          <Target size={16} />
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
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls and Rows Per Page Selector */}
        {(totalPages > 1 || filteredEquipment.length > 0) && (
          <div className="flex flex-col smallLaptop:flex-row justify-center smallLaptop:justify-between items-center gap-4 px-6 py-6">
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1 flex-wrap">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-800'
                  }`}
                >
                  Prev
                </button>
                {/* Smart pagination: show first, last, current, neighbors, ellipsis */}
                {(() => {
                  const pages = [];
                  const pageWindow = 2; // how many neighbors to show
                  for (let i = 1; i <= totalPages; i++) {
                    if (
                      i === 1 ||
                      i === totalPages ||
                      (i >= currentPage - pageWindow && i <= currentPage + pageWindow)
                    ) {
                      pages.push(i);
                    } else if (
                      (i === 2 && currentPage - pageWindow > 2) ||
                      (i === totalPages - 1 && currentPage + pageWindow < totalPages - 1)
                    ) {
                      pages.push('ellipsis-' + i);
                    }
                  }
                  let lastWasEllipsis = false;
                  return pages.map(page => {
                    if (typeof page === 'string' && page.startsWith('ellipsis')) {
                      if (lastWasEllipsis) return null;
                      lastWasEllipsis = true;
                      return (
                        <span key={page} className="px-2 text-gray-400 select-none">
                          ...
                        </span>
                      );
                    } else {
                      lastWasEllipsis = false;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page as number)}
                          className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                            currentPage === page
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-800'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                  });
                })()}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-800'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
            {/* Rows per page selector */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 font-medium">Rows per page:</label>
              <select
                value={itemsPerPage}
                onChange={e => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white"
              >
                {[10, 15, 20, 25, 50].map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
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

      {/* Equipment Detail Modal */}
      {viewingDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl mx-4 max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                  {viewingDetail.imageUrl ? (
                    <img
                      src={viewingDetail.imageUrl}
                      alt={viewingDetail.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <Wrench className="text-white" size={24} />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{viewingDetail.name}</h2>
                  <p className="text-lg text-gray-600">
                    {viewingDetail.model} • {viewingDetail.category}
                  </p>
                  <p className="text-sm text-gray-500">{viewingDetail.location}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingDetail(null)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Equipment Information, Logs, and Maintenance History - Moved to Top */}
              <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-8">
                {/* Equipment Information */}
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                      <Info className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Equipment Information</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model:</span>
                      <span className="font-medium text-gray-900">{viewingDetail.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Serial Number:</span>
                      <span className="font-mono text-gray-900">{viewingDetail.serialNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="text-gray-900">{viewingDetail.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="text-gray-900">{viewingDetail.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Install Date:</span>
                      <span className="text-gray-900">
                        {new Date(viewingDetail.installDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maintenance Interval:</span>
                      <span className="text-gray-900">
                        {viewingDetail.maintenanceInterval} days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Equipment Logs */}
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                      <FileText className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Equipment Logs</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="text-green-600" size={16} />
                      <div>
                        <p className="text-sm font-medium text-green-900">System Check Passed</p>
                        <p className="text-xs text-green-600">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Activity className="text-blue-600" size={16} />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Performance Optimized</p>
                        <p className="text-xs text-blue-600">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <AlertTriangle className="text-orange-600" size={16} />
                      <div>
                        <p className="text-sm font-medium text-orange-900">Temperature Warning</p>
                        <p className="text-xs text-orange-600">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maintenance History */}
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                      <Wrench className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Maintenance History</h3>
                  </div>
                  <div className="space-y-3">
                    {(() => {
                      const equipmentMaintenance = allMaintenanceRecords
                        .filter(m => m.equipmentId === viewingDetail.id)
                        .sort(
                          (a, b) =>
                            new Date(b.scheduledDate).getTime() -
                            new Date(a.scheduledDate).getTime()
                        );

                      return equipmentMaintenance.slice(0, 3).map(record => (
                        <div key={record.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-start mb-1">
                            <p className="text-sm font-medium text-gray-900 capitalize">
                              {record.type}
                            </p>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                record.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : record.status === 'in-progress'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {record.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{record.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(record.scheduledDate).toLocaleDateString()} -{' '}
                            {record.technician}
                          </p>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>

              {/* Realtime OEE Dashboard */}
              {(() => {
                const currentOEE = getCurrentOEE(viewingDetail.id);
                return currentOEE ? (
                  <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-3xl border border-blue-200">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                          <Activity className="text-white" size={28} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            Real-time OEE Dashboard
                          </h3>
                          <p className="text-gray-600">
                            Overall Equipment Effectiveness • Live Data
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-xl">
                          <Zap size={16} />
                          <span className="text-sm font-medium">Live</span>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                          <RefreshCw size={16} />
                          <span className="text-sm">Refresh</span>
                        </button>
                      </div>
                    </div>

                    {/* Overall OEE Score */}
                    <div className="grid grid-cols-1 smallLaptop:grid-cols-4 gap-8 mb-8">
                      <div className="smallLaptop:col-span-1">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-white/50 text-center">
                          <div className="relative w-32 h-32 mx-auto mb-4">
                            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="#e5e7eb"
                                strokeWidth="8"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke={
                                  currentOEE.overall >= 85
                                    ? '#10b981'
                                    : currentOEE.overall >= 70
                                      ? '#f59e0b'
                                      : currentOEE.overall >= 60
                                        ? '#f97316'
                                        : '#ef4444'
                                }
                                strokeWidth="8"
                                strokeDasharray={`${currentOEE.overall * 2.51} ${251 - currentOEE.overall * 2.51}`}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <div
                                className={`text-3xl font-bold ${getOEEColor(currentOEE.overall)}`}
                              >
                                {currentOEE.overall.toFixed(1)}%
                              </div>
                              <div className="text-sm text-gray-500">Overall OEE</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            {currentOEE.trend >= 0 ? (
                              <TrendingUp className="text-green-600" size={16} />
                            ) : (
                              <TrendingDown className="text-red-600" size={16} />
                            )}
                            <span
                              className={`text-sm font-medium ${currentOEE.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}
                            >
                              {currentOEE.trend >= 0 ? '+' : ''}
                              {currentOEE.trend.toFixed(1)}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">vs last period</div>
                        </div>
                      </div>

                      {/* OEE Components */}
                      <div className="smallLaptop:col-span-3 grid grid-cols-1 smallLaptop:grid-cols-3 gap-6">
                        {/* Availability */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-100 rounded-xl">
                              <Clock className="text-green-600" size={20} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Availability</h4>
                              <p className="text-xs text-gray-500">Uptime Performance</p>
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-green-600 mb-2">
                            {currentOEE.availability.toFixed(1)}%
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${currentOEE.availability}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600">Planned vs Actual running time</p>
                        </div>

                        {/* Performance */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 rounded-xl">
                              <Gauge className="text-blue-600" size={20} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Performance</h4>
                              <p className="text-xs text-gray-500">Speed Efficiency</p>
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            {currentOEE.performance.toFixed(1)}%
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${currentOEE.performance}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600">Ideal vs Actual cycle time</p>
                        </div>

                        {/* Quality */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-100 rounded-xl">
                              <Target className="text-purple-600" size={20} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Quality</h4>
                              <p className="text-xs text-gray-500">First Pass Yield</p>
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-purple-600 mb-2">
                            {currentOEE.quality.toFixed(1)}%
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${currentOEE.quality}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600">Good parts vs Total parts</p>
                        </div>
                      </div>
                    </div>

                    {/* 7-Day Trend Chart */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
                      <h4 className="text-xl font-semibold text-gray-900 mb-6">7-Day OEE Trend</h4>
                      <div className="h-64 flex items-end justify-between gap-4">
                        {currentOEE.weeklyTrend.map((day, index) => {
                          const height = (day.value / 100) * 100;
                          const color =
                            day.value >= 85
                              ? 'bg-green-500'
                              : day.value >= 70
                                ? 'bg-yellow-500'
                                : day.value >= 60
                                  ? 'bg-orange-500'
                                  : 'bg-red-500';
                          return (
                            <div key={index} className="flex-1 flex flex-col items-center">
                              <div className="text-sm font-bold text-gray-900 mb-2">
                                {day.value.toFixed(1)}%
                              </div>
                              <div
                                className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${color} shadow-lg hover:shadow-xl transform hover:scale-105`}
                                style={{ height: `${height}%`, minHeight: '20px' }}
                              ></div>
                              <div className="text-xs text-gray-600 mt-2 font-medium">
                                {day.day}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* AI Insights */}
                    <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-8">
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-blue-100 rounded-xl">
                            <Brain className="text-blue-600" size={20} />
                          </div>
                          <h4 className="font-semibold text-gray-900">AI Performance Insights</h4>
                        </div>
                        <div className="space-y-3">
                          {currentOEE.insights.map((insight, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl"
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-blue-800">{insight}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-green-100 rounded-xl">
                            <Target className="text-green-600" size={20} />
                          </div>
                          <h4 className="font-semibold text-gray-900">
                            Improvement Recommendations
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {currentOEE.recommendations.map((rec, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 bg-green-50 rounded-xl"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-green-800">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Last Updated */}
                    <div className="text-center text-sm text-gray-500 mt-6">
                      Last updated: {new Date(currentOEE.lastUpdated).toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-2xl text-center">
                    <Activity className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No OEE Data Available
                    </h3>
                    <p className="text-gray-600">
                      OEE monitoring is not configured for this equipment.
                    </p>
                  </div>
                );
              })()}

              {/* Equipment Information */}
              <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Equipment Information
                  </h3>

                  <div className="grid grid-cols-2 gap-8">
                    {/* LEFT SIDE */}
                    <div className="space-y-4 pr-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Model
                        </label>
                        <p className="text-gray-900 font-semibold">{viewingDetail.model}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Category
                        </label>
                        <p className="text-gray-900">{viewingDetail.category}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Location
                        </label>
                        <p className="text-gray-900">{viewingDetail.location}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Install Date
                        </label>
                        <p className="text-gray-900">
                          {new Date(viewingDetail.installDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Status
                        </label>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                            viewingDetail.status
                          )}`}
                        >
                          {viewingDetail.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col justify-start space-y-4">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Serial Number
                        </label>
                        <p className="text-gray-900 font-mono">{viewingDetail.serialNumber}</p>
                      </div>

                      {/* QR Code Box */}
                      <div className="rounded-md w-40 h-40 flex bg-white">
                        <QrCode size={130} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maintenance Information */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Maintenance Schedule</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Last Maintenance
                      </label>
                      <p className="text-gray-900">
                        {viewingDetail.lastMaintenance
                          ? new Date(viewingDetail.lastMaintenance).toLocaleDateString()
                          : 'Never'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Next Maintenance
                      </label>
                      <p className="text-gray-900">
                        {viewingDetail.nextMaintenance
                          ? new Date(viewingDetail.nextMaintenance).toLocaleDateString()
                          : 'Not scheduled'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Maintenance Interval
                      </label>
                      <p className="text-gray-900">{viewingDetail.maintenanceInterval} days</p>
                    </div>
                    {viewingDetail.description && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Description
                        </label>
                        <p className="text-gray-900">{viewingDetail.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OEE Details Modal */}
      {viewingEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {viewingEquipment.name} - OEE Analysis
                </h2>
                <p className="text-sm text-gray-500">
                  {viewingEquipment.model} • {viewingEquipment.location}
                </p>
              </div>
              <button
                onClick={() => setViewingEquipment(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            {(() => {
              const oeeData = generateOEEData(viewingEquipment.id);
              return (
                <div className="p-6 space-y-8">
                  {/* Overall OEE Score */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border-8 border-blue-200 mb-4">
                      <div className="text-center">
                        <div
                          className={`text-4xl font-bold ${getOEEColor(oeeData.overall).split(' ')[0]}`}
                        >
                          {oeeData.overall}%
                        </div>
                        <div className="text-sm text-gray-600">OEE</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getOEEColor(oeeData.overall)}`}
                      >
                        {getOEEStatus(oeeData.overall)}
                      </span>
                      {oeeData.trend !== 0 && (
                        <div
                          className={`flex items-center gap-1 text-sm ${oeeData.trend > 0 ? 'text-green-600' : 'text-red-600'}`}
                        >
                          <TrendingUp size={14} className={oeeData.trend < 0 ? 'rotate-180' : ''} />
                          <span>{Math.abs(oeeData.trend)}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* OEE Components */}
                  <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <Clock className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-green-900">Availability</h3>
                          <p className="text-sm text-green-700">Uptime Performance</p>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {oeeData.availability}%
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${oeeData.availability}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-green-700 mt-2">
                        Planned Production Time vs Actual Running Time
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <Activity className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-900">Performance</h3>
                          <p className="text-sm text-blue-700">Speed Efficiency</p>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {oeeData.performance}%
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${oeeData.performance}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-blue-700 mt-2">
                        Ideal Cycle Time vs Actual Cycle Time
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <Gauge className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-purple-900">Quality</h3>
                          <p className="text-sm text-purple-700">First Pass Yield</p>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {oeeData.quality}%
                      </div>
                      <div className="w-full bg-purple-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${oeeData.quality}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-purple-700 mt-2">
                        Good Parts vs Total Parts Produced
                      </p>
                    </div>
                  </div>

                  {/* 7-Day OEE Trend */}
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="text-blue-600" size={20} />
                      7-Day OEE Trend
                    </h3>
                    <div className="h-48 flex items-end justify-between gap-2">
                      {oeeData.dailyData.map((day, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="text-sm font-bold text-gray-900 mb-2">{day.oee}%</div>
                          <div
                            className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${
                              day.oee >= 85
                                ? 'bg-gradient-to-t from-green-600 to-green-400'
                                : day.oee >= 70
                                  ? 'bg-gradient-to-t from-orange-600 to-orange-400'
                                  : 'bg-gradient-to-t from-red-600 to-red-400'
                            } shadow-lg hover:shadow-xl transform hover:scale-105`}
                            style={{ height: `${(day.oee / 100) * 100}%`, minHeight: '20px' }}
                          ></div>
                          <div className="text-xs text-gray-600 mt-2 font-medium">{day.day}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* OEE Insights */}
                  <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                      <h3 className="font-semibold text-blue-900 mb-3">Performance Insights</h3>
                      <div className="space-y-2 text-sm text-blue-800">
                        {oeeData.overall >= 85 && (
                          <>
                            <div>• Excellent OEE performance - World class standard</div>
                            <div>• Continue current maintenance practices</div>
                            <div>• Monitor for consistency</div>
                          </>
                        )}
                        {oeeData.overall >= 70 && oeeData.overall < 85 && (
                          <>
                            <div>• Good OEE performance with room for improvement</div>
                            <div>• Focus on reducing minor stoppages</div>
                            <div>• Optimize changeover times</div>
                          </>
                        )}
                        {oeeData.overall < 70 && (
                          <>
                            <div>• OEE below industry average</div>
                            <div>• Investigate major loss categories</div>
                            <div>• Implement improvement initiatives</div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                      <h3 className="font-semibold text-green-900 mb-3">
                        Improvement Opportunities
                      </h3>
                      <div className="space-y-2 text-sm text-green-800">
                        {oeeData.availability < 90 && <div>• Reduce unplanned downtime</div>}
                        {oeeData.performance < 90 && <div>• Optimize cycle times</div>}
                        {oeeData.quality < 95 && <div>• Improve first-pass quality</div>}
                        <div>• Implement predictive maintenance</div>
                        <div>• Operator training programs</div>
                        <div>• Real-time monitoring systems</div>
                      </div>
                    </div>
                  </div>
                  {/* Equipment Status Summary */}
                  <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                    <h3 className="font-semibold text-gray-900 mb-4">Equipment Status Summary</h3>
                    <div className="grid grid-cols-2 smallLaptop:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <p
                          className={`font-medium capitalize ${
                            viewingEquipment.status === 'operational'
                              ? 'text-green-600'
                              : viewingEquipment.status === 'maintenance'
                                ? 'text-orange-600'
                                : 'text-red-600'
                          }`}
                        >
                          {viewingEquipment.status}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Maintenance:</span>
                        <p className="font-medium text-gray-900">
                          {viewingEquipment.lastMaintenance
                            ? new Date(viewingEquipment.lastMaintenance).toLocaleDateString()
                            : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Next Maintenance:</span>
                        <p className="font-medium text-gray-900">
                          {viewingEquipment.nextMaintenance
                            ? new Date(viewingEquipment.nextMaintenance).toLocaleDateString()
                            : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">OEE Updated:</span>
                        <p className="font-medium text-gray-900">
                          {new Date(oeeData.lastUpdated).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

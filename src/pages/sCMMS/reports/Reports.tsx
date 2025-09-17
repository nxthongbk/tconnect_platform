import { useState, useMemo } from 'react';
import {
  Download,
  TrendingUp,
  Calendar,
  FileSpreadsheet,
  Filter,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  DollarSign,
  Wrench,
  Package,
  Bot,
  Zap,
  Brain,
  Settings,
  Eye,
  Target,
  Gauge,
  TrendingDown,
} from 'lucide-react';
import { mockEquipment, mockMaintenance, mockInventory } from '../data/mockData';
import * as XLSX from 'xlsx';
import { MaintenanceRecord } from '../types';

// Enhanced Chart Components
const DonutChart = ({ data, title, centerText = 'blue' }: any) => {
  const total = data.reduce((acc: number, item: any) => acc + item.value, 0);

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 min-h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{title}</h3>
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            {data.map((item: any, index: number) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage * 2.51} ${251 - percentage * 2.51}`;
              const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
              const color = colors[index % colors.length];
              const rotation = data
                .slice(0, index)
                .reduce((acc: number, prev: any) => acc + (prev.value / total) * 360, 0);

              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={color}
                  strokeWidth="12"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset="0"
                  style={{
                    transformOrigin: '50% 50%',
                    transform: `rotate(${rotation}deg)`,
                  }}
                  className="transition-all duration-1000 ease-out"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-gray-900">{centerText}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {data.map((item: any, index: number) => {
          const colors = [
            'bg-blue-500',
            'bg-green-500',
            'bg-yellow-500',
            'bg-red-500',
            'bg-purple-500',
            'bg-cyan-500',
          ];
          const bgColor = colors[index % colors.length];
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <div
              key={index}
              className="flex items-center justify-between p-1 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${bgColor}`}></div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-500">{percentage}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ColumnChart = ({ data, title, color = 'blue' }: any) => {
  const maxValue = Math.max(...data.map((d: any) => d.value));

  return (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <div className="h-64 flex items-end justify-between gap-4 mb-4">
        {data.map((item: any, index: number) => {
          // Height is proportional to value, max 240px
          const heightPx = Math.max(20, Math.min((item.value / maxValue) * 100, 200));
          const colors = {
            blue: 'bg-gradient-to-t from-blue-600 to-blue-400',
            green: 'bg-gradient-to-t from-green-600 to-green-400',
            orange: 'bg-gradient-to-t from-orange-600 to-orange-400',
            red: 'bg-gradient-to-t from-red-600 to-red-400',
            purple: 'bg-gradient-to-t from-purple-600 to-purple-400',
          };

          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center">
                <div className="text-sm font-bold text-gray-900 mb-2">{item.value}</div>
                <div
                  className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${colors[color as keyof typeof colors] || colors.blue} shadow-lg hover:shadow-xl transform hover:scale-105`}
                  style={{ height: `${heightPx}px` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-2 text-center font-medium">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AdvancedBarChart = ({ data, title, color = 'blue', showComparison = false }: any) => {
  const maxValue = Math.max(...data.map((d: any) => Math.max(d.value, d.comparison || 0)));

  return (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
      <div className="space-y-6">
        {data.map((item: any, index: number) => (
          <div key={index} className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">{item.label}</span>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-gray-900">{item.value}</span>
                {showComparison && item.comparison && (
                  <span className="text-sm text-gray-500">vs {item.comparison}</span>
                )}
                {item.trend && (
                  <div
                    className={`flex items-center gap-1 text-sm ${item.trend > 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {item.trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span>{Math.abs(item.trend)}%</span>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-4 rounded-full transition-all duration-1000 ease-out shadow-sm ${
                    color === 'blue'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                      : color === 'green'
                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                        : color === 'orange'
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                          : color === 'red'
                            ? 'bg-gradient-to-r from-red-500 to-red-600'
                            : color === 'purple'
                              ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                              : 'bg-gradient-to-r from-gray-500 to-gray-600'
                  }`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
              {showComparison && item.comparison && (
                <div className="absolute top-0 w-full h-4">
                  <div
                    className="h-1 bg-gray-400 rounded-full mt-6 opacity-60"
                    style={{ width: `${(item.comparison / maxValue) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LineChart = ({ data, title, color = 'blue', showArea = false }: any) => {
  const maxValue = Math.max(...data.map((d: any) => d.value));
  const minValue = Math.min(...data.map((d: any) => d.value));
  const range = maxValue - minValue || 1;

  return (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
      <div className="relative h-64 mb-4">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="0"
              y1={i * 40}
              x2="400"
              y2={i * 40}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}

          {/* Area fill */}
          {showArea && (
            <path
              fill={`url(#gradient-${color})`}
              fillOpacity="0.3"
              d={`M 0 200 ${data
                .map((d: any, i: number) => {
                  const x = (i / (data.length - 1)) * 400;
                  const y = 200 - ((d.value - minValue) / range) * 180;
                  return `L ${x} ${y}`;
                })
                .join(' ')} L 400 200 Z`}
            />
          )}

          {/* Data line */}
          <polyline
            fill="none"
            stroke={
              color === 'blue'
                ? '#3B82F6'
                : color === 'green'
                  ? '#10B981'
                  : color === 'orange'
                    ? '#F59E0B'
                    : '#EF4444'
            }
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={data
              .map((d: any, i: number) => {
                const x = (i / (data.length - 1)) * 400;
                const y = 200 - ((d.value - minValue) / range) * 180;
                return `${x},${y}`;
              })
              .join(' ')}
            className="drop-shadow-sm"
          />

          {/* Data points */}
          {data.map((d: any, i: number) => {
            const x = (i / (data.length - 1)) * 400;
            const y = 200 - ((d.value - minValue) / range) * 180;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="white"
                  stroke={
                    color === 'blue'
                      ? '#3B82F6'
                      : color === 'green'
                        ? '#10B981'
                        : color === 'orange'
                          ? '#F59E0B'
                          : '#EF4444'
                  }
                  strokeWidth="3"
                  className="drop-shadow-sm hover:r-8 transition-all duration-200"
                />
                <text
                  x={x}
                  y={y - 15}
                  textAnchor="middle"
                  className="text-xs font-semibold fill-gray-700"
                >
                  {d.value}
                </text>
              </g>
            );
          })}

          {/* Gradient definitions */}
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                stopColor={
                  color === 'blue'
                    ? '#3B82F6'
                    : color === 'green'
                      ? '#10B981'
                      : color === 'orange'
                        ? '#F59E0B'
                        : '#EF4444'
                }
              />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-4 text-xs text-gray-500 font-medium">
          {data.map((d: any, i: number) => (
            <span key={i} className="text-center">
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change, icon: Icon, color, trend }: any) => (
  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</p>
        <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        {change && (
          <div
            className={`flex items-center gap-1 mt-2 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}
          >
            {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div
        className={`p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 ${
          color === 'text-blue-600'
            ? 'bg-gradient-to-br from-blue-50 to-blue-100'
            : color === 'text-green-600'
              ? 'bg-gradient-to-br from-green-50 to-green-100'
              : color === 'text-orange-600'
                ? 'bg-gradient-to-br from-orange-50 to-orange-100'
                : color === 'text-red-600'
                  ? 'bg-gradient-to-br from-red-50 to-red-100'
                  : color === 'text-purple-600'
                    ? 'bg-gradient-to-br from-purple-50 to-purple-100'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100'
        }`}
      >
        <Icon size={24} className={color} />
      </div>
    </div>
  </div>
);

export default function Reports() {
  const [timeFilter, setTimeFilter] = useState('30days');
  const [reportType, setReportType] = useState('all');
  const [dataType, setDataType] = useState('all');
  const [chartType, setChartType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([
    'equipment',
    'maintenance',
    'inventory',
    'costs',
    'performance',
  ]);

  const [maintenance] = useState<MaintenanceRecord[]>(mockMaintenance);

  // Generate time-filtered data based on selected period
  const getFilteredData = useMemo(() => {
    const now = new Date();
    let startDate = new Date();

    switch (timeFilter) {
      case '7days':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90days':
        startDate.setDate(now.getDate() - 90);
        break;
      case '6months':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Filter maintenance data by time period
    const filteredMaintenance = mockMaintenance.filter(m => new Date(m.scheduledDate) >= startDate);

    return {
      equipment: mockEquipment,
      maintenance: filteredMaintenance,
      inventory: mockInventory,
      startDate,
      endDate: now,
    };
  }, [timeFilter]);

  const generateEquipmentReport = () => {
    const { equipment } = getFilteredData;
    return {
      totalEquipment: equipment.length,
      operationalRate: (
        (equipment.filter(e => e.status === 'operational').length / equipment.length) *
        100
      ).toFixed(1),
      equipmentByCategory: equipment.reduce(
        (acc, equipment) => {
          acc[equipment.category] = (acc[equipment.category] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      equipmentByStatus: {
        operational: equipment.filter(e => e.status === 'operational').length,
        maintenance: equipment.filter(e => e.status === 'maintenance').length,
        broken: equipment.filter(e => e.status === 'broken').length,
        offline: equipment.filter(e => e.status === 'offline').length,
      },
    };
  };

  const generateMaintenanceReport = () => {
    return {
      totalMaintenance: maintenance.length,
      completedMaintenance: maintenance.filter(m => m.status === 'completed').length,
      totalCost: maintenance.reduce((acc, m) => acc + m.cost, 0),
      avgDuration:
        maintenance.length > 0
          ? maintenance.reduce((acc, m) => acc + m.duration, 0) / maintenance.length
          : 0,
      maintenanceByType: {
        preventive: maintenance.filter(m => m.type === 'preventive').length,
        corrective: maintenance.filter(m => m.type === 'corrective').length,
        emergency: maintenance.filter(m => m.type === 'emergency').length,
      },
      maintenanceByStatus: {
        scheduled: maintenance.filter(m => m.status === 'scheduled').length,
        inProgress: maintenance.filter(m => m.status === 'in-progress').length,
        completed: maintenance.filter(m => m.status === 'completed').length,
        cancelled: maintenance.filter(m => m.status === 'cancelled').length,
      },
    };
  };

  const generateInventoryReport = () => {
    const { inventory } = getFilteredData;
    return {
      totalItems: inventory.length,
      lowStockItems: inventory.filter(i => i.currentStock <= i.minStock),
      totalValue: inventory.reduce((acc, item) => acc + item.currentStock * item.unitPrice, 0),
      categoryDistribution: inventory.reduce(
        (acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      stockStatus: {
        inStock: inventory.filter(i => i.currentStock > i.minStock * 1.2).length,
        warning: inventory.filter(
          i => i.currentStock > i.minStock && i.currentStock <= i.minStock * 1.2
        ).length,
        lowStock: inventory.filter(i => i.currentStock <= i.minStock).length,
      },
    };
  };

  // Generate enhanced trend data for charts
  const generateTrendData = () => {
    const days =
      timeFilter === '7days'
        ? 7
        : timeFilter === '30days'
          ? 30
          : timeFilter === '90days'
            ? 90
            : timeFilter === '6months'
              ? 180
              : 365;
    const interval = days <= 7 ? 1 : days <= 30 ? 5 : days <= 90 ? 15 : days <= 180 ? 30 : 60;

    const trendData = [];
    for (let i = 0; i < days; i += interval) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));

      trendData.push({
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        maintenanceCost: Math.floor(Math.random() * 1000) + 500,
        equipmentUptime: Math.floor(Math.random() * 20) + 80,
        inventoryValue: Math.floor(Math.random() * 5000) + 15000,
        completedTasks: Math.floor(Math.random() * 10) + 5,
        efficiency: Math.floor(Math.random() * 15) + 85,
        downtime: Math.floor(Math.random() * 5) + 1,
      });
    }

    return trendData;
  };

  const generatePerformanceData = () => {
    return [
      { label: 'Equipment Efficiency', value: 92, comparison: 88, trend: 4.5 },
      { label: 'Maintenance Completion', value: 87, comparison: 82, trend: 6.1 },
      { label: 'Inventory Turnover', value: 78, comparison: 75, trend: 4.0 },
      { label: 'Cost Optimization', value: 85, comparison: 79, trend: 7.6 },
      { label: 'Safety Compliance', value: 96, comparison: 94, trend: 2.1 },
    ];
  };

  const equipmentReport = generateEquipmentReport();
  const maintenanceReport = generateMaintenanceReport();
  const inventoryReport = generateInventoryReport();
  const trendData = generateTrendData();
  const performanceData = generatePerformanceData();

  const exportToExcel = (reportType: string) => {
    const workbook = XLSX.utils.book_new();
    const timestamp = new Date().toISOString().split('T')[0];

    // Add time filter info to all reports
    const filterInfo = [
      [
        'Report Period:',
        timeFilter === '7days'
          ? 'Last 7 Days'
          : timeFilter === '30days'
            ? 'Last 30 Days'
            : timeFilter === '90days'
              ? 'Last 90 Days'
              : timeFilter === '6months'
                ? 'Last 6 Months'
                : 'Last Year',
      ],
      ['Generated Date:', new Date().toLocaleDateString()],
      ['Start Date:', getFilteredData.startDate.toLocaleDateString()],
      ['End Date:', getFilteredData.endDate.toLocaleDateString()],
      ['Data Type:', dataType === 'all' ? 'All Data Types' : dataType],
      ['Chart Type:', chartType === 'all' ? 'All Chart Types' : chartType],
      ['', ''],
    ];

    if (reportType === 'equipment' || reportType === 'all') {
      const equipmentSummary = [
        ['Equipment Report Summary', '', '', ''],
        ...filterInfo,
        ['Total Equipment:', equipmentReport.totalEquipment, '', ''],
        ['Operational Rate:', `${equipmentReport.operationalRate}%`, '', ''],
        ['', '', '', ''],
        ['Equipment by Status:', '', '', ''],
        ['Operational:', equipmentReport.equipmentByStatus.operational, '', ''],
        ['Under Maintenance:', equipmentReport.equipmentByStatus.maintenance, '', ''],
        ['Broken:', equipmentReport.equipmentByStatus.broken, '', ''],
        ['Offline:', equipmentReport.equipmentByStatus.offline, '', ''],
        ['', '', '', ''],
        ['Equipment by Category:', '', '', ''],
        ...Object.entries(equipmentReport.equipmentByCategory).map(([category, count]) => [
          category,
          count,
          '',
          '',
        ]),
      ];

      const equipmentSummaryWS = XLSX.utils.aoa_to_sheet(equipmentSummary);
      XLSX.utils.book_append_sheet(workbook, equipmentSummaryWS, 'Equipment Summary');
    }

    if (reportType === 'maintenance' || reportType === 'all') {
      const maintenanceSummary = [
        ['Maintenance Report Summary', '', '', ''],
        ...filterInfo,
        ['Total Maintenance:', maintenanceReport.totalMaintenance, '', ''],
        ['Completed Maintenance:', maintenanceReport.completedMaintenance, '', ''],
        ['Total Cost:', `$${maintenanceReport.totalCost.toLocaleString()}`, '', ''],
        ['Average Duration:', `${maintenanceReport.avgDuration.toFixed(0)} minutes`, '', ''],
        ['', '', '', ''],
        ['Maintenance by Type:', '', '', ''],
        ['Preventive:', maintenanceReport.maintenanceByType.preventive, '', ''],
        ['Corrective:', maintenanceReport.maintenanceByType.corrective, '', ''],
        ['Emergency:', maintenanceReport.maintenanceByType.emergency, '', ''],
      ];

      const maintenanceSummaryWS = XLSX.utils.aoa_to_sheet(maintenanceSummary);
      XLSX.utils.book_append_sheet(workbook, maintenanceSummaryWS, 'Maintenance Summary');
    }

    if (reportType === 'inventory' || reportType === 'all') {
      const inventorySummary = [
        ['Inventory Report Summary', '', '', ''],
        ...filterInfo,
        ['Total Items:', inventoryReport.totalItems, '', ''],
        ['Low Stock Items:', inventoryReport.lowStockItems.length, '', ''],
        ['Total Inventory Value:', `$${(inventoryReport.totalValue / 1000).toFixed(1)}K`, '', ''],
        ['', '', '', ''],
        ['Stock Status:', '', '', ''],
        ['In Stock:', inventoryReport.stockStatus.inStock, '', ''],
        ['Warning Level:', inventoryReport.stockStatus.warning, '', ''],
        ['Low Stock:', inventoryReport.stockStatus.lowStock, '', ''],
      ];

      const inventorySummaryWS = XLSX.utils.aoa_to_sheet(inventorySummary);
      XLSX.utils.book_append_sheet(workbook, inventorySummaryWS, 'Inventory Summary');
    }

    // Add trend data
    if (reportType === 'trends' || reportType === 'all') {
      const trendSummary = [
        ['Trend Analysis', '', '', ''],
        ...filterInfo,
        ['Period Analysis:', '', '', ''],
        ['Data Points:', trendData.length, '', ''],
        ['', '', '', ''],
        ['Trend Data:', '', '', ''],
        [
          'Date',
          'Maintenance Cost',
          'Equipment Uptime %',
          'Inventory Value',
          'Completed Tasks',
          'Efficiency %',
        ],
        ...trendData.map(d => [
          d.label,
          d.maintenanceCost,
          d.equipmentUptime,
          d.inventoryValue,
          d.completedTasks,
          d.efficiency,
        ]),
      ];

      const trendSummaryWS = XLSX.utils.aoa_to_sheet(trendSummary);
      XLSX.utils.book_append_sheet(workbook, trendSummaryWS, 'Trend Analysis');
    }

    const fileName = `Factory_Report_${timeFilter}_${dataType}_${timestamp}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight"
            style={{ marginBottom: 0, paddingBottom: 2 }}
          >
            Advanced Reports & Analytics
          </h1>
          <p className="text-slate-600 mt-2 text-xl font-medium">
            Comprehensive performance analysis with interactive charts and advanced filtering
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-colors ${
              showFilters
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter size={16} />
            Advanced Filters
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <button
            onClick={() => exportToExcel('all')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <FileSpreadsheet size={20} />
            Export All Reports
          </button>
        </div>
      </div>

      {/* Enhanced Filters Panel */}
      {showFilters && (
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 mb-8">
          <div className="grid grid-cols-1 smallLaptop:grid-cols-5 gap-6">
            {/* Time Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select
                value={timeFilter}
                onChange={e => setTimeFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>

            {/* Report Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={e => setReportType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              >
                <option value="all">All Reports</option>
                <option value="equipment">Equipment Only</option>
                <option value="maintenance">Maintenance Only</option>
                <option value="inventory">Inventory Only</option>
                <option value="performance">Performance Only</option>
                <option value="trends">Trends Only</option>
              </select>
            </div>

            {/* Data Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
              <select
                value={dataType}
                onChange={e => setDataType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              >
                <option value="all">All Data</option>
                <option value="operational">Operational Data</option>
                <option value="financial">Financial Data</option>
                <option value="performance">Performance Data</option>
                <option value="predictive">Predictive Data</option>
              </select>
            </div>

            {/* Chart Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
              <select
                value={chartType}
                onChange={e => setChartType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              >
                <option value="all">All Charts</option>
                <option value="donut">Donut Charts</option>
                <option value="bar">Bar Charts</option>
                <option value="column">Column Charts</option>
                <option value="line">Line Charts</option>
              </select>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick Actions</label>
              <button
                onClick={() => {
                  setTimeFilter('30days');
                  setReportType('all');
                  setDataType('all');
                  setChartType('all');
                  setSelectedMetrics([
                    'equipment',
                    'maintenance',
                    'inventory',
                    'costs',
                    'performance',
                  ]);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RefreshCw size={14} />
                Reset All
              </button>
            </div>
          </div>

          {/* Metrics Selection */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Display Metrics</label>
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'equipment', label: 'Equipment', icon: Wrench, color: 'blue' },
                { id: 'maintenance', label: 'Maintenance', icon: Calendar, color: 'green' },
                { id: 'inventory', label: 'Inventory', icon: Package, color: 'purple' },
                { id: 'costs', label: 'Costs', icon: DollarSign, color: 'orange' },
                { id: 'performance', label: 'Performance', icon: Target, color: 'red' },
                { id: 'efficiency', label: 'Efficiency', icon: Gauge, color: 'cyan' },
              ].map(metric => {
                const Icon = metric.icon;
                return (
                  <button
                    key={metric.id}
                    onClick={() => {
                      if (selectedMetrics.includes(metric.id)) {
                        setSelectedMetrics(selectedMetrics.filter(m => m !== metric.id));
                      } else {
                        setSelectedMetrics([...selectedMetrics, metric.id]);
                      }
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedMetrics.includes(metric.id)
                        ? `bg-${metric.color}-100 text-${metric.color}-800 border border-${metric.color}-300 shadow-md`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                    }`}
                  >
                    <Icon size={16} />
                    {metric.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing data from {getFilteredData.startDate.toLocaleDateString()} to{' '}
              {getFilteredData.endDate.toLocaleDateString()}
              <span className="ml-4 text-blue-600">
                • {selectedMetrics.length} metrics selected
              </span>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <Eye size={14} />
                Preview
              </button>
              <button className="flex items-center gap-2 px-3 py-1 text-sm text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <Settings size={14} />
                Save View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Key Metrics Cards */}
      {(reportType === 'all' || reportType === 'equipment' || reportType === 'performance') &&
        selectedMetrics.includes('equipment') && (
          <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-5 gap-6">
            <MetricCard
              title="Total Equipment"
              value={equipmentReport.totalEquipment}
              change="+5.2% vs last period"
              icon={Wrench}
              color="text-blue-600"
              trend={5.2}
            />
            <MetricCard
              title="Operational Rate"
              value={`${equipmentReport.operationalRate}%`}
              change="+2.1% vs last period"
              icon={CheckCircle}
              color="text-green-600"
              trend={2.1}
            />
            <MetricCard
              title="Efficiency Score"
              value="92%"
              change="+4.5% vs last period"
              icon={Target}
              color="text-purple-600"
              trend={4.5}
            />
            <MetricCard
              title="Downtime Hours"
              value="12.5"
              change="-15.3% vs last period"
              icon={Clock}
              color="text-orange-600"
              trend={-15.3}
            />
            <MetricCard
              title="Cost Savings"
              value="$24.8K"
              change="+18.7% vs last period"
              icon={DollarSign}
              color="text-red-600"
              trend={18.7}
            />
          </div>
        )}

      {/* Donut Charts Section */}
      {(chartType === 'all' || chartType === 'donut') && (
        <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-4 items-stretch">
          {/* Equipment Status Donut */}
          {(reportType === 'all' || reportType === 'equipment') &&
            selectedMetrics.includes('equipment') && (
              <DonutChart
                title="Equipment Status Distribution"
                centerText={equipmentReport.totalEquipment}
                data={[
                  { label: 'Operational', value: equipmentReport.equipmentByStatus.operational },
                  { label: 'Maintenance', value: equipmentReport.equipmentByStatus.maintenance },
                  { label: 'Broken', value: equipmentReport.equipmentByStatus.broken },
                  { label: 'Offline', value: equipmentReport.equipmentByStatus.offline },
                ]}
              />
            )}

          {/* Maintenance Type Donut */}
          {(reportType === 'all' || reportType === 'maintenance') &&
            selectedMetrics.includes('maintenance') && (
              <DonutChart
                title="Maintenance Type Distribution"
                centerText={maintenanceReport.totalMaintenance}
                data={[
                  { label: 'Preventive', value: maintenanceReport.maintenanceByType.preventive },
                  { label: 'Corrective', value: maintenanceReport.maintenanceByType.corrective },
                  { label: 'Emergency', value: maintenanceReport.maintenanceByType.emergency },
                ]}
              />
            )}

          {/* Inventory Status Donut */}
          {(reportType === 'all' || reportType === 'inventory') &&
            selectedMetrics.includes('inventory') && (
              <DonutChart
                title="Inventory Stock Status"
                centerText={inventoryReport.totalItems}
                data={[
                  { label: 'In Stock', value: inventoryReport.stockStatus.inStock },
                  { label: 'Warning', value: inventoryReport.stockStatus.warning },
                  { label: 'Low Stock', value: inventoryReport.stockStatus.lowStock },
                ]}
              />
            )}
        </div>
      )}

      {/* Column Charts Section */}
      {(chartType === 'all' || chartType === 'column') && (
        <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-8">
          {/* Equipment by Category Column Chart */}
          {(reportType === 'all' || reportType === 'equipment') &&
            selectedMetrics.includes('equipment') && (
              <ColumnChart
                title="Equipment by Category"
                color="blue"
                data={Object.entries(equipmentReport.equipmentByCategory).map(
                  ([category, count]) => ({
                    label: category.split(' ')[0],
                    value: count,
                  })
                )}
              />
            )}

          {/* Monthly Performance Column Chart */}
          {(reportType === 'all' || reportType === 'performance') &&
            selectedMetrics.includes('performance') && (
              <ColumnChart
                title="Monthly Performance Metrics"
                color="green"
                data={[
                  { label: 'Jan', value: 85 },
                  { label: 'Feb', value: 88 },
                  { label: 'Mar', value: 92 },
                  { label: 'Apr', value: 87 },
                  { label: 'May', value: 94 },
                  { label: 'Jun', value: 91 },
                ]}
              />
            )}
        </div>
      )}

      {/* Advanced Bar Charts Section */}
      {(chartType === 'all' || chartType === 'bar') && (
        <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-8">
          {/* Performance Metrics Bar Chart */}
          {(reportType === 'all' || reportType === 'performance') &&
            selectedMetrics.includes('performance') && (
              <AdvancedBarChart
                title="Performance Metrics Comparison"
                color="purple"
                showComparison={true}
                data={performanceData}
              />
            )}

          {/* Cost Analysis Bar Chart */}
          {(reportType === 'all' || reportType === 'maintenance') &&
            selectedMetrics.includes('costs') && (
              <AdvancedBarChart
                title="Cost Analysis by Department"
                color="orange"
                showComparison={false}
                data={[
                  { label: 'Maintenance', value: 45000, trend: 5.2 },
                  { label: 'Operations', value: 38000, trend: -2.1 },
                  { label: 'Inventory', value: 28000, trend: 8.7 },
                  { label: 'Energy', value: 22000, trend: -4.3 },
                  { label: 'Labor', value: 35000, trend: 3.1 },
                ]}
              />
            )}
        </div>
      )}

      {/* Line Charts Section */}
      {(chartType === 'all' || chartType === 'line') && (
        <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-8">
          {/* Equipment Uptime Trend */}
          {(reportType === 'all' || reportType === 'trends') &&
            selectedMetrics.includes('equipment') && (
              <LineChart
                title="Equipment Uptime Trend"
                color="blue"
                showArea={true}
                data={trendData.map(d => ({ label: d.label, value: d.equipmentUptime }))}
              />
            )}

          {/* Maintenance Cost Trend */}
          {(reportType === 'all' || reportType === 'trends') &&
            selectedMetrics.includes('costs') && (
              <LineChart
                title="Maintenance Cost Trend"
                color="green"
                showArea={false}
                data={trendData.map(d => ({ label: d.label, value: d.maintenanceCost }))}
              />
            )}

          {/* Efficiency Trend */}
          {(reportType === 'all' || reportType === 'trends') &&
            selectedMetrics.includes('performance') && (
              <LineChart
                title="Overall Efficiency Trend"
                color="orange"
                showArea={true}
                data={trendData.map(d => ({ label: d.label, value: d.efficiency }))}
              />
            )}

          {/* Inventory Value Trend */}
          {(reportType === 'all' || reportType === 'trends') &&
            selectedMetrics.includes('inventory') && (
              <LineChart
                title="Inventory Value Trend"
                color="red"
                showArea={false}
                data={trendData.map(d => ({ label: d.label, value: d.inventoryValue / 1000 }))}
              />
            )}
        </div>
      )}

      {/* Summary Reports */}
      {(reportType === 'all' || reportType === 'maintenance') &&
        selectedMetrics.includes('maintenance') && (
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <Calendar className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                Maintenance Summary ({timeFilter})
              </h3>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {maintenanceReport.totalMaintenance}
                </div>
                <div className="text-sm text-blue-700 font-medium">Total Tasks</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {maintenanceReport.completedMaintenance}
                </div>
                <div className="text-sm text-green-700 font-medium">Completed</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  ${(maintenanceReport.totalCost / 1000).toFixed(1)}K
                </div>
                <div className="text-sm text-purple-700 font-medium">Total Cost</div>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {maintenanceReport.avgDuration.toFixed(0)} min
                </div>
                <div className="text-sm text-orange-700 font-medium">Avg Duration</div>
              </div>
            </div>
          </div>
        )}

      {/* AI-Powered Export Assistant */}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">AI-Powered Export Assistant</h3>
            <p className="text-slate-600 text-sm">
              Intelligent report generation and analysis with advanced filtering
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-4 gap-4">
          <button
            onClick={() => exportToExcel('equipment')}
            className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 border border-blue-200 hover:shadow-xl transform hover:scale-105 text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wrench className="text-blue-600" size={20} />
                <Brain
                  className="text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity"
                  size={14}
                />
              </div>
              <div className="flex items-center gap-1">
                <Zap
                  className="text-blue-600 opacity-60 group-hover:opacity-100 transition-opacity"
                  size={12}
                />
                <Download className="text-blue-600" size={16} />
              </div>
            </div>
            <div className="font-semibold text-gray-900">AI Equipment Analysis</div>
            <div className="text-sm text-gray-600">Smart status & performance insights</div>
          </button>

          <button
            onClick={() => exportToExcel('maintenance')}
            className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-300 border border-green-200 hover:shadow-xl transform hover:scale-105 text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="text-green-600" size={20} />
                <Brain
                  className="text-green-500 opacity-60 group-hover:opacity-100 transition-opacity"
                  size={14}
                />
              </div>
              <div className="flex items-center gap-1">
                <Zap
                  className="text-green-600 opacity-60 group-hover:opacity-100 transition-opacity"
                  size={12}
                />
                <Download className="text-green-600" size={16} />
              </div>
            </div>
            <div className="font-semibold text-gray-900">AI Maintenance Insights</div>
            <div className="text-sm text-gray-600">Predictive tasks & cost optimization</div>
          </button>

          <button
            onClick={() => exportToExcel('inventory')}
            className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 border border-purple-200 hover:shadow-xl transform hover:scale-105 text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package className="text-purple-600" size={20} />
                <Brain
                  className="text-purple-500 opacity-60 group-hover:opacity-100 transition-opacity"
                  size={14}
                />
              </div>
              <div className="flex items-center gap-1">
                <Zap
                  className="text-purple-600 opacity-60 group-hover:opacity-100 transition-opacity"
                  size={12}
                />
                <Download className="text-purple-600" size={16} />
              </div>
            </div>
            <div className="font-semibold text-gray-900">AI Inventory Intelligence</div>
            <div className="text-sm text-gray-600">Smart stock optimization & forecasting</div>
          </button>

          <button
            onClick={() => exportToExcel('trends')}
            className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all duration-300 border border-orange-200 hover:shadow-xl transform hover:scale-105 text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-orange-600" size={20} />
                <Brain
                  className="text-orange-500 opacity-60 group-hover:opacity-100 transition-opacity"
                  size={14}
                />
              </div>
              <div className="flex items-center gap-1">
                <Zap
                  className="text-orange-600 opacity-60 group-hover:opacity-100 transition-opacity"
                  size={12}
                />
                <Download className="text-orange-600" size={16} />
              </div>
            </div>
            <div className="font-semibold text-gray-900">AI Trend Prediction</div>
            <div className="text-sm text-gray-600">Machine learning insights & forecasts</div>
          </button>
        </div>
      </div>
    </div>
  );
}

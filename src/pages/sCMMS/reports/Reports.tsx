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
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Wrench,
  Package,
  Bot,
  Zap,
  Brain,
} from 'lucide-react';
import { mockEquipment, mockMaintenance, mockInventory } from '../data/mockData';
import * as XLSX from 'xlsx';

const BarChart = ({ data, title, color = 'blue' }: any) => {
  const maxValue = Math.max(...data.map((d: any) => d.value));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item: any, index: number) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-sm font-bold text-gray-900">{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                  color === 'blue'
                    ? 'bg-blue-500'
                    : color === 'green'
                      ? 'bg-green-500'
                      : color === 'orange'
                        ? 'bg-orange-500'
                        : color === 'red'
                          ? 'bg-red-500'
                          : color === 'purple'
                            ? 'bg-purple-500'
                            : 'bg-gray-500'
                }`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PieChartComponent = ({ data, title }: any) => {
  const total = data.reduce((acc: number, item: any) => acc + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {data.map((item: any, index: number) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
              const color = colors[index % colors.length];

              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="15.915"
                  fill="transparent"
                  stroke={color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                />
              );
            })}
          </svg>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((item: any, index: number) => {
          const colors = [
            'bg-blue-500',
            'bg-green-500',
            'bg-yellow-500',
            'bg-red-500',
            'bg-purple-500',
          ];
          const bgColor = colors[index % colors.length];
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${bgColor}`}></div>
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LineChart = ({ data, title, color = 'blue' }: any) => {
  const maxValue = Math.max(...data.map((d: any) => d.value));
  const minValue = Math.min(...data.map((d: any) => d.value));
  const range = maxValue - minValue || 1;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative h-48">
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

          {/* Data line */}
          <polyline
            fill="none"
            stroke={color === 'blue' ? '#3B82F6' : color === 'green' ? '#10B981' : '#F59E0B'}
            strokeWidth="3"
            points={data
              .map((d: any, i: number) => {
                const x = (i / (data.length - 1)) * 400;
                const y = 200 - ((d.value - minValue) / range) * 180;
                return `${x},${y}`;
              })
              .join(' ')}
          />

          {/* Data points */}
          {data.map((d: any, i: number) => {
            const x = (i / (data.length - 1)) * 400;
            const y = 200 - ((d.value - minValue) / range) * 180;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill={color === 'blue' ? '#3B82F6' : color === 'green' ? '#10B981' : '#F59E0B'}
              />
            );
          })}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {data.map((d: any, i: number) => (
            <span key={i}>{d.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Reports() {
  const [timeFilter, setTimeFilter] = useState('30days');
  const [reportType, setReportType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([
    'equipment',
    'maintenance',
    'inventory',
    'costs',
  ]);

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
    const { maintenance } = getFilteredData;

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

  // Generate trend data for charts
  const generateTrendData = () => {
    const days =
      timeFilter === '7days'
        ? 7
        : timeFilter === '30days'
          ? 30
          : timeFilter === '90days'
            ? 90
            : 365;
    const interval = days <= 7 ? 1 : days <= 30 ? 5 : days <= 90 ? 15 : 30;

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
      });
    }

    return trendData;
  };

  const equipmentReport = generateEquipmentReport();
  const maintenanceReport = generateMaintenanceReport();
  const inventoryReport = generateInventoryReport();
  const trendData = generateTrendData();

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
              : 'Last Year',
      ],
      ['Generated Date:', new Date().toLocaleDateString()],
      ['Start Date:', getFilteredData.startDate.toLocaleDateString()],
      ['End Date:', getFilteredData.endDate.toLocaleDateString()],
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
        ['Date', 'Maintenance Cost', 'Equipment Uptime %', 'Inventory Value'],
        ...trendData.map(d => [d.label, d.maintenanceCost, d.equipmentUptime, d.inventoryValue]),
      ];

      const trendSummaryWS = XLSX.utils.aoa_to_sheet(trendSummary);
      XLSX.utils.book_append_sheet(workbook, trendSummaryWS, 'Trend Analysis');
    }

    const fileName = `Factory_Report_${timeFilter}_${timestamp}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const StatCard = ({ title, value, subtext, icon: Icon, color, trend }: any) => (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-current to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
            {title}
          </p>
          <p className={`text-4xl font-bold ${color} mb-1`}>{value}</p>
          {subtext && <p className="text-gray-500 text-sm font-medium">{subtext}</p>}
          {trend && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              <TrendingUp size={14} className={trend > 0 ? '' : 'rotate-180'} />
              <span>{Math.abs(trend)}% vs last period</span>
            </div>
          )}
        </div>
        <div
          className={`p-5 rounded-3xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${
            color === 'text-blue-600'
              ? 'bg-gradient-to-br from-blue-50 to-blue-100'
              : color === 'text-green-600'
                ? 'bg-gradient-to-br from-green-50 to-green-100'
                : color === 'text-orange-600'
                  ? 'bg-gradient-to-br from-orange-50 to-orange-100'
                  : color === 'text-red-600'
                    ? 'bg-gradient-to-br from-red-50 to-red-100'
                    : 'bg-gradient-to-br from-purple-50 to-purple-100'
          }`}
        >
          <Icon size={28} className={color} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1      className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight"
            style={{ marginBottom: 0, paddingBottom: 2 }}>
            Reports & Analytics
          </h1>
          <p className="text-slate-600 mt-2 text-xl font-medium">
            Performance analysis and operational insights with time-based filtering
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
            Filters
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

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 mb-8">
          <div className="grid grid-cols-1 smallLaptop:grid-cols-4 gap-6">
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
                <option value="trends">Trends Only</option>
              </select>
            </div>

            {/* Metrics Selection */}
            <div className="smallLaptop:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Metrics
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'equipment', label: 'Equipment', icon: Wrench },
                  { id: 'maintenance', label: 'Maintenance', icon: Calendar },
                  { id: 'inventory', label: 'Inventory', icon: Package },
                  { id: 'costs', label: 'Costs', icon: DollarSign },
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
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedMetrics.includes(metric.id)
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon size={14} />
                      {metric.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing data from {getFilteredData.startDate.toLocaleDateString()} to{' '}
              {getFilteredData.endDate.toLocaleDateString()}
            </div>
            <button
              onClick={() => {
                setTimeFilter('30days');
                setReportType('all');
                setSelectedMetrics(['equipment', 'maintenance', 'inventory', 'costs']);
              }}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RefreshCw size={14} />
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Key Metrics Cards */}
      {(reportType === 'all' || reportType === 'equipment') &&
        selectedMetrics.includes('equipment') && (
          <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-4 gap-8">
            <StatCard
              title="Total Equipment"
              value={equipmentReport.totalEquipment}
              subtext="Active units"
              icon={Wrench}
              color="text-blue-600"
              trend={5.2}
            />
            <StatCard
              title="Operational Rate"
              value={`${equipmentReport.operationalRate}%`}
              subtext="Equipment uptime"
              icon={CheckCircle}
              color="text-green-600"
              trend={2.1}
            />
            <StatCard
              title="Under Maintenance"
              value={equipmentReport.equipmentByStatus.maintenance}
              subtext="Scheduled work"
              icon={Clock}
              color="text-orange-600"
              trend={-1.5}
            />
            <StatCard
              title="Out of Order"
              value={equipmentReport.equipmentByStatus.broken}
              subtext="Needs attention"
              icon={AlertTriangle}
              color="text-red-600"
              trend={-3.2}
            />
          </div>
        )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-8">
        {/* Equipment Status Chart */}
        {(reportType === 'all' || reportType === 'equipment') &&
          selectedMetrics.includes('equipment') && (
            <PieChartComponent
              title="Equipment Status Distribution"
              data={[
                { label: 'Operational', value: equipmentReport.equipmentByStatus.operational },
                { label: 'Maintenance', value: equipmentReport.equipmentByStatus.maintenance },
                { label: 'Broken', value: equipmentReport.equipmentByStatus.broken },
                { label: 'Offline', value: equipmentReport.equipmentByStatus.offline },
              ]}
            />
          )}

        {/* Maintenance Type Chart */}
        {(reportType === 'all' || reportType === 'maintenance') &&
          selectedMetrics.includes('maintenance') && (
            <BarChart
              title="Maintenance by Type"
              color="orange"
              data={[
                { label: 'Preventive', value: maintenanceReport.maintenanceByType.preventive },
                { label: 'Corrective', value: maintenanceReport.maintenanceByType.corrective },
                { label: 'Emergency', value: maintenanceReport.maintenanceByType.emergency },
              ]}
            />
          )}

        {/* Inventory Status Chart */}
        {(reportType === 'all' || reportType === 'inventory') &&
          selectedMetrics.includes('inventory') && (
            <PieChartComponent
              title="Inventory Stock Status"
              data={[
                { label: 'In Stock', value: inventoryReport.stockStatus.inStock },
                { label: 'Warning', value: inventoryReport.stockStatus.warning },
                { label: 'Low Stock', value: inventoryReport.stockStatus.lowStock },
              ]}
            />
          )}

        {/* Cost Trend Chart */}
        {(reportType === 'all' || reportType === 'trends') && selectedMetrics.includes('costs') && (
          <LineChart
            title="Maintenance Cost Trend"
            color="green"
            data={trendData.map(d => ({ label: d.label, value: d.maintenanceCost }))}
          />
        )}
      </div>

      {/* Trend Analysis */}
      {(reportType === 'all' || reportType === 'trends') && (
        <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-8">
          <LineChart
            title="Equipment Uptime Trend"
            color="blue"
            data={trendData.map(d => ({ label: d.label, value: d.equipmentUptime }))}
          />

          <LineChart
            title="Completed Tasks Trend"
            color="green"
            data={trendData.map(d => ({ label: d.label, value: d.completedTasks }))}
          />
        </div>
      )}

      {/* Summary Reports */}
      {(reportType === 'all' || reportType === 'maintenance') &&
        selectedMetrics.includes('maintenance') && (
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
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

      {/* Quick Export Actions */}
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">AI-Powered Export Assistant</h3>
            <p className="text-slate-600 text-sm">Intelligent report generation and analysis</p>
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

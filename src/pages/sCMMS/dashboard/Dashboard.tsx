
import { 
  Wrench, 
  Package, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Calendar,
  Activity,
  BarChart3,
  Users,
  Zap
} from 'lucide-react';
import { mockEquipment, mockMaintenance, mockInventory } from '../data/mockData';

export default function Dashboard() {
  const equipmentStats = {
    total: mockEquipment.length,
    operational: mockEquipment.filter(e => e.status === 'operational').length,
    maintenance: mockEquipment.filter(e => e.status === 'maintenance').length,
    broken: mockEquipment.filter(e => e.status === 'broken').length
  };

  const maintenanceStats = {
    scheduled: mockMaintenance.filter(m => m.status === 'scheduled').length,
    inProgress: mockMaintenance.filter(m => m.status === 'in-progress').length,
    completed: mockMaintenance.filter(m => m.status === 'completed').length
  };

  const inventoryStats = {
    total: mockInventory.length,
    lowStock: mockInventory.filter(i => i.currentStock <= i.minStock).length,
    totalValue: mockInventory.reduce((acc, item) => acc + (item.currentStock * item.unitPrice), 0)
  };

  const StatCard = ({ title, value, subtext, icon: Icon, color }: any) => (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 group relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-current to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">{title}</p>
          <p className={`text-4xl font-bold ${color} mb-1`}>{value}</p>
          {subtext && <p className="text-gray-500 text-sm font-medium">{subtext}</p>}
        </div>
        <div className={`p-5 rounded-3xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${
          color === 'text-blue-600' ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 
          color === 'text-green-600' ? 'bg-gradient-to-br from-green-50 to-green-100' : 
          color === 'text-orange-600' ? 'bg-gradient-to-br from-orange-50 to-orange-100' : 'bg-gradient-to-br from-red-50 to-red-100'
        }`}>
          <Icon size={28} className={color} />
        </div>
      </div>
    </div>
  );

  const MaintenanceBarChart = () => {
    const data = [
      { label: 'Scheduled', value: maintenanceStats.scheduled, color: 'bg-blue-500', percentage: (maintenanceStats.scheduled / (maintenanceStats.scheduled + maintenanceStats.inProgress + maintenanceStats.completed)) * 100 },
      { label: 'In Progress', value: maintenanceStats.inProgress, color: 'bg-orange-500', percentage: (maintenanceStats.inProgress / (maintenanceStats.scheduled + maintenanceStats.inProgress + maintenanceStats.completed)) * 100 },
      { label: 'Completed', value: maintenanceStats.completed, color: 'bg-green-500', percentage: (maintenanceStats.completed / (maintenanceStats.scheduled + maintenanceStats.inProgress + maintenanceStats.completed)) * 100 }
    ];

    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">{item.value}</span>
                <span className="text-xs text-gray-500">({item.percentage.toFixed(1)}%)</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header Section */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl">
            <BarChart3 className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-slate-600 mt-2 text-xl font-medium">Real-time factory operations monitoring</p>
          </div>
        </div>
        
        {/* Quick Stats Bar */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700">System Online</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="text-blue-600" size={16} />
                <span className="text-sm font-medium text-slate-700">Live Monitoring Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-purple-600" size={16} />
                <span className="text-sm font-medium text-slate-700">4 Technicians Online</span>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Statistics */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <Wrench className="text-blue-600" size={24} />
          <h2 className="text-3xl font-bold text-slate-800">Equipment Status</h2>
        </div>
        <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-4 gap-8">
          <StatCard
            title="Total Equipment"
            value={equipmentStats.total}
            subtext="Active units"
            icon={Wrench}
            color="text-blue-600"
          />
          <StatCard
            title="Operational"
            value={equipmentStats.operational}
            subtext={`${((equipmentStats.operational / equipmentStats.total) * 100).toFixed(1)}% uptime`}
            icon={CheckCircle}
            color="text-green-600"
          />
          <StatCard
            title="Under Maintenance"
            value={equipmentStats.maintenance}
            subtext="Scheduled work"
            icon={Clock}
            color="text-orange-600"
          />
          <StatCard
            title="Out of Order"
            value={equipmentStats.broken}
            subtext="Needs attention"
            icon={AlertTriangle}
            color="text-red-600"
          />
        </div>
      </div>

      {/* Maintenance & Inventory */}
      <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-8">
        {/* Maintenance Stats */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 smallLaptop:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
              <Calendar className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Maintenance Activities</h3>
          </div>
          <MaintenanceBarChart />
        </div>

        {/* Inventory Stats */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
              <Package className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Inventory Status</h3>
          </div>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1">{inventoryStats.total}</div>
              <div className="text-sm text-slate-600 font-medium">Total Items</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="text-2xl font-bold text-red-600 mb-1">{inventoryStats.lowStock}</div>
                <div className="text-xs text-red-700 font-medium">Low Stock</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-100">
                <div className="text-2xl font-bold text-green-600 mb-1">${(inventoryStats.totalValue / 1000).toFixed(0)}K</div>
                <div className="text-xs text-green-700 font-medium">Total Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
            <Zap className="text-white" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Recent Activities</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
            <div className="p-2 bg-green-500 rounded-xl shadow-lg">
              <CheckCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-900">Hydraulic Press A1 maintenance completed</p>
              <p className="text-sm text-slate-600 mt-1">Technician: John Smith • 1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300">
            <div className="p-2 bg-orange-500 rounded-xl shadow-lg">
              <Clock className="text-white" size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-900">Conveyor Belt B2 repair started</p>
              <p className="text-sm text-slate-600 mt-1">Technician: Sarah Johnson • 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border border-red-200 hover:shadow-lg transition-all duration-300">
            <div className="p-2 bg-red-500 rounded-xl shadow-lg">
              <AlertTriangle className="text-white" size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-900">Air Filter stock running low</p>
              <p className="text-sm text-slate-600 mt-1">Only 3 pieces remaining • Reorder needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
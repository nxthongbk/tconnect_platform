import { FileText, Download, TrendingUp, Calendar } from 'lucide-react';
import { mockEquipment, mockMaintenance, mockInventory } from '../data/mockData';

export default function Reports() {
  const generateEquipmentReport = () => {
    const report = {
      totalEquipment: mockEquipment.length,
      operationalRate: (mockEquipment.filter(e => e.status === 'operational').length / mockEquipment.length * 100).toFixed(1),
      equipmentByCategory: mockEquipment.reduce((acc, equipment) => {
        acc[equipment.category] = (acc[equipment.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
    return report;
  };

  const generateMaintenanceReport = () => {
    const thisMonth = mockMaintenance.filter(m => 
      new Date(m.scheduledDate).getMonth() === new Date().getMonth()
    );
    
    return {
      totalMaintenanceThisMonth: thisMonth.length,
      completedMaintenance: thisMonth.filter(m => m.status === 'completed').length,
      totalCost: thisMonth.reduce((acc, m) => acc + m.cost, 0),
      avgDuration: thisMonth.length > 0 ? thisMonth.reduce((acc, m) => acc + m.duration, 0) / thisMonth.length : 0
    };
  };

  const generateInventoryReport = () => {
    return {
      totalItems: mockInventory.length,
      lowStockItems: mockInventory.filter(i => i.currentStock <= i.minStock),
      totalValue: mockInventory.reduce((acc, item) => acc + (item.currentStock * item.unitPrice), 0),
      categoryDistribution: mockInventory.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  };

  const equipmentReport = generateEquipmentReport();
  const maintenanceReport = generateMaintenanceReport();
  const inventoryReport = generateInventoryReport();

  const ReportCard = ({ title, icon: Icon, children }: any) => (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-current to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <div className="p-4 rounded-3xl shadow-xl bg-gradient-to-br from-blue-50 to-blue-100">
          <Icon className="text-blue-600" size={28} />
        </div>
        <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1     className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight"
            style={{ marginBottom: 0, paddingBottom: 2 }}>
            Reports & Analytics
          </h1>
          <p className="text-slate-600 mt-2 text-xl font-medium">Performance analysis and operational insights</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
          <Download size={20} />
          Export Reports
        </button>
      </div>

      <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-10">
        {/* Equipment Report */}
        <ReportCard title="Equipment Report" icon={TrendingUp}>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Equipment:</span>
              <span className="font-bold text-gray-900 text-lg">{equipmentReport.totalEquipment}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Operational Rate:</span>
              <span className="font-bold text-green-600 text-lg">{equipmentReport.operationalRate}%</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Distribution by Category:</p>
              <div className="space-y-2">
                {Object.entries(equipmentReport.equipmentByCategory).map(([category, count]) => (
                  <div key={category} className="flex justify-between text-sm p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">{category}:</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ReportCard>

        {/* Maintenance Report */}
        <ReportCard title="Maintenance Report" icon={Calendar}>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">This Month:</span>
              <span className="font-bold text-gray-900 text-lg">{maintenanceReport.totalMaintenanceThisMonth}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Completed:</span>
              <span className="font-bold text-green-600 text-lg">{maintenanceReport.completedMaintenance}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Cost:</span>
              <span className="font-bold text-gray-900 text-lg">
                ${maintenanceReport.totalCost.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Avg Duration:</span>
              <span className="font-bold text-gray-900 text-lg">
                {maintenanceReport.avgDuration.toFixed(0)} minutes
              </span>
            </div>
          </div>
        </ReportCard>

        {/* Inventory Report */}
        <ReportCard title="Inventory Report" icon={FileText}>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Items:</span>
              <span className="font-bold text-gray-900 text-lg">{inventoryReport.totalItems}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Low Stock Items:</span>
              <span className="font-bold text-red-600 text-lg">{inventoryReport.lowStockItems.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Inventory Value:</span>
              <span className="font-bold text-gray-900 text-lg">
                ${(inventoryReport.totalValue / 1000).toFixed(1)}K
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Items Needing Restock:</p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {inventoryReport.lowStockItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm p-2 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-gray-600">{item.name}:</span>
                    <span className="font-semibold text-red-600">
                      {item.currentStock}/{item.minStock} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ReportCard>

        {/* Quick Actions */}
        <ReportCard title="Quick Actions" icon={TrendingUp}>
          <div className="space-y-4">
            <button className="w-full text-left p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200">
              <div className="font-semibold text-gray-900">Equipment Performance Report</div>
              <div className="text-sm text-gray-600">Export detailed equipment status report</div>
            </button>
            <button className="w-full text-left p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-200 border border-green-200">
              <div className="font-semibold text-gray-900">Weekly Maintenance Schedule</div>
              <div className="text-sm text-gray-600">View maintenance plan for next 7 days</div>
            </button>
            <button className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-200 border border-purple-200">
              <div className="font-semibold text-gray-900">Maintenance Cost Analysis</div>
              <div className="text-sm text-gray-600">Monthly maintenance cost breakdown</div>
            </button>
          </div>
        </ReportCard>
      </div>
    </div>
  );
}
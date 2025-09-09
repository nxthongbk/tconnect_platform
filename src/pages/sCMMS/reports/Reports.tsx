import { FileText, Download, TrendingUp, Calendar, FileSpreadsheet } from 'lucide-react';
import { mockEquipment, mockMaintenance, mockInventory } from '../data/mockData';
import * as XLSX from 'xlsx';

export default function Reports() {
  const generateEquipmentReport = () => {
    const report = {
      totalEquipment: mockEquipment.length,
      operationalRate: (
        (mockEquipment.filter(e => e.status === 'operational').length / mockEquipment.length) *
        100
      ).toFixed(1),
      equipmentByCategory: mockEquipment.reduce(
        (acc, equipment) => {
          acc[equipment.category] = (acc[equipment.category] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
    };
    return report;
  };

  const generateMaintenanceReport = () => {
    const thisMonth = mockMaintenance.filter(
      m => new Date(m.scheduledDate).getMonth() === new Date().getMonth()
    );

    return {
      totalMaintenanceThisMonth: thisMonth.length,
      completedMaintenance: thisMonth.filter(m => m.status === 'completed').length,
      totalCost: thisMonth.reduce((acc, m) => acc + m.cost, 0),
      avgDuration:
        thisMonth.length > 0
          ? thisMonth.reduce((acc, m) => acc + m.duration, 0) / thisMonth.length
          : 0,
    };
  };

  const generateInventoryReport = () => {
    return {
      totalItems: mockInventory.length,
      lowStockItems: mockInventory.filter(i => i.currentStock <= i.minStock),
      totalValue: mockInventory.reduce((acc, item) => acc + item.currentStock * item.unitPrice, 0),
      categoryDistribution: mockInventory.reduce(
        (acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
    };
  };

  const equipmentReport = generateEquipmentReport();
  const maintenanceReport = generateMaintenanceReport();
  const inventoryReport = generateInventoryReport();

  // Sample detailed data for Excel export
  const detailedEquipmentData = mockEquipment.map(equipment => ({
    'Equipment ID': equipment.id,
    'Equipment Name': equipment.name,
    Model: equipment.model,
    'Serial Number': equipment.serialNumber,
    Category: equipment.category,
    Location: equipment.location,
    Status: equipment.status,
    'Install Date': equipment.installDate,
    'Last Maintenance': equipment.lastMaintenance || 'N/A',
    'Next Maintenance': equipment.nextMaintenance || 'N/A',
    'Maintenance Interval (days)': equipment.maintenanceInterval,
    Description: equipment.description || 'N/A',
  }));

  const detailedMaintenanceData = mockMaintenance.map(maintenance => ({
    'Maintenance ID': maintenance.id,
    'Equipment Name': maintenance.equipmentName,
    Type: maintenance.type,
    Status: maintenance.status,
    'Scheduled Date': maintenance.scheduledDate,
    'Completed Date': maintenance.completedDate || 'N/A',
    Technician: maintenance.technician,
    Description: maintenance.description,
    'Cost ($)': maintenance.cost,
    'Duration (min)': maintenance.duration,
    'Parts Used':
      maintenance.partsUsed.map(part => `${part.itemName} (${part.quantity})`).join(', ') || 'None',
    Notes: maintenance.notes || 'N/A',
  }));

  const detailedInventoryData = mockInventory.map(item => ({
    'Item ID': item.id,
    'Item Name': item.name,
    SKU: item.sku,
    Category: item.category,
    Unit: item.unit,
    'Current Stock': item.currentStock,
    'Min Stock': item.minStock,
    'Max Stock': item.maxStock,
    'Unit Price ($)': item.unitPrice,
    'Total Value ($)': item.currentStock * item.unitPrice,
    'Stock Status':
      item.currentStock <= item.minStock
        ? 'Low Stock'
        : item.currentStock <= item.minStock * 1.2
          ? 'Warning'
          : 'In Stock',
    Supplier: item.supplier,
    Location: item.location,
    'Last Restocked': item.lastRestocked,
  }));

  const exportToExcel = (reportType: string) => {
    const workbook = XLSX.utils.book_new();
    const timestamp = new Date().toISOString().split('T')[0];

    if (reportType === 'performance') {
      // Equipment Performance Report
      const performanceData = mockEquipment.map(equipment => ({
        'Equipment Name': equipment.name,
        Model: equipment.model,
        Location: equipment.location,
        Status: equipment.status,
        'Uptime %':
          equipment.status === 'operational'
            ? '98.5%'
            : equipment.status === 'maintenance'
              ? '85.2%'
              : '0%',
        'Last Maintenance': equipment.lastMaintenance || 'N/A',
        'Next Maintenance': equipment.nextMaintenance || 'N/A',
        'Maintenance Interval': `${equipment.maintenanceInterval} days`,
        'Performance Score':
          equipment.status === 'operational'
            ? 'Excellent'
            : equipment.status === 'maintenance'
              ? 'Good'
              : 'Poor',
        'Efficiency Rating':
          equipment.status === 'operational'
            ? '95%'
            : equipment.status === 'maintenance'
              ? '75%'
              : '20%',
      }));

      const performanceSummary = [
        ['Equipment Performance Report', '', '', ''],
        ['Generated Date:', new Date().toLocaleDateString(), '', ''],
        ['Total Equipment:', mockEquipment.length, '', ''],
        [
          'Operational Equipment:',
          mockEquipment.filter(e => e.status === 'operational').length,
          '',
          '',
        ],
        ['Average Uptime:', '92.3%', '', ''],
        ['Performance Rating:', 'Good', '', ''],
        ['', '', '', ''],
        ['Detailed Performance Data:', '', '', ''],
      ];

      const performanceSummaryWS = XLSX.utils.aoa_to_sheet(performanceSummary);
      XLSX.utils.book_append_sheet(workbook, performanceSummaryWS, 'Performance Summary');

      const performanceDetailsWS = XLSX.utils.json_to_sheet(performanceData);
      XLSX.utils.book_append_sheet(workbook, performanceDetailsWS, 'Performance Details');
    }

    if (reportType === 'weekly-schedule') {
      // Weekly Maintenance Schedule
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

      const weeklyScheduleData = [
        {
          Date: '2024-01-15',
          Equipment: 'Hydraulic Press A1',
          Type: 'Preventive',
          Technician: 'John Smith',
          Duration: '2 hours',
          Priority: 'Medium',
          Status: 'Scheduled',
        },
        {
          Date: '2024-01-16',
          Equipment: 'CNC Machine M4',
          Type: 'Preventive',
          Technician: 'Mike Wilson',
          Duration: '1.5 hours',
          Priority: 'Low',
          Status: 'Scheduled',
        },
        {
          Date: '2024-01-17',
          Equipment: 'Conveyor Belt B2',
          Type: 'Corrective',
          Technician: 'Sarah Johnson',
          Duration: '3 hours',
          Priority: 'High',
          Status: 'In Progress',
        },
        {
          Date: '2024-01-18',
          Equipment: 'Welding Robot R3',
          Type: 'Emergency',
          Technician: 'John Smith',
          Duration: '4 hours',
          Priority: 'Critical',
          Status: 'Urgent',
        },
        {
          Date: '2024-01-19',
          Equipment: 'Hydraulic Press A1',
          Type: 'Inspection',
          Technician: 'Mike Wilson',
          Duration: '1 hour',
          Priority: 'Low',
          Status: 'Scheduled',
        },
      ];

      const scheduleSummary = [
        ['Weekly Maintenance Schedule', '', '', ''],
        ['Generated Date:', new Date().toLocaleDateString(), '', ''],
        [
          'Week Period:',
          `${today.toLocaleDateString()} - ${nextWeek.toLocaleDateString()}`,
          '',
          '',
        ],
        ['Total Scheduled Tasks:', weeklyScheduleData.length, '', ''],
        [
          'Critical Tasks:',
          weeklyScheduleData.filter(t => t.Priority === 'Critical').length,
          '',
          '',
        ],
        [
          'High Priority Tasks:',
          weeklyScheduleData.filter(t => t.Priority === 'High').length,
          '',
          '',
        ],
        [
          'Estimated Total Hours:',
          weeklyScheduleData.reduce((acc, task) => acc + parseFloat(task.Duration), 0).toFixed(1),
          '',
          '',
        ],
        ['', '', '', ''],
        ['Detailed Schedule:', '', '', ''],
      ];

      const scheduleSummaryWS = XLSX.utils.aoa_to_sheet(scheduleSummary);
      XLSX.utils.book_append_sheet(workbook, scheduleSummaryWS, 'Schedule Summary');

      const scheduleDetailsWS = XLSX.utils.json_to_sheet(weeklyScheduleData);
      XLSX.utils.book_append_sheet(workbook, scheduleDetailsWS, 'Schedule Details');
    }

    if (reportType === 'cost-analysis') {
      // Maintenance Cost Analysis
      const costAnalysisData = [
        {
          Month: 'January 2024',
          Equipment: 'Hydraulic Press A1',
          'Preventive Cost': 155,
          'Corrective Cost': 320,
          'Emergency Cost': 0,
          'Total Cost': 475,
          'Parts Cost': 85,
          'Labor Cost': 390,
          'Downtime Hours': 3.5,
          'Cost per Hour': 135.7,
        },
        {
          Month: 'January 2024',
          Equipment: 'Conveyor Belt B2',
          'Preventive Cost': 75,
          'Corrective Cost': 450,
          'Emergency Cost': 650,
          'Total Cost': 1175,
          'Parts Cost': 450,
          'Labor Cost': 725,
          'Downtime Hours': 8.2,
          'Cost per Hour': 143.3,
        },
        {
          Month: 'January 2024',
          Equipment: 'CNC Machine M4',
          'Preventive Cost': 195,
          'Corrective Cost': 0,
          'Emergency Cost': 0,
          'Total Cost': 195,
          'Parts Cost': 95,
          'Labor Cost': 100,
          'Downtime Hours': 1.5,
          'Cost per Hour': 130.0,
        },
        {
          Month: 'January 2024',
          Equipment: 'Welding Robot R3',
          'Preventive Cost': 185,
          'Corrective Cost': 280,
          'Emergency Cost': 0,
          'Total Cost': 465,
          'Parts Cost': 35,
          'Labor Cost': 430,
          'Downtime Hours': 4.0,
          'Cost per Hour': 116.3,
        },
      ];

      const totalCosts = costAnalysisData.reduce(
        (acc, item) => ({
          preventive: acc.preventive + item['Preventive Cost'],
          corrective: acc.corrective + item['Corrective Cost'],
          emergency: acc.emergency + item['Emergency Cost'],
          total: acc.total + item['Total Cost'],
          parts: acc.parts + item['Parts Cost'],
          labor: acc.labor + item['Labor Cost'],
          downtime: acc.downtime + item['Downtime Hours'],
        }),
        { preventive: 0, corrective: 0, emergency: 0, total: 0, parts: 0, labor: 0, downtime: 0 }
      );

      const costSummary = [
        ['Maintenance Cost Analysis', '', '', ''],
        ['Generated Date:', new Date().toLocaleDateString(), '', ''],
        ['Analysis Period:', 'January 2024', '', ''],
        ['Total Maintenance Cost:', `$${totalCosts.total.toLocaleString()}`, '', ''],
        ['Preventive Maintenance:', `$${totalCosts.preventive.toLocaleString()}`, '', ''],
        ['Corrective Maintenance:', `$${totalCosts.corrective.toLocaleString()}`, '', ''],
        ['Emergency Repairs:', `$${totalCosts.emergency.toLocaleString()}`, '', ''],
        ['Total Parts Cost:', `$${totalCosts.parts.toLocaleString()}`, '', ''],
        ['Total Labor Cost:', `$${totalCosts.labor.toLocaleString()}`, '', ''],
        ['Total Downtime Hours:', totalCosts.downtime.toFixed(1), '', ''],
        [
          'Average Cost per Hour:',
          `$${(totalCosts.total / totalCosts.downtime).toFixed(2)}`,
          '',
          '',
        ],
        ['', '', '', ''],
        ['Cost Breakdown by Equipment:', '', '', ''],
      ];

      const costSummaryWS = XLSX.utils.aoa_to_sheet(costSummary);
      XLSX.utils.book_append_sheet(workbook, costSummaryWS, 'Cost Summary');

      const costDetailsWS = XLSX.utils.json_to_sheet(costAnalysisData);
      XLSX.utils.book_append_sheet(workbook, costDetailsWS, 'Cost Details');
    }

    if (reportType === 'equipment' || reportType === 'all') {
      // Equipment Summary Sheet
      const equipmentSummary = [
        ['Equipment Report Summary', '', '', ''],
        ['Generated Date:', new Date().toLocaleDateString(), '', ''],
        ['Total Equipment:', equipmentReport.totalEquipment, '', ''],
        ['Operational Rate:', `${equipmentReport.operationalRate}%`, '', ''],
        ['', '', '', ''],
        ['Equipment by Category:', '', '', ''],
        ...Object.entries(equipmentReport.equipmentByCategory).map(([category, count]) => [
          category,
          count,
          '',
          '',
        ]),
        ['', '', '', ''],
        ['Detailed Equipment Data:', '', '', ''],
      ];

      const equipmentSummaryWS = XLSX.utils.aoa_to_sheet(equipmentSummary);
      XLSX.utils.book_append_sheet(workbook, equipmentSummaryWS, 'Equipment Summary');

      // Equipment Details Sheet
      const equipmentDetailsWS = XLSX.utils.json_to_sheet(detailedEquipmentData);
      XLSX.utils.book_append_sheet(workbook, equipmentDetailsWS, 'Equipment Details');
    }

    if (reportType === 'maintenance' || reportType === 'all') {
      // Maintenance Summary Sheet
      const maintenanceSummary = [
        ['Maintenance Report Summary', '', '', ''],
        ['Generated Date:', new Date().toLocaleDateString(), '', ''],
        ['Total Maintenance This Month:', maintenanceReport.totalMaintenanceThisMonth, '', ''],
        ['Completed Maintenance:', maintenanceReport.completedMaintenance, '', ''],
        ['Total Cost:', `$${maintenanceReport.totalCost.toLocaleString()}`, '', ''],
        ['Average Duration:', `${maintenanceReport.avgDuration.toFixed(0)} minutes`, '', ''],
        ['', '', '', ''],
        ['Detailed Maintenance Data:', '', '', ''],
      ];

      const maintenanceSummaryWS = XLSX.utils.aoa_to_sheet(maintenanceSummary);
      XLSX.utils.book_append_sheet(workbook, maintenanceSummaryWS, 'Maintenance Summary');

      // Maintenance Details Sheet
      const maintenanceDetailsWS = XLSX.utils.json_to_sheet(detailedMaintenanceData);
      XLSX.utils.book_append_sheet(workbook, maintenanceDetailsWS, 'Maintenance Details');
    }

    if (reportType === 'inventory' || reportType === 'all') {
      // Inventory Summary Sheet
      const inventorySummary = [
        ['Inventory Report Summary', '', '', ''],
        ['Generated Date:', new Date().toLocaleDateString(), '', ''],
        ['Total Items:', inventoryReport.totalItems, '', ''],
        ['Low Stock Items:', inventoryReport.lowStockItems.length, '', ''],
        ['Total Inventory Value:', `$${(inventoryReport.totalValue / 1000).toFixed(1)}K`, '', ''],
        ['', '', '', ''],
        ['Low Stock Items:', '', '', ''],
        ...inventoryReport.lowStockItems.map(item => [
          item.name,
          `${item.currentStock}/${item.minStock} ${item.unit}`,
          '',
          '',
        ]),
        ['', '', '', ''],
        ['Detailed Inventory Data:', '', '', ''],
      ];

      const inventorySummaryWS = XLSX.utils.aoa_to_sheet(inventorySummary);
      XLSX.utils.book_append_sheet(workbook, inventorySummaryWS, 'Inventory Summary');

      // Inventory Details Sheet
      const inventoryDetailsWS = XLSX.utils.json_to_sheet(detailedInventoryData);
      XLSX.utils.book_append_sheet(workbook, inventoryDetailsWS, 'Inventory Details');
    }

    // Save the file
    const fileName =
      reportType === 'all'
        ? `Factory_Complete_Report_${timestamp}.xlsx`
        : reportType === 'performance'
          ? `Equipment_Performance_Report_${timestamp}.xlsx`
          : reportType === 'weekly-schedule'
            ? `Weekly_Maintenance_Schedule_${timestamp}.xlsx`
            : reportType === 'cost-analysis'
              ? `Maintenance_Cost_Analysis_${timestamp}.xlsx`
              : `Factory_${reportType.charAt(0).toUpperCase() + reportType.slice(1)}_Report_${timestamp}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

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
          <h1  className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight"
            style={{ marginBottom: 0, paddingBottom: 2 }}>
            Reports & Analytics
          </h1>
          <p className="text-slate-600 mt-2 text-xl font-medium">
            Performance analysis and operational insights
          </p>
        </div>
        <button
          onClick={() => exportToExcel('all')}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          <FileSpreadsheet size={20} />
          Export All Reports
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Equipment Report */}
        <ReportCard title="Equipment Report" icon={TrendingUp}>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Equipment:</span>
              <span className="font-bold text-gray-900 text-lg">
                {equipmentReport.totalEquipment}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Operational Rate:</span>
              <span className="font-bold text-green-600 text-lg">
                {equipmentReport.operationalRate}%
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Distribution by Category:</p>
              <div className="space-y-2">
                {Object.entries(equipmentReport.equipmentByCategory).map(([category, count]) => (
                  <div
                    key={category}
                    className="flex justify-between text-sm p-2 bg-gray-50 rounded-lg"
                  >
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
              <span className="font-bold text-gray-900 text-lg">
                {maintenanceReport.totalMaintenanceThisMonth}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Completed:</span>
              <span className="font-bold text-green-600 text-lg">
                {maintenanceReport.completedMaintenance}
              </span>
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
              <span className="font-bold text-red-600 text-lg">
                {inventoryReport.lowStockItems.length}
              </span>
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
                {inventoryReport.lowStockItems.map(item => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm p-2 bg-red-50 rounded-lg border border-red-200"
                  >
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
            <button
              onClick={() => exportToExcel('performance')}
              className="w-full text-left p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200 hover:shadow-lg transform hover:scale-102"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">Equipment Performance Report</div>
                  <div className="text-sm text-gray-600">
                    Export detailed equipment status report
                  </div>
                </div>
                <Download className="text-blue-600" size={20} />
              </div>
            </button>
            <button
              onClick={() => exportToExcel('weekly-schedule')}
              className="w-full text-left p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-200 border border-green-200 hover:shadow-lg transform hover:scale-102"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">Weekly Maintenance Schedule</div>
                  <div className="text-sm text-gray-600">View maintenance plan for next 7 days</div>
                </div>
                <Download className="text-green-600" size={20} />
              </div>
            </button>
            <button
              onClick={() => exportToExcel('cost-analysis')}
              className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-200 border border-purple-200 hover:shadow-lg transform hover:scale-102"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">Maintenance Cost Analysis</div>
                  <div className="text-sm text-gray-600">Monthly maintenance cost breakdown</div>
                </div>
                <Download className="text-purple-600" size={20} />
              </div>
            </button>
          </div>
        </ReportCard>
      </div>
    </div>
  );
}

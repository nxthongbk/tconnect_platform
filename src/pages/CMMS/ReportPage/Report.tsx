import { Download, TrendUp, FileText, CalendarBlank } from '@phosphor-icons/react';

export default function Report() {
  // Dynamic quick actions
  const quickActions = [
    {
      title: 'Báo cáo hiệu suất thiết bị',
      description: 'Xuất báo cáo chi tiết về tình trạng thiết bị',
    },
    {
      title: 'Lịch bảo trì tuần tới',
      description: 'Xem kế hoạch bảo trì 7 ngày tới',
    },
    {
      title: 'Báo cáo chi phí bảo trì',
      description: 'Thống kê chi phí bảo trì theo tháng',
    },
  ];
  const maintenanceTitles = {
    thisMonth: 'Bảo trì tháng này',
    completed: 'Đã hoàn thành',
    totalCost: 'Tổng chi phí',
    avgTime: 'Thời gian TB',
  };

  const inventoryData = {
    totalItems: 3,
    lowStock: 1,
    totalValue: '12.3M',
    supplement: [{ name: 'Gasket seal', value: '8/10 Cái' }],
  };
  const deviceData = {
    total: 3,
    activityRate: 33.3,
    categories: {
      'Hydraulic Press': 1,
      Conveyor: 1,
      'Welding Robot': 1,
    },
  };
  const maintenanceData = {
    thisMonth: 0,
    completed: 0,
    totalCost: 0,
    avgTime: 0,
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
          <p className="text-gray-600">Phân tích hiệu suất và tình trạng hoạt động</p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          // onClick={() => setOpenModal(true)}
        >
          <Download size={20} /> Xuất báo cáo
        </button>
      </div>
      <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <TrendUp size={24} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Báo cáo thiết bị</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tổng số thiết bị:</span>
              <span className="font-semibold text-gray-900">{deviceData.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tỷ lệ hoạt động:</span>
              <span className="font-semibold text-green-600">{deviceData.activityRate}%</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Phân bổ theo danh mục:</p>
              <div className="space-y-1">
                {Object.entries(deviceData.categories).map(([cat, count]) => (
                  <div className="flex justify-between text-sm" key={cat}>
                    <span className="text-gray-600">{cat}:</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Report Card - Dynamic */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <CalendarBlank size={24} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Báo cáo bảo trì</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{maintenanceTitles.thisMonth}:</span>
              <span className="font-semibold text-gray-900">{maintenanceData.thisMonth}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{maintenanceTitles.completed}:</span>
              <span className="font-semibold text-green-600">{maintenanceData.completed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{maintenanceTitles.totalCost}:</span>
              <span className="font-semibold text-gray-900">{maintenanceData.totalCost} ₫</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{maintenanceTitles.avgTime}:</span>
              <span className="font-semibold text-gray-900">{maintenanceData.avgTime} phút</span>
            </div>
          </div>
        </div>

        {/* Inventory Report Card - Dynamic */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={24} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Báo cáo kho vật tư</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tổng mặt hàng:</span>
              <span className="font-semibold text-gray-900">{inventoryData.totalItems}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sắp hết hàng:</span>
              <span className="font-semibold text-red-600">{inventoryData.lowStock}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Giá trị tồn kho:</span>
              <span className="font-semibold text-gray-900">{inventoryData.totalValue} ₫</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Vật tư cần bổ sung:</p>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {inventoryData.supplement.map((item, idx) => (
                  <div className="flex justify-between text-sm" key={item.name + idx}>
                    <span className="text-gray-600">{item.name}:</span>
                    <span className="font-medium text-red-600">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <TrendUp size={24} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Thao tác nhanh</h3>
          </div>
          <div className="space-y-3">
            {quickActions.map((action, idx) => (
              <button
                key={action.title + idx}
                className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="font-medium text-gray-900">{action.title}</div>
                <div className="text-sm text-gray-600">{action.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

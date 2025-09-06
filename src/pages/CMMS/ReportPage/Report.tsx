import { Download, TrendUp, FileText, CalendarBlank } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

export default function Report() {
  const { t } = useTranslation();

  const quickActions = [
    {
      title: t('sCMMS.reports.quickActions.performanceReport.title'),
      description: t('sCMMS.reports.quickActions.performanceReport.desc'),
    },
    {
      title: t('sCMMS.reports.quickActions.maintenanceSchedule.title'),
      description: t('sCMMS.reports.quickActions.maintenanceSchedule.desc'),
    },
    {
      title: t('sCMMS.reports.quickActions.costReport.title'),
      description: t('sCMMS.reports.quickActions.costReport.desc'),
    },
  ];

  const inventoryData = {
    totalItems: 3,
    lowStock: 1,
    totalValue: '12.3M',
    supplement: [
      {
        name: t('sCMMS.inventoryManagement.items.gasketSeal'),
        value: '8/10 ' + t('sCMMS.inventoryManagement.units.piece'),
      },
    ],
  };

  const deviceData = {
    total: 3,
    activityRate: 33.3,
    categories: {
      [t('sCMMS.reports.devices.hydraulicPress')]: 1,
      [t('sCMMS.reports.devices.conveyor')]: 1,
      [t('sCMMS.reports.devices.weldingRobot')]: 1,
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
          <h1 className="text-2xl font-bold text-gray-900">{t('sCMMS.reports.title')}</h1>
          <p className="text-gray-600">{t('sCMMS.reports.subTitle')}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Download size={20} /> {t('sCMMS.reports.export')}
        </button>
      </div>
      <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <TrendUp size={24} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {t('sCMMS.reports.deviceReport')}
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('sCMMS.reports.totalDevices')}:</span>
              <span className="font-semibold text-gray-900">{deviceData.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('sCMMS.reports.activityRate')}:</span>
              <span className="font-semibold text-green-600">{deviceData.activityRate}%</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                {t('sCMMS.reports.byCategory')}:
              </p>
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

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <CalendarBlank size={24} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {t('sCMMS.reports.maintenanceReport')}
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 ">{t('sCMMS.reports.maintenance.thisMonth')}:</span>
              <span className="font-semibold text-gray-900">{maintenanceData.thisMonth}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('sCMMS.reports.maintenance.completed')}:</span>
              <span className="font-semibold text-green-600">{maintenanceData.completed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('sCMMS.reports.maintenance.totalCost')}:</span>
              <span className="font-semibold text-gray-900">{maintenanceData.totalCost} ₫</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('sCMMS.reports.maintenance.avgTime')}:</span>
              <span className="font-semibold text-gray-900">
                {maintenanceData.avgTime} {t('sCMMS.reports.time.minutes')}
              </span>
            </div>
          </div>
        </div>

        {/* Inventory Report Card - Dynamic */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={24} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {t('sCMMS.reports.inventoryReport')}
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('sCMMS.inventoryManagement.totalItems')}:</span>
              <span className="font-semibold text-gray-900">{inventoryData.totalItems}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('sCMMS.inventoryManagement.lowStock')}:</span>
              <span className="font-semibold text-red-600">{inventoryData.lowStock}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('sCMMS.inventoryManagement.stockValue')}:</span>
              <span className="font-semibold text-gray-900">{inventoryData.totalValue} ₫</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                {t('sCMMS.reports.needRestock')}:
              </p>
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
            <h3 className="text-lg font-semibold text-gray-900">
              {t('sCMMS.reports.quickActions.title')}
            </h3>
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

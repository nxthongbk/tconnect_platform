import React from 'react';
import DeviceStatusCard from '../CommonComponents/StatusCard/DeviceStatusCard';
import { getCMMSData } from '../CMMSData';
import { useTranslation } from 'react-i18next';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { deviceStatusData, maintenanceActivities, warehouseStatus, recentActivities } =
    getCMMSData(t);

  type DashboardTranslations = {
    title: string;
    subTitle: string;
    deviceStatus: { title: string };
    maintenanceActivity: { title: string };
    inventoryStatus: { title: string };
    recentActivities: { title: string };
  };

  const dashboardTranslations = t('sCMMS.dashboard', {
    returnObjects: true,
  }) as DashboardTranslations;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{dashboardTranslations.title}</h1>
          <p className="text-gray-600">{dashboardTranslations.subTitle}</p>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {dashboardTranslations.deviceStatus.title}
        </h2>
        <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-4 gap-6">
          {deviceStatusData.map(card => (
            <DeviceStatusCard
              key={card.title}
              title={card.title}
              value={card.value}
              color={card.color}
              icon={card.icon}
              bgColor={card.bgColor}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {dashboardTranslations.maintenanceActivity.title}
          </h3>
          <div className="space-y-4">
            {maintenanceActivities.map(item => (
              <div className="flex justify-between items-center" key={item.label}>
                <span className="text-gray-600">{item.label}</span>
                <span
                  className={`${item.bgColor} ${item.textColor} px-2 py-1 rounded-full text-sm font-medium`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {dashboardTranslations.inventoryStatus.title}
          </h3>
          <div className="space-y-4">
            {warehouseStatus.map(item => (
              <div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between"
                key={item.title}
              >
                <div>
                  <p className="text-gray-600 text-sm font-medium">{item.title}</p>
                  <p className={`text-3xl font-bold mt-1 ${item.valueColor}`}>{item.value}</p>
                  {item.subText && (
                    <p className={`text-sm mt-1 ${item.subTextColor || ''}`}>{item.subText}</p>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${item.bgColor}`}>{item.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {dashboardTranslations.recentActivities.title}
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((item, idx) => (
              <div key={idx} className={`flex items-center p-4 rounded-lg ${item.bg}`}>
                <div className="mr-4">{item.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

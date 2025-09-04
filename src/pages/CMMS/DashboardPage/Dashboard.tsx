import React from 'react';
import DeviceStatusCard from '../CommonComponents/StatusCard/DeviceStatusCard';
import { Wrench, Clock, Warning } from '@phosphor-icons/react';

const deviceStatusData = [
  {
    title: 'Tổng thiết bị',
    value: 3,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',

    icon: <Wrench size={24} className="text-blue-600" />,
  },
  {
    title: 'Hoạt động bình thường',
    value: 1,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-check-circle text-green-600"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <path d="m9 11 3 3L22 4"></path>
      </svg>
    ),
  },
  {
    title: 'Đang bảo trì',
    value: 1,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    icon: <Clock size={24} className="text-orange-600" />,
  },
  {
    title: 'Hỏng hóc',
    value: 1,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    icon: <Warning size={24} className="text-red-600" />,
  },
];

const maintanceActivities = [
  {
    label: 'Đã lên lịch',
    value: 0,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
  },
  {
    label: 'Đang thực hiện',
    value: 1,
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
  },
  {
    label: 'Hoàn thành',
    value: 1,
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
  },
];

const warehouseStatus = [
  {
    title: 'Tổng mặt hàng',
    value: '3',
    valueColor: 'text-blue-600',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-package text-blue-600"
      >
        <path d="m7.5 4.27 9 5.15"></path>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
        <path d="m3.3 7 8.7 5 8.7-5"></path>
        <path d="M12 22V12"></path>
      </svg>
    ),
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Sắp hết hàng',
    value: '1',
    valueColor: 'text-red-600',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-alert-triangle text-red-600"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
      </svg>
    ),
    bgColor: 'bg-red-100',
  },
  {
    title: 'Giá trị tồn kho',
    value: '12.3M',
    valueColor: 'text-green-600',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-trending-up text-green-600"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
        <polyline points="16 7 22 7 22 13"></polyline>
      </svg>
    ),
    bgColor: 'bg-green-100',
    subText: 'VNĐ',
    subTextColor: 'text-gray-500',
  },
];

const recentActivities = [
  {
    status: 'success',
    title: 'Bảo trì máy ép thủy lực A1 hoàn thành',
    detail: 'Kỹ thuật viên: Nguyễn Văn An - 1 tiếng trước',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-check-circle text-green-600"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    ),
    bg: 'bg-gray-50',
  },
  {
    status: 'warning',
    title: 'Bắt đầu sửa chữa băng tải B2',
    detail: 'Kỹ thuật viên: Trần Thị Bình - 2 tiếng trước',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-clock text-orange-500"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    bg: 'bg-gray-50',
  },
  {
    status: 'error',
    title: 'Gasket seal sắp hết hàng',
    detail: 'Còn lại 8 cái - cần bổ sung',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-alert-triangle text-red-500"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
      </svg>
    ),
    bg: 'bg-gray-50',
  },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Tổng quan</h1>
          <p className="text-gray-600">Theo dõi tình trạng thiết bị và hoạt động bảo trì</p>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tình trạng thiết bị</h2>
        <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-4 gap-6">
          {deviceStatusData.map((card) => (
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hoạt động bảo trì</h3>
          <div className="space-y-4">
            {maintanceActivities.map(item => (
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tình trạng kho</h3>
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
          <h3 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h3>
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

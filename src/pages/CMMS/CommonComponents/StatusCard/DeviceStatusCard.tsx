import React from 'react';

interface DeviceStatusCardProps {
  title: string;
  value: string | number;
  color?: string;
  bgColor?: string;
  icon: React.ReactNode;
}

const DeviceStatusCard: React.FC<DeviceStatusCardProps> = ({
  title,
  value,
  color,
  bgColor,
  icon,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
      </div>
      <div className="flex items-center justify-end">
        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${bgColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DeviceStatusCard;

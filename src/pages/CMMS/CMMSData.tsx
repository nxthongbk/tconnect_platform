import { Clock, Wrench, Warning } from '@phosphor-icons/react';

export const getCMMSData = (t: any) => {
  const dashboardTranslations = t('sCMMS.dashboard', { returnObjects: true });

  const deviceStatusData = [
    {
      title: dashboardTranslations.deviceStatus.totalDevices,
      value: 3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      icon: <Wrench size={24} className="text-blue-600" />,
    },
    {
      title: dashboardTranslations.deviceStatus.normalOperation,
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
          className="text-green-600"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <path d="m9 11 3 3L22 4"></path>
        </svg>
      ),
    },
    {
      title: dashboardTranslations.deviceStatus.underMaintenance,
      value: 1,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      icon: <Clock size={24} className="text-orange-600" />,
    },
    {
      title: dashboardTranslations.deviceStatus.malfunction,
      value: 1,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      icon: <Warning size={24} className="text-red-600" />,
    },
  ];

  const maintenanceActivities = [
    {
      label: dashboardTranslations.maintenanceActivity.scheduled,
      value: 0,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
    },
    {
      label: dashboardTranslations.maintenanceActivity.inProgress,
      value: 1,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
    },
    {
      label: dashboardTranslations.maintenanceActivity.completed,
      value: 1,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
    },
  ];

  const warehouseStatus = [
    {
      title: dashboardTranslations.inventoryStatus.totalItems,
      value: '3',
      valueColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
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
          className="text-blue-600"
        >
          <path d="m7.5 4.27 9 5.15"></path>
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
          <path d="m3.3 7 8.7 5 8.7-5"></path>
          <path d="M12 22V12"></path>
        </svg>
      ),
    },
    {
      title: dashboardTranslations.inventoryStatus.lowStock,
      value: '1',
      valueColor: 'text-red-600',
      bgColor: 'bg-red-100',
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
          className="text-red-600"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
        </svg>
      ),
    },
    {
      title: dashboardTranslations.inventoryStatus.inventoryValue,
      value: '12.3M',
      valueColor: 'text-green-600',
      bgColor: 'bg-green-100',
      subText: 'VNĐ',
      subTextColor: 'text-gray-500',
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
          className="text-green-600"
        >
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </svg>
      ),
    },
  ];

  const recentActivities = [
    {
      status: 'success',
      title: t('sCMMS.dashboard.recentActivities.maintenanceCompleted', {
        device: t('sCMMS.deviceManagement.device.hydraulicPress'),
      }),
      detail: t('sCMMS.dashboard.recentActivities.technician', {
        name: t('sCMMS.employees.name.johnSmith'),
        time: t('sCMMS.time.oneHourAgo'),
      }),
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
      title: t('sCMMS.dashboard.recentActivities.maintenanceStarted', {
        device: t('sCMMS.deviceManagement.device.conveyorBelt'),
      }),
      detail: t('sCMMS.dashboard.recentActivities.technician', {
        name: t('sCMMS.employees.name.sarahJohnson'),
        time: t('sCMMS.time.twoHoursAgo'),
      }),
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
      title: t('sCMMS.dashboard.recentActivities.lowStock', {
        item: t('sCMMS.warehouseManagement.item.gasketSeal'),
      }),
      detail: t('sCMMS.dashboard.recentActivities.remaining', { quantity: 5 }),
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

  const devicesData = [
    {
      name: t('sCMMS.equipmentManagement.equipment.names.hydraulicPressA1'),
      location: t('sCMMS.equipmentManagement.equipment.locations.lineAZone1'),
      statusLabel: t('sCMMS.equipmentManagement.equipment.status.active'),
      code: 'HP-2000X - HP2000X-001',

      status: 'active',

      statusColor: 'bg-green-100 text-green-700',
      nextMaintenance: '12/1/2024',
    },
    {
      name: t('sCMMS.equipmentManagement.equipment.names.conveyorBeltB2'),
      code: 'CT-500L - CT500L-087',
      location: t('sCMMS.equipmentManagement.equipment.locations.lineBZone2'),
      status: 'maintenance',
      statusLabel: t('sCMMS.equipmentManagement.equipment.status.maintenance'),
      statusColor: 'bg-orange-100 text-orange-700',
      nextMaintenance: '11/15/2024',
    },
    {
      name: t('sCMMS.equipmentManagement.equipment.names.weldingRobotR3'),
      code: 'WR-600 - WR600-155',
      location: t('sCMMS.equipmentManagement.equipment.locations.lineCZone3'),
      status: 'malfunction',
      statusLabel: t('sCMMS.equipmentManagement.equipment.status.malfunction'),
      statusColor: 'bg-red-100 text-red-700',
      nextMaintenance: '11/25/2024',
    },
    {
      name: t('sCMMS.equipmentManagement.equipment.names.cncMachineM4'),
      code: 'CNC-1500 - CNC1500-042',
      location: t('sCMMS.equipmentManagement.equipment.locations.machiningCenterZone1'),
      status: 'active',
      statusLabel: t('sCMMS.equipmentManagement.equipment.status.active'),
      statusColor: 'bg-green-100 text-green-700',
      nextMaintenance: '11/20/2024',
    },
  ];

  return {
    deviceStatusData,
    maintenanceActivities,
    warehouseStatus,
    recentActivities,
    devicesData,
  };
};

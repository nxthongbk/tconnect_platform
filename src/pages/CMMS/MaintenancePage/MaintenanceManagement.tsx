import { useState } from 'react';
import { Plus } from '@phosphor-icons/react';
import SearchFilterBar from '../CommonComponents/SearchBar/SearchFilterBar';
import { useTranslation } from 'react-i18next';

export default function MaintenanceManagement() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusMap = {
    all: null,
    completed: t('sCMMS.maintenanceManagement.status.completed'),
    inprogress: t('sCMMS.maintenanceManagement.status.inprogress'),
    scheduled: t('sCMMS.maintenanceManagement.status.scheduled'),
    cancelled: t('sCMMS.maintenanceManagement.status.cancelled'),
  };

  const maintenances = [
    {
      device: t('sCMMS.maintenanceManagement.devices.hydraulicPressA1'),
      description: t('sCMMS.maintenanceManagement.descriptions.hydraulicSystem'),
      type: t('sCMMS.maintenanceManagement.types.periodic'),
      typeColor: 'bg-blue-100 text-blue-700',
      status: t('sCMMS.maintenanceManagement.status.completed'),
      statusColor: 'bg-green-100 text-green-700',
      date: '1/11/2024',
      completedDate: '1/11/2024',
      technician: t('sCMMS.maintenanceManagement.technicians.nguyenVanAn'),
      cost: '900.000 ₫',
    },
    {
      device: t('sCMMS.maintenanceManagement.devices.conveyorBeltB2'),
      description: t('sCMMS.maintenanceManagement.descriptions.conveyorMotor'),
      type: t('sCMMS.maintenanceManagement.types.repair'),
      typeColor: 'bg-orange-100 text-orange-700',
      status: t('sCMMS.maintenanceManagement.status.inprogress'),
      statusColor: 'bg-orange-100 text-orange-700',
      date: '12/11/2024',
      technician: t('sCMMS.maintenanceManagement.technicians.tranThiBinh'),
      cost: '2.500.000 ₫',
    },
  ];

  const filteredMaintenances = maintenances.filter(maintenance => {
    const matchesSearch =
      maintenance.device.toLowerCase().includes(search.toLowerCase()) ||
      maintenance.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      !statusMap[statusFilter] || maintenance.status === statusMap[statusFilter];
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {' '}
            {t('sCMMS.maintenanceManagement.title')}
          </h1>
          <p className="text-gray-600">{t('sCMMS.maintenanceManagement.subTitle')}</p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          // onClick={() => setOpenModal(true)}
        >
          <Plus size={20} /> {t('sCMMS.maintenanceManagement.createButton')}
        </button>
      </div>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        filterOptions={[
          { label: t('sCMMS.maintenanceManagement.filterOptions.all'), value: 'all' },
          { label: t('sCMMS.maintenanceManagement.filterOptions.scheduled'), value: 'scheduled' },
          { label: t('sCMMS.maintenanceManagement.filterOptions.inprogress'), value: 'inprogress' },
          { label: t('sCMMS.maintenanceManagement.filterOptions.completed'), value: 'completed' },
          { label: t('sCMMS.maintenanceManagement.filterOptions.cancelled'), value: 'cancelled' },
        ]}
        placeholder={t('sCMMS.maintenanceManagement.searchPlaceholder')}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.maintenanceManagement.tableHeaders.device')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.maintenanceManagement.tableHeaders.typeStatus')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.maintenanceManagement.tableHeaders.executionDate')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.maintenanceManagement.tableHeaders.technician')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.maintenanceManagement.tableHeaders.cost')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMaintenances.map((maintenance, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-gray-900">{maintenance.device}</div>
                    <div className="text-sm text-gray-500">{maintenance.description}</div>
                  </td>
                  <td className="py-4 px-6 ">
                    <div className="space-y-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium mr-1 ${maintenance.typeColor}`}
                      >
                        {maintenance.type}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${maintenance.statusColor}`}
                      >
                        {maintenance.status}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {' '}
                      {maintenance.date}
                      {maintenance.completedDate && (
                        <div className="text-xs text-gray-500">
                          {t('sCMMS.maintenanceManagement.completedDateLabel')}{' '}
                          {maintenance.completedDate}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{maintenance.technician}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{maintenance.cost}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

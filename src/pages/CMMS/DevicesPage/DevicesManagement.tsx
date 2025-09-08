import { useState } from 'react';
import AddEditDeviceModal from './AddEditDeviceModal';
import { Plus, NotePencil, Trash } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import SearchFilterBar from '../CommonComponents/SearchBar/SearchFilterBar';
import { getCMMSData } from '../CMMSData';

export default function DevicesManagement() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editDevice, setEditDevice] = useState(null);

  type Device = {
    name: string;
    model: string;
    serial: string;
    category: string;
    location: string;
    status: string;
    installDate: string;
    interval: string;
    description: string;
    code: string;
    statusLabel: string;
    statusColor: string;
    nextMaintenance: string;
  };

  const ensureAllFields = dev => ({
    name: dev.name || '',
    model: dev.model || '',
    serial: dev.serial || '',
    category: dev.category || '',
    location: dev.location || '',
    status: dev.status || 'operational',
    installDate: dev.installDate || '',
    interval: dev.interval || '30',
    description: dev.description || '',
    code: dev.code || '',
    statusLabel:
      dev.statusLabel || t(`sCMMS.equipmentManagement.status.${dev.status || 'operational'}`),
    statusColor: dev.statusColor || 'bg-green-100 text-green-800',
    nextMaintenance: dev.nextMaintenance || '',
  });

  const { devicesData: initialDevices } = getCMMSData(t);
  const [localDevices, setLocalDevices] = useState<Device[]>(initialDevices.map(ensureAllFields));

  const statusMap = {
    all: null,
    active: t('sCMMS.equipmentManagement.status.operational'),
    maintenance: t('sCMMS.equipmentManagement.status.maintenance'),
    malfunction: t('sCMMS.equipmentManagement.status.malfunction'),
    offline: t('sCMMS.equipmentManagement.status.offline'),
  };

  const filteredDevices = localDevices.filter(device => {
    const matchesSearch =
      device.name.toLowerCase().includes(search.toLowerCase()) ||
      device.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusMap[statusFilter] || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <AddEditDeviceModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditDevice(null);
        }}
        onSubmit={values => {
          const statusLabel = t(`sCMMS.equipmentManagement.status.${values.status}`);
          let statusColor = 'bg-green-100 text-green-800';
          if (values.status === 'maintenance') statusColor = 'bg-yellow-100 text-yellow-800';
          if (values.status === 'out_of_order') statusColor = 'bg-red-100 text-red-800';
          if (values.status === 'operational') statusColor = 'bg-green-100 text-green-800';

          if (editDevice) {
            setLocalDevices(prev =>
              prev.map(d =>
                d.code === editDevice.code
                  ? ensureAllFields({ ...d, ...values, code: d.code, statusLabel, statusColor })
                  : ensureAllFields(d)
              )
            );
          } else {
            setLocalDevices(prev => [
              ...prev.map(ensureAllFields),
              ensureAllFields({
                ...values,
                code: `EQP${prev.length + 1}`,
                statusLabel,
                statusColor,
                nextMaintenance: '',
              }),
            ]);
          }
          setModalOpen(false);
          setEditDevice(null);
        }}
        initialValues={editDevice || {}}
        isEdit={!!editDevice}
      />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('sCMMS.equipmentManagement.title')}
          </h1>
          <p className="text-gray-600">{t('sCMMS.equipmentManagement.subTitle')}</p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          onClick={() => {
            setModalOpen(true);
            setEditDevice(null);
          }}
        >
          <Plus size={20} /> {t('sCMMS.equipmentManagement.addDevice')}
        </button>
      </div>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        placeholder={t('sCMMS.equipmentManagement.searchPlaceholder')}
        filterOptions={[
          { label: t('sCMMS.equipmentManagement.allStatus'), value: 'all' },
          {
            label: t('sCMMS.equipmentManagement.status.active'),
            value: 'active',
          },
          {
            label: t('sCMMS.equipmentManagement.status.maintenance'),
            value: 'maintenance',
          },
          {
            label: t('sCMMS.equipmentManagement.status.malfunction'),
            value: 'malfunction',
          },
          {
            label: t('sCMMS.equipmentManagement.status.offline'),
            value: 'offline',
          },
        ]}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.equipmentManagement.tableHeaders.device')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.equipmentManagement.tableHeaders.location')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.equipmentManagement.tableHeaders.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.equipmentManagement.tableHeaders.nextMaintenance')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.equipmentManagement.tableHeaders.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevices.map((device, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-gray-900">{device.name}</div>
                    <div className="text-sm text-gray-500">{device.code}</div>
                  </td>
                  <td className="py-4 px-6 ">
                    <div className="text-sm text-gray-900">{device.location}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${device.statusColor}`}
                    >
                      {t(`sCMMS.equipmentManagement.status.${device.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <div className="text-sm text-gray-900">{device.nextMaintenance}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                        onClick={() => {
                          setModalOpen(true);
                          setEditDevice({
                            name: device.name || '',
                            model: device.model || '',
                            serial: device.serial || '',
                            category: device.category || '',
                            location: device.location || '',
                            status: device.status || 'operational',
                            installDate: device.installDate || '',
                            interval: device.interval || '30',
                            description: device.description || '',
                            code: device.code,
                          });
                          setEditDevice(ensureAllFields(device));
                        }}
                      >
                        <NotePencil size={20} />
                      </button>
                      <button className="text-red-500 hover:text-red-700 p-1 rounded">
                        <Trash size={20} />
                      </button>
                    </div>
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

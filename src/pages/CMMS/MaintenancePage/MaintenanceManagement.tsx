import { useState } from 'react';
import { Plus } from '@phosphor-icons/react';
import SearchFilterBar from '../CommonComponents/SearchBar/SearchFilterBar';

export default function MaintenanceManagement() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusMap = {
    all: null,
    completed: 'Hoàn thành',
    inprogress: 'Đang thực hiện',
    scheduled: 'Đã lên lịch',
    cancelled: 'Đã hủy',
  };

  const maintenances = [
    {
      device: 'Máy ép thủy lực A1',
      description: 'Bảo trì định kỳ hệ thống thủy lực',
      type: 'Định kỳ',
      typeColor: 'bg-blue-100 text-blue-700',
      status: 'Hoàn thành',
      statusColor: 'bg-green-100 text-green-700',
      date: '1/11/2024',
      completedDate: '1/11/2024',
      technician: 'Nguyễn Văn An',
      cost: '900.000 ₫',
    },
    {
      device: 'Băng tải B2',
      description: 'Sửa chữa motor băng tải bị hỏng',
      type: 'Sửa chữa',
      typeColor: 'bg-orange-100 text-orange-700',
      status: 'Đang thực hiện',
      statusColor: 'bg-orange-100 text-orange-700',
      date: '12/11/2024',
      technician: 'Trần Thị Bình',
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
          <h1 className="text-2xl font-bold text-gray-900">Quản lý bảo trì</h1>
          <p className="text-gray-600">Lập kế hoạch và theo dõi các hoạt động bảo trì thiết bị</p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          // onClick={() => setOpenModal(true)}
        >
          <Plus size={20} /> Tạo lịch bảo trì
        </button>
      </div>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        filterOptions={[
          { label: 'Tất cả', value: 'all' },
          { label: 'Đã lên lịch', value: 'scheduled' },
          { label: 'Đang thực hiện', value: 'inprogress' },
          { label: 'Hoàn thành', value: 'completed' },
          { label: 'Đã hủy', value: 'cancelled' },
        ]}
        placeholder="Tìm kiếm bảo trì..."
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  THIẾT BỊ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LOẠI / TRẠNG THÁI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NGÀY THỰC HIỆN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KỸ THUẬT VIÊN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CHI PHÍ
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
                          Hoàn thành: {maintenance.completedDate}
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

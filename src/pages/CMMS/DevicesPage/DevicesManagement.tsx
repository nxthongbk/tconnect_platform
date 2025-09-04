import { useState } from 'react';
import { Plus, NotePencil, Trash } from '@phosphor-icons/react';
import SearchFilterBar from '../CommonComponents/SearchBar/SearchFilterBar';

const devices = [
  {
    name: 'Máy ép thủy lực A1',
    code: 'HP-2000X - HP2000X-001',
    location: 'Dây chuyền A - Khu vực 1',
    status: 'Hoạt động',
    statusColor: 'bg-green-100 text-green-700',
    nextMaintenance: '1/12/2024',
  },
  {
    name: 'Băng tải B2',
    code: 'CT-500L - CT500L-087',
    location: 'Dây chuyền B - Khu vực 2',
    status: 'Bảo trì',
    statusColor: 'bg-orange-100 text-orange-700',
    nextMaintenance: '15/11/2024',
  },
  {
    name: 'Robot hàn R3',
    code: 'WR-600 - WR600-155',
    location: 'Dây chuyền C - Khu vực 3',
    status: 'Hỏng',
    statusColor: 'bg-red-100 text-red-700',
    nextMaintenance: '25/11/2024',
  },
];

export default function DevicesManagement() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusMap = {
    all: null,
    active: 'Hoạt động',
    maintenance: 'Bảo trì',
    broken: 'Hỏng',
    shutdown: 'Tắt máy',
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch =
      device.name.toLowerCase().includes(search.toLowerCase()) ||
      device.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusMap[statusFilter] || device.status === statusMap[statusFilter];
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý thiết bị</h1>
          <p className="text-gray-600">Theo dõi và quản lý tất cả thiết bị trong nhà máy</p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          // onClick={() => setOpenModal(true)}
        >
          <Plus size={20}  /> Thêm thiết bị
        </button>
      </div>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
				placeholder="Tìm kiếm thiết bị..."
        filterOptions={[
          { label: 'Tất cả', value: 'all' },
          { label: 'Hoạt động', value: 'active' },
          { label: 'Bảo trì', value: 'maintenance' },
          { label: 'Hỏng', value: 'broken' },
          { label: 'Tắt máy', value: 'shutdown' },
        ]}
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
                  VỊ TRÍ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TRẠNG THÁI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BẢO TRÌ TIẾP THEO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  THAO TÁC
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
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <div className="text-sm text-gray-900">{device.nextMaintenance}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1 rounded">
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

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { MaintenanceRecord } from '../types';
import { mockMaintenance } from '../data/mockData';
import MaintenanceForm from './MaintenanceForm';

export default function MaintenanceList() {
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(mockMaintenance);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MaintenanceRecord | null>(null);

  const filteredMaintenance = maintenance.filter(record => {
    const matchesSearch =
      record.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.technician.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: MaintenanceRecord['status']) => {
    const styles = {
      scheduled: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-orange-100 text-orange-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-gray-100 text-gray-800',
    };

    const labels = {
      scheduled: 'Scheduled',
      'in-progress': 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getTypeBadge = (type: MaintenanceRecord['type']) => {
    const styles = {
      preventive: 'bg-blue-100 text-blue-800',
      corrective: 'bg-orange-100 text-orange-800',
      emergency: 'bg-red-100 text-red-800',
    };

    const labels = {
      preventive: 'Preventive',
      corrective: 'Corrective',
      emergency: 'Emergency',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type]}`}>
        {labels[type]}
      </span>
    );
  };

  const handleSave = (maintenanceData: Omit<MaintenanceRecord, 'id'>) => {
    if (editingRecord) {
      setMaintenance(
        maintenance.map(record =>
          record.id === editingRecord.id ? { ...maintenanceData, id: editingRecord.id } : record
        )
      );
    } else {
      const newRecord: MaintenanceRecord = {
        ...maintenanceData,
        id: `M${Date.now()}`,
      };
      setMaintenance([...maintenance, newRecord]);
    }
    setShowForm(false);
    setEditingRecord(null);
  };

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight"
            style={{ marginBottom: 0, paddingBottom: 2 }}
          >
            Maintenance Management
          </h1>
          <p className="text-slate-600 mt-2 text-xl font-medium">
            Schedule and track equipment maintenance activities
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          <Plus size={20} />
          Schedule Maintenance
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 mb-10">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search maintenance records..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Maintenance Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-blue-50">
              <tr>
                <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Equipment
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type / Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Scheduled Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Technician
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredMaintenance.map(record => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-5">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {record.equipmentName}
                      </div>
                      <div className="text-sm text-gray-500">{record.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      {getTypeBadge(record.type)}
                      {getStatusBadge(record.status)}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-900">
                      {new Date(record.scheduledDate).toLocaleDateString()}
                    </div>
                    {record.completedDate && (
                      <div className="text-xs text-gray-500">
                        Completed: {new Date(record.completedDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-900">{record.technician}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-semibold text-gray-900">
                      ${record.cost.toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance Form Modal */}
      {showForm && (
        <MaintenanceForm
          record={editingRecord}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingRecord(null);
          }}
        />
      )}
    </div>
  );
}

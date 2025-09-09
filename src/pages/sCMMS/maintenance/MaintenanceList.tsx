import { useState } from 'react';
import {
  Plus,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  Wrench,
  Activity,
  Edit,
  Trash2,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import { MaintenanceRecord } from '../types';
import { mockMaintenance } from '../data/mockData';
import MaintenanceForm from './MaintenanceForm';

export default function MaintenanceList() {
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(mockMaintenance);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [equipmentFilter, setEquipmentFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [technicianFilter, setTechnicianFilter] = useState<string>('all');
  const [costFilter, setCostFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MaintenanceRecord | null>(null);
  const [viewingImages, setViewingImages] = useState<MaintenanceRecord | null>(null);

  // Calculate statistics
  const stats = {
    total: maintenance.length,
    scheduled: maintenance.filter(m => m.status === 'scheduled').length,
    inProgress: maintenance.filter(m => m.status === 'in-progress').length,
    completed: maintenance.filter(m => m.status === 'completed').length,
    totalCost: maintenance.reduce((acc, m) => acc + m.cost, 0),
    avgDuration:
      maintenance.length > 0
        ? maintenance.reduce((acc, m) => acc + m.duration, 0) / maintenance.length
        : 0,
    preventive: maintenance.filter(m => m.type === 'preventive').length,
    corrective: maintenance.filter(m => m.type === 'corrective').length,
    emergency: maintenance.filter(m => m.type === 'emergency').length,
  };

  const filteredMaintenance = maintenance.filter(record => {
    const matchesSearch =
      record.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.technician.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesEquipment = equipmentFilter === 'all' || record.equipmentName === equipmentFilter;
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    const matchesTechnician = technicianFilter === 'all' || record.technician === technicianFilter;
    const matchesCost =
      costFilter === 'all' ||
      (costFilter === 'low' && record.cost < 200) ||
      (costFilter === 'medium' && record.cost >= 200 && record.cost < 500) ||
      (costFilter === 'high' && record.cost >= 500);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesEquipment &&
      matchesType &&
      matchesTechnician &&
      matchesCost
    );
  });

  // Get unique values for filter options
  const equipmentOptions = [...new Set(maintenance.map(record => record.equipmentName))];
  const technicianOptions = [...new Set(maintenance.map(record => record.technician))];

  const handleEdit = (record: MaintenanceRecord) => {
    setEditingRecord(record);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this maintenance record?')) {
      setMaintenance(maintenance.filter(record => record.id !== id));
    }
  };

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

  const handleViewImages = (record: MaintenanceRecord) => {
    setViewingImages(record);
  };

  const StatCard = ({ title, value, subtext, icon: Icon, color, bgColor }: any) => (
    <div
      className={`${bgColor} p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          {subtext && <p className="text-gray-400 text-sm mt-1">{subtext}</p>}
        </div>
        <div
          className={`p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 ${
            color === 'text-blue-600'
              ? 'bg-gradient-to-br from-blue-50 to-blue-100'
              : color === 'text-green-600'
                ? 'bg-gradient-to-br from-green-50 to-green-100'
                : color === 'text-orange-600'
                  ? 'bg-gradient-to-br from-orange-50 to-orange-100'
                  : color === 'text-red-600'
                    ? 'bg-gradient-to-br from-red-50 to-red-100'
                    : color === 'text-purple-600'
                      ? 'bg-gradient-to-br from-purple-50 to-purple-100'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100'
          }`}
        >
          <Icon size={24} className={color} />
        </div>
      </div>
    </div>
  );

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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-4 gap-8 mb-10">
        <StatCard
          title="Total Records"
          value={stats.total}
          icon={Calendar}
          color="text-blue-600"
          bgColor="bg-white/80 backdrop-blur-sm"
        />
        <StatCard
          title="Scheduled"
          value={stats.scheduled}
          subtext="Upcoming tasks"
          icon={Clock}
          color="text-orange-600"
          bgColor="bg-white"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          subtext="Active work"
          icon={Activity}
          color="text-purple-600"
          bgColor="bg-white"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          subtext={`${stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}% completion`}
          icon={CheckCircle}
          color="text-green-600"
          bgColor="bg-white"
        />
      </div>

      {/* Additional Statistics Row */}
      <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-8 mb-10">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <div className="w-full h-full bg-gradient-to-br from-current to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-5 rounded-3xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
              <Wrench className="text-green-600" size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
                Total Cost
              </p>
              <p className="text-4xl font-bold text-green-600 mb-1">
                ${(stats.totalCost / 1000).toFixed(1)}K
              </p>
              <p className="text-slate-400 text-sm">This period</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 group-hover:scale-110 transition-transform duration-300">
              <Clock className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                Avg Duration
              </p>
              <p className="text-2xl font-bold text-blue-600">{stats.avgDuration.toFixed(0)} min</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Types</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Preventive</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${stats.total > 0 ? (stats.preventive / stats.total) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-900 w-8">{stats.preventive}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Corrective</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${stats.total > 0 ? (stats.corrective / stats.total) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-900 w-8">{stats.corrective}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Emergency</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${stats.total > 0 ? (stats.emergency / stats.total) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-900 w-8">{stats.emergency}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 mb-10">
        <div className="space-y-4">
          {/* Search Bar */}
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

          {/* Filter Options */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-5 gap-4">
            {/* Equipment Filter */}
            <select
              value={equipmentFilter}
              onChange={e => setEquipmentFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="all">All Equipment</option>
              {equipmentOptions.map(equipment => (
                <option key={equipment} value={equipment}>
                  {equipment}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="all">All Types</option>
              <option value="preventive">Preventive</option>
              <option value="corrective">Corrective</option>
              <option value="emergency">Emergency</option>
            </select>

            {/* Status Filter */}
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

            {/* Technician Filter */}
            <select
              value={technicianFilter}
              onChange={e => setTechnicianFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="all">All Technicians</option>
              {technicianOptions.map(technician => (
                <option key={technician} value={technician}>
                  {technician}
                </option>
              ))}
            </select>

            {/* Cost Filter */}
            <select
              value={costFilter}
              onChange={e => setCostFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="all">All Costs</option>
              <option value="low">Low (&lt; $200)</option>
              <option value="medium">Medium ($200-$500)</option>
              <option value="high">High (&gt; $500)</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {(equipmentFilter !== 'all' ||
            typeFilter !== 'all' ||
            statusFilter !== 'all' ||
            technicianFilter !== 'all' ||
            costFilter !== 'all' ||
            searchTerm) && (
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setEquipmentFilter('all');
                  setTypeFilter('all');
                  setStatusFilter('all');
                  setTechnicianFilter('all');
                  setCostFilter('all');
                  setSearchTerm('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 text-sm font-medium"
              >
                Clear All Filters
              </button>
              <div className="text-sm text-gray-600">
                Showing {filteredMaintenance.length} of {maintenance.length} records
                <span className="text-blue-600 ml-2">• Filters applied</span>
              </div>
            </div>
          )}

          {/* Filter Summary when no filters applied */}
          {!(
            equipmentFilter !== 'all' ||
            typeFilter !== 'all' ||
            statusFilter !== 'all' ||
            technicianFilter !== 'all' ||
            costFilter !== 'all' ||
            searchTerm
          ) && (
            <div className="text-sm text-gray-600">
              Showing {filteredMaintenance.length} of {maintenance.length} records
            </div>
          )}
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
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Images
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
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
                    <div className="text-sm text-gray-900">{record.duration} min</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-semibold text-gray-900">
                      ${record.cost.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      {(record.beforeImages?.length || 0) > 0 && (
                        <button
                          onClick={() => handleViewImages(record)}
                          className="text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          Before
                          <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 ml-1 text-xs font-semibold">
                            {record.beforeImages?.length}
                          </span>
                        </button>
                      )}
                      {(record.afterImages?.length || 0) > 0 && (
                        <button
                          onClick={() => handleViewImages(record)}
                          className="text-xs text-green-600 hover:text-green-800 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          After
                          <span className="inline-block bg-green-100 text-green-700 rounded-full px-2 py-0.5 mr-1 text-xs font-semibold">
                            {record.afterImages?.length}
                          </span>
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(record)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        title="Edit Maintenance Record"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                        title="Delete Maintenance Record"
                      >
                        <Trash2 size={16} />
                      </button>
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

      {/* Image Viewer Modal */}
      {viewingImages && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Maintenance Images - {viewingImages.equipmentName}
              </h2>
              <button
                onClick={() => setViewingImages(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Before Images */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <ImageIcon className="text-blue-600" size={20} />
                  Before Maintenance ({viewingImages.beforeImages?.length || 0} images)
                </h3>
                {viewingImages.beforeImages && viewingImages.beforeImages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {viewingImages.beforeImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <div className="w-full h-48 rounded-xl overflow-hidden shadow-lg bg-gray-100 hover:shadow-xl transition-shadow duration-300">
                          <img
                            src={url}
                            alt={`Before maintenance ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                          Before {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-gray-500">No before images available</p>
                  </div>
                )}
              </div>

              {/* After Images */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <ImageIcon className="text-green-600" size={20} />
                  After Maintenance ({viewingImages.afterImages?.length || 0} images)
                </h3>
                {viewingImages.afterImages && viewingImages.afterImages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {viewingImages.afterImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <div className="w-full h-48 rounded-xl overflow-hidden shadow-lg bg-gray-100 hover:shadow-xl transition-shadow duration-300">
                          <img
                            src={url}
                            alt={`After maintenance ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                          After {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-gray-500">No after images available</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setViewingImages(null)}
                className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

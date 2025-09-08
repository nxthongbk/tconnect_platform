import React, { useState } from 'react';
import { X } from '@phosphor-icons/react';

interface DeviceFormValues {
  name: string;
  model: string;
  serial: string;
  category: string;
  location: string;
  status: string;
  installDate: string;
  interval: string;
  description: string;
}

interface AddEditDeviceModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: DeviceFormValues) => void;
  initialValues?: Partial<DeviceFormValues>;
  isEdit?: boolean;
}

const statusOptions = [
	{ label: 'Operational', value: 'operational' },
	{ label: 'Maintenance', value: 'maintenance' },
	{ label: 'Out of Order', value: 'out_of_order' },
	{ label: 'Offline', value: 'offline' },
];

const categoryOptions = [
	{ label: 'Select Category', value: '' },
	{ label: 'Hydraulic Press', value: 'hydraulic_press' },
	{ label: 'Conveyor', value: 'conveyor' },
	{ label: 'Welding Robot', value: 'welding_robot' },
	{ label: 'CNC Machine', value: 'cnc_machine' },
	{ label: 'Generator', value: 'generator' },
	{ label: 'Compressor', value: 'compressor' },
	{ label: 'Other', value: 'other' },
];

export default function AddEditDeviceModal({
  open,
  onClose,
  onSubmit,
  initialValues = {},
  isEdit = false,
}: AddEditDeviceModalProps) {
  const [form, setForm] = useState<DeviceFormValues>({
    name: initialValues.name || '',
    model: initialValues.model || '',
    serial: initialValues.serial || '',
    category: initialValues.category || '',
    location: initialValues.location || '',
    status: initialValues.status || 'operational',
    installDate: initialValues.installDate || '',
    interval: initialValues.interval || '30',
    description: initialValues.description || '',
  });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl text-gray-900 mb-6">
          {isEdit ? 'Edit Equipment' : 'Add New Equipment'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input
                name="model"
                value={form.model}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Serial Number *
              </label>
              <input
                name="serial"
                value={form.serial}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {categoryOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Install Date</label>
              <input
                name="installDate"
                value={form.installDate}
                onChange={handleChange}
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maintenance Interval (days)
              </label>
              <input
                name="interval"
                value={form.interval}
                onChange={handleChange}
                type="number"
                min="1"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              {isEdit ? 'Save Changes' : 'Add Equipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

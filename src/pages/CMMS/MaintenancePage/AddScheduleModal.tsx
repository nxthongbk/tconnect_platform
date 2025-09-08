import { useState } from 'react';

export default function AddScheduleModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    equipment: '',
    type: 'Preventive',
    status: 'Scheduled',
    technician: '',
    date: '',
    duration: '60',
    description: '',
    parts: [
      // { part: '', quantity: 1, used: 0 }
    ],
    notes: '',
  });

  if (!open) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Parts handlers
  const handlePartChange = (idx, field, value) => {
    setForm(prev => ({
      ...prev,
      parts: prev.parts.map((p, i) => (i === idx ? { ...p, [field]: value } : p)),
    }));
  };
  const handleAddPart = () => {
    setForm(prev => ({
      ...prev,
      parts: [...prev.parts, { part: '', quantity: 1, used: 0 }],
    }));
  };
  const handleRemovePart = idx => {
    setForm(prev => ({
      ...prev,
      parts: prev.parts.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-auto p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl text-gray-900 mb-6">Schedule New Maintenance</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipment *</label>
              <select
                name="equipment"
                value={form.equipment}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select Equipment</option>
                <option value="Hydraulic Press A1">Hydraulic Press A1</option>
                <option value="Conveyor Belt B2">Conveyor Belt B2</option>
                <option value="Welding Robot R3">Welding Robot R3</option>
                <option value="CNC Machine M4">CNC Machine M4</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maintenance Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="Preventive">Preventive</option>
                <option value="Corrective">Corrective</option>
                <option value="Inspection">Inspection</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technician *</label>
              <select
                name="technician"
                value={form.technician}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select Technician</option>
                <option value="Nguyen Van An">Nguyen Van An</option>
                <option value="Tran Thi Binh">Tran Thi Binh</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
                <option value="John Smith">John Smith</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scheduled Date *
              </label>
              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                type="date"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Duration (minutes)
              </label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                type="number"
                min="1"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Parts Used</label>
              <button
                type="button"
                className="text-blue-600 text-sm font-medium hover:underline"
                onClick={handleAddPart}
              >
                + Add Part
              </button>
            </div>
            {form.parts.length === 0 && (
              <div className="text-gray-400 text-sm">No parts added.</div>
            )}
            {form.parts.map((p, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 flex-1"
                  value={p.part}
                  onChange={e => handlePartChange(idx, 'part', e.target.value)}
                >
                  <option value="">Select Part</option>
                  <option value="Hydraulic Oil">Hydraulic Oil (Stock: 45 Liters)</option>
                  <option value="Gasket Seal">Gasket Seal (Stock: 8 Pieces)</option>
                  <option value="3HP Electric Motor">3HP Electric Motor (Stock: 2 Pieces)</option>
                  <option value="Ball Bearing Set">Ball Bearing Set (Stock: 15 Sets)</option>
                  <option value="Air Filter">Air Filter (Stock: 3 Pieces)</option>
                </select>
                <input
                  type="number"
                  min="1"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-20"
                  value={p.quantity}
                  onChange={e => handlePartChange(idx, 'quantity', e.target.value)}
                  placeholder="Qty"
                />
                <input
                  type="number"
                  min="0"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-20"
                  value={p.used}
                  onChange={e => handlePartChange(idx, 'used', e.target.value)}
                  placeholder="Used"
                />
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 px-2"
                  onClick={() => handleRemovePart(idx)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
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
              Schedule Maintenance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

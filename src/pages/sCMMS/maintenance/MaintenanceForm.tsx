import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { MaintenanceRecord, InventoryUsage } from '../types';
import { mockEquipment, mockUsers, mockInventory } from '../data/mockData';

interface MaintenanceFormProps {
  record?: MaintenanceRecord | null;
  onSave: (record: Omit<MaintenanceRecord, 'id'>) => void;
  onCancel: () => void;
}

export default function MaintenanceForm({ record, onSave, onCancel }: MaintenanceFormProps) {
  const [formData, setFormData] = useState({
    equipmentId: '',
    equipmentName: '',
    type: 'preventive' as MaintenanceRecord['type'],
    status: 'scheduled' as MaintenanceRecord['status'],
    scheduledDate: '',
    completedDate: '',
    technician: '',
    description: '',
    cost: 0,
    duration: 60,
    notes: '',
  });

  const [partsUsed, setPartsUsed] = useState<InventoryUsage[]>([]);
  const [beforeImages, setBeforeImages] = useState<string[]>([]);
  const [afterImages, setAfterImages] = useState<string[]>([]);

  useEffect(() => {
    if (record) {
      setFormData({
        equipmentId: record.equipmentId,
        equipmentName: record.equipmentName,
        type: record.type,
        status: record.status,
        scheduledDate: record.scheduledDate,
        completedDate: record.completedDate || '',
        technician: record.technician,
        description: record.description,
        cost: record.cost,
        duration: record.duration,
        notes: record.notes || '',
      });
      setPartsUsed(record.partsUsed);
      setBeforeImages(record.beforeImages || []);
      setAfterImages(record.afterImages || []);
    }
  }, [record]);

  const handleEquipmentChange = (equipmentId: string) => {
    const equipment = mockEquipment.find(e => e.id === equipmentId);
    setFormData({
      ...formData,
      equipmentId,
      equipmentName: equipment?.name || '',
    });
  };

  const addPart = () => {
    setPartsUsed([...partsUsed, { itemId: '', itemName: '', quantity: 1, unitPrice: 0 }]);
  };

  const updatePart = (index: number, field: keyof InventoryUsage, value: any) => {
    const updated = [...partsUsed];
    updated[index] = { ...updated[index], [field]: value };

    if (field === 'itemId') {
      const item = mockInventory.find(i => i.id === value);
      if (item) {
        updated[index].itemName = item.name;
        updated[index].unitPrice = item.unitPrice;
      }
    }

    setPartsUsed(updated);

    // Update total cost
    const totalPartsCost = updated.reduce((acc, part) => acc + part.quantity * part.unitPrice, 0);
    setFormData({ ...formData, cost: totalPartsCost });
  };

  const removePart = (index: number) => {
    const updated = partsUsed.filter((_, i) => i !== index);
    setPartsUsed(updated);

    // Update total cost
    const totalPartsCost = updated.reduce((acc, part) => acc + part.quantity * part.unitPrice, 0);
    setFormData({ ...formData, cost: totalPartsCost });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, partsUsed, beforeImages, afterImages });
  };

  const addImage = (type: 'before' | 'after') => {
    const url = prompt('Enter image URL:');
    if (url) {
      if (type === 'before') {
        setBeforeImages([...beforeImages, url]);
      } else {
        setAfterImages([...afterImages, url]);
      }
    }
  };

  const removeImage = (type: 'before' | 'after', index: number) => {
    if (type === 'before') {
      setBeforeImages(beforeImages.filter((_, i) => i !== index));
    } else {
      setAfterImages(afterImages.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {record ? 'Edit Maintenance Record' : 'Schedule New Maintenance'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipment *</label>
              <select
                value={formData.equipmentId}
                onChange={e => handleEquipmentChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Equipment</option>
                {mockEquipment.map(equipment => (
                  <option key={equipment.id} value={equipment.id}>
                    {equipment.name} - {equipment.location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maintenance Type
              </label>
              <select
                value={formData.type}
                onChange={e =>
                  setFormData({ ...formData, type: e.target.value as MaintenanceRecord['type'] })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="preventive">Preventive</option>
                <option value="corrective">Corrective</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e =>
                  setFormData({
                    ...formData,
                    status: e.target.value as MaintenanceRecord['status'],
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technician *</label>
              <select
                value={formData.technician}
                onChange={e => setFormData({ ...formData, technician: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Technician</option>
                {mockUsers
                  .filter(u => u.role === 'technician')
                  .map(user => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scheduled Date *
              </label>
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={e => setFormData({ ...formData, scheduledDate: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {formData.status === 'completed' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Completion Date
                </label>
                <input
                  type="date"
                  value={formData.completedDate}
                  onChange={e => setFormData({ ...formData, completedDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Duration (minutes)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Description *
            </label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Parts Used */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">Parts Used</label>
              <button
                type="button"
                onClick={addPart}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
              >
                <Plus size={16} />
                Add Part
              </button>
            </div>

            <div className="space-y-3">
              {partsUsed.map((part, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <select
                      value={part.itemId}
                      onChange={e => updatePart(index, 'itemId', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Part</option>
                      {mockInventory.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name} (Stock: {item.currentStock} {item.unit})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={part.quantity}
                      onChange={e => updatePart(index, 'quantity', parseInt(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      placeholder="Unit Price"
                      value={part.unitPrice}
                      onChange={e => updatePart(index, 'unitPrice', parseInt(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removePart(index)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Before Images */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Before Maintenance Images
              </label>
              <button
                type="button"
                onClick={() => addImage('before')}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
              >
                <Plus size={16} />
                Add Image
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {beforeImages.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="w-full h-24 rounded-lg overflow-hidden shadow-md bg-gray-100">
                    <img
                      src={url}
                      alt={`Before ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage('before', index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {beforeImages.length === 0 && (
                <div className="col-span-2 smallLaptop:col-span-4 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No before images added</p>
                </div>
              )}
            </div>
          </div>

          {/* After Images */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                After Maintenance Images
              </label>
              <button
                type="button"
                onClick={() => addImage('after')}
                className="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm"
              >
                <Plus size={16} />
                Add Image
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {afterImages.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="w-full h-24 rounded-lg overflow-hidden shadow-md bg-gray-100">
                    <img
                      src={url}
                      alt={`After ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage('after', index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {afterImages.length === 0 && (
                <div className="col-span-2 smallLaptop:col-span-4 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No after images added</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {record ? 'Update Maintenance' : 'Schedule Maintenance'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

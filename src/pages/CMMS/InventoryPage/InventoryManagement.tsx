import { useState } from 'react';
import { Plus, Package, Warning } from '@phosphor-icons/react';
import SearchFilterBar from '../CommonComponents/SearchBar/SearchFilterBar';
import { useTranslation } from 'react-i18next';

export default function InventoryManagement() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const summaryCards = [
    {
      title: t('sCMMS.inventoryManagement.totalItems'),
      value: 3,
      icon: <Package size={28} className="text-blue-600" />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: t('sCMMS.inventoryManagement.lowStock'),
      value: 1,
      icon: <Warning size={28} className="text-red-600" />,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
    },
    {
      title: t('sCMMS.inventoryManagement.stockValue'),
      value: '12.3M ₫',
      icon: <Package size={28} className="text-green-600" />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
  ];

  const categories = [
    { value: 'all', label: t('sCMMS.inventoryManagement.allCategories') },
    { value: 'lubricants', label: t('sCMMS.inventoryManagement.categories.lubricants') },
    { value: 'seals', label: t('sCMMS.inventoryManagement.categories.seals') },
    { value: 'motors', label: t('sCMMS.inventoryManagement.categories.motors') },
  ];

  const items = [
    {
      name: t('sCMMS.inventoryManagement.items.oilHydraulic'),
      sku: 'OIL-HYD-001',
      category: 'lubricants',
      stock: 45,
      unit: t('sCMMS.inventoryManagement.units.liter'),
      min: 20,
      max: 100,
      status: t('sCMMS.inventoryManagement.status.available'),
      statusColor: 'bg-green-100 text-green-700',
      price: '150.000 ₫',
      supplier: t('sCMMS.inventoryManagement.suppliers.abcOil'),
      location: t('sCMMS.inventoryManagement.locations.warehouseA1'),
      subCategory: t('sCMMS.inventoryManagement.categories.lubricants'),
    },
    {
      name: t('sCMMS.inventoryManagement.items.gasketSeal'),
      sku: 'SEAL-GAS-002',
      category: 'seals',
      stock: 8,
      unit: t('sCMMS.inventoryManagement.units.piece'),
      min: 10,
      max: 50,
      status: t('sCMMS.inventoryManagement.status.lowStock'),
      statusColor: 'bg-red-100 text-red-700',
      price: '75.000 ₫',
      supplier: t('sCMMS.inventoryManagement.suppliers.xyz'),
      location: t('sCMMS.inventoryManagement.locations.warehouseB3'),
      subCategory: t('sCMMS.inventoryManagement.categories.seals'),
    },
    {
      name: t('sCMMS.inventoryManagement.items.motor3HP'),
      sku: 'MOT-3HP-003',
      category: 'motors',
      stock: 2,
      unit: t('sCMMS.inventoryManagement.units.piece'),
      min: 1,
      max: 5,
      status: t('sCMMS.inventoryManagement.status.available'),
      statusColor: 'bg-green-100 text-green-700',
      price: '2.500.000 ₫',
      supplier: t('sCMMS.inventoryManagement.suppliers.motorSolutions'),
      location: t('sCMMS.inventoryManagement.locations.warehouseC1'),
      subCategory: t('sCMMS.inventoryManagement.categories.motors'),
    },
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('sCMMS.inventoryManagement.title')}
          </h1>
          <p className="text-gray-600">{t('sCMMS.inventoryManagement.subTitle')}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} /> {t('sCMMS.inventoryManagement.addSupply')}
        </button>
      </div>

      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 mb-4">
        {summaryCards.map(card => (
          <div
            key={card.title}
            className={`flex items-center bg-white rounded-xl shadow-sm border border-gray-200 p-4`}
          >
            <div className={`w-12 h-12 flex items-center justify-center mr-4`}>{card.icon}</div>
            <div>
              <div className="text-sm text-gray-600 font-medium">{card.title}</div>
              <div className={`text-xl font-bold mt-1 `}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={categoryFilter}
        setStatusFilter={setCategoryFilter}
        filterOptions={categories}
        placeholder={t('sCMMS.inventoryManagement.searchPlaceholder')}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.inventoryManagement.tableHeaders.item')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.inventoryManagement.tableHeaders.stock')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.inventoryManagement.tableHeaders.status')}{' '}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.inventoryManagement.tableHeaders.price')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.inventoryManagement.tableHeaders.supplier')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.inventoryManagement.tableHeaders.location')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                    <div className="text-xs text-gray-400">{item.subCategory}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">
                      {item.stock} {item.unit}
                    </div>
                    <div className="text-xs text-gray-500">
                      Min: {item.min} / Max: {item.max}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${item.statusColor}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 ">
                    <div className="text-sm font-medium text-gray-900">{item.price}</div>
                  </td>
                  <td className="py-4 px-6 ">
                    <div className="text-sm text-gray-900">{item.supplier}</div>
                  </td>
                  <td className="py-4 px-6 ">
                    <div className="text-sm text-gray-900">{item.location}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  // End of InventoryManagement component
}

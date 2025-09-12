import React, { useState } from 'react';
import { Plus, Search, AlertTriangle, Package, Edit, Trash2 } from 'lucide-react';
import { InventoryItem } from '../types';
import { mockInventory } from '../data/mockData';
import InventoryForm from './InventoryForm';

export default function InventoryList() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [supplierFilter, setSupplierFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Compute filtered inventory first
  const filteredInventory = inventory.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'low' && item.currentStock <= item.minStock) ||
      (statusFilter === 'warning' &&
        item.currentStock > item.minStock &&
        item.currentStock <= item.minStock * 1.2) ||
      (statusFilter === 'in-stock' && item.currentStock > item.minStock * 1.2);
    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'low' && item.unitPrice < 50) ||
      (priceFilter === 'medium' && item.unitPrice >= 50 && item.unitPrice < 200) ||
      (priceFilter === 'high' && item.unitPrice >= 200);
    const matchesSupplier = supplierFilter === 'all' || item.supplier === supplierFilter;
    const matchesLocation = locationFilter === 'all' || item.location === locationFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesPrice &&
      matchesSupplier &&
      matchesLocation
    );
  });

  // Reset to first page when filters/search/itemsPerPage change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    categoryFilter,
    statusFilter,
    priceFilter,
    supplierFilter,
    locationFilter,
    itemsPerPage,
  ]);

  // Pagination logic (must be after filteredInventory is defined)
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const paginatedInventory = filteredInventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = [...new Set(inventory.map(item => item.category))];
  const suppliers = [...new Set(inventory.map(item => item.supplier))];
  const locations = [...new Set(inventory.map(item => item.location))];

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock <= item.minStock) {
      return { label: 'Low Stock', style: 'bg-red-100 text-red-800' };
    }
    if (item.currentStock <= item.minStock * 1.2) {
      return { label: 'Warning', style: 'bg-orange-100 text-orange-800' };
    }
    return { label: 'In Stock', style: 'bg-green-100 text-green-800' };
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  const handleSave = (itemData: Omit<InventoryItem, 'id'>) => {
    if (editingItem) {
      setInventory(
        inventory.map(item =>
          item.id === editingItem.id ? { ...itemData, id: editingItem.id } : item
        )
      );
    } else {
      const newItem: InventoryItem = {
        ...itemData,
        id: Date.now().toString(),
      };
      setInventory([...inventory, newItem]);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight"
            style={{ marginBottom: 0, paddingBottom: 2 }}
          >
            Inventory Management
          </h1>
          <p className="text-slate-600 mt-2 text-xl font-medium">
            Track stock levels and manage spare parts inventory
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-8 mb-10">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <div className="w-full h-full bg-gradient-to-br from-current to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-5 rounded-3xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
              <Package className="text-blue-600" size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
                Total Items
              </p>
              <p className="text-4xl font-bold text-blue-600 mb-1">{inventory.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 group-hover:scale-110 transition-transform duration-300">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                Low Stock Items
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {inventory.filter(i => i.currentStock <= i.minStock).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 group-hover:scale-110 transition-transform duration-300">
              <Package className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                Inventory Value
              </p>
              <p className="text-2xl font-bold text-gray-900">
                $
                {(
                  inventory.reduce((acc, item) => acc + item.currentStock * item.unitPrice, 0) /
                  1000
                ).toFixed(1)}
                K
              </p>
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
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 smallLaptop:grid-cols-5 gap-4">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="all">All Status</option>
              <option value="low">Low Stock</option>
              <option value="warning">Warning</option>
              <option value="in-stock">In Stock</option>
            </select>

            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={e => setPriceFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="all">All Prices</option>
              <option value="low">Low (&lt; $50)</option>
              <option value="medium">Medium ($50-$200)</option>
              <option value="high">High (&gt; $200)</option>
            </select>

            {/* Supplier Filter */}
            <select
              value={supplierFilter}
              onChange={e => setSupplierFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="all">All Suppliers</option>
              {suppliers.map(supplier => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            {/* Clear Filters Button */}
            {(categoryFilter !== 'all' ||
              statusFilter !== 'all' ||
              priceFilter !== 'all' ||
              supplierFilter !== 'all' ||
              locationFilter !== 'all' ||
              searchTerm) && (
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setPriceFilter('all');
                  setSupplierFilter('all');
                  setLocationFilter('all');
                  setSearchTerm('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Filter Summary */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>
              Showing {filteredInventory.length} of {inventory.length} items
            </span>
            {(categoryFilter !== 'all' ||
              statusFilter !== 'all' ||
              priceFilter !== 'all' ||
              supplierFilter !== 'all' ||
              locationFilter !== 'all' ||
              searchTerm) && <span className="text-blue-600">• Filters applied</span>}
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-blue-50">
              <tr>
                <th className="px-8 py-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedInventory.map(item => {
                const stockStatus = getStockStatus(item);
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-5">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                        <div className="text-xs text-gray-400">{item.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-gray-900">
                        {item.currentStock} {item.unit}
                      </div>
                      <div className="text-xs text-gray-500">
                        Min: {item.minStock} / Max: {item.maxStock}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${stockStatus.style}`}
                      >
                        {stockStatus.label}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-semibold text-gray-900">
                        ${item.unitPrice.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-gray-900">{item.supplier}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-gray-900">{item.location}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                          title="Edit Item"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                          title="Delete Item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls and Rows Per Page Selector */}
        {(totalPages > 1 || filteredInventory.length > 0) && (
          <div className="flex flex-col smallLaptop:flex-row justify-center smallLaptop:justify-between items-center gap-4 px-6 py-6">
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1 flex-wrap">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-800'
                  }`}
                >
                  Prev
                </button>
                {/* Smart pagination: show first, last, current, neighbors, ellipsis */}
                {(() => {
                  const pages = [];
                  const pageWindow = 2;
                  for (let i = 1; i <= totalPages; i++) {
                    if (
                      i === 1 ||
                      i === totalPages ||
                      (i >= currentPage - pageWindow && i <= currentPage + pageWindow)
                    ) {
                      pages.push(i);
                    } else if (
                      (i === 2 && currentPage - pageWindow > 2) ||
                      (i === totalPages - 1 && currentPage + pageWindow < totalPages - 1)
                    ) {
                      pages.push('ellipsis-' + i);
                    }
                  }
                  let lastWasEllipsis = false;
                  return pages.map((page) => {
                    if (typeof page === 'string' && page.startsWith('ellipsis')) {
                      if (lastWasEllipsis) return null;
                      lastWasEllipsis = true;
                      return (
                        <span key={page} className="px-2 text-gray-400 select-none">
                          ...
                        </span>
                      );
                    } else {
                      lastWasEllipsis = false;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page as number)}
                          className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                            currentPage === page
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-800'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                  });
                })()}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-800'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
            {/* Rows per page selector */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 font-medium">Rows per page:</label>
              <select
                value={itemsPerPage}
                onChange={e => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white"
              >
                {[10, 15, 20, 25, 50].map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Inventory Form Modal */}
      {showForm && (
        <InventoryForm
          item={editingItem}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}

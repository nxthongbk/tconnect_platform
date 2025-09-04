import React from 'react';
import { MagnifyingGlass, Funnel } from '@phosphor-icons/react';

interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  filterOptions: FilterOption[];
  placeholder?: string;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  filterOptions,
	placeholder = 'Tìm kiếm theo từ khóa',
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col tablet:flex-row space-y-4 tablet:space-y-0 tablet:space-x-4">
        <div className="relative flex-1">
          <MagnifyingGlass
            className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            size={18}
          />
          <input
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none"
						placeholder={placeholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Funnel size={18} className="lucide lucide-filter h-4 w-4 text-gray-400" />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            {filterOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;

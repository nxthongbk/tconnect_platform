import { useState } from 'react';
import { Plus, NotePencil, Trash, MagnifyingGlass, Users } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

function EmployeeManagement() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const employees = [
    {
      name: 'Nguyễn Văn An',
      email: 'an.nguyen@factory.com',
      role: t('sCMMS.employeeManagement.roles.technician'),
      roleKey: 'technician',
      roleColor: 'bg-green-50 text-green-600',
      department: t('sCMMS.employeeManagement.departments.maintenance'),
      initials: 'NVA',
    },
    {
      name: 'Trần Thị Bình',
      email: 'binh.tran@factory.com',
      role: t('sCMMS.employeeManagement.roles.technician'),
      roleKey: 'technician',
      roleColor: 'bg-green-50 text-green-600',
      department: t('sCMMS.employeeManagement.departments.maintenance'),
      initials: 'TTB',
    },
    {
      name: 'Lê Minh Cường',
      email: 'cuong.le@factory.com',
      role: t('sCMMS.employeeManagement.roles.supervisor'),
      roleKey: 'supervisor',
      roleColor: 'bg-blue-50 text-blue-600',
      department: t('sCMMS.employeeManagement.departments.production'),
      initials: 'LMC',
    },
  ];

  const filteredEmployees = employees.filter(
    emp =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    {
      label: t('sCMMS.employeeManagement.stats.admin'),
      value: 0,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: t('sCMMS.employeeManagement.stats.supervisor'),
      value: employees.filter(e => e.roleKey === 'supervisor').length,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: t('sCMMS.employeeManagement.stats.technician'),
      value: employees.filter(e => e.roleKey === 'technician').length,
      color: 'bg-green-50 text-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('sCMMS.employeeManagement.title')}
          </h1>
          <p className="text-gray-600">{t('sCMMS.employeeManagement.subTitle')}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} /> {t('sCMMS.employeeManagement.addEmployee')}
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="relative">
          <MagnifyingGlass
            size={20}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder={t('sCMMS.employeeManagement.searchPlaceholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.employeeManagement.tableHeaders.employee')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.employeeManagement.tableHeaders.role')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.employeeManagement.tableHeaders.department')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sCMMS.employeeManagement.tableHeaders.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((emp, idx) => (
                <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-4 px-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-700 font-bold text-sm">
                      {emp.initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                      <div className="text-sm text-gray-500">{emp.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${emp.roleColor}`}>
                      {emp.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    <div className="text-sm text-gray-900">{emp.department}</div>
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

      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('sCMMS.employeeManagement.stats.title')}
        </h3>
        <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-4">
          {stats.map(stat => (
            <div
              key={stat.label}
              className={`rounded-xl flex flex-col items-center justify-center py-8 ${stat.color}`}
            >
              <div className="text-4xl mb-2">
                <Users size={30} />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement;

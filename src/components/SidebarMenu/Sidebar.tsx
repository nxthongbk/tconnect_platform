import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Package, Users, GearSix, HouseLine, Wrench, CalendarBlank } from '@phosphor-icons/react';
import BarChart3Icon from '~/pages/CMMS/CommonComponents/CustomIcons/BarChart3Icon';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();

const navItems = [
  {
    label: t('sCMMS.sidebar.dashboard'),
    icon: <HouseLine size={22} className="text-gray-300" />,
    to: '/dashboard',
  },
  {
    label: t('sCMMS.sidebar.equipments'),
    icon: <Wrench size={22} className="text-gray-300" />,
    to: '/equipments',
  },
  {
    label: t('sCMMS.sidebar.maintenance'),
    icon: <CalendarBlank size={22} className="text-gray-300" />,
    to: '/maintenance',
  },
  {
    label: t('sCMMS.sidebar.inventory'),
    icon: <Package size={22} className="text-gray-300" />,
    to: '/inventory',
  },
  {
    label: t('sCMMS.sidebar.reports'),
    icon: <BarChart3Icon className="text-gray-300 h-5 w-5" />,
    to: '/reports',
  },
  {
    label: t('sCMMS.sidebar.employees'),
    icon: <Users size={22} className="text-gray-300" />,
    to: '/employees',
  },
  {
    label: t('sCMMS.sidebar.settings'),
    icon: <GearSix size={22} className="text-gray-300" />,
    to: '/settings',
  },
];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && open) {
        setOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open]);

  return (
    <aside
      className={`h-screen bg-slate-900 text-white flex flex-col transition-all duration-300 ${open ? 'w-64' : 'w-16'}`}
    >
      <div
        className={`flex items-center py-6 border-b border-slate-700 transition-all duration-300 ${open ? 'px-6 gap-2' : 'px-0 justify-center'}`}
      >
        {open && (
          <div>
            <div className="text-xl font-bold">{t('sCMMS.title')}</div>
            <div className="text-slate-400 text-sm mt-1">{t('sCMMS.subTitle')}</div>
          </div>
        )}
        <button
          onClick={() => setOpen(o => !o)}
          className={`flex p-1 items-center justify-center w-8 h-8 rounded-lg hover:bg-[#232e47] transition-all duration-200 ${open ? 'ml-auto' : ''}`}
          type="button"
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
        >
          {open ? (
            <svg
              className="w-6 h-6 text-gray-400 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-400 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          )}
        </button>
      </div>
      <nav className="flex-1 py-4 px-2">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 text-sm transition-all duration-150 rounded-lg ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  } ${open ? '' : 'justify-center px-0'}`
                }
                end
              >
                <span className={open ? '' : 'w-6 h-6 flex items-center justify-center'}>
                  {item.icon}
                </span>
                {open && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className={`border-t border-[#232e47]  flex items-center gap-3 ${open ? ' px-6 py-3' : 'justify-center p-2'}`}
      >
        <div className={`w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center`}>
          <span className={`text-white font-bold text-xs`}>AD</span>
        </div>
        {open && (
          <div>
            <div className="text-sm font-semibold text-white">Admin User</div>
            <div className="text-xs text-gray-400">admin@factory.com</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

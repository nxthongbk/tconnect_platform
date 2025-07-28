import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ChartBar,
  Package,
  GearSix,
  Users,
  Cube,
  ShieldCheck,
  FileText,
  ListNumbers,
} from '@phosphor-icons/react';

const navItems = [
  {
    label: 'Dashboard',
    icon: <ChartBar size={24} />,
    to: '/dashboard',
  },
  {
    label: 'Đơn hàng SX',
    icon: <Package size={24} />,
    to: '/orders',
  },
  {
    label: 'Quy trình SX',
    icon: <ListNumbers size={24} />,
    to: '/process',
  },
  {
    label: 'Nhân viên',
    icon: <Users size={24} />,
    to: '/employees',
  },
  {
    label: 'Nguyên liệu',
    icon: <Cube size={24} />,
    to: '/materials',
  },
  {
    label: 'Thiết bị',
    icon: <GearSix size={24} />,
    to: '/devices',
  },
  {
    label: 'Kiểm tra CL',
    icon: <ShieldCheck size={24} />,
    to: '/quality',
  },
  {
    label: 'Báo cáo',
    icon: <FileText size={24} />,
    to: '/reports',
  },
];

interface SidebarProps {
  open: boolean;
  onToggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggleSidebar }) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && open) {
        onToggleSidebar();
      }
    };
    window.addEventListener('resize', handleResize);
    if (window.innerWidth < 1024 && open) {
      onToggleSidebar();
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [open, onToggleSidebar]);

  return (
    <aside
      className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${open ? 'w-64' : 'w-16'}`}
    >
      <div
        className={`flex items-center py-5 border-b border-gray-100 transition-all duration-300 ${open ? 'px-6 gap-2' : 'px-0 justify-center'}`}
      >
        <img
          src="/logo-energy.svg"
          alt="MES System"
          className={`w-9 h-9 ${open ? '' : 'mr-1 ml-6'}`}
        />
        {open && (
          <div className="ml-2">
            <div className="text-lg font-bold text-gray-900leading-tight">MES System</div>
            <div className="text-sm text-gray-500">Nhà máy may</div>
          </div>
        )}
        <button
          onClick={onToggleSidebar}
          className={`ml-auto flex p-1 items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-all duration-200 ${open ? '' : 'mr-0'}`}
          type="button"
        >
          <svg
            className={`w-6 h-6 text-gray-600 transition-transform duration-300 `}
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
        </button>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 font-mediumtransition-all duration-150 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  } ${open ? '' : 'justify-center px-0'}`
                }
                end
              >
                {item.icon}
                {open && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

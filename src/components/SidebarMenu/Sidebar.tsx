import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
  Home,
  Wrench,
  Calendar,
  Package,
  BarChart3,
  Users,
  Settings,
  Box,
  Shield,
  LogOut,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { AppContext } from '~/contexts/app.context';
import { useMutation, useQuery } from '@tanstack/react-query';
import authService from '~/services/auth.service';
import { clearCookie, getRefreshTokenFromCookie } from '~/utils/auth';
import { Avatar, Menu, MenuItem } from '@mui/material';
import fileStorageService from '~/services/fileStorage.service';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { reset } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { userInfo } = useContext(AppContext);

  const logoutMutation = useMutation({
    mutationFn: (query: { refreshToken: string }) => authService.logout(query),
  });

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const refreshToken = getRefreshTokenFromCookie();
    logoutMutation.mutate(
      { refreshToken },
      {
        onSettled: () => {
          clearCookie();
          reset();
          navigate('/');
        },
      }
    );
    handleMenuClose();
  };

  const navItems = [
    {
      label: t('sCMMS.sidebar.dashboard'),
      icon: <Home size={22} className="text-slate-400" />,
      to: '/dashboard',
    },
    {
      label: t('sCMMS.sidebar.equipments'),
      icon: <Wrench size={22} className="text-slate-400" />,
      to: '/equipments',
    },
    {
      label: t('sCMMS.sidebar.maintenance'),
      icon: <Calendar size={22} className="text-slate-400" />,
      to: '/maintenance',
    },
    {
      label: t('sCMMS.sidebar.inventory'),
      icon: <Package size={22} className="text-slate-400" />,
      to: '/inventory',
    },
    {
      label: '3D Factory',
      icon: <Box size={22} className="text-slate-400" />,
      to: '/factory',
    },
    {
      label: 'Blockchain IoT',
      icon: <Shield size={22} className="text-slate-400" />,
      to: '/blockchain',
    },
    {
      label: t('sCMMS.sidebar.reports'),
      icon: <BarChart3 className="text-slate-400 h-5 w-5" />,
      to: '/reports',
    },
    {
      label: t('sCMMS.sidebar.employees'),
      icon: <Users size={22} className="text-slate-400" />,
      to: '/employees',
    },
    {
      label: t('sCMMS.sidebar.settings'),
      icon: <Settings size={22} className="text-slate-400" />,
      to: '/settings',
    },
  ];

  const { data: img } = useQuery({
    queryKey: ['userImg', userInfo?.avatarUrl],
    queryFn: async () => {
      const res: any = await fileStorageService.getFileImage(userInfo?.avatarUrl);
      if (res !== undefined) {
        const url = URL.createObjectURL(res);
        return url;
      }
      return '';
    },
  });

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
      className={`h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl flex flex-col transition-all duration-300 ${open ? 'w-64' : 'w-16'}`}
    >
      <div
        className={`flex items-center py-6 border-b border-slate-700/50 transition-all duration-300 ${open ? 'px-6 gap-2' : 'px-0 justify-center'}`}
      >
        {open && (
          <div>
            <div className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {t('sCMMS.title')}
            </div>
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
      <nav className="flex-1 py-4 px-2 space-y-1">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 text-sm rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg transform scale-105'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white hover:transform hover:scale-102'
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
        className={`p-4 border-t border-slate-700/50 flex items-center gap-3 ${open ? 'px-6 py-3' : 'justify-center p-2'}`}
      >
        <Avatar
          onClick={open ? undefined : handleAvatarClick}
          className="!w-[36px] !h-[36px] cursor-pointer"
          alt={userInfo?.name || userInfo?.username}
          src={img}
          aria-controls={Boolean(anchorEl) ? 'sidebar-user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        />
        {open && (
          <div onClick={handleAvatarClick} className="cursor-pointer">
            <div className="text-sm font-semibold text-white">
              {userInfo?.name || userInfo?.username}
            </div>
            <div className="text-xs text-gray-400">{userInfo?.email}</div>
          </div>
        )}
        <Menu
          id="sidebar-user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{ sx: { minWidth: 220, bgcolor: '#232e47', color: 'white' } }}
        >
          <MenuItem onClick={handleLogout} sx={{ color: 'white' }}>
            <LogOut size={18} className="mr-2" />
            <div className="text-sm hover:text-slate-300">{t('signOut', 'Sign out')}</div>
          </MenuItem>
        </Menu>
      </div>
    </aside>
  );
};

export default Sidebar;

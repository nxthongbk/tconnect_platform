import { useState } from 'react';
import {
  Bell,
  User,
  House,
  ChartBar,
  Lightbulb,
  CurrencyDollar,
  Leaf,
  GearSix,
} from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', icon: <House className="mr-2" size={18} />, path: '/dashboard' },
  { label: 'Devices', icon: <GearSix className="mr-2" size={18} />, path: '/devices' },
  { label: 'Analytics', icon: <ChartBar className="mr-2" size={18} />, path: '/analytics' },
  {
    label: 'Recommendations',
    icon: <Lightbulb className="mr-2" size={18} />,
    path: '/recommendations',
  },
  { label: 'Costs', icon: <CurrencyDollar className="mr-2" size={18} />, path: '/costs' },
  {
    label: 'Environmental',
    icon: <Leaf className="mr-2" size={18} />,
    path: '/environmental',
  },
];

const TopMenu = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activePath = location.pathname === '/' ? '/dashboard' : location.pathname;

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-t-2xl mx-auto w-full shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">EnergyHub</h1>
          </div>
          {/* Desktop nav */}
          <nav className="hidden smallLaptop:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-lg font-semibold transition-all duration-200 ${
                  activePath === item.path
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </nav>
          {/* Mobile hamburger */}
          <button
            className="smallLaptop:hidden p-2 text-gray-300 hover:text-white transition-colors focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-300 hover:text-white transition-colors">
              <Bell className="w-6 h-6" weight="duotone" />
            </button>
            <button className="p-2 text-gray-300 hover:text-white transition-colors">
              <User className="w-6 h-6" weight="duotone" />
            </button>
          </div>
        </div>
        {/* Mobile nav dropdown */}
        {mobileOpen && (
          <nav className="flex flex-col smallLaptop:hidden mt-2 space-y-2 pb-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-base ${
                  activePath === item.path
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default TopMenu;

import { 
  Home, 
  Wrench, 
  Calendar, 
  Package, 
  BarChart3, 
  Users,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'equipment', label: 'Equipment', icon: Wrench },
  { id: 'maintenance', label: 'Maintenance', icon: Calendar },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen flex flex-col shadow-2xl">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Wrench className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Factory Manager
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm">Equipment & Inventory System</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    activeView === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg transform scale-105'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white hover:transform hover:scale-102'
                  }`}
                >
                  <Icon size={20} className={`${activeView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'} transition-colors`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-sm font-medium">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-slate-400">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}
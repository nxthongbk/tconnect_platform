import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Wifi,
  Monitor,
  Mail,
  Clock,
  Save,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    companyName: 'Factory Manager Pro',
    timezone: 'UTC+7',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    maintenanceAlerts: true,
    inventoryAlerts: true,
    systemAlerts: true,

    // Security Settings
    passwordPolicy: 'strong',
    sessionTimeout: 30,
    twoFactorAuth: false,
    loginAttempts: 5,

    // System Settings
    backupFrequency: 'daily',
    dataRetention: 365,
    maintenanceMode: false,
    debugMode: false,

    // Integration Settings
    apiEndpoint: 'https://api.factory-manager.com',
    apiKey: '••••••••••••••••',
    webhookUrl: '',
    syncInterval: 15,
  });

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'system', label: 'System', icon: Database },
    { id: 'integrations', label: 'Integrations', icon: Wifi },
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Simulate save operation
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      console.log('Resetting settings to default');
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'factory-manager-settings.json';
    link.click();
  };

  const SettingCard = ({ title, description, children }: any) => (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-current to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
      </div>
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
        {description && <p className="text-slate-600 mt-2 font-medium">{description}</p>}
      </div>
      {children}
    </div>
  );

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <SettingCard title="Company Information" description="Basic company and system information">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={settings.companyName}
              onChange={e => handleSettingChange('companyName', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                value={settings.timezone}
                onChange={e => handleSettingChange('timezone', e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="UTC+7">UTC+7 (Bangkok)</option>
                <option value="UTC+0">UTC+0 (London)</option>
                <option value="UTC-5">UTC-5 (New York)</option>
                <option value="UTC-8">UTC-8 (Los Angeles)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={settings.language}
                onChange={e => handleSettingChange('language', e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="th">ไทย</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Display Preferences" description="Customize how data is displayed">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select
              value={settings.dateFormat}
              onChange={e => handleSettingChange('dateFormat', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={settings.currency}
              onChange={e => handleSettingChange('currency', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="USD">USD ($)</option>
              <option value="THB">THB (฿)</option>
              <option value="EUR">EUR (€)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
        </div>
      </SettingCard>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <SettingCard
        title="Notification Channels"
        description="Choose how you want to receive notifications"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={e => handleSettingChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="text-green-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-600">Receive urgent alerts via SMS</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={e => handleSettingChange('smsNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Alert Types" description="Configure which events trigger notifications">
        <div className="space-y-4">
          {[
            {
              key: 'maintenanceAlerts',
              label: 'Maintenance Alerts',
              desc: 'Equipment maintenance due dates and schedules',
            },
            {
              key: 'inventoryAlerts',
              label: 'Inventory Alerts',
              desc: 'Low stock and reorder notifications',
            },
            {
              key: 'systemAlerts',
              label: 'System Alerts',
              desc: 'System errors and performance issues',
            },
          ].map(alert => (
            <div key={alert.key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{alert.label}</p>
                <p className="text-sm text-gray-600">{alert.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[alert.key as keyof typeof settings] as boolean}
                  onChange={e => handleSettingChange(alert.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </SettingCard>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <SettingCard
        title="Password Policy"
        description="Configure password requirements and security"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Strength
            </label>
            <select
              value={settings.passwordPolicy}
              onChange={e => handleSettingChange('passwordPolicy', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="basic">Basic (8+ characters)</option>
              <option value="strong">Strong (8+ chars, numbers, symbols)</option>
              <option value="very-strong">
                Very Strong (12+ chars, mixed case, numbers, symbols)
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={e => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="5"
                max="480"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Login Attempts
              </label>
              <input
                type="number"
                value={settings.loginAttempts}
                onChange={e => handleSettingChange('loginAttempts', parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="3"
                max="10"
              />
            </div>
          </div>
        </div>
      </SettingCard>

      <SettingCard
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="text-green-600" size={20} />
            <div>
              <p className="font-medium text-gray-900">Enable 2FA</p>
              <p className="text-sm text-gray-600">Require authentication code from mobile app</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={e => handleSettingChange('twoFactorAuth', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </SettingCard>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <SettingCard
        title="Backup & Data Retention"
        description="Configure automatic backups and data retention policies"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Backup Frequency
              </label>
              <select
                value={settings.backupFrequency}
                onChange={e => handleSettingChange('backupFrequency', e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Retention (days)
              </label>
              <input
                type="number"
                value={settings.dataRetention}
                onChange={e => handleSettingChange('dataRetention', parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="30"
                max="3650"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              <Download size={16} />
              Create Backup
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
              <Upload size={16} />
              Restore Backup
            </button>
          </div>
        </div>
      </SettingCard>

      <SettingCard
        title="System Maintenance"
        description="System maintenance and debugging options"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-orange-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Maintenance Mode</p>
                <p className="text-sm text-gray-600">Temporarily disable system for maintenance</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={e => handleSettingChange('maintenanceMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Monitor className="text-purple-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Debug Mode</p>
                <p className="text-sm text-gray-600">Enable detailed logging for troubleshooting</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.debugMode}
                onChange={e => handleSettingChange('debugMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </SettingCard>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <SettingCard
        title="API Configuration"
        description="Configure external API connections and webhooks"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Endpoint</label>
            <input
              type="url"
              value={settings.apiEndpoint}
              onChange={e => handleSettingChange('apiEndpoint', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://api.example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={settings.apiKey}
                onChange={e => handleSettingChange('apiKey', e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter API key"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
            <input
              type="url"
              value={settings.webhookUrl}
              onChange={e => handleSettingChange('webhookUrl', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://webhook.example.com/notify"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sync Interval (minutes)
            </label>
            <input
              type="number"
              value={settings.syncInterval}
              onChange={e => handleSettingChange('syncInterval', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              max="1440"
            />
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Connection Status" description="Monitor external service connections">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={20} />
              <span className="font-medium text-green-900">Database Connection</span>
            </div>
            <span className="text-sm text-green-600">Connected</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={20} />
              <span className="font-medium text-green-900">Email Service</span>
            </div>
            <span className="text-sm text-green-600">Connected</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-200">
            <div className="flex items-center gap-3">
              <Clock className="text-orange-600" size={20} />
              <span className="font-medium text-orange-900">External API</span>
            </div>
            <span className="text-sm text-orange-600">Connecting...</span>
          </div>
        </div>
      </SettingCard>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'system':
        return renderSystemSettings();
      case 'integrations':
        return renderIntegrationSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight"
            style={{ marginBottom: 0, paddingBottom: 2 }}
          >
            System Settings
          </h1>
          <p className="text-slate-600 mt-2 text-xl font-medium">
            Configure system preferences and integrations
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            Export
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-xl hover:bg-red-50 transition-colors"
          >
            <RefreshCw size={16} />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Navigation */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-3">
            <nav className="space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">{renderTabContent()}</div>
      </div>
    </div>
  );
}

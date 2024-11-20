import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Save, AlertCircle } from 'lucide-react';

interface DaycareSettings {
  general: {
    name: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    description: string;
  };
  capacity: {
    infants: number;
    toddlers: number;
    preschool: number;
    total: number;
  };
  hours: {
    monday: { open: string; close: string };
    tuesday: { open: string; close: string };
    wednesday: { open: string; close: string };
    thursday: { open: string; close: string };
    friday: { open: string; close: string };
  };
  pricing: {
    hourlyRate: number;
    registrationFee: number;
    deposit: number;
  };
  notifications: {
    emailUpdates: boolean;
    smsAlerts: boolean;
    parentAppNotifications: boolean;
    automaticReminders: boolean;
  };
}

// Mock data
const mockSettings: DaycareSettings = {
  general: {
    name: 'Sunshine Daycare Center',
    email: 'contact@sunshinedaycare.com',
    phone: '+352 621 123 456',
    address: '123 Main Street, L-1234 Luxembourg',
    website: 'www.sunshinedaycare.com',
    description: 'A nurturing environment for children to learn and grow.'
  },
  capacity: {
    infants: 10,
    toddlers: 15,
    preschool: 20,
    total: 45
  },
  hours: {
    monday: { open: '07:00', close: '18:00' },
    tuesday: { open: '07:00', close: '18:00' },
    wednesday: { open: '07:00', close: '18:00' },
    thursday: { open: '07:00', close: '18:00' },
    friday: { open: '07:00', close: '18:00' }
  },
  pricing: {
    hourlyRate: 15,
    registrationFee: 100,
    deposit: 500
  },
  notifications: {
    emailUpdates: true,
    smsAlerts: true,
    parentAppNotifications: true,
    automaticReminders: true
  }
};

const DaycareSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<DaycareSettings>(mockSettings);
  const [activeTab, setActiveTab] = useState<'general' | 'capacity' | 'hours' | 'pricing' | 'notifications'>('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      // API call to save settings would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const handleChange = (section: keyof DaycareSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Daycare Settings</h1>
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          <Save className="h-4 w-4 mr-2" />
          {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {saveStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          Settings saved successfully!
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          Failed to save settings. Please try again.
        </div>
      )}

      {/* Settings Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['general', 'capacity', 'hours', 'pricing', 'notifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Daycare Name</label>
                  <input
                    type="text"
                    value={settings.general.name}
                    onChange={(e) => handleChange('general', 'name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={settings.general.email}
                    onChange={(e) => handleChange('general', 'email', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={settings.general.phone}
                    onChange={(e) => handleChange('general', 'phone', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Website</label>
                  <input
                    type="url"
                    value={settings.general.website}
                    onChange={(e) => handleChange('general', 'website', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={settings.general.address}
                    onChange={(e) => handleChange('general', 'address', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    rows={4}
                    value={settings.general.description}
                    onChange={(e) => handleChange('general', 'description', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'capacity' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Infants Capacity</label>
                  <input
                    type="number"
                    value={settings.capacity.infants}
                    onChange={(e) => handleChange('capacity', 'infants', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Toddlers Capacity</label>
                  <input
                    type="number"
                    value={settings.capacity.toddlers}
                    onChange={(e) => handleChange('capacity', 'toddlers', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preschool Capacity</label>
                  <input
                    type="number"
                    value={settings.capacity.preschool}
                    onChange={(e) => handleChange('capacity', 'preschool', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Capacity</label>
                  <input
                    type="number"
                    value={settings.capacity.total}
                    onChange={(e) => handleChange('capacity', 'total', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hours' && (
            <div className="space-y-6">
              {Object.entries(settings.hours).map(([day, hours]) => (
                <div key={day} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {day} Opening Time
                    </label>
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) => handleChange('hours', day, { ...hours, open: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {day} Closing Time
                    </label>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) => handleChange('hours', day, { ...hours, close: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hourly Rate (€)</label>
                  <input
                    type="number"
                    value={settings.pricing.hourlyRate}
                    onChange={(e) => handleChange('pricing', 'hourlyRate', parseFloat(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Registration Fee (€)</label>
                  <input
                    type="number"
                    value={settings.pricing.registrationFee}
                    onChange={(e) => handleChange('pricing', 'registrationFee', parseFloat(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Deposit (€)</label>
                  <input
                    type="number"
                    value={settings.pricing.deposit}
                    onChange={(e) => handleChange('pricing', 'deposit', parseFloat(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleChange('notifications', key, e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaycareSettingsPage; 
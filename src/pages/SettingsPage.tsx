import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Lock, User, Globe, Mail, Phone, Shield } from 'lucide-react';

interface NotificationSettings {
  email: {
    dailyUpdates: boolean;
    absenceAlerts: boolean;
    messageNotifications: boolean;
    newsAndUpdates: boolean;
  };
  push: {
    dailyUpdates: boolean;
    absenceAlerts: boolean;
    messageNotifications: boolean;
    newsAndUpdates: boolean;
  };
}

interface ProfileSettings {
  name: string;
  email: string;
  phone: string;
  language: string;
  timezone: string;
}

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: {
      dailyUpdates: true,
      absenceAlerts: true,
      messageNotifications: true,
      newsAndUpdates: false
    },
    push: {
      dailyUpdates: true,
      absenceAlerts: true,
      messageNotifications: true,
      newsAndUpdates: false
    }
  });

  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    name: user?.profile?.name || '',
    email: user?.email || '',
    phone: user?.profile?.phone || '',
    language: 'English',
    timezone: 'Europe/Luxembourg'
  });

  const handleNotificationChange = (channel: 'email' | 'push', setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [setting]: !prev[channel][setting as keyof typeof prev.email]
      }
    }));
  };

  const handleProfileChange = (field: keyof ProfileSettings, value: string) => {
    setProfileSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // Save profile settings to backend
    console.log('Saving profile settings:', profileSettings);
  };

  const handleSaveNotifications = () => {
    // Save notification settings to backend
    console.log('Saving notification settings:', notificationSettings);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User className="inline-block mr-2 h-5 w-5" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Bell className="inline-block mr-2 h-5 w-5" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'security'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Shield className="inline-block mr-2 h-5 w-5" />
              Security
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={profileSettings.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    value={profileSettings.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Language</label>
                  <select
                    value={profileSettings.language}
                    onChange={(e) => handleProfileChange('language', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Luxembourgish">Luxembourgish</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                <div className="mt-4 space-y-4">
                  {Object.entries(notificationSettings.email).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleNotificationChange('email', key)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label className="ml-3 text-sm text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
                <div className="mt-4 space-y-4">
                  {Object.entries(notificationSettings.push).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleNotificationChange('push', key)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label className="ml-3 text-sm text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveNotifications}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-medium text-gray-900">Change Password</h4>
                      <p className="mt-1 text-sm text-gray-500">Update your password regularly to keep your account secure.</p>
                    </div>
                    <button className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Change
                    </button>
                  </div>
                </div>

                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="mt-1 text-sm text-gray-500">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="bg-indigo-600 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-medium text-gray-900">Delete Account</h4>
                      <p className="mt-1 text-sm text-gray-500">Permanently delete your account and all associated data.</p>
                    </div>
                    <button className="bg-red-600 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, Building2, AlertTriangle, Activity } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Users', value: '2,345', icon: <Users />, change: '+12%' },
    { title: 'Active Daycares', value: '156', icon: <Building2 />, change: '+5%' },
    { title: 'Pending Verifications', value: '23', icon: <AlertTriangle />, change: '-' },
    { title: 'Monthly Activity', value: '12.5K', icon: <Activity />, change: '+8%' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user?.profile?.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-indigo-600">{stat.icon}</div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
            {/* Add activity list here */}
          </div>

          {/* Pending Actions */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Actions</h2>
            {/* Add pending actions list here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 
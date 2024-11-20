import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Home,
  FileText,
  UserCog,
  Bell
} from 'lucide-react';

const DaycareLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Overview', href: '/provider-dashboard', icon: Home },
    { name: 'Children', href: '/provider-dashboard/children', icon: Users },
    { name: 'Messages', href: '/provider-dashboard/messages', icon: MessageSquare },
    { name: 'Staff', href: '/provider-dashboard/staff', icon: UserCog },
    { name: 'Schedule', href: '/provider-dashboard/schedule', icon: Calendar },
    { name: 'Documents', href: '/provider-dashboard/documents', icon: FileText },
  ];

  const isActive = (path: string) => {
    if (path === '/provider-dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen fixed">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                {user?.profile?.name?.charAt(0) || 'D'}
              </div>
              <div>
                <div className="font-medium">{user?.profile?.name}</div>
                <div className="text-sm text-gray-500">{user?.email}</div>
              </div>
            </div>

            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive(item.href)
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t pt-4 mt-4 p-4">
            <Link
              to="/provider-dashboard/settings"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive('/provider-dashboard/settings')
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 w-full"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64">
          {/* Top navigation */}
          <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-end">
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <Bell className="h-6 w-6" />
                  </button>
                  <div className="h-8 w-px bg-gray-200" />
                  <div className="relative">
                    <button className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                        {user?.profile?.name?.charAt(0) || 'D'}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="py-6 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DaycareLayout; 
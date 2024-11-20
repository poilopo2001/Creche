import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Bell, 
  FileText, 
  Users, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Calendar as CalendarIcon,
  MessageSquare
} from 'lucide-react';

// Mock data for testing
const mockRecentActivity = [
  {
    id: '1',
    type: 'message',
    content: 'New message from Sunshine Daycare',
    time: '2 hours ago',
    status: 'unread'
  },
  {
    id: '2',
    type: 'attendance',
    content: 'Emma was marked present today',
    time: '4 hours ago',
    status: 'read'
  },
  {
    id: '3',
    type: 'document',
    content: 'Medical certificate uploaded',
    time: '1 day ago',
    status: 'read'
  }
];

const mockUpcomingEvents = [
  {
    id: '1',
    title: 'Parent-Teacher Meeting',
    date: '2024-03-25',
    time: '14:00',
    location: 'Sunshine Daycare'
  },
  {
    id: '2',
    title: 'Daycare Tour',
    date: '2024-03-28',
    time: '10:00',
    location: 'Rainbow Kids Center'
  }
];

const mockStats = [
  {
    id: '1',
    title: 'Children',
    value: '2',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Attendance Rate',
    value: '95%',
    icon: CheckCircle,
    color: 'bg-green-500'
  },
  {
    id: '3',
    title: 'Upcoming Events',
    value: '3',
    icon: CalendarIcon,
    color: 'bg-purple-500'
  },
  {
    id: '4',
    title: 'Unread Messages',
    value: '2',
    icon: MessageSquare,
    color: 'bg-yellow-500'
  }
];

const mockNotifications = [
  {
    id: '1',
    title: 'Document Expiring',
    message: 'Medical certificate expires in 2 weeks',
    type: 'warning',
    time: '1 hour ago'
  },
  {
    id: '2',
    title: 'New Message',
    message: 'New message from Sunshine Daycare',
    type: 'info',
    time: '2 hours ago'
  }
];

const DashboardPage: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <Link
                to="/dashboard/children"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Manage Children
              </Link>
              <Link
                to="/search"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Find Daycare
              </Link>
              <Link
                to="/dashboard/schedule"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Schedule Tour
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <div className="mt-4 space-y-4">
              {mockRecentActivity.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                  {activity.type === 'message' && <Bell className="h-5 w-5 text-blue-500" />}
                  {activity.type === 'attendance' && <Clock className="h-5 w-5 text-green-500" />}
                  {activity.type === 'document' && <FileText className="h-5 w-5 text-purple-500" />}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${activity.status === 'unread' ? 'font-semibold text-gray-900' : 'text-gray-800'}`}>
                      {activity.content}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  {activity.status === 'unread' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      New
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
            <div className="mt-4 space-y-4">
              {mockUpcomingEvents.map(event => (
                <div key={event.id} className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                  <p className="text-xs text-gray-500">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end p-4 z-50">
          <div className="bg-white w-96 rounded-lg shadow-xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Notifications</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
            <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
              {mockNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg ${
                    notification.type === 'warning'
                      ? 'bg-yellow-50'
                      : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-start">
                    {notification.type === 'warning' ? (
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <Bell className="h-5 w-5 text-blue-400" />
                    )}
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
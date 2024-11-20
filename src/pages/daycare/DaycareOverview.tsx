import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  Calendar,
  MessageSquare,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  UserCheck
} from 'lucide-react';

// Mock data
const mockStats = [
  {
    id: '1',
    name: 'Total Children',
    value: '45',
    change: '+2',
    changeType: 'increase',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Staff Members',
    value: '12',
    change: '0',
    changeType: 'neutral',
    icon: UserCheck,
    color: 'bg-purple-500'
  },
  {
    id: '3',
    name: 'Attendance Rate',
    value: '95%',
    change: '+2%',
    changeType: 'increase',
    icon: CheckCircle,
    color: 'bg-green-500'
  },
  {
    id: '4',
    name: 'Waitlist',
    value: '8',
    change: '+1',
    changeType: 'increase',
    icon: Clock,
    color: 'bg-yellow-500'
  }
];

const mockRecentActivity = [
  {
    id: '1',
    type: 'attendance',
    content: 'Emma Smith checked in',
    timestamp: '2 minutes ago',
    status: 'success'
  },
  {
    id: '2',
    type: 'message',
    content: 'New message from parent John Doe',
    timestamp: '15 minutes ago',
    status: 'info'
  },
  {
    id: '3',
    type: 'alert',
    content: 'Medical form expiring for Lucas Brown',
    timestamp: '1 hour ago',
    status: 'warning'
  }
];

const mockUpcomingEvents = [
  {
    id: '1',
    title: 'Parent-Teacher Meeting',
    date: '2024-03-25',
    time: '14:00',
    attendees: 12
  },
  {
    id: '2',
    title: 'Facility Inspection',
    date: '2024-03-28',
    time: '10:00',
    priority: 'high'
  },
  {
    id: '3',
    title: 'Staff Training',
    date: '2024-03-30',
    time: '09:00',
    attendees: 8
  }
];

const DaycareOverview: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        {stat.change && (
                          <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === 'increase' ? 'text-green-600' : 
                            stat.changeType === 'decrease' ? 'text-red-600' : 
                            'text-gray-500'
                          }`}>
                            {stat.change}
                          </div>
                        )}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                {mockRecentActivity.map((activity, index) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {index !== mockRecentActivity.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            activity.status === 'success' ? 'bg-green-500' :
                            activity.status === 'warning' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`}>
                            {activity.type === 'attendance' && <CheckCircle className="h-5 w-5 text-white" />}
                            {activity.type === 'message' && <MessageSquare className="h-5 w-5 text-white" />}
                            {activity.type === 'alert' && <AlertCircle className="h-5 w-5 text-white" />}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">{activity.content}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {activity.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockUpcomingEvents.map(event => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                    <div className="mt-1 text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                    {event.attendees && (
                      <div className="mt-1 text-xs text-gray-500">
                        {event.attendees} attendees
                      </div>
                    )}
                  </div>
                  {event.priority === 'high' && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      High Priority
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaycareOverview; 
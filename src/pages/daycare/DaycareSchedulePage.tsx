import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Edit2, Trash2 } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  type: 'daily' | 'special' | 'meal' | 'nap';
  startTime: string;
  endTime: string;
  group: string;
  description?: string;
  staff: string[];
}

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'event' | 'holiday' | 'parent-meeting';
  description?: string;
  participants?: string[];
}

// Mock data
const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Morning Circle',
    type: 'daily',
    startTime: '09:00',
    endTime: '09:30',
    group: 'Toddlers',
    description: 'Morning songs and greetings',
    staff: ['Marie Dubois', 'Sophie Meyer']
  },
  {
    id: '2',
    title: 'Lunch Time',
    type: 'meal',
    startTime: '11:30',
    endTime: '12:30',
    group: 'Toddlers',
    staff: ['Marie Dubois', 'Sophie Meyer']
  },
  {
    id: '3',
    title: 'Nap Time',
    type: 'nap',
    startTime: '12:30',
    endTime: '14:30',
    group: 'Toddlers',
    staff: ['Sophie Meyer']
  }
];

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Festival',
    date: '2024-06-15',
    type: 'event',
    description: 'Annual summer celebration with families',
    participants: ['All Groups']
  },
  {
    id: '2',
    title: 'Parent-Teacher Meetings',
    date: '2024-03-25',
    type: 'parent-meeting',
    description: 'Individual meetings with parents'
  }
];

const DaycareSchedulePage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('monday');

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const groups = ['all', 'Infants', 'Toddlers', 'Preschool'];

  const handleAddActivity = () => {
    // Handle adding new activity
  };

  const handleEditActivity = (id: string) => {
    // Handle editing activity
  };

  const handleDeleteActivity = (id: string) => {
    // Handle deleting activity
  };

  const handleAddEvent = () => {
    // Handle adding new event
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleAddEvent}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Add Event
          </button>
          <button
            onClick={handleAddActivity}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </button>
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Daily Schedule</h2>
        </div>
        <div className="p-6">
          <div className="mb-6 flex space-x-4">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {groups.map(group => (
                <option key={group} value={group}>
                  {group === 'all' ? 'All Groups' : group}
                </option>
              ))}
            </select>
            <div className="flex rounded-md shadow-sm">
              {days.map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedDay === day
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } ${
                    day === days[0] ? 'rounded-l-md' : ''
                  } ${
                    day === days[days.length - 1] ? 'rounded-r-md' : ''
                  } border`}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {activities
              .filter(activity => selectedGroup === 'all' || activity.group === selectedGroup)
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map(activity => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-md ${
                      activity.type === 'daily' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'meal' ? 'bg-green-100 text-green-600' :
                      activity.type === 'nap' ? 'bg-purple-100 text-purple-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                      <div className="mt-1 text-xs text-gray-500">
                        {activity.startTime} - {activity.endTime}
                      </div>
                      {activity.description && (
                        <p className="mt-1 text-sm text-gray-500">{activity.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-2">
                      {activity.staff.map((staff, index) => (
                        <div
                          key={index}
                          className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border-2 border-white"
                          title={staff}
                        >
                          {staff.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditActivity(activity.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {events
              .sort((a, b) => a.date.localeCompare(b.date))
              .map(event => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-md ${
                        event.type === 'event' ? 'bg-green-100 text-green-600' :
                        event.type === 'holiday' ? 'bg-blue-100 text-blue-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                        <div className="mt-1 text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    {event.description && (
                      <p className="mt-2 text-sm text-gray-500 ml-11">{event.description}</p>
                    )}
                  </div>
                  {event.participants && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-5 w-5 mr-2" />
                      {event.participants.join(', ')}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaycareSchedulePage; 
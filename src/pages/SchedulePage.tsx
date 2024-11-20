import React, { useState } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, Plus } from 'lucide-react';
import TourSchedulingModal from '../components/scheduling/TourSchedulingModal';
import AbsenceReportingModal from '../components/scheduling/AbsenceReportingModal';

interface Tour {
  id: string;
  daycareName: string;
  date: string;
  time: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface WaitlistEntry {
  id: string;
  daycareName: string;
  childName: string;
  position: number;
  appliedDate: string;
  estimatedWait: string;
  status: 'active' | 'offered' | 'expired';
  lastUpdated: string;
  movementHistory: {
    date: string;
    oldPosition: number;
    newPosition: number;
  }[];
}

interface ScheduleChange {
  id: string;
  type: 'absence' | 'late' | 'early_pickup';
  date: string;
  childName: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

// Mock data
const mockTours: Tour[] = [
  {
    id: '1',
    daycareName: 'Sunshine Daycare',
    date: '2024-03-25',
    time: '14:00',
    location: '123 Main St, Luxembourg',
    status: 'scheduled',
    notes: 'Please arrive 10 minutes early'
  }
];

const mockWaitlist: WaitlistEntry[] = [
  {
    id: '1',
    daycareName: 'Rainbow Kids Center',
    childName: 'Emma Smith',
    position: 3,
    appliedDate: '2024-02-15',
    estimatedWait: '2-3 months',
    status: 'active',
    lastUpdated: '2024-03-15',
    movementHistory: [
      {
        date: '2024-03-15',
        oldPosition: 4,
        newPosition: 3
      },
      {
        date: '2024-03-01',
        oldPosition: 5,
        newPosition: 4
      }
    ]
  }
];

const mockScheduleChanges: ScheduleChange[] = [
  {
    id: '1',
    type: 'absence',
    date: '2024-03-20',
    childName: 'Emma Smith',
    status: 'pending',
    notes: 'Doctor appointment'
  }
];

const SchedulePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tours' | 'waitlist' | 'changes'>('tours');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAbsenceModal, setShowAbsenceModal] = useState(false);
  const [tours, setTours] = useState<Tour[]>(mockTours);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(mockWaitlist);
  const [scheduleChanges, setScheduleChanges] = useState<ScheduleChange[]>(mockScheduleChanges);
  const [selectedWaitlistEntry, setSelectedWaitlistEntry] = useState<WaitlistEntry | null>(null);

  const handleScheduleTour = (data: { daycare: string; date: string; time: string; notes: string }) => {
    const newTour: Tour = {
      id: `tour-${Date.now()}`,
      daycareName: mockDaycares.find(d => d.id === data.daycare)?.name || '',
      date: data.date,
      time: data.time,
      location: mockDaycares.find(d => d.id === data.daycare)?.location || '',
      status: 'scheduled',
      notes: data.notes
    };
    setTours(prev => [...prev, newTour]);
    setShowScheduleModal(false);
  };

  const handleReportAbsence = (data: {
    childName: string;
    date: string;
    type: 'absence' | 'late' | 'early_pickup';
    notes: string;
  }) => {
    const newChange: ScheduleChange = {
      id: `change-${Date.now()}`,
      ...data,
      status: 'pending'
    };
    setScheduleChanges(prev => [...prev, newChange]);
    setShowAbsenceModal(false);
  };

  const handleViewWaitlistHistory = (entry: WaitlistEntry) => {
    setSelectedWaitlistEntry(entry);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAbsenceModal(true)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Report Absence
          </button>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Tour
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('tours')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tours'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tours
          </button>
          <button
            onClick={() => setActiveTab('waitlist')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'waitlist'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Waitlist
          </button>
          <button
            onClick={() => setActiveTab('changes')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'changes'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Schedule Changes
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg">
        {activeTab === 'tours' && (
          <div className="divide-y divide-gray-200">
            {tours.map(tour => (
              <div key={tour.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Calendar className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{tour.daycareName}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(tour.date).toLocaleDateString()} at {tour.time}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {tour.location}
                      </div>
                      {tour.notes && (
                        <p className="mt-2 text-sm text-gray-500">{tour.notes}</p>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    tour.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                    tour.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {tour.status.charAt(0).toUpperCase() + tour.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'waitlist' && (
          <div className="divide-y divide-gray-200">
            {waitlist.map(entry => (
              <div key={entry.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{entry.daycareName}</h3>
                    <div className="mt-1 text-sm text-gray-500">
                      Child: {entry.childName}
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <span className="text-indigo-600 font-medium">
                        Position: #{entry.position}
                      </span>
                      <span className="text-gray-500">
                        Applied: {new Date(entry.appliedDate).toLocaleDateString()}
                      </span>
                      <span className="text-gray-500">
                        Est. Wait: {entry.estimatedWait}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Last Updated: {new Date(entry.lastUpdated).toLocaleDateString()}
                    </div>
                    {entry.movementHistory.length > 0 && (
                      <button
                        onClick={() => handleViewWaitlistHistory(entry)}
                        className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        View Position History
                      </button>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    entry.status === 'active' ? 'bg-green-100 text-green-800' :
                    entry.status === 'offered' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                  </span>
                </div>

                {/* Position History */}
                {selectedWaitlistEntry?.id === entry.id && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Position History</h4>
                    <div className="space-y-2">
                      {entry.movementHistory.map((movement, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <span className="text-gray-500">
                            {new Date(movement.date).toLocaleDateString()}:
                          </span>
                          <span className="ml-2">
                            Position moved from #{movement.oldPosition} to #{movement.newPosition}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'changes' && (
          <div className="divide-y divide-gray-200">
            {scheduleChanges.map(change => (
              <div key={change.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {change.type === 'absence' ? 'Absence' :
                         change.type === 'late' ? 'Late Arrival' :
                         'Early Pickup'}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        change.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        change.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {change.status.charAt(0).toUpperCase() + change.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      Child: {change.childName}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      Date: {new Date(change.date).toLocaleDateString()}
                    </div>
                    {change.notes && (
                      <p className="mt-2 text-sm text-gray-500">{change.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showScheduleModal && (
        <TourSchedulingModal
          onClose={() => setShowScheduleModal(false)}
          onSchedule={handleScheduleTour}
        />
      )}

      {showAbsenceModal && (
        <AbsenceReportingModal
          onClose={() => setShowAbsenceModal(false)}
          onSubmit={handleReportAbsence}
        />
      )}
    </div>
  );
};

export default SchedulePage; 
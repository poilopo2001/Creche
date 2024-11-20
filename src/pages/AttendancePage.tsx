import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, AlertCircle, Check, X } from 'lucide-react';

interface Attendance {
  id: string;
  childName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

// Mock data
const mockAttendance: Attendance[] = [
  {
    id: '1',
    childName: 'Emma Smith',
    date: '2024-03-18',
    checkIn: '08:30',
    checkOut: '17:00',
    status: 'present'
  },
  {
    id: '2',
    childName: 'Emma Smith',
    date: '2024-03-19',
    checkIn: '09:15',
    checkOut: '17:30',
    status: 'late',
    notes: 'Traffic delay'
  },
  {
    id: '3',
    childName: 'Emma Smith',
    date: '2024-03-20',
    status: 'excused',
    notes: 'Doctor appointment'
  }
];

const AttendancePage: React.FC = () => {
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [showAbsenceForm, setShowAbsenceForm] = useState(false);
  const [absenceDate, setAbsenceDate] = useState('');
  const [absenceNotes, setAbsenceNotes] = useState('');

  const getStatusColor = (status: Attendance['status']) => {
    switch (status) {
      case 'present':
        return 'text-green-600 bg-green-100';
      case 'absent':
        return 'text-red-600 bg-red-100';
      case 'late':
        return 'text-yellow-600 bg-yellow-100';
      case 'excused':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: Attendance['status']) => {
    switch (status) {
      case 'present':
        return <Check size={16} />;
      case 'absent':
        return <X size={16} />;
      case 'late':
        return <Clock size={16} />;
      case 'excused':
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  const handleAbsenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAbsence: Attendance = {
      id: `abs-${Date.now()}`,
      childName: 'Emma Smith',
      date: absenceDate,
      status: 'excused',
      notes: absenceNotes
    };
    setAttendance(prev => [...prev, newAbsence]);
    setShowAbsenceForm(false);
    setAbsenceDate('');
    setAbsenceNotes('');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your child's attendance and manage absences
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          onClick={() => setShowAbsenceForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Report Absence
        </button>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {['present', 'absent', 'late', 'excused'].map((status) => (
          <div key={status} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 capitalize">{status}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status as Attendance['status'])}`}>
                {attendance.filter(a => a.status === status).length}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendance.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        <span className="ml-1 capitalize">{record.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.checkIn || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.checkOut || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {record.notes || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Absence Form Modal */}
      {showAbsenceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Report Absence</h3>
            <form onSubmit={handleAbsenceSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={absenceDate}
                    onChange={(e) => setAbsenceDate(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    value={absenceNotes}
                    onChange={(e) => setAbsenceNotes(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Reason for absence..."
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAbsenceForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendancePage; 
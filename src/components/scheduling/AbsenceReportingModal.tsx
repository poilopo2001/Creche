import React, { useState } from 'react';
import { X, Calendar, Clock, AlertCircle } from 'lucide-react';

interface AbsenceReportingModalProps {
  onClose: () => void;
  onSubmit: (data: {
    childName: string;
    date: string;
    type: 'absence' | 'late' | 'early_pickup';
    notes: string;
  }) => void;
}

const mockChildren = [
  { id: '1', name: 'Emma Smith' },
  { id: '2', name: 'Lucas Brown' },
];

const AbsenceReportingModal: React.FC<AbsenceReportingModalProps> = ({ onClose, onSubmit }) => {
  const [selectedChild, setSelectedChild] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'absence' | 'late' | 'early_pickup'>('absence');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const childName = mockChildren.find(c => c.id === selectedChild)?.name || '';
    onSubmit({ childName, date, type, notes });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Report Absence</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Child Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Child
            </label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a child</option>
              {mockChildren.map(child => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setType('absence')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  type === 'absence'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Full Day Absence
              </button>
              <button
                type="button"
                onClick={() => setType('late')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  type === 'late'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Late Arrival
              </button>
              <button
                type="button"
                onClick={() => setType('early_pickup')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  type === 'early_pickup'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Early Pickup
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Reason for absence..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
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
        </form>
      </div>
    </div>
  );
};

export default AbsenceReportingModal; 
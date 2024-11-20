import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle } from 'lucide-react';

interface WaitlistFormProps {
  daycareId: string;
  onJoined: () => void;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ daycareId, onJoined }) => {
  const [childAge, setChildAge] = useState('');
  const [startDate, setStartDate] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const { user } = useAuth();
  const { loading, error, request } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await request('post', '/waitlist/join', {
        daycareId,
        parentId: user?.id,
        childAge,
        startDate,
        specialRequirements
      });
      onJoined();
    } catch (err) {
      console.error('Failed to join waitlist:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Join Waitlist</h3>
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Child's Age
          </label>
          <input
            type="text"
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 2 years"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Desired Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Requirements
          </label>
          <textarea
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Any dietary restrictions, medical conditions, or other special needs..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>
    </div>
  );
};

export default WaitlistForm; 
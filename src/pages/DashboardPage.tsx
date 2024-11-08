import React, { useState } from 'react';
import { User, Calendar, MessageSquare, Settings, LogOut, Bell, PlusCircle, Edit2, X } from 'lucide-react';

interface Child {
  id: number;
  age: number;
  specialNeeds: string;
}

interface FamilyProfile {
  children: Child[];
  location: string;
  desiredHours: string;
  budget: string;
  dietaryRequirements: string[];
  educationalPreferences: string[];
  alerts: { id: number; criteria: string }[];
}

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [familyProfile, setFamilyProfile] = useState<FamilyProfile>({
    children: [
      { id: 1, age: 3, specialNeeds: 'None' },
      { id: 2, age: 5, specialNeeds: 'Gluten allergy' }
    ],
    location: 'Luxembourg City',
    desiredHours: '8:00 AM - 6:00 PM',
    budget: '1000-1500 EUR/month',
    dietaryRequirements: ['Gluten-free'],
    educationalPreferences: ['Montessori'],
    alerts: [
      { id: 1, criteria: 'New openings in Luxembourg City' },
      { id: 2, criteria: 'Montessori daycares with gluten-free options' }
    ]
  });

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState<FamilyProfile>(familyProfile);
  const [newChild, setNewChild] = useState<Omit<Child, 'id'>>({ age: 0, specialNeeds: '' });

  const handleEditProfile = () => {
    setEditedProfile(familyProfile);
    setIsEditProfileModalOpen(true);
  };

  const handleSaveProfile = () => {
    setFamilyProfile(editedProfile);
    setIsEditProfileModalOpen(false);
  };

  const handleAddChild = () => {
    setIsAddChildModalOpen(true);
  };

  const handleSaveChild = () => {
    const newId = Math.max(...familyProfile.children.map(c => c.id), 0) + 1;
    setFamilyProfile(prev => ({
      ...prev,
      children: [...prev.children, { ...newChild, id: newId }]
    }));
    setIsAddChildModalOpen(false);
    setNewChild({ age: 0, specialNeeds: '' });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Family Profile</h2>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Doe Family</h3>
                <button className="btn btn-secondary flex items-center" onClick={handleEditProfile}>
                  <Edit2 size={16} className="mr-2" />
                  Edit Profile
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" className="input w-full" value={familyProfile.location} readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Desired Hours</label>
                  <input type="text" className="input w-full" value={familyProfile.desiredHours} readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                  <input type="text" className="input w-full" value={familyProfile.budget} readOnly />
                </div>
              </div>
              <h4 className="font-semibold mb-2">Children</h4>
              <ul className="list-disc pl-5 mb-4">
                {familyProfile.children.map(child => (
                  <li key={child.id}>
                    {child.age} years old - Special needs: {child.specialNeeds}
                  </li>
                ))}
              </ul>
              <button className="btn btn-secondary mb-4 flex items-center" onClick={handleAddChild}>
                <PlusCircle size={16} className="mr-2" />
                Add Child
              </button>
              <h4 className="font-semibold mb-2">Dietary Requirements</h4>
              <ul className="list-disc pl-5 mb-4">
                {familyProfile.dietaryRequirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
              <h4 className="font-semibold mb-2">Educational Preferences</h4>
              <ul className="list-disc pl-5 mb-4">
                {familyProfile.educationalPreferences.map((pref, index) => (
                  <li key={index}>{pref}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      // ... (rest of the cases remain unchanged)
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">My Family Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar navigation remains unchanged */}
          <div className="w-full md:w-3/4">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Edit Family Profile</h2>
              <button onClick={() => setIsEditProfileModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  className="input w-full"
                  value={editedProfile.location}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Desired Hours</label>
                <input
                  type="text"
                  className="input w-full"
                  value={editedProfile.desiredHours}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, desiredHours: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                <input
                  type="text"
                  className="input w-full"
                  value={editedProfile.budget}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, budget: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Requirements</label>
                <input
                  type="text"
                  className="input w-full"
                  value={editedProfile.dietaryRequirements.join(', ')}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, dietaryRequirements: e.target.value.split(', ') }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Educational Preferences</label>
                <input
                  type="text"
                  className="input w-full"
                  value={editedProfile.educationalPreferences.join(', ')}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, educationalPreferences: e.target.value.split(', ') }))}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="btn btn-secondary mr-2" onClick={() => setIsEditProfileModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveProfile}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Child Modal */}
      {isAddChildModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Add Child</h2>
              <button onClick={() => setIsAddChildModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  className="input w-full"
                  value={newChild.age}
                  onChange={(e) => setNewChild(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Needs</label>
                <input
                  type="text"
                  className="input w-full"
                  value={newChild.specialNeeds}
                  onChange={(e) => setNewChild(prev => ({ ...prev, specialNeeds: e.target.value }))}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="btn btn-secondary mr-2" onClick={() => setIsAddChildModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveChild}>Add Child</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
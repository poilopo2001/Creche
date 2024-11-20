import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Child } from '../types/child';
import ChildProfile from '../components/child/ChildProfile';
import EditChildModal from '../components/child/EditChildModal';
import { useApi } from '../hooks/useApi';

// Mock data for initial development
const mockChildren: Child[] = [
  {
    id: "1",
    parentId: "parent1",
    firstName: "Emma",
    lastName: "Smith",
    dateOfBirth: "2020-05-15",
    gender: "female",
    medicalInfo: {
      allergies: ["Peanuts", "Dairy"],
      conditions: ["Asthma"],
      medications: [
        {
          name: "Ventolin",
          dosage: "2 puffs",
          frequency: "As needed"
        }
      ],
      emergencyContacts: [
        {
          name: "John Smith",
          relationship: "Father",
          phone: "+352 621 123 456"
        }
      ]
    },
    immunizations: [
      {
        id: "imm1",
        name: "MMR",
        date: "2021-06-15",
        nextDue: "2024-06-15"
      }
    ],
    documents: [
      {
        id: "doc1",
        type: "medical",
        name: "Health Certificate",
        url: "/documents/health-cert.pdf",
        uploadDate: "2023-01-15"
      }
    ],
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z"
  }
];

const ChildManagementPage: React.FC = () => {
  const [children, setChildren] = useState<Child[]>(mockChildren);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const { request } = useApi();

  const handleAddChild = () => {
    setSelectedChild(null);
    setShowEditModal(true);
  };

  const handleEditChild = (child: Child) => {
    setSelectedChild(child);
    setShowEditModal(true);
  };

  const handleDeleteChild = async (childId: string) => {
    if (window.confirm('Are you sure you want to remove this child?')) {
      try {
        // In real app, make API call to delete child
        // await request('delete', `/children/${childId}`);
        setChildren(prev => prev.filter(child => child.id !== childId));
      } catch (error) {
        console.error('Failed to delete child:', error);
      }
    }
  };

  const handleSaveChild = async (childData: Partial<Child>) => {
    try {
      if (selectedChild) {
        // Update existing child
        // const response = await request('put', `/children/${selectedChild.id}`, childData);
        setChildren(prev =>
          prev.map(child =>
            child.id === selectedChild.id ? { ...child, ...childData } : child
          )
        );
      } else {
        // Add new child
        // const response = await request('post', '/children', childData);
        const newChild = {
          ...childData,
          id: `temp-${Date.now()}`,
          parentId: 'current-parent-id',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as Child;
        setChildren(prev => [...prev, newChild]);
      }
      setShowEditModal(false);
    } catch (error) {
      console.error('Failed to save child:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Children</h1>
          <button
            onClick={handleAddChild}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="mr-2" size={20} />
            Add Child
          </button>
        </div>

        <div className="space-y-6">
          {children.map(child => (
            <ChildProfile
              key={child.id}
              child={child}
              onEdit={handleEditChild}
              onDelete={handleDeleteChild}
            />
          ))}

          {children.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <h3 className="mt-2 text-sm font-medium text-gray-900">No children added</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding your first child.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleAddChild}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <Plus className="mr-2" size={20} />
                  Add Child
                </button>
              </div>
            </div>
          )}
        </div>

        {showEditModal && (
          <EditChildModal
            child={selectedChild}
            onSave={handleSaveChild}
            onClose={() => setShowEditModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ChildManagementPage; 
import React, { useState } from 'react';
import { Edit2, Trash2, Plus, FileText, Activity, Shield } from 'lucide-react';
import { Child } from '../../types/child';
import ImmunizationList from './ImmunizationList';
import MedicalInfoPanel from './MedicalInfoPanel';
import DocumentList from './DocumentList';

interface ChildProfileProps {
  child: Child;
  onEdit: (child: Child) => void;
  onDelete: (childId: string) => void;
}

const ChildProfile: React.FC<ChildProfileProps> = ({ child, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState<'medical' | 'immunizations' | 'documents'>('medical');

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center overflow-hidden">
              {child.photo ? (
                <img 
                  src={child.photo} 
                  alt={`${child.firstName}'s photo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-3xl text-indigo-500">
                  {child.firstName.charAt(0)}{child.lastName.charAt(0)}
                </span>
              )}
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{`${child.firstName} ${child.lastName}`}</h2>
              <p className="text-indigo-100">{`${calculateAge(child.dateOfBirth)} years old`}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(child)}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Edit2 className="text-white" size={20} />
            </button>
            <button
              onClick={() => onDelete(child.id)}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Trash2 className="text-white" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('medical')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'medical'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Activity className="inline-block mr-2" size={16} />
            Medical Info
          </button>
          <button
            onClick={() => setActiveTab('immunizations')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'immunizations'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Shield className="inline-block mr-2" size={16} />
            Immunizations
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'documents'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="inline-block mr-2" size={16} />
            Documents
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'medical' && (
          <MedicalInfoPanel medicalInfo={child.medicalInfo} />
        )}
        {activeTab === 'immunizations' && (
          <ImmunizationList immunizations={child.immunizations} />
        )}
        {activeTab === 'documents' && (
          <DocumentList documents={child.documents} />
        )}
      </div>
    </div>
  );
};

export default ChildProfile; 
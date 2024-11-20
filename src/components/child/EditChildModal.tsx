import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Child, MedicalInfo } from '../../types/child';

interface EditChildModalProps {
  child?: Child | null;
  onSave: (childData: Partial<Child>) => void;
  onClose: () => void;
}

const EditChildModal: React.FC<EditChildModalProps> = ({ child, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Child>>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'other',
    medicalInfo: {
      allergies: [],
      conditions: [],
      medications: [],
      emergencyContacts: []
    }
  });

  useEffect(() => {
    if (child) {
      setFormData(child);
    }
  }, [child]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAddAllergy = () => {
    const allergy = prompt('Enter allergy:');
    if (allergy) {
      setFormData(prev => ({
        ...prev,
        medicalInfo: {
          ...prev.medicalInfo as MedicalInfo,
          allergies: [...(prev.medicalInfo?.allergies || []), allergy]
        }
      }));
    }
  };

  const handleRemoveAllergy = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo as MedicalInfo,
        allergies: prev.medicalInfo?.allergies.filter((_, i) => i !== index) || []
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {child ? 'Edit Child' : 'Add Child'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Medical Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Medical Information</h3>
              
              {/* Allergies */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Allergies
                  </label>
                  <button
                    type="button"
                    onClick={handleAddAllergy}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Add Allergy
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.medicalInfo?.allergies.map((allergy, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded"
                    >
                      <span>{allergy}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAllergy(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditChildModal; 
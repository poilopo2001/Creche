import React from 'react';
import { AlertCircle, Heart, Phone } from 'lucide-react';
import { MedicalInfo } from '../../types/child';

interface MedicalInfoPanelProps {
  medicalInfo: MedicalInfo;
}

const MedicalInfoPanel: React.FC<MedicalInfoPanelProps> = ({ medicalInfo }) => {
  return (
    <div className="space-y-6">
      {/* Allergies */}
      <div className="bg-red-50 rounded-lg p-4">
        <h3 className="flex items-center text-lg font-medium text-red-800 mb-3">
          <AlertCircle className="mr-2" size={20} />
          Allergies
        </h3>
        {medicalInfo.allergies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {medicalInfo.allergies.map((allergy, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
              >
                {allergy}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-red-700">No known allergies</p>
        )}
      </div>

      {/* Medical Conditions */}
      <div className="bg-orange-50 rounded-lg p-4">
        <h3 className="flex items-center text-lg font-medium text-orange-800 mb-3">
          <Heart className="mr-2" size={20} />
          Medical Conditions
        </h3>
        {medicalInfo.conditions.length > 0 ? (
          <div className="space-y-2">
            {medicalInfo.conditions.map((condition, index) => (
              <div key={index} className="bg-orange-100 p-2 rounded">
                {condition}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-orange-700">No medical conditions</p>
        )}
      </div>

      {/* Medications */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-800 mb-3">Medications</h3>
        {medicalInfo.medications.length > 0 ? (
          <div className="grid gap-4">
            {medicalInfo.medications.map((medication, index) => (
              <div key={index} className="bg-blue-100 p-3 rounded">
                <div className="font-medium text-blue-900">{medication.name}</div>
                <div className="text-sm text-blue-800 mt-1">
                  <span className="font-medium">Dosage:</span> {medication.dosage}
                </div>
                <div className="text-sm text-blue-800">
                  <span className="font-medium">Frequency:</span> {medication.frequency}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-blue-700">No current medications</p>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="flex items-center text-lg font-medium text-green-800 mb-3">
          <Phone className="mr-2" size={20} />
          Emergency Contacts
        </h3>
        <div className="grid gap-4">
          {medicalInfo.emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-green-100 p-3 rounded">
              <div className="font-medium text-green-900">{contact.name}</div>
              <div className="text-sm text-green-800">
                <span className="font-medium">Relationship:</span> {contact.relationship}
              </div>
              <div className="text-sm text-green-800">
                <span className="font-medium">Phone:</span> {contact.phone}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalInfoPanel; 
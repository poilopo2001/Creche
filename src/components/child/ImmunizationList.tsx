import React from 'react';
import { Shield, Calendar, FileText, AlertCircle } from 'lucide-react';
import { Immunization } from '../../types/child';

interface ImmunizationListProps {
  immunizations: Immunization[];
}

const ImmunizationList: React.FC<ImmunizationListProps> = ({ immunizations }) => {
  const isUpcoming = (date: string) => {
    return new Date(date) > new Date();
  };

  const isOverdue = (date: string) => {
    const dueDate = new Date(date);
    const today = new Date();
    return dueDate < today;
  };

  return (
    <div className="space-y-4">
      {immunizations.map((immunization) => (
        <div
          key={immunization.id}
          className="border rounded-lg overflow-hidden bg-white"
        >
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Shield className="text-indigo-500 mr-3" size={24} />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    {immunization.name}
                  </h4>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Calendar className="mr-1" size={14} />
                    {new Date(immunization.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {immunization.nextDue && (
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    isOverdue(immunization.nextDue)
                      ? 'bg-red-100 text-red-800'
                      : isUpcoming(immunization.nextDue)
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {isOverdue(immunization.nextDue) && (
                    <div className="flex items-center">
                      <AlertCircle className="mr-1" size={14} />
                      Overdue
                    </div>
                  )}
                  {!isOverdue(immunization.nextDue) &&
                    `Next due: ${new Date(immunization.nextDue).toLocaleDateString()}`}
                </div>
              )}
            </div>
            {immunization.documentUrl && (
              <a
                href={immunization.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mt-3 text-sm text-indigo-600 hover:text-indigo-800"
              >
                <FileText className="mr-1" size={14} />
                View Record
              </a>
            )}
          </div>
        </div>
      ))}

      {immunizations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Shield className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No Immunizations
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            No immunization records have been added yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImmunizationList; 
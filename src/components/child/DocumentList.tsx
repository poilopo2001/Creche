import React from 'react';
import { FileText, Calendar, Download, AlertCircle } from 'lucide-react';
import { ChildDocument } from '../../types/child';

interface DocumentListProps {
  documents: ChildDocument[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  const getDocumentTypeColor = (type: ChildDocument['type']) => {
    switch (type) {
      case 'medical':
        return 'text-blue-600 bg-blue-100';
      case 'legal':
        return 'text-purple-600 bg-purple-100';
      case 'identification':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const isExpiringSoon = (date?: string) => {
    if (!date) return false;
    const expiryDate = new Date(date);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isExpired = (date?: string) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <div
          key={document.id}
          className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
        >
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${getDocumentTypeColor(document.type)}`}>
                  <FileText size={20} />
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900">
                    {document.name}
                  </h4>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Calendar className="mr-1" size={14} />
                    Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <a
                href={document.url}
                download
                className="flex items-center px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
              >
                <Download size={14} className="mr-1" />
                Download
              </a>
            </div>

            {document.expiryDate && (
              <div
                className={`mt-3 flex items-center text-sm ${
                  isExpired(document.expiryDate)
                    ? 'text-red-600'
                    : isExpiringSoon(document.expiryDate)
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}
              >
                {(isExpired(document.expiryDate) || isExpiringSoon(document.expiryDate)) && (
                  <AlertCircle size={14} className="mr-1" />
                )}
                {isExpired(document.expiryDate)
                  ? 'Expired'
                  : isExpiringSoon(document.expiryDate)
                  ? 'Expiring soon'
                  : 'Valid until'}: {new Date(document.expiryDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      ))}

      {documents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No Documents
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            No documents have been uploaded yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentList; 
import React, { useState } from 'react';
import { FileText, Upload, Download, AlertCircle, X } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'medical' | 'identification' | 'enrollment' | 'other';
  uploadDate: string;
  expiryDate?: string;
  status: 'valid' | 'expiring' | 'expired';
  url: string;
}

// Mock data
const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Medical Certificate',
    type: 'medical',
    uploadDate: '2024-01-15',
    expiryDate: '2024-12-31',
    status: 'valid',
    url: '/documents/medical-cert.pdf'
  },
  {
    id: '2',
    name: 'Vaccination Record',
    type: 'medical',
    uploadDate: '2024-02-01',
    expiryDate: '2024-04-15',
    status: 'expiring',
    url: '/documents/vaccination.pdf'
  },
  {
    id: '3',
    name: 'Birth Certificate',
    type: 'identification',
    uploadDate: '2023-12-01',
    status: 'valid',
    url: '/documents/birth-cert.pdf'
  }
];

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);

  const documentTypes = [
    { value: 'all', label: 'All Documents' },
    { value: 'medical', label: 'Medical' },
    { value: 'identification', label: 'Identification' },
    { value: 'enrollment', label: 'Enrollment' },
    { value: 'other', label: 'Other' }
  ];

  const filteredDocuments = selectedType === 'all'
    ? documents
    : documents.filter(doc => doc.type === selectedType);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadingFiles(prev => [...prev, ...files]);
  };

  const removeUploadingFile = (index: number) => {
    setUploadingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    // Mock upload functionality
    const newDocuments = uploadingFiles.map((file, index) => ({
      id: `new-${index}`,
      name: file.name,
      type: 'other' as const,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'valid' as const,
      url: URL.createObjectURL(file)
    }));

    setDocuments(prev => [...prev, ...newDocuments]);
    setUploadingFiles([]);
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'valid':
        return 'text-green-600 bg-green-100';
      case 'expiring':
        return 'text-yellow-600 bg-yellow-100';
      case 'expired':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and track important documents for your children
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-medium">Upload Documents</h2>
          <p className="text-sm text-gray-500">Upload new documents in PDF, JPG, or PNG format</p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="h-12 w-12 text-gray-400" />
            <span className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</span>
            <span className="mt-1 text-xs text-gray-500">PDF, JPG, PNG up to 10MB</span>
          </label>
        </div>

        {uploadingFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadingFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="flex items-center">
                  <FileText className="text-gray-400 mr-2" size={20} />
                  <span className="text-sm text-gray-600">{file.name}</span>
                </div>
                <button
                  onClick={() => removeUploadingFile(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
            <button
              onClick={handleUpload}
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Upload Files
            </button>
          </div>
        )}
      </div>

      {/* Document List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Document Library</h2>
            <div className="flex items-center space-x-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {filteredDocuments.map(document => (
            <div key={document.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{document.name}</h3>
                  <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                    <span>Uploaded {document.uploadDate}</span>
                    {document.expiryDate && (
                      <>
                        <span>•</span>
                        <span>Expires {document.expiryDate}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                  {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                </span>
                <a
                  href={document.url}
                  download
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <Download size={20} />
                </a>
              </div>
            </div>
          ))}

          {filteredDocuments.length === 0 && (
            <div className="p-6 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
              <p className="mt-1 text-sm text-gray-500">
                {selectedType === 'all'
                  ? "You haven't uploaded any documents yet"
                  : `No ${selectedType} documents found`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage; 
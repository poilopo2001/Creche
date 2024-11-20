import React, { useState } from 'react';
import { FileText, Upload, Download, AlertCircle, X, Filter, Search } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'policy' | 'form' | 'template' | 'other';
  category: 'enrollment' | 'medical' | 'administrative' | 'parent';
  uploadDate: string;
  lastUpdated: string;
  required: boolean;
  description?: string;
  url: string;
}

// Mock data
const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Enrollment Form',
    type: 'form',
    category: 'enrollment',
    uploadDate: '2024-01-15',
    lastUpdated: '2024-01-15',
    required: true,
    description: 'Required form for new enrollments',
    url: '/documents/enrollment-form.pdf'
  },
  {
    id: '2',
    name: 'Medical Authorization',
    type: 'form',
    category: 'medical',
    uploadDate: '2024-02-01',
    lastUpdated: '2024-02-01',
    required: true,
    description: 'Medical authorization and emergency contact form',
    url: '/documents/medical-auth.pdf'
  },
  {
    id: '3',
    name: 'Parent Handbook',
    type: 'policy',
    category: 'parent',
    uploadDate: '2023-12-01',
    lastUpdated: '2024-01-01',
    required: false,
    description: 'Comprehensive guide for parents',
    url: '/documents/parent-handbook.pdf'
  }
];

const DaycareDocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'enrollment', label: 'Enrollment' },
    { value: 'medical', label: 'Medical' },
    { value: 'administrative', label: 'Administrative' },
    { value: 'parent', label: 'Parent Resources' }
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'policy', label: 'Policies' },
    { value: 'form', label: 'Forms' },
    { value: 'template', label: 'Templates' },
    { value: 'other', label: 'Other' }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesType = selectedType === 'all' || doc.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

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
      category: 'administrative' as const,
      uploadDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      required: false,
      url: URL.createObjectURL(file)
    }));

    setDocuments(prev => [...prev, ...newDocuments]);
    setUploadingFiles([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
        <div className="flex space-x-3">
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Documents
          </label>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search documents..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {types.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Upload Preview */}
      {uploadingFiles.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Ready to Upload</h2>
          <div className="space-y-2 mb-4">
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
          </div>
          <button
            onClick={handleUpload}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Upload {uploadingFiles.length} {uploadingFiles.length === 1 ? 'File' : 'Files'}
          </button>
        </div>
      )}

      {/* Documents List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Documents Library</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredDocuments.map(document => (
            <div key={document.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {document.name}
                    {document.required && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        Required
                      </span>
                    )}
                  </h3>
                  {document.description && (
                    <p className="mt-1 text-sm text-gray-500">{document.description}</p>
                  )}
                  <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                    <span>Updated {new Date(document.lastUpdated).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="capitalize">{document.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
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
                {searchTerm
                  ? 'No documents match your search criteria'
                  : 'Get started by uploading your first document'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaycareDocumentsPage; 
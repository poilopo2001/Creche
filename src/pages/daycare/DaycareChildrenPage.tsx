import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';

interface EnrolledChild {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  group: string;
  parentName: string;
  parentContact: string;
  enrollmentDate: string;
  status: 'active' | 'waitlist' | 'inactive';
  attendance: {
    present: number;
    absent: number;
    rate: number;
  };
}

// Mock data
const mockChildren: EnrolledChild[] = [
  {
    id: '1',
    firstName: 'Emma',
    lastName: 'Smith',
    dateOfBirth: '2020-05-15',
    age: 3,
    group: 'Toddlers',
    parentName: 'John Smith',
    parentContact: '+352 621 123 456',
    enrollmentDate: '2023-01-15',
    status: 'active',
    attendance: {
      present: 45,
      absent: 3,
      rate: 93.75
    }
  },
  {
    id: '2',
    firstName: 'Lucas',
    lastName: 'Brown',
    dateOfBirth: '2021-03-20',
    age: 2,
    group: 'Toddlers',
    parentName: 'Sarah Brown',
    parentContact: '+352 621 789 012',
    enrollmentDate: '2023-06-01',
    status: 'active',
    attendance: {
      present: 40,
      absent: 2,
      rate: 95.24
    }
  }
];

const DaycareChildrenPage: React.FC = () => {
  const [children, setChildren] = useState<EnrolledChild[]>(mockChildren);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const groups = ['all', 'Infants', 'Toddlers', 'Preschool'];
  const statuses = ['all', 'active', 'waitlist', 'inactive'];

  const filteredChildren = children.filter(child => {
    const matchesSearch = 
      child.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      child.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      child.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGroup = selectedGroup === 'all' || child.group === selectedGroup;
    const matchesStatus = selectedStatus === 'all' || child.status === selectedStatus;

    return matchesSearch && matchesGroup && matchesStatus;
  });

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Enrolled Children</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => {/* Handle export */}}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => {/* Handle add child */}}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Child
          </button>
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
                placeholder="Search by name or parent..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {groups.map(group => (
                <option key={group} value={group}>
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Children List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Child
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parent
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendance
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredChildren.map((child) => (
              <tr key={child.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">
                        {child.firstName[0]}{child.lastName[0]}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {child.firstName} {child.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {calculateAge(child.dateOfBirth)} years old
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{child.group}</div>
                  <div className="text-sm text-gray-500">Since {new Date(child.enrollmentDate).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{child.parentName}</div>
                  <div className="text-sm text-gray-500">{child.parentContact}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{child.attendance.rate}%</div>
                  <div className="text-sm text-gray-500">
                    {child.attendance.present}/{child.attendance.present + child.attendance.absent} days
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    child.status === 'active' ? 'bg-green-100 text-green-800' :
                    child.status === 'waitlist' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {child.status.charAt(0).toUpperCase() + child.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaycareChildrenPage; 
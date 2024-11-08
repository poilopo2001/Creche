import React, { useState } from 'react';
import { Home, Users, DollarSign, Calendar, Settings, LogOut, Bell, PlusCircle, Search, Download, ChevronDown, ChevronUp } from 'lucide-react';

const DaycareDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'enrollments':
        return <EnrollmentsTab />;
      case 'payments':
        return <PaymentsTab />;
      case 'occupancy':
        return <OccupancyTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-indigo-600">DaycareConnect</h2>
        </div>
        <nav className="mt-8">
          <a
            href="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'home' ? 'bg-indigo-100 text-indigo-600' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <Home className="mr-3" size={20} />
            Home
          </a>
          <a
            href="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'enrollments' ? 'bg-indigo-100 text-indigo-600' : ''}`}
            onClick={() => setActiveTab('enrollments')}
          >
            <Users className="mr-3" size={20} />
            Enrollments
          </a>
          <a
            href="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'payments' ? 'bg-indigo-100 text-indigo-600' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <DollarSign className="mr-3" size={20} />
            Payments
          </a>
          <a
            href="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'occupancy' ? 'bg-indigo-100 text-indigo-600' : ''}`}
            onClick={() => setActiveTab('occupancy')}
          >
            <Calendar className="mr-3" size={20} />
            Occupancy
          </a>
          <a
            href="#"
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'settings' ? 'bg-indigo-100 text-indigo-600' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="mr-3" size={20} />
            Settings
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Bell size={24} />
              </button>
              <button className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <LogOut size={24} />
              </button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

const HomeTab: React.FC = () => {
  const keyIndicators = [
    { title: 'Total Enrollments', value: 45, change: '+5%' },
    { title: 'Occupancy Rate', value: '85%', change: '+2%' },
    { title: 'Monthly Revenue', value: '€25,000', change: '+8%' },
    { title: 'Waitlist', value: 12, change: '-3' },
  ];

  const recentActivities = [
    { type: 'New Enrollment', details: 'Emma Thompson (Age 3) enrolled in Toddler Group', date: '2023-04-15' },
    { type: 'Payment Received', details: 'Monthly fee received from Lucas family', date: '2023-04-14' },
    { type: 'Staff Update', details: 'New assistant teacher Sarah joined the Infant Room', date: '2023-04-13' },
    { type: 'Occupancy Alert', details: 'Preschool Group reaching maximum capacity', date: '2023-04-12' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Welcome to Your Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {keyIndicators.map((indicator, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{indicator.title}</h3>
            <p className="text-3xl font-bold mb-2">{indicator.value}</p>
            <p className={`text-sm ${indicator.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {indicator.change} from last month
            </p>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        <ul className="space-y-4">
          {recentActivities.map((activity, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-semibold">{activity.type[0]}</span>
              </div>
              <div>
                <p className="font-semibold">{activity.type}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
                <p className="text-xs text-gray-400">{activity.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const EnrollmentsTab: React.FC = () => {
  const [enrollments, setEnrollments] = useState([
    { id: 1, name: 'Emma Thompson', age: 3, group: 'Toddler', startDate: '2023-03-01', status: 'Active' },
    { id: 2, name: 'Liam Johnson', age: 4, group: 'Preschool', startDate: '2023-02-15', status: 'Active' },
    { id: 3, name: 'Sophia Davis', age: 2, group: 'Infant', startDate: '2023-04-01', status: 'Active' },
    { id: 4, name: 'Noah Wilson', age: 5, group: 'Preschool', startDate: '2023-01-10', status: 'Active' },
  ]);

  const [waitlist, setWaitlist] = useState([
    { id: 1, name: 'Olivia Brown', age: 1, desiredStartDate: '2023-06-01' },
    { id: 2, name: 'Ethan Miller', age: 4, desiredStartDate: '2023-07-15' },
  ]);

  const [showAddEnrollment, setShowAddEnrollment] = useState(false);

  const handleAddEnrollment = (newEnrollment) => {
    setEnrollments([...enrollments, { ...newEnrollment, id: enrollments.length + 1, status: 'Active' }]);
    setShowAddEnrollment(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Enrollments</h2>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => setShowAddEnrollment(true)}
        >
          <PlusCircle size={20} className="mr-2" />
          Add Enrollment
        </button>
      </div>

      {showAddEnrollment && (
        <AddEnrollmentForm onSubmit={handleAddEnrollment} onCancel={() => setShowAddEnrollment(false)} />
      )}

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">Current Enrollments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{enrollment.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{enrollment.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{enrollment.group}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{enrollment.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900">
                    <a href="#" className="mr-2">Edit</a>
                    <a href="#" className="text-red-600 hover:text-red-900">Remove</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Waitlist</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Desired Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {waitlist.map((child) => (
                <tr key={child.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{child.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{child.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{child.desiredStartDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900">
                    <a href="#" className="mr-2">Enroll</a>
                    <a href="#" className="text-red-600 hover:text-red-900">Remove</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AddEnrollmentForm: React.FC<{ onSubmit: (data: any) => void, onCancel: () => void }> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    group: '',
    startDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h3 className="text-xl font-semibold mb-4">Add New Enrollment</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Child's Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">Group</label>
            <select
              id="group"
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="input w-full"
              required
            >
              <option value="">Select a group</option>
              <option value="Infant">Infant</option>
              <option value="Toddler">Toddler</option>
              <option value="Preschool">Preschool</option>
            </select>
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={onCancel} className="btn btn-secondary mr-2">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Enrollment
          </button>
        </div>
      </form>
    </div>
  );
};

const PaymentsTab: React.FC = () => {
  const [payments, setPayments] = useState([
    { id: 1, childName: 'Emma Thompson', amount: 500, date: '2023-04-01', status: 'Paid' },
    { id: 2, childName: 'Liam Johnson', amount: 550, date: '2023-04-02', status: 'Paid' },
    { id: 3, childName: 'Sophia Davis', amount: 600, date: '2023-04-05', status: 'Pending' },
    { id: 4, childName: 'Noah Wilson', amount: 500, date: '2023-04-10', status: 'Overdue' },
  ]);

  const [showAddPayment, setShowAddPayment] = useState(false);

  const handleAddPayment = (newPayment) => {
    setPayments([...payments, { ...newPayment, id: payments.length + 1 }]);
    setShowAddPayment(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Payments</h2>
        <div>
          <button className="btn btn-secondary mr-2">
            <Download size={20} className="mr-2" />
            Export Report
          </button>
          <button
            className="btn btn-primary flex items-center"
            onClick={() => setShowAddPayment(true)}
          >
            <PlusCircle size={20} className="mr-2" />
            Record Payment
          </button>
        </div>
      </div>

      {showAddPayment && (
        <AddPaymentForm onSubmit={handleAddPayment} onCancel={() => setShowAddPayment(false)} />
      )}

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Child Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.childName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">€{payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900">
                    <a href="#" className="mr-2">Edit</a>
                    <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Monthly Revenue</h3>
          {/* Add a chart or graph here to show monthly revenue */}
          <p className="text-gray-600">Chart placeholder: Monthly revenue over the past 12 months</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Payment Summary</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Total Received:</span>
              <span className="font-semibold">€1,550</span>
            </li>
            <li className="flex justify-between">
              <span>Pending:</span>
              <span className="font-semibold">€600</span>
            </li>
            <li className="flex justify-between">
              <span>Overdue:</span>
              <span className="font-semibold text-red-600">€500</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const AddPaymentForm: React.FC<{ onSubmit: (data: any) => void, onCancel: () => void }> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    childName: '',
    amount: '',
    date: '',
    status: 'Paid',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h3 className="text-xl font-semibold mb-4">Record Payment</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">Child's Name</label>
            <input
              type="text"
              id="childName"
              name="childName"
              value={formData.childName}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (€)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input w-full"
              required
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={onCancel} className="btn btn-secondary mr-2">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Record Payment
          </button>
        </div>
      </form>
    </div>
  );
};

const OccupancyTab: React.FC = () => {
  const [occupancyData, setOccupancyData] = useState({
    infant: { capacity: 10, current: 8 },
    toddler: { capacity: 15, current: 12 },
    preschool: { capacity: 20, current: 18 },
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateOccupancyRate = (group) => {
    return ((occupancyData[group].current / occupancyData[group].capacity) * 100).toFixed(2);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Occupancy</h2>
        <div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input mr-2"
          />
          <button className="btn btn-secondary">
            <Download size={20} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(occupancyData).map(([group, data]) => (
          <div key={group} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 capitalize">{group} Group</h3>
            <div className="flex justify-between items-center mb-2">
              <span>Current Occupancy:</span>
              <span className="font-semibold">{data.current} / {data.capacity}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span>Occupancy Rate:</span>
              <span className="font-semibold">{calculateOccupancyRate(group)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${calculateOccupancyRate(group)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">Weekly Occupancy Overview</h3>
        {/* Add a chart or calendar view here to show weekly occupancy */}
        <p className="text-gray-600">Chart placeholder: Weekly occupancy overview for all groups</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Occupancy Insights</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <ChevronUp className="text-green-500 mr-2" size={20} />
            <span>Infant group is nearing full capacity. Consider opening a new infant room.</span>
          </li>
          <li className="flex items-center">
            <ChevronDown className="text-yellow-500 mr-2" size={20} />
            <span>Toddler group has lower occupancy. Promote available spots to waitlisted families.</span>
          </li>
          <li className="flex items-center">
            <ChevronUp className="text-green-500 mr-2" size={20} />
            <span>Preschool group maintains high occupancy. Excellent job!</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const SettingsTab: React.FC = () => {
  const [daycareInfo, setDaycareInfo] = useState({
    name: 'Happy Kids Daycare',
    address: '123 Main St, Luxembourg City',
    phone: '+352 123 456 789',
    email: 'info@happykidsdaycare.lu',
    license: 'LUX-12345-DC',
    capacity: {
      infant: 10,
      toddler: 15,
      preschool: 20,
    },
    operatingHours: '7:00 AM - 6:00 PM',
    daysOpen: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(daycareInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({
      ...prev,
      capacity: {
        ...prev.capacity,
        [name]: parseInt(value),
      },
    }));
  };

  const handleDaysOpenChange = (day: string) => {
    setEditedInfo((prev) => ({
      ...prev,
      daysOpen: prev.daysOpen.includes(day)
        ? prev.daysOpen.filter((d) => d !== day)
        : [...prev.daysOpen, day],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDaycareInfo(editedInfo);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Daycare Settings</h2>
        {!isEditing && (
          <button
            className="btn btn-primary flex items-center"
            onClick={() => setIsEditing(true)}
          >
            <Settings size={20} className="mr-2" />
            Edit Settings
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Daycare Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={isEditing ? editedInfo.name : daycareInfo.name}
              onChange={handleChange}
              className="input w-full"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={isEditing ? editedInfo.address : daycareInfo.address}
              onChange={handleChange}
              className="input w-full"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={isEditing ? editedInfo.phone : daycareInfo.phone}
              onChange={handleChange}
              className="input w-full"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={isEditing ? editedInfo.email : daycareInfo.email}
              onChange={handleChange}
              className="input w-full"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-1">
              License Number
            </label>
            <input
              type="text"
              id="license"
              name="license"
              value={isEditing ? editedInfo.license : daycareInfo.license}
              onChange={handleChange}
              className="input w-full"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="operatingHours" className="block text-sm font-medium text-gray-700 mb-1">
              Operating Hours
            </label>
            <input
              type="text"
              id="operatingHours"
              name="operatingHours"
              value={isEditing ? editedInfo.operatingHours : daycareInfo.operatingHours}
              onChange={handleChange}
              className="input w-full"
              disabled={!isEditing}
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-4">Capacity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="infant" className="block text-sm font-medium text-gray-700 mb-1">
              Infant Capacity
            </label>
            <input
              type="number"
              id="infant"
              name="infant"
              value={isEditing ? editedInfo.capacity.infant : daycareInfo.capacity.infant}
              onChange={handleCapacityChange}
              className="input w-full"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="toddler" className="block text-sm font-medium text-gray-700 mb-1">
              Toddler Capacity
            </label>
            <input
              type="number"
              id="toddler"
              name="toddler"
              value={isEditing ? editedInfo.capacity.toddler : daycareInfo.capacity.toddler}
              onChange={handleCapacityChange}
              className="input w-full"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="preschool" className="block text-sm font-medium text-gray-700 mb-1">
              Preschool Capacity
            </label>
            <input
              type="number"
              id="preschool"
              name="preschool"
              value={isEditing ? editedInfo.capacity.preschool : daycareInfo.capacity.preschool}
              onChange={handleCapacityChange}
              className="input w-full"
              disabled={!isEditing}
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-4">Days Open</h3>
        <div className="flex flex-wrap gap-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <label key={day} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isEditing ? editedInfo.daysOpen.includes(day) : daycareInfo.daysOpen.includes(day)}
                onChange={() => handleDaysOpenChange(day)}
                disabled={!isEditing}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2">{day}</span>
            </label>
          ))}
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={() => {
                setIsEditing(false);
                setEditedInfo(daycareInfo);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DaycareDashboardPage;
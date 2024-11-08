import React, { useState } from 'react';
import { Check, AlertCircle, Camera } from 'lucide-react';

const ListYourDaycarePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    daycareType: '',
    capacity: '',
    address: '',
    description: '',
    ageGroups: [] as string[],
    languages: [] as string[],
    operatingHours: '',
    meals: [] as string[],
    educationalApproach: '',
    outdoorSpace: '',
    specialNeeds: false,
    licensingInfo: '',
    photos: [] as File[],
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleMultiSelect = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: prevState[name].includes(value)
        ? prevState[name].filter((item: string) => item !== value)
        : [...prevState[name], value],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prevState => ({
        ...prevState,
        photos: [...prevState.photos, ...Array.from(e.target.files as FileList)],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Thank you for submitting your daycare information. We will review and get back to you soon!');
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">List Your Daycare</h1>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Daycare Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Daycare Name</label>
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="daycareType" className="block text-sm font-medium text-gray-700 mb-1">Daycare Type</label>
                <select
                  id="daycareType"
                  name="daycareType"
                  value={formData.daycareType}
                  onChange={handleChange}
                  className="input w-full"
                  required
                >
                  <option value="">Select a type</option>
                  <option value="home">Home-based</option>
                  <option value="center">Center-based</option>
                  <option value="preschool">Preschool</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="input w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="input w-full"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Groups</label>
              <div className="flex flex-wrap gap-2">
                {['Infant', 'Toddler', 'Preschool', 'School-age'].map((age) => (
                  <button
                    key={age}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm ${formData.ageGroups.includes(age) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => handleMultiSelect('ageGroups', age)}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
              <div className="flex flex-wrap gap-2">
                {['English', 'French', 'German', 'Luxembourgish'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm ${formData.languages.includes(lang) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => handleMultiSelect('languages', lang)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="operatingHours" className="block text-sm font-medium text-gray-700 mb-1">Operating Hours</label>
              <input
                type="text"
                id="operatingHours"
                name="operatingHours"
                value={formData.operatingHours}
                onChange={handleChange}
                className="input w-full"
                placeholder="e.g., Mon-Fri: 7:00 AM - 6:00 PM"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meals Provided</label>
              <div className="flex flex-wrap gap-2">
                {['Breakfast', 'Lunch', 'Snacks'].map((meal) => (
                  <button
                    key={meal}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm ${formData.meals.includes(meal) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => handleMultiSelect('meals', meal)}
                  >
                    {meal}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="educationalApproach" className="block text-sm font-medium text-gray-700 mb-1">Educational Approach</label>
              <input
                type="text"
                id="educationalApproach"
                name="educationalApproach"
                value={formData.educationalApproach}
                onChange={handleChange}
                className="input w-full"
                placeholder="e.g., Montessori, Play-based, Reggio Emilia"
              />
            </div>

            <div>
              <label htmlFor="outdoorSpace" className="block text-sm font-medium text-gray-700 mb-1">Outdoor Space</label>
              <input
                type="text"
                id="outdoorSpace"
                name="outdoorSpace"
                value={formData.outdoorSpace}
                onChange={handleChange}
                className="input w-full"
                placeholder="Describe your outdoor facilities"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="specialNeeds"
                  checked={formData.specialNeeds}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">We accommodate children with special needs</span>
              </label>
            </div>

            <div>
              <label htmlFor="licensingInfo" className="block text-sm font-medium text-gray-700 mb-1">Licensing Information</label>
              <input
                type="text"
                id="licensingInfo"
                name="licensingInfo"
                value={formData.licensingInfo}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter your daycare license number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
              <div className="flex items-center">
                <label className="cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50">
                  <Camera className="inline-block mr-2" size={20} />
                  <span>Upload Photos</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="ml-3 text-sm text-gray-500">
                  {formData.photos.length} photo(s) selected
                </span>
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <span className="text-sm text-gray-700">I agree to the terms and conditions</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Submit Daycare Information
            </button>
          </form>
        </div>

        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold mb-6">Why List Your Daycare with Us?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
              <span>Reach thousands of parents looking for quality childcare</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
              <span>Showcase your unique features and programs</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
              <span>Manage bookings and inquiries efficiently</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
              <span>Access valuable resources and support for daycare providers</span>
            </li>
          </ul>
        </div>

        <div className="max-w-3xl mx-auto mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="text-yellow-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold">Important Note</h3>
          </div>
          <p className="text-sm text-gray-700">
            All daycare listings are subject to review and approval. We may contact you for additional information or to verify your credentials. Please ensure all information provided is accurate and up-to-date.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListYourDaycarePage;
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Users, Star, Heart, Filter } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [rating, setRating] = useState('');
  const [hours, setHours] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [educationalApproach, setEducationalApproach] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState(false);
  const [mealOptions, setMealOptions] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const luxembourgishCities = [
    "Luxembourg City", "Esch-sur-Alzette", "Differdange", "Dudelange", "Ettelbruck",
    "Diekirch", "Wiltz", "Echternach", "Remich", "Vianden", "Grevenmacher", "Clervaux"
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('term') || '');
    setSearchLocation(params.get('location') || '');
    setAgeGroup(params.get('ageGroup') || '');
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', { searchTerm, searchLocation, ageGroup, rating, hours, languages, educationalApproach, specialNeeds, mealOptions, features });
  };

  const toggleFeature = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const toggleLanguage = (language: string) => {
    setLanguages(prev =>
      prev.includes(language) ? prev.filter(l => l !== language) : [...prev, language]
    );
  };

  const toggleMealOption = (option: string) => {
    setMealOptions(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  // Sample daycare data (now with 8 daycares)
  const daycares = [
    {
      id: 1,
      name: "Happy Kids Daycare",
      address: "23 Rue de la Gare, Luxembourg City",
      rating: 4.8,
      reviewCount: 120,
      hours: "7:00 - 18:00",
      ageRange: "6 months - 5 years",
      features: ["Outdoor playground", "Organic meals", "Bilingual program"],
      languages: ["English", "French", "Luxembourgish"],
      educationalApproach: "Montessori",
      specialNeeds: true,
      mealOptions: ["Organic", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1576037728058-fe4748d14fa3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      coordinates: [49.6116, 6.1319]
    },
    {
      id: 2,
      name: "Sunshine Learning Center",
      address: "45 Avenue de la Liberté, Esch-sur-Alzette",
      rating: 4.5,
      reviewCount: 85,
      hours: "6:30 - 18:30",
      ageRange: "3 months - 6 years",
      features: ["STEM activities", "Security cameras", "Large playground"],
      languages: ["French", "German"],
      educationalApproach: "Reggio Emilia",
      specialNeeds: false,
      mealOptions: ["Gluten-free", "Dairy-free"],
      image: "https://images.unsplash.com/photo-1576670159805-381a9b579bb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      coordinates: [49.4958, 5.9806]
    },
    {
      id: 3,
      name: "Little Explorers Daycare",
      address: "12 Rue du Parc, Differdange",
      rating: 4.2,
      reviewCount: 62,
      hours: "7:30 - 17:30",
      ageRange: "1 year - 4 years",
      features: ["Art classes", "Music lessons", "Outdoor activities"],
      languages: ["Luxembourgish", "Portuguese"],
      educationalApproach: "Waldorf",
      specialNeeds: true,
      mealOptions: ["Vegan", "Allergen-free"],
      image: "https://images.unsplash.com/photo-1576670160940-9a30457df44c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      coordinates: [49.5242, 5.8904]
    },
    {
      id: 4,
      name: "Tiny Tots Nursery",
      address: "78 Rue de l'Alzette, Dudelange",
      rating: 4.7,
      reviewCount: 95,
      hours: "7:00 - 19:00",
      ageRange: "2 months - 3 years",
      features: ["Infant care specialists", "Sensory play areas", "Multilingual staff"],
      languages: ["French", "English", "Portuguese"],
      educationalApproach: "Play-based",
      specialNeeds: false,
      mealOptions: ["Organic", "Allergy-friendly"],
      image: "https://images.unsplash.com/photo-1576670168264-7bbfd3da0f30?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      coordinates: [49.4822, 6.0869]
    },
    {
      id: 5,
      name: "Green Valley Preschool",
      address: "34 Rue de la Moselle, Grevenmacher",
      rating: 4.6,
      reviewCount: 78,
      hours: "6:45 - 18:45",
      ageRange: "2 years - 6 years",
      features: ["Eco-friendly facility", "Garden project", "Language immersion"],
      languages: ["German", "Luxembourgish", "English"],
      educationalApproach: "Nature-based",
      specialNeeds: true,
      mealOptions: ["Vegetarian", "Locally-sourced"],
      image: "https://images.unsplash.com/photo-1576670155147-efb88c8b59be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      coordinates: [49.6773, 6.4406]
    },
    {
      id: 6,
      name: "Clever Kids Academy",
      address: "56 Grand-Rue, Ettelbruck",
      rating: 4.4,
      reviewCount: 70,
      hours: "7:15 - 18:15",
      ageRange: "1 year - 5 years",
      features: ["Interactive learning tools", "Sports activities", "Cultural events"],
      languages: ["Luxembourgish", "French", "German"],
      educationalApproach: "Multiple Intelligences",
      specialNeeds: false,
      mealOptions: ["Balanced diet", "Fruit snacks"],
      image: "https://images.unsplash.com/photo-1576670161541-cd20e6079e17?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      coordinates: [49.8474, 6.1044]
    },
    {
      id: 7,
      name: "Rainbow Bridge Daycare",
      address: "9 Rue de la Synagogue, Esch-sur-Alzette",
      rating: 4.3,
      reviewCount: 55,
      hours: "7:00 - 18:30",
      ageRange: "6 months - 4 years",
      features: ["Inclusive environment", "Sign language classes", "Parental workshops"],
      languages: ["French", "Portuguese", "English"],
      educationalApproach: "HighScope",
      specialNeeds: true,
      mealOptions: ["Cultural cuisines", "Special diet accommodations"],
      image: "https://images.unsplash.com/photo-1576670166897-9d381dd59c7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      coordinates: [49.4947, 5.9816]
    },
    {
      id: 8,
      name: "Curiosity Corner Preschool",
      address: "23 Rue du Château, Wiltz",
      rating: 4.9,
      reviewCount: 110,
      hours: "6:30 - 19:00",
      ageRange: "2 years - 6 years",
      features: ["Science lab", "Cooking classes", "Forest school program"],
      languages: ["Luxembourgish", "German", "English"],
      educationalApproach: "Project-based",
      specialNeeds: false,
      mealOptions: ["Farm-to-table", "Cooking with kids"],
      image: "https://images.unsplash.com/photo-1576670166223-8d39d8ab8e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      coordinates: [49.9655, 5.9326]
    }
  ];

  const filteredDaycares = daycares.filter(daycare => {
    if (ageGroup && !daycare.ageRange.toLowerCase().includes(ageGroup.toLowerCase())) return false;
    if (rating && daycare.rating < parseFloat(rating)) return false;
    if (hours) {
      const [open, close] = daycare.hours.split(' - ');
      if (hours === 'early' && !open.includes('6:')) return false;
      if (hours === 'late' && !close.includes('18:') && !close.includes('19:') && !close.includes('20:')) return false;
    }
    if (languages.length > 0 && !languages.some(lang => daycare.languages.includes(lang))) return false;
    if (educationalApproach && daycare.educationalApproach !== educationalApproach) return false;
    if (specialNeeds && !daycare.specialNeeds) return false;
    if (mealOptions.length > 0 && !mealOptions.some(option => daycare.mealOptions.includes(option))) return false;
    if (features.length > 0 && !features.every(f => daycare.features.some(df => df.toLowerCase().includes(f.toLowerCase())))) return false;
    return true;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Find the Perfect Daycare</h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Daycare name or keyword"
              className="input flex-grow bg-white text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="input flex-grow bg-white text-gray-800"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            >
              <option value="">Select a city</option>
              {luxembourgishCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>
          {showFilters && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 font-semibold">Age Group</label>
                  <select
                    className="input w-full bg-white text-gray-800"
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                  >
                    <option value="">All Ages</option>
                    <option value="infant">Infant (0-1 year)</option>
                    <option value="toddler">Toddler (1-3 years)</option>
                    <option value="preschool">Preschool (3-5 years)</option>
                    <option value="schoolAge">School Age (5+ years)</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Minimum Rating</label>
                  <select
                    className="input w-full bg-white text-gray-800"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Hours</label>
                  <select
                    className="input w-full bg-white text-gray-800"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  >
                    <option value="">Any Hours</option>
                    <option value="early">Early Opening (6:00 or earlier)</option>
                    <option value="late">Late Closing (18:00 or later)</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {['English', 'French', 'German', 'Luxembourgish', 'Portuguese'].map(lang => (
                      <button
                        key={lang}
                        type="button"
                        className={`px-3 py-1 rounded-full text-sm ${languages.includes(lang) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={() => toggleLanguage(lang)}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Educational Approach</label>
                  <select
                    className="input w-full bg-white text-gray-800"
                    value={educationalApproach}
                    onChange={(e) => setEducationalApproach(e.target.value)}
                  >
                    <option value="">Any Approach</option>
                    <option value="Montessori">Montessori</option>
                    <option value="Reggio Emilia">Reggio Emilia</option>
                    <option value="Waldorf">Waldorf</option>
                    <option value="Play-based">Play-based</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Special Needs Accommodations</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="specialNeeds"
                      checked={specialNeeds}
                      onChange={(e) => setSpecialNeeds(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="specialNeeds">Accommodates Special Needs</label>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label className="block mb-2 font-semibold">Meal Options</label>
                <div className="flex flex-wrap gap-2">
                  {['Organic', 'Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Allergen-free'].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`px-3 py-1 rounded-full text-sm ${mealOptions.includes(option) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                      onClick={() => toggleMealOption(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <label className="block mb-2 font-semibold">Features</label>
                <div className="flex flex-wrap gap-2">
                  {['Outdoor playground', 'Security cameras', 'STEM activities', 'Art classes', 'Music lessons'].map(feature => (
                    <button
                      key={feature}
                      type="button"
                      className={`px-3 py-1 rounded-full text-sm ${features.includes(feature) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                      onClick={() => toggleFeature(feature)}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </form>
        
        <div className="mb-6 flex justify-end">
          <button
            className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'} mr-2`}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
          <button
            className={`btn ${viewMode === 'map' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('map')}
          >
            Map View
          </button>
        </div>

        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDaycares.map((daycare) => (
              <div key={daycare.id} className="card">
                <img src={daycare.image} alt={daycare.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{daycare.name}</h2>
                  <p className="text-gray-600 mb-4">{daycare.address}</p>
                  <div className="flex items-center mb-4">
                    <Star className="text-yellow-400 mr-1" size={16} />
                    <span className="font-semibold mr-1">{daycare.rating}</span>
                    <span className="text-gray-600">({daycare.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Clock className="text-gray-400 mr-2" size={16} />
                    <span className="text-sm">{daycare.hours}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Users className="text-gray-400 mr-2" size={16} />
                    <span className="text-sm">{daycare.ageRange}</span>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-1">Languages:</h3>
                    <div className="flex flex-wrap gap-1">
                      {daycare.languages.map((lang, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{lang}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-1">Educational Approach:</h3>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{daycare.educationalApproach}</span>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-1">Meal Options:</h3>
                    <div className="flex flex-wrap gap-1">
                      {daycare.mealOptions.map((option, index) => (
                        <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{option}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {daycare.features.map((feature, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">{feature}</span>
                    ))}
                  </div>
                  {daycare.specialNeeds && (
                    <div className="mb-4">
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Special Needs Accommodations</span>
                    </div>
                  )}
                  <Link to={`/daycare/${daycare.id}`} className="btn btn-primary w-full">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[600px] rounded-lg overflow-hidden shadow-md">
            <MapContainer center={[49.8153, 6.1296]} zoom={9} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredDaycares.map((daycare) => (
                <Marker key={daycare.id} position={daycare.coordinates as [number, number]}>
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{daycare.name}</h3>
                      <p className="text-sm">{daycare.address}</p>
                      <div className="flex items-center mt-1">
                        <Star className="text-yellow-400 mr-1" size={12} />
                        <span className="text-sm font-semibold">{daycare.rating}</span>
                      </div>
                      <Link to={`/daycare/${daycare.id}`} className="text-indigo-600 hover:underline text-sm">View Profile</Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
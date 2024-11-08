import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, Shield, Calendar, CheckCircle, Heart, MapPin, Clock, Users } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [ageGroup, setAgeGroup] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?term=${searchTerm}&location=${location}&ageGroup=${ageGroup}`);
  };

  const mapCenter: [number, number] = [49.6116, 6.1319]; // Luxembourg City coordinates

  const featuredDaycares = [
    {
      id: 1,
      name: "Happy Kids Daycare",
      address: "23 Rue de la Gare, Luxembourg City",
      rating: 4.8,
      reviewCount: 120,
      image: "https://images.unsplash.com/photo-1576037728058-fe4748d14fa3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Sunshine Learning Center",
      address: "45 Avenue de la Liberté, Esch-sur-Alzette",
      rating: 4.5,
      reviewCount: 85,
      image: "https://images.unsplash.com/photo-1576670159805-381a9b579bb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "Little Explorers Daycare",
      address: "12 Rue du Parc, Differdange",
      rating: 4.2,
      reviewCount: 62,
      image: "https://images.unsplash.com/photo-1576670160940-9a30457df44c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find the Perfect Daycare for Your Little Ones</h1>
          <p className="text-xl mb-8">Discover top-rated daycares in Luxembourg with DayCareConnect</p>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Daycare name or keyword"
                className="input flex-grow text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                className="input flex-grow text-gray-800"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <select
                className="input text-gray-800"
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
            <button type="submit" className="btn btn-primary w-full md:w-auto">
              Search Daycares
            </button>
          </form>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose DayCareConnect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-6 inline-block mb-6">
                <Star className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Top-Rated Daycares</h3>
              <p className="text-gray-600">Find the best daycares with verified reviews from parents like you.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 inline-block mb-6">
                <Shield className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Safety First</h3>
              <p className="text-gray-600">All listed daycares are licensed and follow strict safety guidelines.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-6 inline-block mb-6">
                <Calendar className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy Booking</h3>
              <p className="text-gray-600">Schedule tours and check availability with just a few clicks.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Daycares</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDaycares.map((daycare) => (
              <div key={daycare.id} className="card">
                <img src={daycare.image} alt={daycare.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{daycare.name}</h3>
                  <p className="text-gray-600 mb-4">{daycare.address}</p>
                  <div className="flex items-center mb-4">
                    <Star className="text-yellow-400 mr-1" size={20} />
                    <span className="font-semibold mr-1">{daycare.rating}</span>
                    <span className="text-gray-600">({daycare.reviewCount} reviews)</span>
                  </div>
                  <Link to={`/daycare/${daycare.id}`} className="btn btn-secondary w-full">View Profile</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/search" className="btn btn-primary">
              View All Daycares
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Find Daycares Near You</h2>
          <div className="h-96 rounded-lg overflow-hidden shadow-md">
            <MapContainer center={mapCenter} zoom={11} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {featuredDaycares.map((daycare) => (
                <Marker key={daycare.id} position={[mapCenter[0] + Math.random() * 0.05, mapCenter[1] + Math.random() * 0.05]}>
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{daycare.name}</h3>
                      <p className="text-sm">{daycare.address}</p>
                      <Link to={`/daycare/${daycare.id}`} className="text-indigo-600 hover:underline text-sm">View Profile</Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Daycare?</h2>
          <p className="text-xl mb-8">Join thousands of parents who trust DayCareConnect for their childcare needs.</p>
          <Link to="/search" className="btn btn-primary bg-white text-indigo-600 hover:bg-gray-100">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
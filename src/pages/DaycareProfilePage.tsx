import React, { useState } from 'react';
import { Star, Clock, Users, MapPin, Phone, Mail, Globe, Check, AlertTriangle, Calendar, DollarSign, BookOpen, Award } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DaycareProfilePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // This would typically come from an API or props
  const daycare = {
    name: "Happy Kids Daycare",
    address: "23 Rue de la Gare, Luxembourg City",
    phone: "(+352) 123-4567",
    email: "info@happykidsdaycare.lu",
    website: "www.happykidsdaycare.lu",
    rating: 4.8,
    reviewCount: 120,
    hours: "7:00 AM - 6:00 PM",
    ageGroups: [
      { name: "Infant (0-6 months)", spots: 3, ratio: "1:3" },
      { name: "Infant (6-12 months)", spots: 4, ratio: "1:3" },
      { name: "Toddler (1-2 years)", spots: 8, ratio: "1:4" },
      { name: "Preschool (3-5 years)", spots: 15, ratio: "1:6" }
    ],
    waitingList: {
      status: "Open",
      estimatedWait: "2-3 months"
    },
    description: "Happy Kids Daycare is a nurturing environment where children learn, play, and grow. Our experienced staff is dedicated to providing high-quality care and early education.",
    features: [
      "Certified early childhood educators",
      "Age-appropriate curriculum",
      "Outdoor playground",
      "Nutritious meals and snacks",
      "Security cameras",
      "Regular parent-teacher communication"
    ],
    languages: ["English", "French", "Luxembourgish"],
    educationalApproach: "Montessori-inspired with focus on play-based learning",
    staffQualifications: "All staff members have a minimum of a Bachelor's degree in Early Childhood Education and receive ongoing professional development.",
    outdoorSpace: "Large, secure outdoor play area with age-appropriate equipment and gardening space.",
    dailySchedule: [
      { time: "7:00 AM - 9:00 AM", activity: "Arrival and free play" },
      { time: "9:00 AM - 9:30 AM", activity: "Morning circle and songs" },
      { time: "9:30 AM - 10:30 AM", activity: "Structured learning activities" },
      { time: "10:30 AM - 11:00 AM", activity: "Outdoor play" },
      { time: "11:00 AM - 12:00 PM", activity: "Lunch" },
      { time: "12:00 PM - 2:00 PM", activity: "Nap time / Quiet activities for older children" },
      { time: "2:00 PM - 3:30 PM", activity: "Afternoon activities and snack" },
      { time: "3:30 PM - 4:30 PM", activity: "Outdoor play" },
      { time: "4:30 PM - 6:00 PM", activity: "Free play and pickup" }
    ],
    pricing: {
      fullTime: {
        weekly: 250,
        monthly: 1000
      },
      partTime: {
        weekly: 150,
        monthly: 600
      },
      additionalFees: [
        { name: "Registration fee", amount: 100, frequency: "One-time" },
        { name: "Materials fee", amount: 50, frequency: "Annual" }
      ]
    },
    images: [
      "https://images.unsplash.com/photo-1576037728058-fe4748d14fa3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576670159805-381a9b579bb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576670160940-9a30457df44c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567743453781-f2c86b85e100?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567743453781-f2c86b85e100?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    reviews: [
      { author: "Sarah M.", rating: 5, comment: "Excellent care and nurturing environment. My child loves going to Happy Kids every day!" },
      { author: "Michael L.", rating: 4, comment: "Great staff and facilities. Communication could be improved slightly." },
      { author: "Emma R.", rating: 5, comment: "The Montessori approach has really helped my child's development. Highly recommend!" }
    ],
    coordinates: [49.6116, 6.1319] as [number, number]
  };

  const handleTourRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tour requested for:', { selectedDate, selectedTime });
    alert('Tour request submitted successfully!');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img src={daycare.images[0]} alt={daycare.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{daycare.name}</h1>
                <div className="flex items-center mb-2">
                  <MapPin className="mr-2" size={20} />
                  <span>{daycare.address}</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-1" size={20} />
                  <span className="font-semibold mr-2">{daycare.rating}</span>
                  <span>({daycare.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">About {daycare.name}</h2>
                <p className="text-gray-700 mb-6">{daycare.description}</p>
                
                <h3 className="text-xl font-semibold mb-4">Age Groups and Availability</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {daycare.ageGroups.map((group, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">{group.name}</h4>
                      <p>Available spots: {group.spots}</p>
                      <p>Staff-to-child ratio: {group.ratio}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-2">Waiting List Status</h4>
                  <p>Status: {daycare.waitingList.status}</p>
                  <p>Estimated wait time: {daycare.waitingList.estimatedWait}</p>
                </div>

                <h3 className="text-xl font-semibold mb-4">Features and Programs</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  {daycare.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="text-green-500 mr-2" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mb-4">Languages of Instruction</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {daycare.languages.map((language, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{language}</span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-4">Educational Approach</h3>
                <p className="text-gray-700 mb-6">{daycare.educationalApproach}</p>

                <h3 className="text-xl font-semibold mb-4">Staff Qualifications</h3>
                <p className="text-gray-700 mb-6">{daycare.staffQualifications}</p>

                <h3 className="text-xl font-semibold mb-4">Outdoor Space</h3>
                <p className="text-gray-700 mb-6">{daycare.outdoorSpace}</p>

                <h3 className="text-xl font-semibold mb-4">Daily Schedule</h3>
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  {daycare.dailySchedule.map((item, index) => (
                    <div key={index} className="mb-2">
                      <span className="font-semibold">{item.time}:</span> {item.activity}
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-4">Pricing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Full-Time</h4>
                    <p>Weekly: €{daycare.pricing.fullTime.weekly}</p>
                    <p>Monthly: €{daycare.pricing.fullTime.monthly}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Part-Time</h4>
                    <p>Weekly: €{daycare.pricing.partTime.weekly}</p>
                    <p>Monthly: €{daycare.pricing.partTime.monthly}</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-2">Additional Fees</h4>
                  {daycare.pricing.additionalFees.map((fee, index) => (
                    <p key={index}>{fee.name}: €{fee.amount} ({fee.frequency})</p>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {daycare.images.map((image, index) => (
                    <img key={index} src={image} alt={`${daycare.name} - Image ${index + 1}`} className="w-full h-48 object-cover rounded-lg shadow-md" />
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-4">Parent Reviews</h3>
                <div className="space-y-4 mb-6">
                  {daycare.reviews.map((review, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Star className="text-yellow-400 mr-1" size={16} />
                        <span className="font-semibold mr-2">{review.rating}</span>
                        <span className="text-gray-600">{review.author}</span>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <div className="h-64 rounded-lg overflow-hidden shadow-md mb-6">
                  <MapContainer center={daycare.coordinates} zoom={15} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={daycare.coordinates}>
                      <Popup>{daycare.name}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-100 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="flex items-center mb-2">
                    <Phone className="text-gray-400 mr-2" size={20} />
                    <span>{daycare.phone}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Mail className="text-gray-400 mr-2" size={20} />
                    <a href={`mailto:${daycare.email}`} className="text-indigo-600 hover:underline">{daycare.email}</a>
                  </div>
                  <div className="flex items-center mb-4">
                    <Globe className="text-gray-400 mr-2" size={20} />
                    <a href={`https://${daycare.website}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{daycare.website}</a>
                  </div>
                  <div className="flex items-center mb-2">
                    <Clock className="text-gray-400 mr-2" size={20} />
                    <span>{daycare.hours}</span>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Request a Tour</h3>
                  <form onSubmit={handleTourRequest}>
                    <div className="mb-4">
                      <label htmlFor="tour-date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        id="tour-date"
                        className="input w-full"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="tour-time" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                      <select
                        id="tour-time"
                        className="input w-full"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                      >
                        <option value="">Select a time</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                      Request Tour
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaycareProfilePage;
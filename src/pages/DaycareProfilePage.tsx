import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Check, Star, MapPin, Clock, Users, AlertCircle } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { Daycare, DaycareReview } from '../types/daycare';
import LoadingSpinner from '../components/LoadingSpinner';
import TourScheduler from '../components/TourScheduler';
import WaitlistForm from '../components/WaitlistForm';
import ReviewForm from '../components/ReviewForm';
import PhotoGallery from '../components/PhotoGallery';
import VirtualTour from '../components/VirtualTour';
import { mockDaycare, mockReviews } from '../mocks/daycareData';
import PricingPrograms from '../components/PricingPrograms';

interface DaycareResponse {
  daycare: Daycare;
  reviews: DaycareReview[];
}

const DaycareProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, request } = useApi<DaycareResponse>();
  const [showTourScheduler, setShowTourScheduler] = useState(false);
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fetchDaycare = async () => {
    try {
      setTimeout(() => {
        const mockResponse = {
          daycare: mockDaycare,
          reviews: mockReviews
        };
        request('get', `/daycares/${id}`, null, mockResponse);
      }, 1000);
    } catch (err) {
      console.error('Failed to fetch daycare:', err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDaycare();
    }
  }, [id, request]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center justify-center text-red-600 mb-4">
            <AlertCircle size={48} />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Error Loading Daycare
          </h2>
          <p className="text-gray-600 text-center mb-6">
            {error.message || 'Failed to load daycare information'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data?.daycare) {
    return null;
  }

  const { daycare, reviews } = data;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64 sm:h-80">
            <img
              src={daycare.image}
              alt={daycare.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{daycare.name}</h1>
              <div className="flex items-center">
                <Star className="text-yellow-400 w-6 h-6" />
                <span className="ml-2 text-lg font-semibold">{daycare.rating}</span>
                <span className="ml-1 text-gray-500">({daycare.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start">
                <MapPin className="flex-shrink-0 text-gray-400 w-6 h-6 mt-1" />
                <span className="ml-2">{daycare.address}</span>
              </div>
              <div className="flex items-start">
                <Clock className="flex-shrink-0 text-gray-400 w-6 h-6 mt-1" />
                <span className="ml-2">{daycare.hours}</span>
              </div>
              <div className="flex items-start">
                <Users className="flex-shrink-0 text-gray-400 w-6 h-6 mt-1" />
                <span className="ml-2">{daycare.ageRange}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{daycare.description}</p>

            {/* Features Section */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Features and Programs</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {daycare.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="text-green-500 mr-2" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Languages Section */}
              <h3 className="text-xl font-semibold mb-4">Languages of Instruction</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {daycare.languages.map((language, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>

              {/* Other Sections */}
              <h3 className="text-xl font-semibold mb-4">Educational Approach</h3>
              <p className="text-gray-700 mb-6">{daycare.educationalApproach}</p>

              <h3 className="text-xl font-semibold mb-4">Staff Qualifications</h3>
              <p className="text-gray-700 mb-6">{daycare.staffQualifications}</p>

              <h3 className="text-xl font-semibold mb-4">Outdoor Space</h3>
              <p className="text-gray-700 mb-6">{daycare.outdoorSpace}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => setShowTourScheduler(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Schedule a Tour
              </button>
              {daycare.capacity.available === 0 && (
                <button
                  onClick={() => setShowWaitlistForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Join Waitlist
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Price Calculator</h2>
            <PricingPrograms
              hourlyRate={daycare.pricing.hourlyRate}
            />
          </div>
        </div>

        {/* Photo Gallery Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Photo Gallery</h2>
            <PhotoGallery photos={daycare.photos} />
          </div>
        </div>

        {/* Virtual Tour Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Virtual Tour</h2>
            <VirtualTour 
              tourUrl={daycare.virtualTour.url}
              thumbnailUrl={daycare.virtualTour.thumbnailUrl}
            />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Reviews</h2>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Write a Review
            </button>
          </div>
          
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="font-semibold">{review.userName}</span>
                    <div className="ml-4 flex items-center">
                      <Star className="text-yellow-400 w-4 h-4" />
                      <span className="ml-1">{review.rating}</span>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Overlays */}
        {showTourScheduler && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="relative bg-white rounded-lg max-w-md w-full">
              <TourScheduler
                daycareId={id || ''}
                onClose={() => setShowTourScheduler(false)}
              />
            </div>
          </div>
        )}

        {showWaitlistForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="relative bg-white rounded-lg max-w-md w-full">
              <WaitlistForm
                daycareId={id || ''}
                onClose={() => setShowWaitlistForm(false)}
              />
            </div>
          </div>
        )}

        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="max-w-md w-full">
              <ReviewForm
                daycareId={daycare.id}
                onSubmitted={() => {
                  setShowReviewForm(false);
                  fetchDaycare();
                }}
                onCancel={() => setShowReviewForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaycareProfilePage;
export const mockDaycare = {
  id: "1",
  name: "Sunshine Daycare Center",
  address: "123 Main Street, Cityville",
  rating: 4.8,
  reviewCount: 45,
  hours: "Monday-Friday: 7:00 AM - 6:00 PM",
  ageRange: "6 months - 5 years",
  features: [
    "Outdoor Playground",
    "Educational Programs",
    "Healthy Meals",
    "Security Cameras",
    "Qualified Staff",
    "Music Classes"
  ],
  languages: ["English", "French", "Spanish"],
  educationalApproach: "We follow a play-based learning approach that encourages creativity and critical thinking while ensuring children meet developmental milestones.",
  staffQualifications: "All our staff members are certified in Early Childhood Education and receive regular professional development training.",
  outdoorSpace: "Large fenced playground with age-appropriate equipment, garden area, and covered play space for rainy days.",
  specialNeeds: true,
  mealOptions: ["Breakfast", "Lunch", "Snacks"],
  image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3",
  coordinates: [40.7128, -74.0060],
  description: "A nurturing environment where children learn, play, and grow together. Our experienced staff provides individualized attention to each child.",
  capacity: {
    total: 50,
    available: 5
  },
  programs: [
    {
      id: "1",
      name: "Infant Care",
      ageRange: "6 weeks - 12 months",
      description: "Nurturing care for infants with personalized schedules and daily activities.",
      schedule: "Full-time",
      price: 1500,
      availability: 2
    },
    {
      id: "2",
      name: "Toddler Program",
      ageRange: "1 - 2 years",
      description: "Active learning environment focusing on motor skills and early socialization.",
      schedule: "Full-time / Part-time",
      price: 1300,
      availability: 3
    },
    {
      id: "3",
      name: "Preschool",
      ageRange: "3 - 5 years",
      description: "Comprehensive early education program preparing children for kindergarten.",
      schedule: "Full-time / Part-time",
      price: 1200,
      availability: 5
    }
  ],
  pricing: {
    hourlyRate: 15,
    registration: 100,
    deposit: 500
  },
  photos: [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3",
      caption: "Our spacious and safe outdoor playground",
      category: "Outdoor Space"
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1544140708-514b7837e6b5?ixlib=rb-4.0.3",
      caption: "Art room where children explore their creativity",
      category: "Activity Areas"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1587652990400-50866e64d5f7?ixlib=rb-4.0.3",
      caption: "Cozy nap room with comfortable beds",
      category: "Sleeping Areas"
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1567743453618-28426a3c8900?ixlib=rb-4.0.3",
      caption: "Modern and clean dining area",
      category: "Dining Area"
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1567743453618-28426a3c8901?ixlib=rb-4.0.3",
      caption: "Reading corner with age-appropriate books",
      category: "Activity Areas"
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1567743453618-28426a3c8902?ixlib=rb-4.0.3",
      caption: "Secure and welcoming entrance",
      category: "Facility"
    }
  ],
  virtualTour: {
    url: "https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcE1...",
    thumbnailUrl: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3"
  }
};

export const mockReviews = [
  {
    id: "1",
    userId: "user1",
    userName: "Sarah Johnson",
    rating: 5,
    comment: "Amazing daycare! The staff is incredibly caring and my daughter loves going there every day.",
    createdAt: "2024-02-15T08:00:00.000Z",
    updatedAt: "2024-02-15T08:00:00.000Z"
  },
  {
    id: "2",
    userId: "user2",
    userName: "Michael Brown",
    rating: 4,
    comment: "Very professional and structured environment. Great communication with parents.",
    createdAt: "2024-02-10T09:30:00.000Z",
    updatedAt: "2024-02-10T09:30:00.000Z"
  }
]; 
export interface Daycare {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  hours: string;
  ageRange: string;
  features: string[];
  languages: string[];
  educationalApproach: string;
  staffQualifications: string;
  outdoorSpace: string;
  specialNeeds: boolean;
  mealOptions: string[];
  image: string;
  coordinates: [number, number];
  description: string;
  capacity: {
    total: number;
    available: number;
  };
  pricing: {
    hourlyRate: number;
    monthly: number;
    registration: number;
    deposit: number;
    discounts?: {
      name: string;
      description: string;
      amount: number;
      type: 'percentage' | 'fixed';
    }[];
  };
  photos: DaycarePhoto[];
  virtualTour: {
    url: string;
    thumbnailUrl: string;
  };
  programs: Program[];
}

export interface DaycareReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface DaycarePhoto {
  id: string;
  url: string;
  caption?: string;
  category: string;
}

interface Program {
  id: string;
  name: string;
  ageRange: string;
  description: string;
  schedule: string;
  price: number;
  availability: number;
} 
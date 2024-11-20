export interface Immunization {
  id: string;
  name: string;
  date: string;
  nextDue?: string;
  documentUrl?: string;
}

export interface MedicalInfo {
  allergies: string[];
  conditions: string[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
  }[];
}

export interface ChildDocument {
  id: string;
  type: 'medical' | 'legal' | 'identification' | 'other';
  name: string;
  url: string;
  uploadDate: string;
  expiryDate?: string;
}

export interface Child {
  id: string;
  parentId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  medicalInfo: MedicalInfo;
  immunizations: Immunization[];
  documents: ChildDocument[];
  photo?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
} 
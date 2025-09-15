export interface newSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface MentorApprovalData {
  fullName: string;
  profilePicture: string;
  professionalTitle: string;
  bio: string;
  skills: string[];
  primaryCategory: string;
  experienceLevel: string;
  yearsOfExperience: string;
  highestQualification: string;
  certifications: string[];
  resume: string;
  status: string;
  timeSlots: newSlot[];
  preferredDays: [];
  timeZone: string;
  sessionPrice: string;
  currency: string;
  sessionDuration: number;
  linkedin: string;
  github: string;
  portfolio: string;
  youtube: string;
  demoVideo: string;
  experience: string;
  teachingStyle: string;
  languages: string[];
  agreedToTerms: boolean;
  agreedToNDA: boolean;
}

export interface currencySymbols {
  [key: string]: string;
}

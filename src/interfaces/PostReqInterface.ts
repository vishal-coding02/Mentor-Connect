export interface Requirement {
  location: string;
  phone: string;
  requirementDetails: string;
  subjects: string[];
  newSubject: string;
  showNewSubjectInput: boolean;
  level: string;
  iWant: string;
  budget: string;
  budgetCurrency: string;
  genderPreference: string;
  languages: string[];
  tutorLocation: string;
  files: string[];
}

export interface MeetingOpt {
  online: boolean;
  atMyPlace: boolean;
  travelToTutor: boolean;
}

export interface CurrencyRates {
  [currencyCode: string]: number;
}
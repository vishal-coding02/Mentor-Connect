export interface RequirementDetail {
  id: string;
  requirementDetails: string;
  subjects: string[];
  languages: string[];
  iWant: string;
  level: string;
  budget: number;
  budgetCurrency: string;
  genderPreference: string;
  location: string;
  tutorLocation: string;
  meetingOptions: {
    online: boolean;
    atMyPlace: boolean;
    travelToTutor: boolean;
  };
}

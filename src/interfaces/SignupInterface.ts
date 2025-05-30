export interface SignUpForm {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  userType: string;
  profilePhoto: File | null;
  previewPhoto: string | ArrayBuffer | null;
}
export interface SignupContextType {
  setLoginState: (value: boolean) => void;
  setUserEmail: (email: string | null) => void;
  setUserName: (name: string) => void;
  setUserType: (type: string) => void;
  setUserProfilePhoto: (photo: string) => void;
}

export interface SignUpForm {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  userType: string;
  profilePhoto: File | null;
  previewPhoto: string | ArrayBuffer | null;
}

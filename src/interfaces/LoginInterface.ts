type UserType = "mentor" | "student" | "admin" | "pendingMentor";

export interface LoginForm {
  userEmail: string;
  userPassword: string;
}

export interface UserData {
  userUid: string;
  userName: string;
  userEmail: string;
  UserType: "mentor" | "student" | "admin" | "pendingMentor";
  userProfilePhoto: string;
}

export interface LoginContextType {
  setLoginState: (value: boolean) => void;
  setUserEmail: (email: string | null) => void;
  setUserName: (name: string) => void;
  setUserType: (type: UserType) => void;
  setUserProfilePhoto: (photo: string) => void;
  userType: UserType;
  reapprovalStatus: string | null;
  isApproved: boolean | null;
}

export interface AuthState {
  loginState: boolean;
  userEmail: string | null;
  userType: "mentor" | "student" | "admin" | "pendingMentor" | null;
  userName: string | null;
  userProfilePhoto: string | null;
  loading: boolean;
  isApproved: boolean | null;
  reapprovalStatus: string | null;
  reapprovalFields: string[];
  reapprovalReason: string;
}

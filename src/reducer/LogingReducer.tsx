import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { auth, db } from "../BACKEND/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import type { AuthState } from "../interfaces/AuthSliceInterface";

const initialState: AuthState = {
  loginState: false,
  userEmail: null,
  userType: null,
  userName: null,
  userProfilePhoto: null,
  loading: true,
  isApproved: null,
  reapprovalStatus: null,
  reapprovalFields: [],
  reapprovalReason: "",
};

export const listenToAuthChanges = createAsyncThunk<AuthState>(
  "auth/listenToAuthChanges",
  async (_, thunkAPI) => {
    return new Promise<AuthState>((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) return resolve({ ...initialState, loading: false });

        try {
          const uid = user.uid;
          const userRef = doc(db, "users", uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists())
            return resolve({ ...initialState, loading: false });

          const userData = userSnap.data();

          let userDetails: AuthState = {
            userName: user.displayName || userData.name,
            userEmail: user.email,
            userType: userData.userType,
            userProfilePhoto: userData.profilePhoto || user.photoURL || null,
            isApproved: null,
            reapprovalStatus: null,
            reapprovalFields: [],
            reapprovalReason: "",
            loginState: true,
            loading: false,
          };

          if (userData.userType === "mentor") {
            const mentorRef = doc(db, "mentors", uid);
            const mentorSnap = await getDoc(mentorRef);
            const mentorData = mentorSnap.exists() ? mentorSnap.data() : {};

            userDetails = {
              ...userDetails,
              userName: mentorData.name || userData.name || user.displayName,
              userType: "mentor",
              userProfilePhoto:
                mentorData.profilePicture || user.photoURL || null,
              isApproved: true,
            };
          } else if (userData.userType === "pendingMentor") {
            const mentorRequestRef = doc(db, "mentorRequest", uid);
            const mentorRequestSnap = await getDoc(mentorRequestRef);
            const mentorRequestData = mentorRequestSnap.exists()
              ? mentorRequestSnap.data()
              : {};

            userDetails = {
              ...userDetails,
              userType: "pendingMentor",
              isApproved: mentorRequestData.isApproved || null,
              reapprovalStatus: mentorRequestData.status || null,
              reapprovalFields: mentorRequestData.reapproval_fields || [],
              reapprovalReason: mentorRequestData.reapproval_reason || "",
              loginState: mentorRequestData.isApproved === true,
            };
          }

          resolve(userDetails);
        } catch (error) {
          console.error("Redux: Error fetching user data:", error);
          resolve({ ...initialState, loading: false });
        }
      });
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (): AuthState => initialState,
    setUserAuthData: (state, action: PayloadAction<Partial<AuthState>>) => ({
      ...state,
      ...action.payload,
    }),
  },

  extraReducers: (builder) => {
    builder.addCase(listenToAuthChanges.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export const { resetAuthState, setUserAuthData } = authSlice.actions;
export default authSlice.reducer;

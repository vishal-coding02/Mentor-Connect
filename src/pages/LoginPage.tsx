import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../BACKEND/firebase.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUserAuthData } from "../reducer/LogingReducer.jsx";
import type { LoginForm } from "../interfaces/LoginInterface";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState<boolean>(false);
  const [signIn, setSignIn] = useState<LoginForm>({
    userEmail: "",
    userPassword: "",
  });

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signIn.userEmail,
        signIn.userPassword
      );
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("No account found. Please signup first.");
        navigate("/signup");
        return;
      }

      const userData = userSnap.data();

      const mentorReqRef = doc(db, "mentorRequest", user.uid);
      const mentorReqSnap = await getDoc(mentorReqRef);

      let mentorStatus = "";
      if (mentorReqSnap.exists()) {
        const mentorReqData = mentorReqSnap.data();
        mentorStatus = mentorReqData.status;
      }

      localStorage.setItem("userName", user.displayName || userData.name);
      localStorage.setItem("userEmail", user.email || "");
      localStorage.setItem("userAccessToken", user.uid);
      localStorage.setItem("userType", userData.userType);
      localStorage.setItem(
        "userProfilePhoto",
        userData.profilePhoto || user.photoURL || ""
      );

      dispatch(
        setUserAuthData({
          userEmail: user.email,
          userType: userData.userType,
          userName: user.displayName || userData.name,
          userProfilePhoto: userData.profilePhoto || user.photoURL || "",
          isApproved: userData.isApproved || null,
          reapprovalStatus: mentorStatus || null,
          reapprovalFields: userData.reapprovalFields || [],
          reapprovalReason: userData.reapprovalReason || "",
          loginState: true,
        })
      );

      alert("User Logged In Successfully!");
      console.log(userData);

      // Modified Redirect Logic
      if (userData.userType === "pendingMentor") {
        if (mentorStatus === "reapproval_pending") {
          navigate("/reApproveMentor");
        } else if (
          !userData.isApproved &&
          userData.userType === "pendingMentor"
        ) {
          navigate("/pendingMentor");
        }
      } else if (userData.userType === "mentor") {
        navigate("/mentorDashboard");
      } else if (userData.userType === "student") {
        navigate("/postRequirement:id");
      } else if (userData.userType === "admin") {
        navigate("/adminDashBoard");
      }
    } catch (error) {
      console.error("Login Failed:", error.message);
      alert("Login Failed: " + error.message);
    }

    setSignIn({
      userEmail: "",
      userPassword: "",
    });
  }

  async function googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        alert("No account found. Please signup first.");
        navigate("/signup");
        return;
      }
      const userData = userSnap.data();

      const mentorReqRef = doc(db, "mentorRequest", user.uid);
      const mentorReqSnap = await getDoc(mentorReqRef);

      let mentorStatus = "";
      if (mentorReqSnap.exists()) {
        const mentorReqData = mentorReqSnap.data();
        mentorStatus = mentorReqData.status;
      }

      localStorage.setItem("userName", user.displayName || userData.name);
      localStorage.setItem("userEmail", user.email || "");
      localStorage.setItem("userAccessToken", user.uid);
      localStorage.setItem("userType", userData.userType);
      localStorage.setItem(
        "userProfilePhoto",
        userData.profilePhoto || user.photoURL || ""
      );

      dispatch(
        setUserAuthData({
          userEmail: user.email,
          userType: userData.userType,
          userName: user.displayName || userData.name,
          userProfilePhoto: userData.profilePhoto || user.photoURL || "",
          loginState: true,
        })
      );

      alert("Login successful!");
      console.log(userData);

      // Modified Redirect Logic
      if (userData.userType === "pendingMentor") {
        if (mentorStatus === "reapproval_pending") {
          navigate("/reApproveMentor");
        } else if (!userData.isApproved) {
          navigate("/pendingMentor");
        }
      } else if (userData.userType === "mentor") {
        navigate("/mentorDashboard");
      } else if (userData.userType === "student") {
        navigate("/postRequirement:id");
      } else if (userData.userType === "admin") {
        navigate("/adminDashBoard");
      }
    } catch (error) {
      console.error("Google SignIn Error:", error.message);
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Navbar />
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-24 pb-20 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Welcome Back
            </h2>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2 text-xl text-center">
                Log in
              </label>
            </div>

            <form className="space-y-6" onSubmit={handleSignIn}>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={signIn.userEmail}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setSignIn({ ...signIn, userEmail: e.target.value });
                  }}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  value={signIn.userPassword}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setSignIn({ ...signIn, userPassword: e.target.value });
                  }}
                  placeholder="Enter your password"
                  required
                />
                {signIn.userPassword && (
                  <i
                    className={`absolute right-3 top-[50px] fa-solid ${
                      showPass ? "fa-eye" : "fa-eye-slash"
                    } text-gray-400 cursor-pointer`}
                    onClick={() => setShowPass(!showPass)}
                  ></i>
                )}
              </div>

              <div className="text-right">
                <a
                  href="#"
                  className="text-yellow-400 hover:text-yellow-300 transition duration-300 text-sm"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="mt-6">
                <p className="block text-gray-300 mb-2">Continue with Google</p>
                <button
                  className="w-full bg-gray-900 text-yellow-400 cursor-pointer px-6 py-2 rounded-lg font-semibold shadow-md transform hover:scale-105 transition duration-300 mt-2"
                  onClick={googleSignIn}
                >
                  Sign in with <i className="fa-brands fa-google"></i>
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-gray-900 cursor-pointer px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition duration-300"
              >
                Log In
              </button>
            </form>

            <p className="text-center text-gray-400 mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-yellow-400 hover:text-yellow-300 transition duration-300"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Login;

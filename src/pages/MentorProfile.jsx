import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { auth } from "../BACKEND/firebase";
import { db } from "../BACKEND/firebase";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
function MentorProfile() {
  const [mentorData, setMentorData] = useState(null);
  const [error, setError] = useState(null);
  const { userType } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const mentorDocRef = doc(db, "mentors", user.uid);
          const mentorDocSnap = await getDoc(mentorDocRef);

          if (mentorDocSnap.exists()) {
            setMentorData(mentorDocSnap.data());
          } else {
            setError("Mentor profile not found.");
          }
        } catch (err) {
          setError("Failed to fetch mentor data: " + err.message);
        }
      } else {
        setError("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex items-center justify-center">
        <div className="text-center p-6 bg-gray-800 rounded-lg max-w-md">
          <div className="text-red-400 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Error Loading Profile</h3>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!mentorData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <svg
          className="animate-spin h-8 w-8 text-yellow-400"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Header */}
      <Navbar />

      {/* Mentor Profile Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-16 pb-12 min-h-screen flex items-center">
        <div className="container lg:mt-15 mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-5 border-b border-gray-600 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Mentor Profile
                </h2>
                <p className="text-gray-300 mt-1 text-sm">
                  Complete profile details
                </p>
              </div>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-md transform hover:scale-105 transition duration-300 text-sm">
                Edit Profile
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Basic Info */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                <div className="relative">
                  <img
                    src={mentorData.profilePicture}
                    alt={`${mentorData.fullName}'s Profile`}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-yellow-400 shadow-xl"
                  />
                  <div className="absolute -bottom-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Available
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white">
                    {mentorData.fullName}
                  </h3>
                  <p className="text-yellow-400 mt-1 text-lg">
                    {mentorData.professionalTitle}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                    <span className="bg-gray-700 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                      {mentorData.experienceLevel}
                    </span>
                    <span className="bg-gray-700 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                      {mentorData.yearsOfExperience} years exp
                    </span>
                    <span className="bg-gray-700 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                      {mentorData.primaryCategory}
                    </span>
                  </div>
                  <p className="text-gray-300 mt-4 text-base leading-relaxed">
                    {mentorData.bio}
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              {/* <div className="bg-gray-700 rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">250+</p>
                  <p className="text-gray-300 text-sm">Sessions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">4.9</p>
                  <p className="text-gray-300 text-sm">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">98%</p>
                  <p className="text-gray-300 text-sm">Completion</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">50+</p>
                  <p className="text-gray-300 text-sm">Students</p>
                </div>
              </div> */}

              {/* Divider */}
              <div className="border-t border-gray-700"></div>

              {/* Mentor Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Experience & Education */}
                  <div className="bg-gray-700 p-5 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Experience & Education
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          Experience
                        </p>
                        <p className="text-white mt-1">
                          {mentorData.experience}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          Highest Qualification
                        </p>
                        <p className="text-white mt-1">
                          {mentorData.highestQualification}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          Certifications
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {mentorData.certifications.map((cert, index) => (
                            <span
                              key={index}
                              className="bg-gray-800 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                            >
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Teaching Details */}
                  <div className="bg-gray-700 p-5 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Teaching Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          Teaching Style
                        </p>
                        <p className="text-white mt-1">
                          {mentorData.teachingStyle}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          Languages
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {mentorData.languages.map((lang, index) => (
                            <span
                              key={index}
                              className="bg-gray-800 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Session Details */}
                  <div className="bg-gray-700 p-5 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Session Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          Session Price
                        </p>
                        <p className="text-white mt-1 text-xl font-bold">
                          {mentorData.currency} {mentorData.sessionPrice} /{" "}
                          {mentorData.sessionDuration} min
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          Availability
                        </p>
                        <div className="space-y-2 mt-2">
                          {mentorData.timeSlots.map((slot, index) => {
                            const timeString =
                              typeof slot === "object"
                                ? `${slot.day} ${slot.startTime} - ${slot.endTime}`
                                : slot;

                            return (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <svg
                                  className="w-4 h-4 text-yellow-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <p className="text-white">{timeString}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          Preferred Days
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {mentorData.preferredDays.map((day, index) => (
                            <span
                              key={index}
                              className="bg-gray-800 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold"
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          Time Zone
                        </p>
                        <p className="text-white mt-1">{mentorData.timeZone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="bg-gray-700 p-5 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                      Skills & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mentorData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-800 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700"></div>

              {/* Social Links */}
              <div className="bg-gray-700 p-5 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <a
                    href={mentorData.linkedin}
                    className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href={mentorData.github}
                    className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href={mentorData.portfolio}
                    className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    Portfolio
                  </a>
                  <a
                    href={mentorData.youtube}
                    className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    YouTube
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-gray-800 cursor-pointer  hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition duration-300 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  View Resume
                </button>
                {/* {userType === "student" && ( */}
                <button
                  onClick={() => navigate("/unLockContact")}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-md transform hover:scale-105 transition duration-300 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Book a Session
                </button>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MentorProfile;

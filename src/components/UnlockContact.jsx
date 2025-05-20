import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function UnlockContact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 text-gray-200 font-sans">
      {/* Header */}
      <Navbar />

      {/* Unlock Contact Section */}
      <section className="pt-24 pb-20 min-h-screen flex items-center">
        <div className="container lg:mt-10 mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto bg-gray-800 p-6 sm:p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
              Unlock Mentor Contact
            </h2>
            <p className="text-center text-gray-400 mb-8 sm:mb-10">
              Connect with your mentor by unlocking their contact details.
            </p>

            {/* Mentor Card */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-8">
              <div className="flex items-center space-x-4">
                <img
                  src="https://via.placeholder.com/64"
                  alt="Mentor Profile"
                  className="w-16 h-16 rounded-full border-2 border-yellow-400"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Dr. John Smith
                  </h3>
                  <p className="text-gray-400">
                    Expert in Java & Python | 10+ Years Experience
                  </p>
                  <p className="text-sm text-yellow-400">
                    Rating: ★★★★★ (4.9/5)
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-4">
                Your Coins: <span className="text-yellow-400 font-semibold">15</span>
              </p>

              {/* Case 1: Sufficient Coins */}
              {/* Comment out one of the sections to test the other */}
              <div className="space-y-4">
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold shadow-md transition duration-300"
                >
                  Unlock for 20 Coins
                </button>
              </div>

              {/* Case 2: Not Enough Coins */}
              {/* Uncomment this to test the "Not enough coins" case */}
              {/*
              <div className="space-y-4">
                <p className="text-red-400 font-medium">
                  Not enough coins! You need 5 more coins.
                </p>
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold shadow-md transition duration-300"
                >
                  Buy Coins
                </button>
              </div>
              */}

              {/* Case 3: Contact Unlocked */}
              {/* Uncomment this to test the unlocked contact info */}
              {/*
              <div className="space-y-4">
                <p className="text-xl text-gray-200">
                  <span className="font-semibold">Email:</span> mentor@example.com
                </p>
                <p className="text-xl text-gray-200">
                  <span className="font-semibold">Phone:</span> +91 9876543210
                </p>
                <p className="text-sm text-gray-500">
                  Contact unlocked successfully!
                </p>
              </div>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default UnlockContact;
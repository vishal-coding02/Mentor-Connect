import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function BuyCoins() {
  const coinPackages = [
    { coins: 50, price: 399, savings: "Save 10%" },
    { coins: 100, price: 799, savings: "Save 20%" },
    { coins: 250, price: 1799, savings: "Save 30%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 text-gray-200 font-sans">
      {/* Header */}
      <Navbar />

      {/* Buy Coins Section */}
      <section className="pt-24 pb-20 min-h-screen flex items-center">
        <div className="container lg:mt-10 mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-gray-800 p-6 sm:p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
              Buy Coins
            </h2>
            <p className="text-center text-gray-400 mb-8 sm:mb-10">
              Purchase coins to unlock mentor contact details and more!
            </p>

            {/* Step 1: Choose a Package */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">
                Step 1: Choose Your Package
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {coinPackages.map((pkg, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-2 border-transparent hover:border-yellow-400"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {pkg.coins} Coins
                    </h4>
                    <p className="text-gray-400 mb-4">
                      ₹{pkg.price}{" "}
                      <span className="text-sm text-green-400">
                        {pkg.savings}
                      </span>
                    </p>
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300">
                      Select Package
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Enter Details */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">
                Step 2: Enter Your Details
              </h3>
              <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value="Amit Sharma"
                      className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value="amit.sharma@example.com"
                      className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">
                Step 3: Select Payment Method
              </h3>
              <div className="bg-gray-700 p-6 rounded-lg shadow-md space-y-4">
                {/* Card Option */}
                <div>
                  <button className="w-full flex items-center justify-between bg-gray-600 hover:bg-gray-500 px-4 py-3 rounded-lg text-gray-200 transition duration-300">
                    <div className="flex items-center">
                      <img
                        src="https://via.placeholder.com/24"
                        alt="Visa"
                        className="w-6 h-6 mr-2"
                      />
                      <img
                        src="https://via.placeholder.com/24"
                        alt="MasterCard"
                        className="w-6 h-6 mr-2"
                      />
                      Credit/Debit Card
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* UPI Option */}
                <div>
                  <button className="w-full flex items-center justify-between bg-gray-600 hover:bg-gray-500 px-4 py-3 rounded-lg text-gray-200 transition duration-300">
                    <div className="flex items-center">
                      <img
                        src="https://via.placeholder.com/24"
                        alt="Paytm"
                        className="w-6 h-6 mr-2"
                      />
                      <img
                        src="https://via.placeholder.com/24"
                        alt="GPay"
                        className="w-6 h-6 mr-2"
                      />
                      UPI
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="UPI ID (e.g., name@upi)"
                      className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                    />
                  </div>
                </div>

                {/* PayPal Option */}
                <div>
                  <button className="w-full flex items-center justify-between bg-gray-600 hover:bg-gray-500 px-4 py-3 rounded-lg text-gray-200 transition duration-300">
                    <div className="flex items-center">
                      <img
                        src="https://via.placeholder.com/24"
                        alt="PayPal"
                        className="w-6 h-6 mr-2"
                      />
                      PayPal
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4: Confirm Section */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Step 4: Confirm Your Purchase
              </h3>
              <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <p className="text-gray-400">Selected Package: 100 Coins</p>
                <p className="text-gray-400">Total to Pay: ₹799</p>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-yellow-400 rounded focus:ring-yellow-400"
                />
                <label className="text-sm text-gray-400">
                  I agree to the{" "}
                  <a href="#" className="text-yellow-400 hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                🔒 Secure checkout by Razorpay
              </p>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold shadow-md transition duration-300">
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default BuyCoins;

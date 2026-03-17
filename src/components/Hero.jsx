import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-red-700 via-red-600 to-rose-500 relative flex items-center px-6 md:px-16">
      
      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full mb-6 backdrop-blur-md">
            ❤️ Real-Time Blood Donation Network
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
            Save Lives <br />
            <span className="text-yellow-200">In Real Time</span>
          </h1>

          {/* Description */}
          <p className="text-red-100 text-lg mb-8 max-w-lg">
            Connect with verified blood donors instantly. Track donations in
            real-time with live GPS tracking, smart matching, and emergency alerts.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mb-10">

            <Link
              to="/register"
              className="bg-white text-red-600 px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition font-medium"
            >
              Get Started →
            </Link>

            <Link
              to="/find"
              className="border border-white px-6 py-3 rounded-xl text-white hover:bg-white hover:text-red-600 transition font-medium"
            >
              Find Donors
            </Link>

          </div>

          {/* Stats */}
          <div className="flex gap-12 text-center md:text-left text-white">

            <div>
              <h3 className="text-2xl font-bold">10K+</h3>
              <p className="text-red-200">Active Donors</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">2 min</h3>
              <p className="text-red-200">Avg Response</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">99%</h3>
              <p className="text-red-200">Match Rate</p>
            </div>

          </div>
        </div>


        {/* RIGHT SIDE */}
        <div className="relative flex justify-center">

          {/* Emergency Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-2xl rounded-2xl p-6 w-[320px]"
          >
            <div className="flex items-center gap-3 mb-3">
              ❤️
              <h3 className="font-semibold text-lg">Emergency Request</h3>
            </div>

            <p className="text-red-500 font-semibold mb-2">
              O+ Blood Needed
            </p>

            <p className="text-gray-600 text-sm">
              📍 City Hospital, 2.3 km away
            </p>

            <p className="text-gray-600 text-sm mb-3">
              ⏱ ETA: 8 minutes
            </p>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-2 bg-red-500 w-3/4"></div>
            </div>
          </motion.div>


          {/* Floating badge */}
          <div className="absolute -top-5 right-0 bg-white shadow-md px-4 py-2 rounded-full text-sm font-medium">
            🟢 3 Donors nearby
          </div>

          {/* Live tracking badge */}
          <div className="absolute -bottom-5 left-0 bg-white shadow-md px-4 py-2 rounded-xl text-sm font-medium">
            📍 Live Tracking Active
          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;
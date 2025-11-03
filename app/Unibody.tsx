"use client";

import React from "react";

import { univerisities } from "./constants/constant";
import Link from "next/link";
import ChatFloat from "./componenets/ChatWidget";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] px-4 sm:px-10 xl:px-20 py-12 text-gray-100 relative overflow-hidden">
      {/* Floating Background Lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-10 right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl animate-float-fast"></div>
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Intro Section */}
        <section className="text-center max-w-4xl mx-auto animate-slideInDown">
          <h1 className="text-base sm:text-lg md:text-xl font-medium leading-relaxed bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradientShimmer">
            Explore Pakistan’s top universities, admission details,
            scholarships, and test preparation — all in one trusted platform
            designed to guide your academic journey.
          </h1>
        </section>

        {/* Description */}
        <section
          className="mt-10 text-center max-w-5xl mx-auto animate-fadeIn"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-sm sm:text-md md:text-lg text-gray-300 leading-relaxed">
            Our mission is to help students make smarter admission choices.
            Compare{" "}
            <span className="text-transparent bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text font-semibold">
              universities, entry tests, and programs
            </span>{" "}
            — all tailored to your goals and future career.
          </p>
        </section>

        {/* Animated Section Heading */}
        <div className="relative text-center mt-16 mb-12 animate-slideInUp">
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-violet-100  via-white to-violet-100 bg-clip-text text-transparent animate-textGlow">
            Your Pathway to Success
          </h2>
          {/* Animated timeline underline */}
          <div className="relative mt-3 h-[3px] w-32 mx-auto bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-white/40 animate-lineSweep"></div>
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 px-2 sm:px-0">
          {univerisities.map((uni, i) => (
            <div
              key={i}
              className="relative flex flex-col bg-white/5 backdrop-blur-xl border-4 border-b-cyan-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-all duration-500 group animate-cardEntrance"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Border tracing animation */}
              <span className="absolute inset-0 rounded-2xl border-2 border-transparent bg-[linear-gradient(60deg,rgba(6,182,212,0.3),rgba(59,130,246,0.3),rgba(139,92,246,0.3))] bg-[length:300%_300%] animate-borderFlow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={uni.img}
                  className="w-full h-48 object-cover rounded-t-2xl transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Text */}
              <div className="flex flex-col flex-grow p-5 relative">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent group-hover:animate-textPulse">
                  {uni.name}
                </h3>
                <p className="text-sm sm:text-md text-gray-300 flex-grow group-hover:text-gray-200 transition-colors duration-300">
                  {uni.text}
                </p>

                {/* Button */}
                <div className="mt-5 flex justify-end">
                  <Link href={uni.route}>
                    <button className="relative rounded-xl text-white px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-cyan-800 via-cyan-600 to-cyan-700 hover:from-cyan-800 hover:via-blue-500 hover:to-indigo-500 shadow-lg transition-all duration-300 overflow-hidden group/btn">
                      <span className="relative z-10 flex items-center gap-2">
                        More Details
                        <span className="group-hover/btn:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                      {/* Ripple animation */}
                      <span className="absolute inset-0 rounded-xl bg-white/20 scale-0 group-hover/btn:scale-100 transition-transform duration-500 ease-out"></span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-20 text-center animate-fadeIn"
          style={{ animationDelay: "1s" }}
        >
          <p className="text-gray-400 text-sm sm:text-base">
            Compare, prepare, and take the first confident step toward your{" "}
            <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text font-semibold animate-textShimmer">
              dream admission
            </span>
            .
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        /* Appear and motion animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes cardEntrance {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Text and gradient animations */
        @keyframes gradientShimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes textGlow {
          0%,
          100% {
            text-shadow: 0 0 10px rgba(56, 189, 248, 0.6),
              0 0 20px rgba(139, 92, 246, 0.4);
          }
          50% {
            text-shadow: 0 0 15px rgba(147, 197, 253, 0.8),
              0 0 30px rgba(167, 139, 250, 0.6);
          }
        }
        @keyframes textPulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.03);
          }
        }

        /* Borders and lines */
        @keyframes borderFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes lineSweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        /* Floating lights */
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-25px) translateX(-15px);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-30px) translateX(20px);
          }
        }

        /* Particle float */
        @keyframes particle {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) scale(0.8);
            opacity: 0.3;
          }
        }

        /* Animation utility classes */
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slideInDown {
          animation: slideInDown 0.8s ease-out forwards;
        }
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }
        .animate-cardEntrance {
          animation: cardEntrance 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-gradientShimmer {
          background-size: 200% 200%;
          animation: gradientShimmer 4s linear infinite;
        }
        .animate-textGlow {
          animation: textGlow 3s ease-in-out infinite alternate;
        }
        .animate-textPulse {
          animation: textPulse 2s ease-in-out infinite;
        }
        .animate-borderFlow {
          background-size: 300% 300%;
          animation: borderFlow 3s linear infinite;
        }
        .animate-lineSweep {
          animation: lineSweep 2s linear infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 10s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 8s ease-in-out infinite;
        }
        .animate-particle {
          animation: particle infinite ease-in-out;
        }
      `}</style>
      <ChatFloat />
    </div>
  );
};

export default MainPage;

"use client";

import React from "react";
import { LiaUniversitySolid } from "react-icons/lia";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Navbar Container */}
      <div className="flex w-full h-[8vh] sm:pl-20 pl-4 items-center bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-gray-100 shadow-lg shadow-blue-900/30 border-b border-blue-800/40 animate-slideDown">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative">
            {/* Floating glow layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/60 to-cyan-400/60 rounded-lg blur-md opacity-60 animate-float"></div>
            <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 p-2 rounded-lg shadow-lg">
              <LiaUniversitySolid className="h-7 w-7 md:h-8 md:w-8 text-white" />
            </div>
          </div>

          {/* Brand Text */}
          <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-400 bg-clip-text text-transparent tracking-tight drop-shadow-[0_0_12px_rgba(59,130,246,0.4)] animate-textPulse">
            UNI-TRACK
          </h1>
        </div>

        {/* Tagline */}
        <div className="hidden lg:flex ml-auto mr-8 items-center">
          <span className="text-sm text-slate-400 font-medium animate-fadeInSlow">
            Your Education, Your Future
          </span>
        </div>
      </div>

      {/* Underline Sweep Animation */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-lineSweep"></div>

      {/* Background Shimmer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-bgShimmer pointer-events-none"></div>

      <style jsx>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes textPulse {
          0%,
          100% {
            opacity: 1;
            text-shadow: 0 0 15px rgba(59, 130, 246, 0.5),
              0 0 25px rgba(6, 182, 212, 0.3);
          }
          50% {
            opacity: 0.9;
            text-shadow: 0 0 25px rgba(147, 197, 253, 0.7),
              0 0 35px rgba(6, 182, 212, 0.5);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
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

        @keyframes bgShimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes fadeInSlow {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }

        .animate-textPulse {
          animation: textPulse 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-lineSweep {
          animation: lineSweep 3s linear infinite;
        }

        .animate-bgShimmer {
          background-size: 400% 100%;
          animation: bgShimmer 8s linear infinite;
        }

        .animate-fadeInSlow {
          animation: fadeInSlow 1.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;

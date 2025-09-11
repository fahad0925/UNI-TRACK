"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react"; // icon for exam vibe

export default function PremiumTestLoader() {
  const [progress, setProgress] = useState(0);

  // Fake progress increase for loading effect
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative">
      {/* Circular Progress Loader */}
      <motion.div
        className="relative w-32 h-32 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      >
        <svg className="absolute w-32 h-32">
          <circle
            className="text-gray-700"
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r="60"
            cx="64"
            cy="64"
          />
          <motion.circle
            className="text-cyan-400"
            strokeWidth="6"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="60"
            cx="64"
            cy="64"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </svg>

        {/* Icon inside */}
        <BookOpen className="w-10 h-10 text-cyan-400" />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="mt-6 text-2xl font-bold tracking-wide text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        Loading Your Test...
      </motion.p>

      {/* Motivational Subtitle */}
      <p className="mt-2 text-sm text-gray-400 italic">
        Please wait while we prepare your exam environment
      </p>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
        <motion.div
          className="h-1 bg-cyan-400"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
    </div>
  );
}

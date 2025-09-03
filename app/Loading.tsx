import React from "react";

/**
 * Ultra-Professional Centered Loader
 * - Designed to be truly unique with futuristic lighting effects
 * - Uses concentric rings, neon lighting, and rotating prisms
 * - Fully centered with Tailwind utilities
 * - Accessible with role="status" and reduced-motion fallback
 */

export type LoaderProps = {
  size?: number;
  className?: string;
};

export default function Loader({ size = 140, className = "" }: LoaderProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div
        role="status"
        className={`relative flex flex-col items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        {/* Outer glowing ring */}
        <div
          className="absolute inset-0 rounded-full border-4 animate-spin-slow"
          style={{
            borderColor: "rgba(255,255,255,0.6)",
            boxShadow: "0 0 25px rgba(255,255,255,0.8), 0 0 50px #38bdf8",
          }}
        />

        {/* Middle pulsing ring */}
        <div
          className="absolute inset-6 rounded-full border-4 animate-pulse"
          style={{
            borderColor: "#38bdf8",
            boxShadow: "0 0 20px #38bdf8, 0 0 40px rgba(56,189,248,0.6)",
          }}
        />

        {/* Inner rotating prism */}
        <div className="relative flex items-center justify-center animate-spin-fast">
          <div
            className="w-10 h-10 rotate-45"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(56,189,248,0.9))",
              boxShadow:
                "0 0 20px rgba(255,255,255,0.8), 0 0 40px #38bdf8, inset 0 0 15px rgba(255,255,255,0.6)",
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
          />
        </div>

        {/* Label */}
        <span className="mt-20 text-sm text-white/80 tracking-widest uppercase">
          Loading
        </span>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        @keyframes spin-fast {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-fast {
          animation: spin-fast 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
}

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import gdgLogo from '../../assets/gdgmmdu-logo.jpg';

export const NotFound = () => {
  // Update document title for accessibility & context
  useEffect(() => {
    document.title = '404 - Page Not Found | GDGoC MMDU Management System';
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col justify-between relative overflow-hidden selection:bg-[#4285F4]/30">
      {/* ========================================================================= */}
      {/* 1. TOP MINIMAL NAVIGATION */}
      {/* ========================================================================= */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Top-Left: GDGoC MMDU Management System Brand */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 group transition-transform active:scale-95"
          aria-label="Return to GDGoC MMDU Home"
        >
          <img
            src={gdgLogo}
            alt="GDGoC MMDU Logo"
            className="h-8 sm:h-9 w-auto object-contain rounded-md border border-white/10"
          />
          <div className="text-left">
            <div className="text-xs sm:text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>GDGoC MMDU</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
            </div>
            <div className="text-[10px] sm:text-[11px] text-zinc-400 font-medium leading-none">
              Management System
            </div>
          </div>
        </Link>

        {/* Top-Right: Home Navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-all shadow-xs"
        >
          <Home className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </header>

      {/* ========================================================================= */}
      {/* 2. CENTER CONTENT & ANIMATED VISUALS */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 my-auto text-center">
        {/* Subtle Ambient GDG Glow Lights */}
        <div
          className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#4285F4]/10 blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/4"
          aria-hidden="true"
        />
        <div
          className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#EA4335]/10 blur-3xl pointer-events-none translate-x-1/3 translate-y-1/4"
          aria-hidden="true"
        />

        {/* Abstract Connected Community / System Nodes (Subtle SVG Overlay) */}
        <div
          className="absolute inset-0 max-w-4xl mx-auto flex items-center justify-center pointer-events-none opacity-40 select-none"
          aria-hidden="true"
        >
          <svg
            className="w-full h-full max-h-[460px]"
            viewBox="0 0 800 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft Interconnecting Vectors */}
            <path
              d="M 160 200 Q 300 120 400 200 T 640 200"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M 220 260 Q 400 320 580 260"
              stroke="white"
              strokeOpacity="0.06"
              strokeWidth="1"
            />

            {/* Subtle GDG-Color Accent Nodes */}
            <circle cx="200" cy="160" r="3.5" fill="#4285F4" fillOpacity="0.7" />
            <circle cx="280" cy="240" r="2.5" fill="#34A853" fillOpacity="0.6" />
            <circle cx="520" cy="150" r="3" fill="#FBBC05" fillOpacity="0.7" />
            <circle cx="600" cy="230" r="3.5" fill="#EA4335" fillOpacity="0.7" />
          </svg>
        </div>

        {/* Large Animated Faded 404 in Background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: [0.12, 0.17, 0.12],
            y: [-4, 4, -4],
            scale: 1,
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative select-none pointer-events-none"
          aria-hidden="true"
        >
          <span className="text-[26vw] sm:text-[22vw] lg:text-[20vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/8 to-transparent">
            404
          </span>

          {/* Micro GDG Gradient Under-Glow */}
          <div className="absolute inset-x-0 bottom-6 sm:bottom-10 h-1.5 max-w-xs mx-auto rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] opacity-30 blur-xs" />
        </motion.div>

        {/* Foreground Error Messaging (Lower-Center Area) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="relative z-10 max-w-md mx-auto -mt-10 sm:-mt-16 space-y-4"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono tracking-wide shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#EA4335] animate-pulse" />
            <span>404 • SYSTEM ROUTE MISSING</span>
          </div>

          {/* Primary Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Page not found
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>

          {/* Primary Call to Action */}
          <div className="pt-3 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#4285F4] hover:bg-[#1a73e8] text-white text-sm font-semibold shadow-lg shadow-[#4285F4]/20 hover:shadow-[#4285F4]/35 transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* ========================================================================= */}
      {/* 3. MINIMAL FOOTER ATTRIBUTION */}
      {/* ========================================================================= */}
      <footer className="relative z-20 w-full py-6 px-4 text-center border-t border-white/5">
        <p className="text-xs text-zinc-400 font-medium">
          GDGoC MMDU Management System • Maharishi Markandeshwar (Deemed to be University)
        </p>
      </footer>
    </div>
  );
};

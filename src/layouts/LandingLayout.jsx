import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/common/ThemeToggle';
import gdgLogo from '../assets/gdgmmdu-logo.jpg';
import {
  Menu,
  X,
  ArrowRight,
  Mail,
  MapPin,
} from 'lucide-react';

export const LandingLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // STRICT REQUIREMENT: ONLY these four navigation items
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-slate-900 dark:text-zinc-100 flex flex-col transition-colors selection:bg-[#4285F4]/20">
      {/* ========================================================================= */}
      {/* NAVBAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left: GDG MMDU Logo & Brand Text */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={gdgLogo}
              alt="GDG MMDU Logo"
              className="h-10 w-auto object-contain rounded-md"
            />
            <div className="text-left">
              <div className="text-sm font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>GDG MMDU</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-none mt-0.5">
                Management System
              </div>
            </div>
          </Link>

          {/* Center: Exactly 4 Navigation Items */}
          <nav className="hidden md:flex items-center border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 rounded-full p-1 text-xs font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Theme Toggle & SaaS Product Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              to="/login"
              className="hidden sm:inline-flex text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white px-2 py-1 transition-colors"
            >
              Login
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#4285F4] hover:bg-[#1a73e8] text-white text-xs font-bold shadow-xs hover:shadow transition-all active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Strictly 4 links + Login) */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-4 bg-white dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-zinc-800 space-y-1 animate-in fade-in duration-150">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 py-2.5 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 px-3 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 py-1.5"
              >
                Login to Portal →
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#4285F4] text-white text-xs font-bold shadow-xs"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-zinc-900 dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-zinc-800">
        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-zinc-800">
            {/* Left: Brand info */}
            <div className="space-y-2 max-w-md">
              <div className="flex items-center gap-3">
                <img
                  src={gdgLogo}
                  alt="GDG MMDU Logo"
                  className="h-9 w-auto object-contain rounded"
                />
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    GDG MMDU
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Management System
                  </p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                GDG on Campus · Maharishi Markandeshwar (Deemed to be University)
              </p>
            </div>

            {/* Right: Exactly 4 Navigation Links */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-medium text-zinc-300">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/login"
                className="text-[#4285F4] hover:underline font-semibold"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Institutional Copyright & Attribution */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
            <p>
              © {new Date().getFullYear()} GDG on Campus • MM(DU). All rights reserved.
            </p>
            <p className="text-[11px] text-zinc-400">
              Maharishi Markandeshwar (Deemed to be University), Mullana
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

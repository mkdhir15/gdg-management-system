import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserMenu } from './UserMenu';
import { ThemeToggle } from '../common/ThemeToggle';
import { GlobalSearch } from './GlobalSearch';
import { NotificationCenter } from './NotificationCenter';
import {
  Menu,
  Search,
  Command,
} from 'lucide-react';
import gdgLogo from '../../assets/gdgmmdu-logo.jpg';
import { MOCK_ROLES } from '../../data/gdgData';

export const Navbar = ({ onToggleSidebar }) => {
  const { role, switchRole } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  // Keyboard shortcut Ctrl+K or Cmd+K to launch global search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQuickSwitch = (newRole) => {
    switchRole(newRole);
    const roleRoutes = {
      [MOCK_ROLES.ADMIN]: '/admin/dashboard',
      [MOCK_ROLES.LEAD]: '/lead/dashboard',
      [MOCK_ROLES.MENTOR]: '/mentor/dashboard',
      [MOCK_ROLES.MENTEE]: '/mentee/dashboard',
    };
    navigate(roleRoutes[newRole] || '/admin/dashboard');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left Side: Brand & Sidebar Toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={onToggleSidebar}
              aria-label="Toggle navigation sidebar"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 lg:hidden transition-colors focus-visible:outline-2 focus-visible:outline-[#1a73e8]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/" className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-[#1a73e8] rounded-lg">
              <img
                src={gdgLogo}
                alt="GDG on Campus MMDU Logo"
                className="h-9 w-auto object-contain rounded-md"
              />
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors">
                    GDG Management System
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    MMDU
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal leading-tight">
                  Maharishi Markandeshwar (Deemed to be University)
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Global Search Bar (Trigger for GlobalSearch modal) */}
          <div className="flex-1 max-w-md mx-2 sm:mx-4">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-full pl-3 pr-2.5 sm:pr-4 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-all flex items-center justify-between text-slate-400 focus-visible:outline-2 focus-visible:outline-[#1a73e8]"
              aria-label="Open global search (Press Ctrl+K)"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">Search users, projects, tasks, events...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 shrink-0">
                <Command className="w-3 h-3" />K
              </kbd>
            </button>
          </div>

          {/* Right Side: Role Selector Pill, Theme Toggle, NotificationCenter & User Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Role Switcher Pill */}
            <div className="hidden xl:flex items-center bg-slate-100 dark:bg-slate-850 p-1 rounded-lg border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase px-2">
                Role:
              </span>
              {Object.values(MOCK_ROLES).map((r) => (
                <button
                  key={r}
                  onClick={() => handleQuickSwitch(r)}
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-md transition-all ${
                    role === r
                      ? 'bg-white dark:bg-slate-900 text-[#1a73e8] dark:text-[#8ab4f8] shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Notification Center Popover */}
            <NotificationCenter />

            <div className="h-6 w-px bg-slate-200 dark:border-slate-800 hidden sm:block" />

            {/* User Profile Menu */}
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

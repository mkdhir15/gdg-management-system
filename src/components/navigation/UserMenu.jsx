import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  LogOut,
  ChevronDown,
  Shield,
  Layers,
  GraduationCap,
  Sparkles,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { MOCK_ROLES } from '../../data/gdgData';

export const UserMenu = () => {
  const { currentUser, role, switchRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSwitch = (newRole) => {
    switchRole(newRole);
    setIsOpen(false);
    // Navigate to role-specific dashboard
    const roleRoutes = {
      [MOCK_ROLES.ADMIN]: '/admin/dashboard',
      [MOCK_ROLES.LEAD]: '/lead/dashboard',
      [MOCK_ROLES.MENTOR]: '/mentor/dashboard',
      [MOCK_ROLES.MENTEE]: '/mentee/dashboard',
    };
    navigate(roleRoutes[newRole] || '/admin/dashboard');
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-[#1a73e8]"
        aria-label="User account menu"
        aria-expanded={isOpen}
      >
        <img
          src={currentUser?.avatar}
          alt={currentUser?.name}
          className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
        />
        <div className="hidden md:block text-left">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
            {currentUser?.name}
          </p>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            {role}
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#131b2a] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* User Details */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              {currentUser?.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {currentUser?.email}
            </p>
            <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <Shield className="w-2.5 h-2.5" />
              {role} • {currentUser?.domainName || 'Core Team'}
            </div>
          </div>

          {/* Settings & Profile Links */}
          <div className="py-1 border-b border-slate-100 dark:border-slate-800">
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              Settings & Preferences
            </Link>
          </div>

          {/* Quick Prototype Role Switcher */}
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Simulate Role
              </p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/login');
                }}
                className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Switch Persona
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => handleRoleSwitch(MOCK_ROLES.ADMIN)}
                className={`text-left px-2 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  role === MOCK_ROLES.ADMIN
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Shield className="w-3 h-3 text-blue-600 dark:text-blue-400" /> Admin
              </button>
              <button
                onClick={() => handleRoleSwitch(MOCK_ROLES.LEAD)}
                className={`text-left px-2 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  role === MOCK_ROLES.LEAD
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Lead
              </button>
              <button
                onClick={() => handleRoleSwitch(MOCK_ROLES.MENTOR)}
                className={`text-left px-2 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  role === MOCK_ROLES.MENTOR
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <GraduationCap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Mentor
              </button>
              <button
                onClick={() => handleRoleSwitch(MOCK_ROLES.MENTEE)}
                className={`text-left px-2 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  role === MOCK_ROLES.MENTEE
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" /> Mentee
              </button>
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

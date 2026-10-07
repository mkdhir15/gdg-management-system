import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_ROLES } from '../../services/mockData';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  GraduationCap,
  Sparkles,
  UserPlus,
  FolderGit2,
  Calendar,
  Megaphone,
  AlertCircle,
  FileBarChart,
  BookOpen,
  CheckSquare,
  FileCheck2,
  MessageSquareQuote,
  Shield,
  Settings,
  X,
} from 'lucide-react';

const ROLE_NAV_CONFIG = {
  [MOCK_ROLES.ADMIN]: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Leads', path: '/admin/leads', icon: UserCheck },
    { label: 'Mentors', path: '/admin/mentors', icon: GraduationCap },
    { label: 'Mentees', path: '/admin/mentees', icon: Sparkles },
    { label: 'Assignments', path: '/admin/assignments', icon: UserPlus },
    { label: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { label: 'Events', path: '/admin/events', icon: Calendar },
    { label: 'Announcements', path: '/admin/announcements', icon: Megaphone },
    { label: 'Complaints', path: '/admin/complaints', icon: AlertCircle, badge: '2' },
  ],
  [MOCK_ROLES.LEAD]: [
    { label: 'Dashboard', path: '/lead/dashboard', icon: LayoutDashboard },
    { label: 'Mentors', path: '/lead/mentors', icon: GraduationCap },
    { label: 'Mentees', path: '/lead/mentees', icon: Sparkles },
    { label: 'Projects', path: '/lead/projects', icon: FolderGit2 },
    { label: 'Events', path: '/lead/events', icon: Calendar },
    { label: 'Announcements', path: '/lead/announcements', icon: Megaphone },
    { label: 'Reports', path: '/lead/reports', icon: FileBarChart },
  ],
  [MOCK_ROLES.MENTOR]: [
    { label: 'Dashboard', path: '/mentor/dashboard', icon: LayoutDashboard },
    { label: 'My Mentees', path: '/mentor/mentees', icon: Sparkles },
    { label: 'Topics', path: '/mentor/topics', icon: BookOpen },
    { label: 'Tasks', path: '/mentor/tasks', icon: CheckSquare },
    { label: 'Projects', path: '/mentor/projects', icon: FolderGit2 },
    { label: 'Submissions', path: '/mentor/submissions', icon: FileCheck2, badge: '3' },
    { label: 'Feedback', path: '/mentor/feedback', icon: MessageSquareQuote },
    { label: 'Complaints', path: '/mentor/complaints', icon: AlertCircle },
    { label: 'Events', path: '/mentor/events', icon: Calendar },
    { label: 'Announcements', path: '/mentor/announcements', icon: Megaphone },
  ],
  [MOCK_ROLES.MENTEE]: [
    { label: 'Dashboard', path: '/mentee/dashboard', icon: LayoutDashboard },
    { label: 'My Mentor', path: '/mentee/mentor', icon: GraduationCap },
    { label: 'My Topics', path: '/mentee/topics', icon: BookOpen },
    { label: 'My Tasks', path: '/mentee/tasks', icon: CheckSquare, badge: '2' },
    { label: 'My Projects', path: '/mentee/projects', icon: FolderGit2 },
    { label: 'Submissions', path: '/mentee/submissions', icon: FileCheck2 },
    { label: 'Feedback', path: '/mentee/feedback', icon: MessageSquareQuote },
    { label: 'Events', path: '/mentee/events', icon: Calendar },
    { label: 'Announcements', path: '/mentee/announcements', icon: Megaphone },
  ],
};

export const Sidebar = ({ isOpen, onClose }) => {
  const { role, currentUser } = useAuth();
  const navItems = ROLE_NAV_CONFIG[role] || ROLE_NAV_CONFIG[MOCK_ROLES.ADMIN];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-30 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Header inside mobile sidebar */}
        <div className="h-16 px-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between lg:hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </span>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Identity Tag */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[11px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                Workspace
              </p>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {role} Portal
              </h4>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors group ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-[#1a73e8] dark:text-[#8ab4f8] font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0 transition-colors group-hover:text-slate-900 dark:group-hover:text-slate-100" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* System Settings link */}
          <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
            <NavLink
              to="/settings"
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-[#1a73e8] dark:text-[#8ab4f8] font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 shrink-0 transition-colors group-hover:text-slate-900 dark:group-hover:text-slate-100" />
                <span>Settings</span>
              </div>
            </NavLink>
          </div>
        </nav>

        {/* Sidebar Footer info */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
            <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
              MMDU Campus Chapter
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Maharishi Markandeshwar (Deemed to be University)
            </p>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
              <span>v1.0.4 - Production</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title="Online" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

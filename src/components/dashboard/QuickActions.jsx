import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus,
  Users,
  GraduationCap,
  Sparkles,
  FolderGit2,
  Calendar,
  Megaphone,
  CheckSquare,
  FileCheck2,
  MessageSquareQuote,
  AlertCircle,
  BookOpen,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { MOCK_ROLES } from '../../data/gdgData';

const ACTIONS_CONFIG = {
  [MOCK_ROLES.ADMIN]: [
    { label: 'Add User', desc: 'Register student or lead', path: '/admin/users', icon: UserPlus, color: 'blue' },
    { label: 'Assign Mentor', desc: 'Match mentees to tracks', path: '/admin/assignments', icon: GraduationCap, color: 'green' },
    { label: 'Create Event', desc: 'Schedule GDG session', path: '/admin/events', icon: Calendar, color: 'yellow' },
    { label: 'Publish Announcement', desc: 'Broadcast to chapter', path: '/admin/announcements', icon: Megaphone, color: 'purple' },
  ],
  [MOCK_ROLES.LEAD]: [
    { label: 'View Mentors', desc: 'Track mentors & capacity', path: '/lead/mentors', icon: GraduationCap, color: 'blue' },
    { label: 'View Mentees', desc: 'Roster across 4 domains', path: '/lead/mentees', icon: Sparkles, color: 'green' },
    { label: 'Review Projects', desc: 'Sprint status & milestones', path: '/lead/projects', icon: FolderGit2, color: 'yellow' },
    { label: 'Broadcast Update', desc: 'Post sprint announcement', path: '/lead/announcements', icon: Megaphone, color: 'purple' },
  ],
  [MOCK_ROLES.MENTOR]: [
    { label: 'Create Task', desc: 'Assign sprint deliverables', path: '/mentor/tasks', icon: CheckSquare, color: 'blue' },
    { label: 'Review Submissions', desc: '3 pending mentee PRs', path: '/mentor/submissions', icon: FileCheck2, color: 'green', badge: '3' },
    { label: 'Give Feedback', desc: 'Review mentee progress', path: '/mentor/feedback', icon: MessageSquareQuote, color: 'purple' },
    { label: 'Add Syllabus Topic', desc: 'Curate learning material', path: '/mentor/topics', icon: BookOpen, color: 'yellow' },
  ],
  [MOCK_ROLES.MENTEE]: [
    { label: 'View Tasks', desc: 'Check sprint deliverables', path: '/mentee/tasks', icon: CheckSquare, color: 'blue', badge: 'Active' },
    { label: 'Submit Work', desc: 'Turn in milestone PR', path: '/mentee/submissions', icon: FileCheck2, color: 'green' },
    { label: 'View Feedback', desc: 'Read mentor reviews', path: '/mentee/feedback', icon: MessageSquareQuote, color: 'purple' },
    { label: 'Contact Mentor', desc: '1-on-1 guidance & sync', path: '/mentee/mentor', icon: GraduationCap, color: 'yellow' },
  ],
};

const COLOR_MAP = {
  blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white',
  green: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white',
  yellow: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white',
  purple: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white',
};

export const QuickActions = ({ role }) => {
  const navigate = useNavigate();
  const actions = ACTIONS_CONFIG[role] || ACTIONS_CONFIG[MOCK_ROLES.ADMIN];

  return (
    <div className="bg-white dark:bg-[#131b2a] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Quick Actions
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline">
          Fast Access Shortcuts
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.label}
              onClick={() => navigate(act.path)}
              className="group text-left p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-all duration-150 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between w-full mb-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    COLOR_MAP[act.color]
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {act.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {act.badge}
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {act.label}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {act.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

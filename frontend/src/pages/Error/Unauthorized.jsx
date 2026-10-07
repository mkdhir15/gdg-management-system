import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { MOCK_ROLES } from '../../data/gdgData';

export const Unauthorized = ({ requiredRole = 'Higher Privilege' }) => {
  const navigate = useNavigate();
  const { role, currentUser } = useAuth();

  const getDashboardRoute = () => {
    switch (role) {
      case MOCK_ROLES.ADMIN:
        return '/admin/dashboard';
      case MOCK_ROLES.LEAD:
        return '/lead/dashboard';
      case MOCK_ROLES.MENTOR:
        return '/mentor/dashboard';
      case MOCK_ROLES.MENTEE:
        return '/mentee/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-white dark:bg-[#131b2a] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-100 dark:border-rose-900/60">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
          Access Restricted (403)
        </span>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          Unauthorized Workspace
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Your active session role (<strong className="text-slate-800 dark:text-slate-200">{role}</strong>) does not have authorization to view this section.
        </p>

        <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-left border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Frontend Role Policy</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Current Persona: <span className="font-semibold text-slate-700 dark:text-slate-300">{currentUser?.name} ({role})</span>. If you need elevated access, switch to an authorized persona via the login page or top bar switcher.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2.5 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            icon={ArrowLeft}
          >
            Go Back
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(getDashboardRoute())}
            icon={Home}
          >
            Go to My Dashboard
          </Button>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
          GDG on Campus MMDU • Role-Based Access Control
        </div>
      </div>
    </div>
  );
};

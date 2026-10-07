import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FileQuestion, ArrowLeft, Home, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { MOCK_ROLES } from '../../data/gdgData';

export const NotFound = () => {
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
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-100 dark:border-blue-800">
          <FileQuestion className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#1a73e8] dark:text-[#8ab4f8]">
          Error 404
        </span>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          Page Not Found
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          The page or route you are attempting to access does not exist or has been relocated within the GDG Management System.
        </p>

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
            Return to Dashboard
          </Button>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
          GDG on Campus MMDU • Internal Operations Portal
        </div>
      </div>
    </div>
  );
};

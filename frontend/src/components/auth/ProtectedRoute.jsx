import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Unauthorized } from '../../pages/Error/Unauthorized';
import { MOCK_ROLES } from '../../data/gdgData';

export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { currentUser, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b0f19]">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Admin has universal inspection rights across all portals
  if (role === MOCK_ROLES.ADMIN) {
    return <Outlet />;
  }

  // Verify role restriction
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Unauthorized requiredRole={allowedRoles.join(' or ')} />;
  }

  return <Outlet />;
};

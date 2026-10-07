import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import { MOCK_ROLES, CURRENT_USER_PROFILES } from '../services/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);

  // Sync session on mount
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const login = async ({ email, password, role, accountId }) => {
    setIsLoading(true);
    try {
      const res = await authService.login({ email, password, role, accountId });
      if (res.success) {
        setCurrentUser(res.user);
        return res;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchAccount = (accountId) => {
    const updatedUser = authService.switchAccount(accountId);
    setCurrentUser(updatedUser);
    return updatedUser;
  };

  const switchRole = (role) => {
    const updatedUser = authService.switchRole(role);
    setCurrentUser(updatedUser);
    return updatedUser;
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      // Reset to admin or null
      setCurrentUser(CURRENT_USER_PROFILES.ADMIN);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || MOCK_ROLES.ADMIN,
        login,
        switchRole,
        switchAccount,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

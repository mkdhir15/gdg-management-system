import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DEV_USERS_LIST } from '../../data/devUsers';
import { MOCK_ROLES } from '../../data/gdgData';
import { ProfileAvatar } from '../common/ProfileAvatar';
import { Shield, ChevronDown, ChevronUp, Wrench } from 'lucide-react';

/**
 * Development-Only Floating Role Switcher
 * 
 * Exclusively active during `import.meta.env.DEV`.
 * Allows instantaneous switching between Admin, Lead, Mentor, and Mentee
 * dashboards without manual source edits or authentication delays.
 */
export const DevRoleSwitcher = () => {
  // Hard guard: Disappear entirely in production
  if (!import.meta.env.DEV) {
    return null;
  }

  const { currentUser, role, switchRole } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (targetRole) => {
    const updated = switchRole(targetRole);
    const routes = {
      [MOCK_ROLES.ADMIN]: '/admin/dashboard',
      [MOCK_ROLES.LEAD]: '/lead/dashboard',
      [MOCK_ROLES.MENTOR]: '/mentor/dashboard',
      [MOCK_ROLES.MENTEE]: '/mentee/dashboard',
    };
    navigate(routes[targetRole] || '/admin/dashboard');
  };

  return (
    <aside
      aria-label="Development Testing Role Switcher"
      className="fixed bottom-4 right-4 z-50 select-none animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className="bg-slate-900/95 dark:bg-[#111827]/95 text-white border border-amber-500/30 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden ring-1 ring-black/20 max-w-sm">
        {/* Header Bar */}
        <div className="px-3.5 py-2 bg-gradient-to-r from-amber-500/20 via-blue-500/10 to-transparent border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-amber-300 uppercase flex items-center gap-1">
              <Wrench className="w-3 h-3 inline" />
              Dev Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-400 font-medium">
              Active: <strong className="text-white">{role}</strong>
            </span>
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={collapsed ? 'Expand dev switcher' : 'Collapse dev switcher'}
              title={collapsed ? 'Expand dev switcher' : 'Collapse dev switcher'}
            >
              {collapsed ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Role Switcher Buttons */}
        {!collapsed && (
          <div className="p-2.5 space-y-1.5">
            <div className="text-[10px] text-zinc-400 px-1 font-medium">
              Switch role dashboard preview:
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {DEV_USERS_LIST.map((u) => {
                const isActive = role === u.role;
                return (
                  <button
                    key={u.role}
                    type="button"
                    onClick={() => handleRoleSelect(u.role)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#4285F4] text-white shadow-md font-semibold ring-1 ring-white/30'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <ProfileAvatar
                      src={u.profileImage}
                      name={u.name}
                      size="xs"
                      className="rounded-full shrink-0"
                    />
                    <div className="truncate flex-1">
                      <div className="text-[11px] truncate font-medium">
                        {u.role}
                      </div>
                      <div className="text-[9px] opacity-75 truncate">
                        {u.name.replace('Developer ', '')}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="pt-1 px-1 flex items-center justify-between text-[9px] text-zinc-400 border-t border-white/5">
              <span>Frontend Dev Preview Mode</span>
              <span className="text-amber-400/90 font-mono">import.meta.env.DEV</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

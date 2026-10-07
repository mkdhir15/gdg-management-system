import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Mail, GraduationCap, Sparkles, Award } from 'lucide-react';

export const UserCard = ({ user }) => {
  return (
    <Card className="p-5 flex flex-col items-center text-center hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-150 border-slate-200 dark:border-slate-800">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-16 h-16 rounded-full object-cover ring-4 ring-slate-100 dark:ring-slate-800 mb-3 shadow-xs"
      />
      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
        {user.name}
        {user.name === 'Mohit' && (
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-medium">
            Developer
          </span>
        )}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
        {user.department}
      </p>

      {user.domain && (
        <div className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          {user.role === 'MENTOR' ? (
            <GraduationCap className="w-3 h-3" />
          ) : (
            <Sparkles className="w-3 h-3" />
          )}
          {user.domain} Track
        </div>
      )}

      <div className="w-full mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1.5 text-slate-600 dark:text-slate-400 text-left">
        <div className="flex items-center gap-2 truncate">
          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
        {user.role === 'MENTOR' && (
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Mentees Assigned</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {user.assignedMenteeNames?.length || 0} Students
            </span>
          </div>
        )}
        {user.mentorName && (
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Assigned Mentor</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
              {user.mentorName}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

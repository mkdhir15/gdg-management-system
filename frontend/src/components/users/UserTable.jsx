import React from 'react';
import { Badge } from '../common/Badge';
import { Mail, Calendar, UserCheck } from 'lucide-react';
import { MOCK_ROLES } from '../../services/mockData';
import { ProfileAvatar } from '../common/ProfileAvatar';

const ROLE_BADGE = {
  [MOCK_ROLES.ADMIN]: { variant: 'blue', text: 'Admin' },
  [MOCK_ROLES.LEAD]: { variant: 'yellow', text: 'Lead' },
  [MOCK_ROLES.MENTOR]: { variant: 'green', text: 'Mentor' },
  [MOCK_ROLES.MENTEE]: { variant: 'purple', text: 'Mentee' },
};

export const UserTable = ({ users, onSelectUser }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] transition-colors">
      <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
        <thead className="bg-slate-50 dark:bg-[#0b0f17] text-[11px] uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="px-5 py-3.5">Member</th>
            <th className="px-4 py-3.5">Role</th>
            <th className="px-4 py-3.5">Department</th>
            <th className="px-4 py-3.5">Status</th>
            <th className="px-4 py-3.5">Domain / Mentor</th>
            <th className="px-4 py-3.5 text-right">Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {users.map((user) => {
            const roleInfo = ROLE_BADGE[user.role] || {
              variant: 'gray',
              text: user.role,
            };
            return (
              <tr
                key={user.id}
                onClick={() => onSelectUser && onSelectUser(user)}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                    />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block">
                        {user.name}
                        {user.name === 'Mohit' && (
                          <span className="ml-1 text-[9px] px-1 py-0.2 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300">
                            Dev
                          </span>
                        )}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 block flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {user.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <Badge variant={roleInfo.variant} size="sm">
                    {roleInfo.text}
                  </Badge>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="font-medium text-slate-800 dark:text-slate-200 block">
                    {user.department}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {user.campus || 'MM(DU) Mullana'}
                  </span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  {user.role === MOCK_ROLES.MENTEE ? (
                    <div>
                      <span className="text-slate-800 dark:text-slate-200 font-medium block text-xs">
                        {user.domain || user.track}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        Mentor: {user.mentorName}
                      </span>
                    </div>
                  ) : user.role === MOCK_ROLES.MENTOR ? (
                    <div>
                      <span className="text-slate-800 dark:text-slate-200 font-medium block text-xs">
                        {user.domain} Track
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        {user.assignedMenteeNames?.length || 0} Assigned Mentees
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500 text-xs">
                      Campus Operations
                    </span>
                  )}
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap text-right text-slate-400 dark:text-slate-500 text-xs">
                  {user.joinedDate || '2024'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { UserTable } from '../../components/users/UserTable';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { InviteUserModal } from '../../components/users/InviteUserModal';
import { useToast } from '../../context/ToastContext';
import { userService } from '../../services/api';
import { MOCK_ROLES } from '../../services/mockData';
import { Search, UserPlus, Download, Users } from 'lucide-react';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      const data = await userService.getUsers();
      setUsers(data);
    };
    load();
  }, []);

  const handleExportCSV = () => {
    const headers = ['ID,Name,Email,Role,Domain,Department,Status'];
    const rows = filtered.map(
      (u) => `"${u.id}","${u.name}","${u.email}","${u.role}","${u.domainName || u.domain || ''}","${u.department || ''}","Active"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gdg_mmdu_directory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('MMDU Chapter directory exported to CSV.');
  };

  const handleUserCreated = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  const filtered = users.filter((u) => {
    if (filterRole !== 'ALL' && u.role !== filterRole) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.department && u.department.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Campus Directory & User Governance"
        subtitle="Manage all registered students, leads, and faculty mentors at MMDU Mullana."
        actions={
          <>
            <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
              Export CSV
            </Button>
            <Button size="sm" icon={UserPlus} onClick={() => setIsInviteModalOpen(true)}>
              Invite Member
            </Button>
          </>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#111827] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0b0f17]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['ALL', MOCK_ROLES.ADMIN, MOCK_ROLES.LEAD, MOCK_ROLES.MENTOR, MOCK_ROLES.MENTEE].map(
            (r) => (
              <button
                key={r}
                onClick={() => setFilterRole(r)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  filterRole === r
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {r === 'ALL' ? 'All Roles' : r}
              </button>
            )
          )}
        </div>
      </div>

      {/* Users Table or Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No members match your criteria"
          description="Try clearing your search query or selecting a different role filter."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFilterRole('ALL');
                setSearch('');
              }}
            >
              Reset Filters
            </Button>
          }
        />
      ) : (
        <UserTable users={filtered} />
      )}

      {/* Invite Member Modal */}
      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};

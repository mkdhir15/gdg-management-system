import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { UserCard } from '../../components/users/UserCard';
import { userService } from '../../services/api';
import { MOCK_ROLES } from '../../services/mockData';
import { Button } from '../../components/common/Button';
import { UserPlus, Award } from 'lucide-react';

export const AdminLeads = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await userService.getLeads();
      setLeads(data);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="GDG Campus Leads & Organizers"
        subtitle="Core organizing team directing chapter operations, events, and track activities."
        actions={
          <Button size="sm" icon={UserPlus}>
            Designate New Lead
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <UserCard key={lead.id} user={lead} />
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { UserTable } from '../../components/users/UserTable';
import { userService } from '../../services/api';

export const LeadMentees = () => {
  const [mentees, setMentees] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await userService.getMentees();
      setMentees(data);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Chapter Mentees Roster"
        subtitle="Track enrolled student members across all active technology tracks."
      />
      <UserTable users={mentees} />
    </div>
  );
};

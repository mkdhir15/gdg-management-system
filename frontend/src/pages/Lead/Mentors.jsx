import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { UserCard } from '../../components/users/UserCard';
import { userService } from '../../services/api';

export const LeadMentors = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await userService.getMentors();
      setMentors(data);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Chapter Mentors Directory"
        subtitle="Review mentor allocations, domain specializations, and guidance loads."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mentors.map((m) => (
          <UserCard key={m.id} user={m} />
        ))}
      </div>
    </div>
  );
};

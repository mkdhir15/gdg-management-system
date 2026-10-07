import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { UserCard } from '../../components/users/UserCard';
import { userService } from '../../services/api';
import { Button } from '../../components/common/Button';
import { GraduationCap, UserPlus } from 'lucide-react';

export const AdminMentors = () => {
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
        title="Faculty & Technical Mentors"
        subtitle="Mentors steering Cloud, AI, Web, and Mobile engineering cohorts."
        actions={
          <Button size="sm" icon={UserPlus}>
            Add Faculty Mentor
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <UserCard key={mentor.id} user={mentor} />
        ))}
      </div>
    </div>
  );
};

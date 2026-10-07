import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { UserCard } from '../../components/users/UserCard';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/api';
import { GDG_MENTORS } from '../../data/gdgData';

export const MentorMentees = () => {
  const { currentUser } = useAuth();
  const mentor =
    GDG_MENTORS.find(
      (m) => m.id === currentUser?.id || m.name.toLowerCase() === currentUser?.name?.toLowerCase()
    ) || GDG_MENTORS[0];

  const [mentees, setMentees] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await userService.getMentees({ mentorId: mentor.id });
      setMentees(data);
    };
    load();
  }, [mentor.id]);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`My Mentees (${mentor.name} • ${mentor.domain})`}
        subtitle={`Students currently assigned to you for 1:1 technical guidance in the ${mentor.domain} Track.`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mentees.map((m) => (
          <UserCard key={m.id} user={m} />
        ))}
      </div>
    </div>
  );
};

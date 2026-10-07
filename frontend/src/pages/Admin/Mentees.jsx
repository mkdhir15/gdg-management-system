import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { UserTable } from '../../components/users/UserTable';
import { userService } from '../../services/api';
import { Button } from '../../components/common/Button';
import { UserPlus, Download } from 'lucide-react';

export const AdminMentees = () => {
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
        title="Student Mentees Cohort"
        subtitle="Undergraduate engineering students enrolled across GDG technical development tracks."
        actions={
          <>
            <Button variant="outline" size="sm" icon={Download}>
              Export Roster
            </Button>
            <Button size="sm" icon={UserPlus}>
              Enroll Mentee
            </Button>
          </>
        }
      />

      <UserTable users={mentees} />
    </div>
  );
};

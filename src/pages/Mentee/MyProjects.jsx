import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { useAuth } from '../../context/AuthContext';
import { projectService } from '../../services/api';
import { GDG_MENTEES } from '../../data/gdgData';

export const MenteeProjects = () => {
  const { currentUser } = useAuth();
  const mentee =
    GDG_MENTEES.find(
      (m) => m.id === currentUser?.id || m.name.toLowerCase() === currentUser?.name?.toLowerCase()
    ) || GDG_MENTEES.find((m) => m.name === 'Mohit') || GDG_MENTEES[0];

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await projectService.getProjects({
        domain: mentee.domain,
        menteeName: mentee.name,
      });
      setProjects(data);
    };
    load();
  }, [mentee.id, mentee.name, mentee.domain]);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`My Campus Project (${mentee.domain})`}
        subtitle={`Track team sprint velocity, repositories, and release milestones for ${mentee.name}.`}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
};

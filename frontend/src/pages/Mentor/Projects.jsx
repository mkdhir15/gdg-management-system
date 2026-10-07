import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { useAuth } from '../../context/AuthContext';
import { projectService } from '../../services/api';
import { GDG_MENTORS } from '../../data/gdgData';

export const MentorProjects = () => {
  const { currentUser } = useAuth();
  const mentor =
    GDG_MENTORS.find(
      (m) => m.id === currentUser?.id || m.name.toLowerCase() === currentUser?.name?.toLowerCase()
    ) || GDG_MENTORS[0];

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await projectService.getProjects({ domain: mentor.domain, mentorId: mentor.id });
      setProjects(data);
    };
    load();
  }, [mentor.id, mentor.domain]);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`Supervised Projects (${mentor.domain})`}
        subtitle={`Campus projects under active architectural guidance by ${mentor.name}.`}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { Button } from '../../components/common/Button';
import { projectService } from '../../services/api';
import { Plus } from 'lucide-react';

export const LeadProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await projectService.getProjects();
      setProjects(data);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Chapter Technical Projects"
        subtitle="Review progress of all active engineering projects built for MMDU."
        actions={
          <Button size="sm" icon={Plus}>
            New Project
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
};

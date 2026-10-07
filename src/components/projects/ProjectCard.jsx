import React from 'react';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import {
  FolderGit2,
  Calendar,
  ExternalLink,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { Github } from '../common/Icons';

const STATUS_CONFIG = {
  Completed: { variant: 'green', text: 'Completed' },
  'In Progress': { variant: 'blue', text: 'In Progress' },
  'Under Review': { variant: 'yellow', text: 'Under Review' },
  'Needs Attention': { variant: 'red', text: 'Needs Attention' },
};

export const ProjectCard = ({ project, onAction }) => {
  const statusInfo = STATUS_CONFIG[project.status] || {
    variant: 'gray',
    text: project.status,
  };

  return (
    <Card className="flex flex-col h-full hover:border-blue-200 transition-all duration-200">
      <div className="p-5 flex-1 flex flex-col">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            {project.domain}
          </span>
          <Badge variant={statusInfo.variant} size="sm" dot>
            {statusInfo.text}
          </Badge>
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold text-slate-900 line-clamp-1 mb-1.5 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Progress Bar */}
        <div className="mt-auto mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 font-medium">Milestone Progress</span>
            <span className="font-bold text-slate-800">{project.progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                project.progress === 100
                  ? 'bg-emerald-500'
                  : project.status === 'Needs Attention'
                  ? 'bg-rose-500'
                  : 'bg-[#1a73e8]'
              }`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Mentor & Mentees Info */}
        <div className="py-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">
              Mentor
            </span>
            <span className="font-semibold text-slate-700 truncate block">
              {project.mentor}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">
              Target Deadline
            </span>
            <span className="font-semibold text-slate-700 truncate block flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {project.deadline}
            </span>
          </div>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 rounded-b-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-slate-500">
          <Users className="w-3.5 h-3.5" />
          <span>{project.mentees.length} Mentees</span>
        </div>
        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-slate-900 transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
            >
              Demo <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

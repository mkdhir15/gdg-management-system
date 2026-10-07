import React from 'react';
import { Badge } from '../common/Badge';
import { ExternalLink, Calendar } from 'lucide-react';
import { Github } from '../common/Icons';

const STATUS_CONFIG = {
  Completed: { variant: 'green', text: 'Completed' },
  'In Progress': { variant: 'blue', text: 'In Progress' },
  'Under Review': { variant: 'yellow', text: 'Under Review' },
  'Needs Attention': { variant: 'red', text: 'Needs Attention' },
};

export const ProjectTable = ({ projects, onSelectProject }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-xs text-slate-600">
        <thead className="bg-slate-50 text-[11px] uppercase font-semibold tracking-wider text-slate-500 border-b border-slate-200">
          <tr>
            <th className="px-5 py-3.5">Project Title & Domain</th>
            <th className="px-4 py-3.5">Lead / Mentor</th>
            <th className="px-4 py-3.5">Progress</th>
            <th className="px-4 py-3.5">Status</th>
            <th className="px-4 py-3.5">Deadline</th>
            <th className="px-4 py-3.5 text-right">Links</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {projects.map((project) => {
            const statusInfo = STATUS_CONFIG[project.status] || {
              variant: 'gray',
              text: project.status,
            };
            return (
              <tr
                key={project.id}
                onClick={() => onSelectProject && onSelectProject(project)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-900 line-clamp-1">
                    {project.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {project.domain}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="font-medium text-slate-800">{project.mentor}</div>
                  <div className="text-[11px] text-slate-400">
                    Lead: {project.lead}
                  </div>
                </td>
                <td className="px-4 py-4 w-40">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-slate-700">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        project.progress === 100
                          ? 'bg-emerald-500'
                          : project.status === 'Needs Attention'
                          ? 'bg-rose-500'
                          : 'bg-[#1a73e8]'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge variant={statusInfo.variant} size="sm" dot>
                    {statusInfo.text}
                  </Badge>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {project.deadline}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-slate-400 hover:text-slate-800 p-1"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

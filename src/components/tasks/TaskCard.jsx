import React from 'react';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FolderGit2,
  ChevronRight,
} from 'lucide-react';

const PRIORITY_CONFIG = {
  High: { variant: 'red', text: 'High Priority' },
  Medium: { variant: 'yellow', text: 'Medium Priority' },
  Low: { variant: 'blue', text: 'Low Priority' },
};

const STATUS_CONFIG = {
  Pending: { variant: 'gray', text: 'Pending', icon: Clock },
  'In Progress': { variant: 'blue', text: 'In Progress', icon: Clock },
  Submitted: { variant: 'yellow', text: 'Submitted', icon: Clock },
  Approved: { variant: 'green', text: 'Approved', icon: CheckCircle2 },
  'Revision Requested': { variant: 'red', text: 'Revision', icon: AlertCircle },
};

export const TaskCard = ({ task, onStatusChange, role }) => {
  const priorityInfo = PRIORITY_CONFIG[task.priority] || {
    variant: 'gray',
    text: task.priority,
  };
  const statusInfo = STATUS_CONFIG[task.status] || {
    variant: 'gray',
    text: task.status,
  };

  return (
    <Card className="p-4 hover:border-slate-300 transition-all duration-150">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <Badge variant={priorityInfo.variant} size="sm">
            {priorityInfo.text}
          </Badge>
          <span className="text-[10px] font-semibold text-slate-400">
            {task.category}
          </span>
        </div>
        <Badge variant={statusInfo.variant} size="sm" dot>
          {statusInfo.text}
        </Badge>
      </div>

      <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
        {task.title}
      </h4>
      <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
        {task.description}
      </p>

      {task.project && (
        <div className="mb-3 p-2 bg-slate-50 rounded-lg flex items-center gap-1.5 text-xs text-slate-600 truncate">
          <FolderGit2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{task.project}</span>
        </div>
      )}

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Due {task.deadline}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-600 font-medium">
            {role === 'MENTEE' ? `Mentor: ${task.mentor}` : `Assigned: ${task.assignedTo}`}
          </span>
        </div>
      </div>
    </Card>
  );
};

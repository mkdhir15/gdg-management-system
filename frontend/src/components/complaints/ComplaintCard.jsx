import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { AlertCircle, Calendar, CheckCircle2, Clock, User } from 'lucide-react';

const STATUS_CONFIG = {
  Pending: { variant: 'yellow', text: 'Pending Investigation', icon: Clock },
  'Under Investigation': { variant: 'blue', text: 'In Review', icon: Clock },
  Resolved: { variant: 'green', text: 'Resolved', icon: CheckCircle2 },
};

const PRIORITY_CONFIG = {
  High: 'red',
  Medium: 'yellow',
  Low: 'gray',
};

export const ComplaintCard = ({ complaint }) => {
  const statusInfo = STATUS_CONFIG[complaint.status] || {
    variant: 'gray',
    text: complaint.status,
  };
  const StatusIcon = statusInfo.icon || AlertCircle;

  return (
    <Card className="p-5 hover:border-slate-300 transition-all duration-150">
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <Badge variant={statusInfo.variant} size="sm" dot>
            {statusInfo.text}
          </Badge>
          <Badge
            variant={PRIORITY_CONFIG[complaint.priority] || 'gray'}
            size="sm"
          >
            {complaint.priority} Priority
          </Badge>
          <span className="text-[11px] font-medium text-slate-400">
            {complaint.category}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{complaint.date}</span>
        </div>
      </div>

      <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
        {complaint.subject}
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
        {complaint.description}
      </p>

      {/* Resolution Notes if available */}
      {complaint.resolutionNotes && (
        <div className="mb-4 p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
            Official Resolution / Action Note
          </span>
          <p className="text-xs text-slate-700 italic">
            "{complaint.resolutionNotes}"
          </p>
        </div>
      )}

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Submitted by <strong className="text-slate-800 font-semibold">{complaint.submittedBy}</strong> ({complaint.submittedByRole})
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          Target: <strong className="text-slate-700">{complaint.targetRole}</strong>
        </span>
      </div>
    </Card>
  );
};

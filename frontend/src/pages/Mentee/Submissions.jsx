import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { submissionService } from '../../services/api';
import { GDG_MENTEES } from '../../data/gdgData';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { Github } from '../../components/common/Icons';

export const MenteeSubmissions = () => {
  const { currentUser } = useAuth();
  const mentee =
    GDG_MENTEES.find(
      (m) => m.id === currentUser?.id || m.name.toLowerCase() === currentUser?.name?.toLowerCase()
    ) || GDG_MENTEES.find((m) => m.name === 'Mohit') || GDG_MENTEES[0];

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await submissionService.getSubmissions({
        menteeId: mentee.id,
        menteeName: mentee.name,
      });
      setSubmissions(data);
    };
    load();
  }, [mentee.id, mentee.name]);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`My Milestone Submissions • ${mentee.name}`}
        subtitle={`Review your submitted code reviews, pull requests, and feedback from mentor ${mentee.mentorName}.`}
      />

      <div className="space-y-4">
        {submissions.length === 0 ? (
          <Card className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800">
            No submissions recorded yet. Submit your first sprint task PR to receive mentor feedback!
          </Card>
        ) : (
          submissions.map((sub) => (
            <Card key={sub.id} className="p-5 border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {sub.taskTitle}
                </h3>
                <div className="flex items-center gap-2">
                  {sub.score && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Score: {sub.score}/100
                    </span>
                  )}
                  <Badge
                    variant={
                      sub.status === 'Approved'
                        ? 'green'
                        : sub.status === 'Under Review'
                        ? 'yellow'
                        : 'red'
                    }
                    size="sm"
                    dot
                  >
                    {sub.status}
                  </Badge>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Submitted on {sub.submittedAt} • Evaluated by {sub.mentorName}
              </p>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800 mb-3 text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Submission Notes:
                </span>
                <p className="text-slate-600 dark:text-slate-400">{sub.notes}</p>
              </div>

              {sub.mentorFeedback && (
                <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-800/80 mb-3 text-xs">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                    Mentor Feedback ({sub.mentorName}):
                  </span>
                  <p className="text-emerald-700 dark:text-emerald-300 italic">
                    "{sub.mentorFeedback}"
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                {sub.repoUrl && (
                  <a
                    href={sub.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  >
                    <Github className="w-3.5 h-3.5" /> Pull Request
                  </a>
                )}
                {sub.liveUrl && (
                  <a
                    href={sub.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Preview Deployment
                  </a>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { submissionService } from '../../services/api';
import { MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const MenteeFeedback = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await submissionService.getSubmissions();
      setSubmissions(data);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Mentor Feedback &amp; Evaluations"
        subtitle="Review guidance notes and ratings from your faculty mentor."
      />

      <div className="space-y-4">
        {submissions
          .filter((s) => s.mentorFeedback)
          .map((sub) => (
            <Card key={sub.id} className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900">{sub.taskTitle}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                  Grade: {sub.score}/100
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">Reviewed on {sub.submittedAt}</p>
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-700 leading-relaxed italic">
                "{sub.mentorFeedback}"
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { GiveFeedbackModal } from '../../components/feedback/GiveFeedbackModal';
import { submissionService } from '../../services/api';
import { MessageSquare, Star, User, Plus } from 'lucide-react';

export const MentorFeedback = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await submissionService.getSubmissions();
      setSubmissions(data);
    };
    load();
  }, []);

  const handleFeedbackSubmitted = (newFb) => {
    const updated = {
      id: `fb-${Date.now()}`,
      taskTitle: 'Milestone Review',
      menteeName: 'Student Mentee',
      submittedAt: newFb.date,
      mentorFeedback: newFb.comments,
      score: newFb.rating * 20,
    };
    setSubmissions((prev) => [updated, ...prev]);
  };

  const feedbackList = submissions.filter((s) => s.mentorFeedback);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Formative Feedback Archive"
        subtitle="Historical log of mentorship feedback and code quality evaluations."
        actions={
          <Button size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Give New Feedback
          </Button>
        }
      />

      {feedbackList.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No feedback submitted yet"
          description="Provide constructive evaluations and guidance for your student mentees."
          action={
            <Button size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
              Submit First Review
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          {feedbackList.map((sub) => (
            <Card key={sub.id} className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {sub.taskTitle}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Score: {sub.score || '90'}/100
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3 text-xs text-slate-500 dark:text-slate-400">
                <User className="w-3.5 h-3.5" />
                <span>
                  Mentee:{' '}
                  <strong className="text-slate-700 dark:text-slate-300">{sub.menteeName}</strong>
                </span>
                <span>• Reviewed on {sub.submittedAt}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{sub.mentorFeedback}"
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Give Feedback Modal */}
      <GiveFeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        menteeName="Assigned Mentee"
        taskTitle="Sprint Deliverable"
        onFeedbackSubmitted={handleFeedbackSubmitted}
      />
    </div>
  );
};

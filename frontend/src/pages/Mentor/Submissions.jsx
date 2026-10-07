import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { submissionService } from '../../services/api';
import {
  FileCheck2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { Github } from '../../components/common/Icons';

import { useAuth } from '../../context/AuthContext';
import { GDG_MENTORS } from '../../data/gdgData';

export const MentorSubmissions = () => {
  const { currentUser } = useAuth();
  const mentor =
    GDG_MENTORS.find(
      (m) => m.id === currentUser?.id || m.name.toLowerCase() === currentUser?.name?.toLowerCase()
    ) || GDG_MENTORS[0];

  const [submissions, setSubmissions] = useState([]);
  const [activeSubmission, setActiveSubmission] = useState(null);
  const [reviewNote, setReviewNote] = useState('');
  const [score, setScore] = useState(90);

  useEffect(() => {
    const load = async () => {
      const data = await submissionService.getSubmissions({
        mentorId: mentor.id,
        mentorName: mentor.name,
      });
      setSubmissions(data);
    };
    load();
  }, [mentor.id, mentor.name]);

  const handleOpenReview = (sub) => {
    setActiveSubmission(sub);
    setReviewNote(sub.mentorFeedback || '');
    setScore(sub.score || 85);
  };

  const handleSaveReview = (newStatus) => {
    if (!activeSubmission) return;
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === activeSubmission.id
          ? {
              ...s,
              status: newStatus,
              mentorFeedback: reviewNote,
              score: score,
            }
          : s
      )
    );
    setActiveSubmission(null);
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Student Code Reviews &amp; Submissions"
        subtitle="Review pull requests, run code inspections, evaluate test coverage, and award grades."
      />

      <div className="space-y-4">
        {submissions.map((sub) => (
          <Card key={sub.id} className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={sub.menteeAvatar}
                  alt={sub.menteeName}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {sub.taskTitle}
                  </h3>
                  <span className="text-xs text-slate-500">
                    Submitted by <strong>{sub.menteeName}</strong> on {sub.submittedAt}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {sub.score && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Grade: {sub.score}/100
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

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 mb-3 text-xs">
              <strong className="text-slate-700 block mb-0.5">Mentee Submission Notes:</strong>
              <p className="text-slate-600 italic">"{sub.notes}"</p>
            </div>

            {sub.mentorFeedback && (
              <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 mb-3 text-xs">
                <strong className="text-blue-900 block mb-0.5">Your Recorded Feedback:</strong>
                <p className="text-blue-800">{sub.mentorFeedback}</p>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {sub.repoUrl && (
                  <a
                    href={sub.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    <Github className="w-3.5 h-3.5" /> Open Pull Request
                  </a>
                )}
                {sub.liveUrl && (
                  <a
                    href={sub.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-600 hover:underline inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Staging Preview
                  </a>
                )}
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleOpenReview(sub)}
              >
                Grade / Update Review
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Review Modal Dialog */}
      {activeSubmission && (
        <Modal
          isOpen={true}
          onClose={() => setActiveSubmission(null)}
          title={`Review: ${activeSubmission.taskTitle}`}
          subtitle={`Student: ${activeSubmission.menteeName}`}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Evaluation Score (0 - 100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-32 px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Formative Feedback &amp; Architecture Notes
              </label>
              <textarea
                rows={4}
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Detail technical strengths, lint issues, or required test coverage fixes..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-800"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSaveReview('Revision Requested')}
              >
                Request Revision
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSaveReview('Approved')}
              >
                Approve &amp; Merge
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
